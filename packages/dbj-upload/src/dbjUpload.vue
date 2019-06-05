<template>
  <div
    class="dbj-upload"
    :class="{
      'dbj-upload--multiple' : multiple,
      'dbj-upload--single' : !multiple,
      'has-files' : fileList2.length
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
      :show-file-list="false"
      :accept="accept"
      :multiple="multiple"
    >
      <slot>
        <div class="dbj-upload__button">
          <i class="el-icon-upload2" />
          <span>上传文件</span>
        </div>
      </slot>
    </el-upload>
    <div
      v-if="tip"
      class="dbj-upload__tip"
    >
      {{ tip }}
    </div>
    <ul class="dbj-upload-list">
      <li
        v-for="file in fileList2"
        :key="file.uid"
        class="dbj-upload-list__item"
        :class="{complete: file.sizeLoaded === file.size}"
      >
        <p class="dbj-upload-list__item-content">
          <span class="file-info">
            <label class="content-wrapper">
              <span class="content">
                <span class="file-name">{{ file.prefix }}</span>
                <span v-if="file.suffix" class="file-suffix">{{ file.suffix }}</span>
              </span>
              <i class="el-icon-success" />
            </label>
            <span v-if="file.size > 0" class="file-size">
              <span class="current">{{ formatFileSize(file.sizeLoaded) }}</span>
              <span class="total">/{{ formatFileSize(file.size) }}</span>
            </span>
          </span>
          <i @click="handleRemove(file)" class="el-icon-circle-close"/>
          <el-upload
            ref="replaceUploader"
            class="upload-icon"
            :action="uploadServerUrl"
            :data="getUploadData"
            :before-upload="newFile => handleReplace(file, newFile)"
            :on-progress="uploadProgress"
            :on-success="uploadSuccess"
            :show-file-list="false"
            :accept="accept"
          >
            <i class="el-icon-upload2"/>
          </el-upload>
        </p>
        <p class="dbj-upload-list__item-progress">
          <span class="progress">
            <span
              class="bar"
              :style="{width: file.sizeLoaded*100/file.size + '%'}"
            />
          </span>
          <i class="el-icon-circle-close" @click="handleAbort(file)"/>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter';
import ElUpload from 'element-ui/packages/upload';
import { getFileKey, getFileName, formatFileSize, getFileMd5 } from './util';
import { Promise } from 'q';

