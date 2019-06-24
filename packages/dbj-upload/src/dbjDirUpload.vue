<template>
  <div
    class="dbj-dir-upload"
    :class="{
      ready: isReady,
      uploading: isUploading,
      uploaded: isComplete,
      'no-file': !hasFile
    }"
  >
    <el-upload
      ref="uploader"
      class="el-upload-wrapper"
      :action="uploadServerUrl"
      :data="getUploadData"
      :before-upload="beforeUpload"
      :on-progress="uploadProgress"
      :on-success="uploadSuccess"
      :files-filter="handleFilesFilter"
      :show-file-list="false"
      multiple
      directory
    >
      <slot>
        <div class="dbj-dir-upload__button">
          <i class="dbj-icon-upload" />
          <span>上传文件夹</span>
        </div>
      </slot>
    </el-upload>
    <div
      v-if="tip"
      class="dbj-dir-upload__tip"
    >
      {{ tip }}
    </div>
    <div
      class="dbj-dir-upload__panel"
      :class="{expand: expand}">
      <div class="dbj-dir-upload__content">
        <i
          class="el-icon-arrow-down"
          @click="expand = !expand"
        />
        <img src="https://ali-image.dabanjia.com/static/image/element-ui/folder.png">
        <div class="content-wrapper">
          <div class="top">
            <div class="dbj-dir-upload__label">
              <span class="file-name">{{dirName || '无目录'}}</span>
              <i class="dbj-icon-success" />
              <i class="dbj-icon-warn" title="没有文件" />
            </div>
            <span class="file-size">
              <span class="current">{{formatFileSize(sizeStat.loaded)}}</span>
              <span class="total">/{{formatFileSize(sizeStat.total)}}</span>
            </span>
            <i @click="handleClear" class="dbj-icon-circle-close"/>
            <i @click="handleReplace" class="dbj-icon-replace"/>
          </div>
          <div class="bottom">
            <span class="progress">
              <span
                class="bar"
                :style="{width: (sizeStat.total ? sizeStat.loaded*100/sizeStat.total : 0) + '%'}"
              />
            </span>
            <i class="dbj-icon-circle-close"/>
          </div>
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="expand" class="dbj-dir-upload__children">
          <template v-for="file in fileList">
            <dbj-upload
              v-if="!file.read"
              :key="file.index"
              type="resource"
              :tip="file.tip"
              :file-type="file.fileType"
              :md5="file.md5"
              :request-token="requestToken"
              :dir-name="dirName"
              :value="file.value"
              @input="val => handleFileChange(file, val)"
              @error="handleError"
            >
            </dbj-upload>
            <dbj-reader
              v-else
              :key="file.index"
              :tip="file.tip"
              :file-type="file.fileType"
              :max-size="file.maxSize"
              :value="file.value"
              @input="val => handleFileRead(file, val)"
              @error="handleError"
            >
            </dbj-reader>
          </template>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter';
import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
import ElUpload from 'element-ui/packages/upload';
import DbjUpload from './dbjUpload';
import DbjReader from './dbjReader';
import { getFileKey, getDirName, formatFileSize, getFileMd5 } from './util';
import { Promise } from 'q';

