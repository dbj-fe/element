<template>
  <div
    v-if="isSupport"
    class="dbj-reader"
    :class="{
      'dbj-reader--uploaded': value
    }"
  >
    <label
      class="dbj-reader__button-wrapper"
      :for="`fileReaderInput_${uid}`">
      <input
        :id="`fileReaderInput_${uid}`"
        ref="input"
        type="file"
        accept="accept"
        class="dbj-reader__input"
        @change="handleFileChange"
      >
      <slot>
        <span
          class="dbj-reader__button"
        >
          <i class="dbj-icon-upload" />
          <span>上传文件</span>
        </span>
      </slot>
    </label>
    <div
      v-if="tip"
      class="dbj-reader__tip"
    >
      {{ tip }}
    </div>
    <div class="dbj-reader__display">
      <div class="dbj-reader__info">
        <span>文件已上传</span>
        <i class="dbj-icon-success" />
      </div>
      <i @click="handleClear" class="dbj-icon-circle-close"/>
      <i @click="handleReplace" class="dbj-icon-replace"/>
    </div>
  </div>
  <div
    v-else
    class="dbj-reader--not-support"
  >
    您的浏览器版本太低，建议使用Chrome浏览器。
  </div>
</template>

<script>
let uid = 1;
export default {
  name: 'DbjReader',
  props: {
    value: {
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
    }
  },
  data() {
    return {
      uid: uid++
    };
  },
  computed: {
    isSupport() {
      return typeof FileReader === 'function';
    }
  },
  methods: {
    handleFileChange(e) {
      let instance = this;
      if (e.target.files && e.target.files.length) {
        let file = e.target.files[0];
        if (file) {
          if (this.fileType) {
            let reg = new RegExp('\\.' + this.fileType + '$', 'i');
            if (this.fileType.indexOf(',') >= 0) {
              let arr = this.fileType.split(',');
              arr = arr.map(item => '\\.' + item);
              reg = new RegExp('(' + arr.join('|') + ')$', 'i');
            }
            if (!reg.test(file.name)) {
              this.$emit('error', '文件格式不对', file);
              return;
            }
          }
          if (this.maxSize) {
            if (file.size > this.maxSize) {
              this.$emit('error', '文件过大', file);
              return;
            }
          }
          let reader = new FileReader();
          reader.readAsText(file);
          reader.onload = function(progress) {
            instance.$emit('input', this.result);
          };
        }
      }
    },
    handleClear() {
      this.$refs.input.value = null;
      this.$emit('input', '');
    },
    handleReplace() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    }
  }
};
</script>


