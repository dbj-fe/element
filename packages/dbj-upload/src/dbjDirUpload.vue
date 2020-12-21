<template>
  <div
    class="dbj-dir-upload"
    :class="{
      'is-ready': isReady,
      'is-uploading': isUploading,
      'is-uploaded': isComplete,
      'no-match-file': !hasFile
    }"
  >
    <el-upload
      ref="uploader"
      class="dbj-dir-upload__trigger"
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
      :class="{'is-expand': expand}">
      <div class="dbj-dir-upload__content">
        <i
          v-if="showFileList"
          class="dbj-dir-upload__expand-icon dbj-icon-arrow-down"
          @click="expand = !expand"
        />
        <img class="dbj-dir-upload__folder-img" src="https://ali-image.dabanjia.com/static/image/element-ui/folder.png">
        <div class="dbj-dir-upload-folder">
          <div class="dbj-dir-upload-folder__top">
            <div class="dbj-dir-upload-folder__info">
              <div class="dbj-dir-upload-folder__label">
                <span class="dbj-dir-upload-folder__name" :title="dirName">{{dirName || '无目录'}}</span>
                <i class="dbj-dir-upload-folder__success-icon dbj-icon-success" />
                <i class="dbj-dir-upload-folder__warning-icon dbj-icon-warning" title="没有文件" />
              </div>
              <span class="dbj-dir-upload-folder__size">
                <span class="dbj-dir-upload-folder__size-current">{{formatFileSize(sizeStat.loaded)}}</span>
                <span class="dbj-dir-upload-folder__size-total">/{{formatFileSize(sizeStat.total)}}</span>
              </span>
            </div>
            <i @click="handleClear" class="dbj-dir-upload-folder__clear-icon dbj-icon-circle-close"/>
            <i @click="handleDirReplace" class="dbj-dir-upload-folder__replace-icon dbj-icon-replace-outline"/>
          </div>
          <div class="dbj-dir-upload-folder__bottom">
            <span class="dbj-dir-upload-folder__progress">
              <span
                class="dbj-dir-upload-folder__progress-bar"
                :style="{width: (sizeStat.total ? sizeStat.loaded*100/sizeStat.total : 0) + '%'}"
              />
            </span>
            <i @click="handleAbort" class="dbj-dir-upload-folder__abort-icon dbj-icon-circle-close"/>
          </div>
        </div>
      </div>
      <el-collapse-transition >
        <div v-show="expand" class="dbj-dir-upload__children">
          <template v-for="(meta, idx) in metaList">
            <dbj-upload
              v-if="!meta.read"
              :key="meta.index"
              type="resource"
              :tip="meta.tip"
              :file-type="meta.fileType"
              :max-size="meta.maxSize"
              :md5="meta.md5"
              :request-token="requestToken"
              :dir-name="dirName"
              :value="fileList[idx].url"
              :md5-value="fileList[idx].md5Value"
              @success="val => handleFileChange(meta, val)"
              @clear="val => handleFileChange(meta, val)"
              @error="handleError"
            >
            </dbj-upload>
            <dbj-reader
              v-else
              :key="meta.index"
              :tip="meta.tip"
              :file-type="meta.fileType"
              :max-size="meta.maxSize"
              :value="fileList[idx].content"
              @input="val => handleFileRead(meta, val)"
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
import { getFileKey, getDirName, formatFileSize, sliceCnStrUri, getFileMd5 } from './util';
import { Promise } from 'q';
const FILE_STATUS = {
  INIT: 0,
  READY: 1,
  COMPLETE: 2
};

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
    filter: {
      type: [Array, Function],
      default: function() {
        return true;
      }
    },
    showFileList: {
      type: Boolean,
      default: true
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
      metaList: [], // 文件上传信息（size，name等），和file一一对应
      expand: false,
      dirName: '',
      isDirReplace: false,
      uploadServerUrl: '',
      accessServerUrl: '',
      isUploading: false,
      isComplete: false
    };
  },
  computed: {
    isReady() {
      return !!this.metaList.length;
    },
    fileUidIdxMap() {
      let map = {};
      this.metaList.forEach((item, idx) => {
        map[item.uid] = idx;
      });
      return map;
    },
    sizeStat() {
      let total = 0;
      let loaded = 0;
      this.metaList.forEach(meta => {
        let {size = 0, sizeLoaded = 0} = meta;
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
      return this.metaList.some(meta => meta.status === FILE_STATUS.READY || meta.status === FILE_STATUS.COMPLETE);
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val === this.fileList) {
          return;
        }
        let [tempData, flag, hasFile] = [[], true, false];
        if (typeof this.filter === 'function') {
          this.fileList = val;
          tempData = this.fileList;
          flag = false;
        } else if (Array.isArray(this.filter)) {
          tempData = this.filter;
        }
        this.fileList = tempData.map((item, idx) => {
          let {read} = item ;
          let file = val[idx] || {};
          if (read || (!flag && file.content)) {
            if (file.content) {
              hasFile = true;
            }
            return {
              content: file.content || ''
            };
          }
          this.dirName = getDirName(file.url);
          if (file.url) {
            hasFile = true;
          }
          return {
            url: file.url || '',
            md5Value: file.md5Value || ''
          };
        });
        if (hasFile) {
          this.metaList = tempData.map((item, idx) => {
            let {tip, md5, fileType = 'json', read} = item;
            if (!flag) {
              item.content ? read = true : fileType = ('' + item.url).split('.').pop().toLowerCase();
              tip = `仅支持.${fileType}格式文件`;
            }
            return {
              index: idx,
              fileType,
              tip,
              md5,
              read,
              size: 0,
              sizeLoaded: 0,
              fileKey: '',
              status: FILE_STATUS.COMPLETE
            };
          });
          this.isComplete = true;
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
      if (this.isDirReplace) {
        this.isDirReplace = false;
        this.expand = false;
      }
      let rawFiles = Array.prototype.slice.call(files);
      return new Promise((resolve, reject) => {
        let postFiles = rawFiles;
        this.dirName = sliceCnStrUri((rawFiles[0].webkitRelativePath || '').split('/')[0], 100);
        if (typeof this.filter === 'function') {
          this.handleClear();
          postFiles = this.filter(rawFiles) || rawFiles;
          postFiles.map((rawFile, idx) => {
            let path = rawFile.webkitRelativePath;
            let name = rawFile.name || '';
            let size = rawFile.size || 0;
            let read = false;
            rawFile.index = idx;
            if (path.split('/').length === 2) {
              let fileType = ('' + name).split('.').pop().toLowerCase() || 'json';
              this.fileList.push({url: '', md5Value: rawFile.md5});
              rawFile.content ? read = true : fileType;
              let tip = `仅支持.${fileType}格式文件`;
              this.$set(this.metaList, idx, {
                index: idx,
                tip,
                md5: true,
                read,
                sizeLoaded: 0,
                status: FILE_STATUS.READY,
                fileType,
                name: name,
                size: size,
                fileKey: getFileKey(name, this.dirName)
              });
            }

          });
        } else {
          postFiles = rawFiles.filter(this.generateFilter(this.filter));
        }
        if (postFiles.length) {
          resolve(postFiles);
        } else {
          this.isUploading = false;
          this.isComplete = true;
          this.$emit('input', this.fileList);
          this.$emit('error', '未找到文件');
          reject();
        }
      });
    },
    generateFilter(config) {
      if (Array.isArray(config)) {
        this.metaList = config.map((item, idx) => {
          return {
            index: idx,
            fileType: item.fileType,
            tip: item.tip,
            md5: item.md5,
            read: item.read,
            size: 0,
            sizeLoaded: 0,
            fileKey: '',
            status: FILE_STATUS.INIT
          };
        });
        return (rawFile, idx) => {
          let path = rawFile.webkitRelativePath;
          let name = rawFile.name || '';
          let size = rawFile.size || 0;
          let emptySlots = this.metaList.filter(item => item.status === FILE_STATUS.INIT);
          if (path.split('/').length === 2) {
            if (emptySlots.length) { // 是否还有空位置
              for (let i = 0; i < emptySlots.length; i++) {
                let es = emptySlots[i];
                let reg = new RegExp('\\.' + es.fileType + '$', 'i');
                if (reg.test(name)) {
                  this.$set(this.metaList, es.index, {
                    ...this.metaList[es.index],
                    status: FILE_STATUS.READY,
                    name: name,
                    size: size,
                    fileKey: getFileKey(name, this.dirName)
                  });
                  rawFile.index = es.index;
                  return true;
                }
              }
            }
          }
          return false;
        };
      }
    },
    beforeUpload(file) {
      let index = file.index;
      let meta = this.metaList[index];
      if (meta.read) {
        let reader = new FileReader();
        let instance = this;
        reader.readAsText(file);
        reader.onload = function(progress) {
          instance.$set(instance.metaList, index, {
            ...meta,
            sizeLoaded: meta.size,
            status: FILE_STATUS.COMPLETE
          });
          instance.$set(instance.fileList, index, {
            content: this.result
          });
          instance.$emit('input', instance.fileList);
          instance.handleComplete();
        };
        return false;
      }

      return new Promise((resolve, reject) => {
        this.requestToken('RESOURCE')
          .then(res => {
            let { data } = res;
            this.$set(this.metaList, index, {
              ...meta,
              uid: file.uid,
              OSSAccessKeyId: data.accessid,
              policy: data.policy,
              signature: data.signature,
              key: data.dir + '/' + meta.fileKey
            });
            this.uploadServerUrl = data.host;
            this.accessServerUrl = data.ossUrl;
            resolve(this.uploadServerUrl);
          })
          .catch(e => {
            this.$emit('error', '获取上传token失败');
            reject();
          });
      });
    },
    uploadProgress(event, file, fileList) {
      let { loaded } = event;
      this.metaList[this.fileUidIdxMap[file.uid]].sizeLoaded = loaded;
    },
    uploadSuccess(res, file, fileList) {
      let index = this.fileUidIdxMap[file.uid];
      let meta = this.metaList[index];
      this.$set(this.metaList, index, {
        ...meta,
        sizeLoaded: meta.size,
        status: FILE_STATUS.COMPLETE
      });
      if (meta.md5) {
        getFileMd5(file.raw, md5 => {
          this.$set(this.fileList, index, {url: this.accessServerUrl + meta.fileKey, md5Value: md5});
          this.$emit('input', this.fileList);
          this.dispatch('ElFormItem', 'el.form.blur', [this.fileList]);
          this.handleComplete();
        });
      } else {
        this.$set(this.fileList, index, {url: this.accessServerUrl + meta.fileKey});
        this.$emit('input', this.fileList);
        this.dispatch('ElFormItem', 'el.form.blur', [this.fileList]);
        this.handleComplete();
      }
    },
    handleComplete() {
      let isComplete = this.metaList.every(meta => meta.status === FILE_STATUS.COMPLETE);
      if (isComplete) {
        this.isUploading = false;
        this.isComplete = true;
        this.$emit('complete', this.fileList);
      }
    },
    getUploadData(uid) {
      let {
        OSSAccessKeyId = '',
        policy = '',
        signature = '',
        key = ''
      } = this.metaList[this.fileUidIdxMap[uid]];
      return {
        OSSAccessKeyId,
        policy,
        signature,
        key: decodeURIComponent(key), // 阿里云默认会进行一次encode，所以上传时不要encode
        success_action_status: '200' // 让服务端返回200,不然，默认会返回204
      };
    },
    handleFileChange(mt, value) {
      let meta = this.metaList[mt.index];
      let {
        name = '',
        size = 0,
        sizeLoaded = 0,
        md5 = '',
        url = '',
        key = '',
        fileKey = '',
        uid = 0
      } = value || {};
      meta.name = name;
      meta.size = size;
      meta.sizeLoaded = sizeLoaded;
      meta.key = key;
      meta.fileKey = fileKey;
      meta.uid = uid;
      meta.status = url ? FILE_STATUS.COMPLETE : FILE_STATUS.INIT;
      this.$set(this.metaList, mt.index, meta);
      this.$set(this.fileList, mt.index, {url: url, md5Value: md5});
      this.$emit('input', this.fileList);
    },
    handleFileRead(mt, value) {
      this.$set(this.metaList, mt.index, {...this.metaList[mt.index], status: value ? FILE_STATUS.COMPLETE : FILE_STATUS.INIT});
      this.$set(this.fileList, mt.index, {content: value});
      this.$emit('input', this.fileList);
    },
    handleClear() {
      if (typeof this.filter === 'function') {
        this.fileList = [];
      } else {
        this.fileList = this.filter.map(({read}, idx) =>
          read ? ({content: ''}) : ({url: '', md5Value: ''}));
      }
      this.metaList = [];
      this.expand = false;
      this.$emit('input', this.fileList);
    },
    handleDirReplace() {
      this.isDirReplace = true;
      this.$refs.uploader.$refs['upload-inner'].handleClick();
    },
    handleAbort() {
      this.$refs.uploader.abort();
      this.handleClear();
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
