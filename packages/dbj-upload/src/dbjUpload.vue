<template>
  <div
    class="dbj-upload"
    :class="{
      'dbj-upload--multiple' : multiple,
      'dbj-upload--single' : !multiple,
      'dbj-upload--has-files' : fileList2.length
    }"
  >
    <el-upload
      ref="uploader"
      class="dbj-upload__trigger"
      :action="uploadServerUrl"
      :data="getUploadData"
      :before-upload="beforeUpload"
      :on-input-change="inputChange"
      :on-progress="uploadProgress"
      :on-success="uploadSuccess"
      :show-file-list="false"
      :disabled="disabled"
      :accept="accept"
      :multiple="multiple"
    >
    <div :class="{'dbj-upload__cnt':true,'is-disabled':disabled}">
      <slot>
        <div class="dbj-upload__button">
          <i class="dbj-icon-upload" />
          <span>上传文件</span>
        </div>
      </slot>
    </div>
    </el-upload>
    <div
      v-if="tip"
      class="dbj-upload__tip"
    >
      {{ tip }}
    </div>
    <ul class="dbj-upload__list">
      <li
        v-for="(file,index) in fileList2"
        :key="file.uid"
        class="dbj-upload-file"
        :class="{'dbj-upload-file--complete': file.sizeLoaded === file.size}"
      >
        <slot
          name="infos"
          :file="file"
        />
        <div :class="{'dbj-upload-file__list-infos':scopedSlotKeys.includes('infos')}">
          <div class="dbj-upload-file__top">
            <span class="dbj-upload-file__info">
              <div class="dbj-upload-file__main">
                <label class="dbj-upload-file__content">
                  <span
                    :title="file.name"
                    class="dbj-upload-file__name-wrapper"
                  >
                    <span class="dbj-upload-file__name">{{ file.prefix }}</span>
                    <span
                      v-if="file.suffix"
                      class="dbj-upload-file__suffix"
                    >
                      {{ file.suffix }}
                    </span>
                  </span>
                  <i class="dbj-upload-file__success-icon dbj-icon-success" />
                </label>
                <span
                  v-if="file.size > 0"
                  class="dbj-upload-file__size"
                >
                  <span class="dbj-upload-file__current">{{ formatFileSize(file.sizeLoaded) }}</span>
                  <span class="dbj-upload-file__total">/{{ formatFileSize(file.size) }}</span>
                </span>
                <span
                  v-if="file.isError"
                  class="dbj-upload-file__error-message"
                >{{file.errMsg}}</span>

              </div>
            </span>
            <i
              :class="{'dbj-upload-file__clear-icon':true, 'dbj-icon-circle-close':true,'dbj-upload-file__no-progress':file.isError}"
              @click="handleRemove(file,index)"
            />
            <el-upload
              v-if="!file.isError"
              ref="replaceUploader"
              class="dbj-upload-file__replace-icon"
              :action="uploadServerUrl"
              :data="getUploadData"
              :before-upload="newFile => handleReplace(file, newFile,index)"
              :on-progress="uploadProgress"
              :on-success="uploadSuccess"
              :show-file-list="false"
              :accept="accept"
            >
              <i class="dbj-icon-replace-outline" />
            </el-upload>
          </div>
          <div
            v-if="!file.isError"
            class="dbj-upload-file__bottom"
          >
            <span class="dbj-upload-file__progress">
              <span
                class="dbj-upload-file__progress-bar"
                :style="{width: file.sizeLoaded*100/file.size + '%'}"
              />
            </span>
            <i
              class="dbj-upload-file__abort-icon dbj-icon-circle-close"
              @click="handleAbort(file,index)"
            />
          </div>
        </div>
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
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Array, String],
      default: function() {
        return this.multiple ? [] : '';
      }
    },
    md5Value: {
      type: String,
      default: ''
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
    tipMsg: {
      type: Boolean,
      default: true
    },
    customRules: {
      type: Function,
      validator: function(value) {
        return !!value && (typeof value === 'object' || typeof value === 'function');
      },
      default: function() {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
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
      uploadServerUrl: '',
      accessServerUrl: ''
    };
  },
  computed: {
    fileUidIdxMap() {
      let map = {};
      // 默认按文件的uid进行标记，若已存在列表按数组索引进行标记
      this.fileList.forEach((item, index) => {
        let key = item.uid || `uid_${index}`;
        map[key] = index;
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
    },
    scopedSlotKeys() {
      return Object.keys(this.$scopedSlots);
    }

  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.multiple) {
          let list = (val || []).filter(item => item.url || item.name);
          this.fileList = list.map(file => {
            let name = file.name;
            if (file.url && !file.name) {
              name = getFileName(file.url);
            }
            return {
              ...file,
              name
            };
          });
        } else {
          if (val) {
            this.fileList = [
              {
                url: val,
                name: getFileName(val),
                md5: this.md5 ? this.md5Value : ''
              }
            ];
          } else {
            this.fileList = [];
          }
        }
      }
    }
  },
  methods: {
    showErrMsg(errMsg, currentFile) {
      if (this.tipMsg) {
        this.$emit('error', errMsg, currentFile);
      } else {
        currentFile.errMsg = errMsg;
        currentFile.isError = true;
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
      }
      this.replaceUid = 0;
    },
    beforeUpload(file) {
      let currentFile = {
        name: file.name,
        size: file.size,
        sizeLoaded: 0,
        uid: file.uid,
        errMsg: file.errMsg || '',
        isError: file.isError || false,
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
            this.showErrMsg('文件格式不对', currentFile);
            reject();
            return;
          }
        } else {
          if (this.type === 'image') {
            if (!/(\.jpg|\.png|\.bmp)$/i.test(currentFile.name)) {
              this.showErrMsg('文件格式不对', currentFile);
              reject();
              return;
            }
          }
        }
        if (this.maxSize) {
          if (currentFile.size > this.maxSize) {
            this.showErrMsg('文件过大', currentFile);
            reject();
            return;
          }
        }
        // 自定义校验规则,未定义时默认通过
        let promiseFn = this.customRules(file);
        if (promiseFn && promiseFn.then) {
          promiseFn
            .then(() => {
              return this.requestToken(this.type.toUpperCase())
                .then(res => {
                  let { data } = res;
                  currentFile.OSSAccessKeyId = data.accessid;
                  currentFile.policy = data.policy;
                  currentFile.signature = data.signature;
                  currentFile.key = data.dir + '/' + currentFile.fileKey;
                  this.uploadServerUrl = data.host;
                  this.accessServerUrl = data.ossUrl;
                  return Promise.resolve(this.uploadServerUrl);
                })
                .catch(e => {
                  return Promise.reject('获取上传token失败');
                });
            })
            .then(res => {
              if (this.multiple) {
                let idx = this.fileUidIdxMap[this.replaceUid];
                currentFile.isError = false;
                if (idx >= 0) {
                  this.fileList.splice(idx, 1, currentFile);
                  this.fileList[idx];
                } else {
                  this.fileList.push(currentFile);
                }
              } else {
                this.fileList = [currentFile];
              }
              resolve();
            })
            .catch(e => {
              this.showErrMsg(e.errMsg, currentFile);
            });
        } else {
          console.error('customRules Must return a promise');
        }
      });
    },
    inputChange(rawFiles) {
      this.$emit('inner-input-change', rawFiles);
    },
    uploadProgress(event, file, fileList) {
      let { percent = 0, total, loaded } = event;
      this.fileList[this.fileUidIdxMap[file.uid]].sizeLoaded = Math.min(
        loaded,
        file.size
      );
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
          if (this.multiple) {
            this.$emit('input', this.fileList);
            this.$emit('success', currentFile, this.fileList);
            this.dispatch('ElFormItem', 'el.form.blur', [this.fileList]);
            this.handleComplete();
          } else {
            this.$emit('input', currentFile.url);
            this.$emit('update:md5Value', md5);
            this.$emit('success', currentFile, this.fileList);
            this.dispatch('ElFormItem', 'el.form.blur', [currentFile.url]);
          }
        });
      } else {
        if (this.multiple) {
          this.$emit('input', this.fileList);
          this.$emit('success', currentFile, this.fileList);
          this.dispatch('ElFormItem', 'el.form.blur', [this.fileList]);
          this.handleComplete();
        } else {
          this.$emit('input', currentFile.url);
          this.$emit('success', currentFile, this.fileList);
          this.dispatch('ElFormItem', 'el.form.blur', [currentFile.url]);
        }
      }
    },
    handleComplete() {
      let isComplete = this.fileList.every(
        file => file.sizeLoaded === file.size
      );
      if (isComplete) {
        this.$emit('complete', this.fileList);
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
    handleReplace(oldFile, newFile, index) {
      if (this.multiple) {
        this.replaceUid = oldFile.uid || `uid_${index}`;
      }
      return this.beforeUpload(newFile);
    },
    handleRemove(file, index) {
      if (this.multiple) {
        let idx = this.fileUidIdxMap[file.uid || `uid_${index}`];
        if (idx >= 0) {
          this.fileList.splice(idx, 1);
        }
      } else {
        this.fileList = [];
      }
      if (this.multiple) {
        this.$emit('input', this.fileList);
        this.$emit('clear', this.fileList);
      } else {
        this.$emit('input', '');
        this.$emit('clear');
        if (this.md5) {
          this.$emit('update:md5Value', '');
        }
      }
    },
    handleAbort(file, index) {
      let idx = this.fileUidIdxMap[file.uid || `uid_${index}`];
      if (idx >= 0) {
        this.$refs.replaceUploader[idx].abort(file);
      }
      this.$refs.uploader.abort(file);
      this.handleRemove(file);
    },
    handleAbortAll() {
      this.$refs.uploader.abort();
      this.fileList.forEach((file, idx) => {
        this.$refs.replaceUploader[idx].abort();
      });
      this.fileList = [];
      if (this.multiple) {
        this.$emit('input', this.fileList);
      } else {
        this.$emit('input', '');
        if (this.md5) {
          this.$emit('update:md5Value', '');
        }
      }
    },
    triggerClick() {
      this.$refs.uploader.$refs['upload-inner'].handleClick();
    }
  }
};
</script>