export default {
  name: 'DbjUpload',
  mixins: [emitter],
  components: {
    ElUpload
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: function(value) {
        // "~"在js中是按位非，-1的二进制是 1111 1111，按位非之后就是 0000 0000，即是十进制的0
        return ~['image', 'resource', 'video'].indexOf(value);
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    fileType: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 0
    },
    tip: {
      type: String,
      default: ''
    },
    md5: {
      type: Boolean,
      default: false
    },
    dirName: {
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
      replaceUid: 0,
      uploadServerUrl: 'http://dbj-test.oss-cn-beijing.aliyuncs.com',
      accessServerUrl: ''
    };
  },
  computed: {
    fileUidIdxMap() {
      let map = {};
      this.fileList.forEach((item, idx) => {
        map[item.uid] = idx;
      });
      return map;
    },
    fileList2() {
      return this.fileList.map(file => {
        let name = file.name || '';
        let idx = name.lastIndexOf('.');
        let prefix, suffix;
        if (idx > 1) {
          prefix = name.slice(0, idx - 1);
          suffix = name.slice(idx - 1);
        } else {
          prefix = name;
        }
        return {
          ...file,
          prefix,
          suffix
        };
      });
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        let missingName = (val || []).some(file => {
          if (file.url && !file.name) {
            return true;
          }
        });
        if (missingName) {
          this.fileList = (val || []).map(file => {
            let name = getFileName(file.url);
            return {
              ...file,
              name
            };
          });
        }
      }
    }
  },
  methods: {
    beforeUpload(file) {
      let currentFile = {
        name: file.name,
        size: file.size,
        sizeLoaded: 0,
        uid: file.uid,
        fileKey: getFileKey(file.name, this.dirName),
        url: '',
        md5: ''
      };
      return new Promise((resolve, reject) => {
        if (this.fileType) {
          let reg = new RegExp('\\.' + this.fileType + '$', 'i');
          if (this.fileType.indexOf(',') >= 0) {
            let arr = this.fileType.split(',');
            arr = arr.map(item => '\\.' + item);
            reg = new RegExp('(' + arr.join('|') + ')$', 'i');
          }
          if (!reg.test(currentFile.name)) {
            this.$emit('error', '文件格式不对', currentFile);
            this.replaceUid = 0;
            reject();
            return;
          }
        } else {
          if (this.type === 'image') {
            if (!/(\.jpg|\.png|\.bmp)$/i.test(currentFile.name)) {
              this.$emit('error', '文件格式不对', currentFile);
              this.replaceUid = 0;
              reject();
              return;
            }
          }
        }
        if (this.maxSize) {
          if (currentFile.size > this.maxSize) {
            this.$emit('error', '文件过大', currentFile);
            this.replaceUid = 0;
            reject();
            return;
          }
        }
        if (this.multiple) {
          let idx = this.fileUidIdxMap[this.replaceUid];
          if (idx >= 0) {
            this.fileList.splice(idx, 1, currentFile);
          } else {
            this.fileList.push(currentFile);
          }
        } else {
          this.fileList = [currentFile];
        }
        this.requestToken(this.type.toUpperCase())
          .then(res => {
            let { data } = res;
            currentFile.OSSAccessKeyId = data.accessid;
            currentFile.policy = data.policy;
            currentFile.signature = data.signature;
            currentFile.key = data.dir + '/' + currentFile.fileKey;
            this.uploadServerUrl = data.host;
            this.accessServerUrl = data.ossUrl;
            resolve();
          })
          .catch(e => {
            this.replaceUid = 0;
            reject();
          });
      });
    },
    uploadProgress(event, file, fileList) {
      let { percent = 0, total, loaded } = event;
      this.fileList[this.fileUidIdxMap[file.uid]].sizeLoaded = Math.min(loaded, file.size);
      this.$emit('progress', percent, total, loaded);
    },
    uploadSuccess(res, file, fileList) {
      let currentFile = this.fileList[this.fileUidIdxMap[file.uid]];
      currentFile.sizeLoaded = currentFile.size;
      currentFile.url = this.accessServerUrl + currentFile.fileKey;
      delete currentFile['OSSAccessKeyId'];
      delete currentFile['policy'];
      delete currentFile['signature'];
      if (this.md5) {
        getFileMd5(file.raw, md5 => {
          currentFile.md5 = md5;
          this.$emit('success', currentFile, this.fileList);
          this.$emit('input', this.fileList);
          this.dispatch('ElFormItem', 'el.form.blur', [this.fileList]);
        });
      } else {
        this.$emit('success', currentFile, this.fileList);
        this.$emit('input', this.fileList);
        this.dispatch('ElFormItem', 'el.form.blur', [this.fileList]);
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
        key,
        success_action_status: '200' // 让服务端返回200,不然，默认会返回204
      };
    },
    handleReplace(oldFile, newFile) {
      if (this.multiple) {
        this.replaceUid = oldFile.uid;
      }
      return this.beforeUpload(newFile);
    },
    handleRemove(file) {
      if (this.multiple) {
        let idx = this.fileUidIdxMap[file.uid];
        if (idx >= 0) {
          this.fileList.splice(idx, 1);
        }
      } else {
        this.fileList = [];
      }
      this.$emit('input', this.fileList);
    },
    handleAbort(file) {
      let idx = this.fileUidIdxMap[file.uid];
      if (idx >= 0) {
        this.$refs.replaceUploader[idx].abort(file);
      }
      this.$refs.uploader.abort(file);
      this.handleRemove(file);
    }
  }
};
</script>