export default {
  name: 'DbjDirUpload',
  mixins: [emitter],
  components: {
    ElCollapseTransition,
    ElUpload,
    DbjUpload,
    DbjReader
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tip: {
      type: String,
      default: ''
    },
    requestToken: {
      type: Function,
      default: function() {
        console.error('Function requestToken of DbjUpload is not defined.');
      }
    },
    formatFileSize: {
      type: Function,
      default: formatFileSize
    }
  },
  data() {
    return {
      fileList: [],
      expand: false,
      dirName: '',
      isReplace: false,
      uploadServerUrl: '',
      accessServerUrl: '',
      isUploading: false,
      isComplete: false
    };
  },
  computed: {
    isReady() {
      return !!this.fileList.length;
    },
    fileUidIdxMap() {
      let map = {};
      this.fileList.forEach((item, idx) => {
        map[item.uid] = idx;
      });
      return map;
    },
    sizeStat() {
      let total = 0;
      let loaded = 0;
      this.fileList.forEach(file => {
        let {size = 0, sizeLoaded = 0} = file;
        total += size;
        loaded += sizeLoaded;
      });
      if (loaded > total) {
        loaded = total;
      }
      return {
        total,
        loaded
      };
    },
    hasFile() {
      return this.fileList.some(file => {
        if (file.read) {
          if (file.value) {
            return true;
          }
        } else {
          if (file.value[0] && file.value[0].url) {
            return true;
          }
        }
      });
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        let initFiles = false;
        for (let i = 0; i < val.length; i++) {
          let item = val[i];
          if (item.read) {
            if (item.content) {
              initFiles = true;
            }
          } else {
            let dirName = getDirName(item.url);
            if (item.url) {
              initFiles = true;
            }
            if (dirName) {
              this.dirName = dirName;
              break;
            }
          }
        }
        if (initFiles && !this.fileList.length) {
          this.isComplete = true;
          this.resetDirFiles(val);
        }
      }
    }
  },
  methods: {
    /**
     * 上传之前，过滤文件夹内的文件
     */
    handleFilesFilter(files) {
      this.isUploading = true;
      this.isComplete = false;
      this.$emit('pre-upload', files);
      if (this.isReplace) {
        this.isReplace = false;
        this.expand = false;
      }
      this.resetDirFiles(this.value.map(item => {
        if (item.read) {
          return {...item, content: ''};
        }
        return {...item, url: '', md5Value: ''};
      }));
      let rawFiles = Array.prototype.slice.call(files);
      return new Promise((resolve, reject) => {
        let postFiles = [];
        let hasMatchFile = false;
        for (let i = 0; i < rawFiles.length; i++) {
          let rawFile = rawFiles[i];
          let path = rawFile.webkitRelativePath;
          let name = (rawFile.name || "").slice(0, 20);
          let emptyFiles = this.fileList.filter(f => !f.size);
          if (!emptyFiles.length) {
            break;
          }
          if (path.split('/').length === 2) {
            this.dirName = path.split('/')[0].replace(/\$/g, '').slice(0, 20);
            hasMatchFile = emptyFiles.some(ef => {
              let reg = new RegExp('\\.' + ef.fileType + '$', 'i');
              if (reg.test(name)) {
                let currentFile = this.fileList[ef.index];
                if (currentFile.read) {
                  currentFile.size = rawFile.size;
                  let reader = new FileReader();
                  let instance = this;
                  reader.readAsText(rawFile);
                  reader.onload = function(progress) {
                    currentFile.sizeLoaded = currentFile.size;
                    currentFile.value = this.result;
                    instance.$emit('input', instance.getValue());
                    instance.handleComplete();
                  };
                } else {
                  rawFile.index = ef.index;
                  currentFile.name = name;
                  currentFile.size = rawFile.size;
                  currentFile.fileKey = getFileKey(name, this.dirName);
                  postFiles.push(rawFile);
                }
                return true;
              }
            }) || hasMatchFile;
          }
        }
        if (hasMatchFile) {
          resolve(postFiles);
        } else {
          this.isUploading = false;
          this.isComplete = true;
          this.$emit('input', this.getValue());
          this.$emit('no-file');
          reject();
        }
      });
    },
    beforeUpload(file) {
      let index = file.index;
      let currentFile = this.fileList[index];

      return new Promise((resolve, reject) => {
        this.requestToken('RESOURCE')
          .then(res => {
            let { data } = res;
            this.$set(this.fileList, index, {
              ...currentFile,
              uid: file.uid,
              OSSAccessKeyId: data.accessid,
              policy: data.policy,
              signature: data.signature,
              key: data.dir + '/' + currentFile.fileKey
            });
            this.uploadServerUrl = data.host;
            this.accessServerUrl = data.ossUrl;
            resolve(this.uploadServerUrl);
          })
          .catch(e => {
            reject();
          });
      });
    },
    resetDirFiles(value) {
      this.fileList = [];
      value.forEach((item, index) => {
        let file = item;
        if (item.read) {
          file = {
            ...item,
            index: index,
            size: 0,
            sizeLoaded: 0,
            value: item.content || ''
          };
        } else {
          file = {
            ...item,
            name: '',
            size: 0,
            sizeLoaded: 0,
            index: index,
            fileKey: '',
            md5: item.md5 || false,
            url: '',
            value: [
              {
                url: item.url,
                md5: item.md5Value
              }
            ]
          };
        }
        this.fileList.push(file);
      });
    },
    uploadProgress(event, file, fileList) {
      let { loaded } = event;
      this.fileList[this.fileUidIdxMap[file.uid]].sizeLoaded = loaded;
    },
    getValue() {
      return this.value.map((item, index) => {
        if (item.read) {
          let { value = '' } = this.fileList[index] || {};
          return {
            ...item,
            content: value
          };
        } else {
          let { value = [] } = this.fileList[index] || {};
          let {
            url = '',
            md5 = ''
          } = value[0] || {};
          return {
            ...item,
            url: url,
            md5Value: md5
          };
        }
      });
    },
    uploadSuccess(res, file, fileList) {
      let index = this.fileUidIdxMap[file.uid];
      let currentFile = this.fileList[index];
      delete currentFile['OSSAccessKeyId'];
      delete currentFile['policy'];
      delete currentFile['signature'];
      currentFile.sizeLoaded = currentFile.size;
      if (currentFile.md5) {
        getFileMd5(file.raw, md5 => {
          this.$set(currentFile, 'value', [{url: this.accessServerUrl + currentFile.fileKey, md5: md5}]);
          this.$emit('input', this.getValue());
          this.dispatch('ElFormItem', 'el.form.blur', [this.fileList]);
          this.handleComplete();
        });
      } else {
        this.$set(currentFile, 'value', [{url: this.accessServerUrl + currentFile.fileKey}]);
        this.$emit('input', this.getValue());
        this.dispatch('ElFormItem', 'el.form.blur', [this.fileList]);
        this.handleComplete();
      }
    },
    handleComplete() {
      let isComplete = this.fileList.every(file => file.sizeLoaded === file.size);
      if (isComplete) {
        this.isUploading = false;
        this.isComplete = true;
        this.$emit('complete', this.getValue());
      }
    },
    getUploadData(uid) {
      let {
        OSSAccessKeyId = '',
        policy = '',
        signature = '',
        key = ''
      } = this.fileList[this.fileUidIdxMap[uid]];
      return {
        OSSAccessKeyId,
        policy,
        signature,
        key: decodeURIComponent(key), // 阿里云默认会进行一次encode，所以上传时不要encode
        success_action_status: '200' // 让服务端返回200,不然，默认会返回204
      };
    },
    handleFileChange(file, value) {
      let currentFile = this.fileList[file.index];
      let {
        name = '',
        size = 0,
        sizeLoaded = 0,
        md5 = '',
        url = '',
        key = '',
        fileKey = '',
        uid = 0
      } = value[0] || {};
      currentFile.name = name;
      currentFile.size = size;
      currentFile.sizeLoaded = sizeLoaded;
      currentFile.key = key;
      currentFile.fileKey = fileKey;
      currentFile.uid = uid;
      currentFile.md5Value = md5;
      currentFile.url = url;
      currentFile.value = [{url: url, md5: md5}];
      this.$set(this.fileList, file.index, currentFile);
      this.$emit('input', this.getValue());
    },
    handleFileRead(file, value) {
      let currentFile = this.fileList[file.index];
      currentFile.value = value;
      currentFile.content = value;
      this.$set(this.fileList, file.index, currentFile);
      this.$emit('input', this.getValue());
    },
    handleClear() {
      this.fileList = [];
      this.expand = false;
      this.$emit('input', this.value.map(item => {
        if (item.read) {
          return {...item, content: ''};
        }
        return {...item, url: '', md5Value: ''};
      }));
    },
    handleReplace() {
      this.isReplace = true;
      this.$refs.uploader.$refs['upload-inner'].handleClick();
    },
    handleError(msg, file) {
      this.$emit('error', msg, file);
    },
    triggerClick() {
      this.$refs.uploader.$refs['upload-inner'].handleClick();
    }
  }
};
</script>

