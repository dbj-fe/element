<template>
  <el-upload
    class="dbj-upload-image"
    :class="{
      'dbj-upload-image--replace': isReplace,
      'dbj-upload-image--loading': loading
    }"
    :action="uploadServerUrl"
    :data="uploadData"
    :before-upload="beforeUpload"
    :on-progress="uploadProgress"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :show-file-list="false"
    :accept="accept"
  >
    <div class="dbj-upload-image__content">
      <img v-if="url" :src="thumbnailUrl" class="dbj-upload-image__img" @load="handleImgLoad" @error="handleImgError"/>
      <div class="dbj-upload-image__mask">
        <i class="dbj-upload-image__icon" :class="[isReplace ? 'dbj-icon-replace' : 'dbj-icon-plus']"></i>
        <div class="dbj-upload-image__title">{{ btnText2 }}</div>
        <div v-if="tip" class="dbj-upload-image__tip">{{ tip }}</div>
        <div v-if="loading" class="dbj-upload-image__loading">{{ isReplace ? '替换中' : '上传中' }}<span class="dot">…</span></div>
      </div>
    </div>
  </el-upload>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter';
import ElUpload from 'element-ui/packages/upload';
import ElImage from 'element-ui/packages/image';
import { getFileKey } from './util';
import { Promise } from 'q';
export default {
  name: 'DbjUploadImage',
  mixins: [emitter],
  components: {
    ElUpload,
    ElImage
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: '图片'
    },
    fileType: {
      type: String,
      default: 'jpg,png,bmp'
    },
    accept: {
      type: String,
      default: 'image/jpg,image/jpeg,image/png,image/bmp'
    },
    maxSize: {
      type: Number,
      default: 0
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
    }
  },
  data() {
    return {
      loading: false,
      isReplace: false,
      url: '',
      fileKey: '',
      uploadServerUrl: 'https://dbj-test.oss-cn-beijing.aliyuncs.com',
      accessServerUrl: '',
      uploadData: {
        OSSAccessKeyId: '',
        policy: '',
        signature: '',
        success_action_status: '200', // 让服务端返回200,不然，默认会返回204
        key: ''
      }
    };
  },
  computed: {
    btnText2() {
      return (this.isReplace ? '替换' : '上传') + this.btnText;
    },
    thumbnailUrl() {
      return this.url ? this.url + '?x-oss-process=image/resize,m_lfit,h_448,w_448' : '';
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          if (val !== this.url) {
            this.isReplace = true;
          }
        } else {
          this.isReplace = false;
        }
        this.url = val;
      }
    }
  },
  methods: {
    beforeUpload(file) {
      this.loading = true;
      this.fileKey = getFileKey(file.name);
      return new Promise((resolve, reject) => {
        if (this.fileType) {
          let reg = new RegExp('\\.' + this.fileType + '$', 'i');
          if (this.fileType.indexOf(',') >= 0) {
            let arr = this.fileType.split(',');
            arr = arr.map(item => '\\.' + item);
            reg = new RegExp('(' + arr.join('|') + ')$', 'i');
          }
          if (!reg.test(file.name)) {
            this.$emit('error', '文件格式不对', file);
            this.loading = false;
            reject();
            return;
          }
        }
        if (this.maxSize) {
          if (file.size > this.maxSize) {
            this.$emit('error', '文件过大', file);
            this.loading = false;
            reject();
            return;
          }
        }
        this.requestToken('IMAGE')
          .then(res => {
            let { data } = res;
            this.uploadData.OSSAccessKeyId = data.accessid;
            this.uploadData.policy = data.policy;
            this.uploadData.signature = data.signature;
            this.uploadData.key = decodeURIComponent(data.dir + '/' + this.fileKey); // 阿里云默认会进行一次encode，所以上传时不要encode
            this.uploadServerUrl = data.host;
            this.accessServerUrl = data.ossUrl;
            resolve(this.uploadServerUrl);
          })
          .catch(e => {
            this.loading = false;
            reject();
          });
      });
    },
    uploadProgress(event, file, fileList) {
      let { percent = 0, total, loaded } = event;
      this.$emit('progress', percent, total, loaded);
    },
    uploadSuccess(res, file, fileList) {
      this.url = this.accessServerUrl + this.fileKey;
      this.$emit('success', this.url);
      this.$emit('input', this.url);
      this.dispatch('ElFormItem', 'el.form.blur', [this.url]);
    },
    uploadError(err, file, fileList) {
      this.loading = false;
      console.error(err);
      this.$emit('error', this.btnText + '上传失败！', file);
    },
    handleImgLoad() {
      this.loading = false;
      this.isReplace = true;
    },
    handleImgError() {
      this.loading = false;
      this.isReplace = true;
      this.$emit('error', this.btnText + '加载失败！');
    }
  }
};
</script>
