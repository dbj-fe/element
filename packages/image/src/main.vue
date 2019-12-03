<template>
  <div
    class="el-image"
    :class="{
      ['el-image--' + size] : size
    }"
  >
    <slot v-if="loading" name="placeholder">
      <div class="el-image__placeholder">加载中<span class="dot">…</span></div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="el-image__error">
        <i class="dbj-icon-picture-error"/>
      </div>
    </slot>
    <slot v-else-if="!src" name="default">
      <div class="el-image__default">
        <i class="dbj-icon-picture"/>
      </div>
    </slot>
    <img
      v-else
      class="el-image__inner"
      :src="realSrc"
      :alt="alt"
      :referrerpolicy="referrerPolicy"
      :style="imageStyle"
      :class="{ 'el-image__inner--center': alignCenter }">
  </div>
</template>

<script>
  import Locale from 'element-ui/src/mixins/locale';
  import { on, off, getScrollContainer, isInContainer } from 'element-ui/src/utils/dom';
  import { isString, isHtmlElement } from 'element-ui/src/utils/types';
  import throttle from 'throttle-debounce/throttle';

  const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;

  const ObjectFit = {
    NONE: 'none',
    CONTAIN: 'contain',
    COVER: 'cover',
    FILL: 'fill',
    SCALE_DOWN: 'scale-down'
  };

  const sizeMap = {
    large: {
      width: 480,
      height: 480
    },
    medium: {
      width: 224,
      height: 224
    },
    small: {
      width: 160,
      height: 160
    },
    mini: {
      width: 48,
      height: 48
    }
  };

  export default {
    name: 'ElImage',

    mixins: [Locale],

    props: {
      src: String,
      size: String,
      fit: {
        type: String,
        default: 'scale-down'
      },
      ossCompress: {
        type: Boolean,
        default: true
      },
      lazy: Boolean,
      scrollContainer: {},
      alt: String,
      referrerPolicy: String
    },

    data() {
      return {
        loading: true,
        error: false,
        show: !this.lazy,
        imageWidth: 0,
        imageHeight: 0
      };
    },

    computed: {
      imageStyle() {
        const { fit } = this;
        if (!this.$isServer && fit) {
          return isSupportObjectFit()
            ? { 'object-fit': fit }
            : this.getImageStyle(fit);
        }
        return {};
      },
      alignCenter() {
        return !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
      },
      realSrc() {
        if (this.ossCompress) {
          let size = sizeMap[this.size];
          if (size) {
            if (this.fit === 'scale-down') {
              return this.src + '?x-oss-process=image/resize,m_lfit,h_' + (size.height * 2) + ',w_' + (size.width * 2);
            }
          }
        }
        return this.src;
      }
    },

    watch: {
      src(val) {
        this.show && this.loadImage();
      },
      show(val) {
        val && this.loadImage();
      }
    },

    mounted() {
      if (this.lazy) {
        this.addLazyLoadListener();
      } else {
        this.loadImage();
      }
    },

    beforeDestroy() {
      this.lazy && this.removeLazyLoadListener();
    },

    methods: {
      loadImage() {
        if (this.$isServer) return;

        if (!this.src) {
          this.loading = false;
          this.error = false;
          return;
        }

        // reset status
        this.loading = true;
        this.error = false;

        const img = new Image();
        img.onload = e => this.handleLoad(e, img);
        img.onerror = this.handleError.bind(this);
        img.src = this.src;
      },
      handleLoad(e, img) {
        this.imageWidth = img.width;
        this.imageHeight = img.height;
        this.loading = false;
        this.$emit('load', e);
      },
      handleError(e) {
        this.loading = false;
        this.error = true;
        this.$emit('error', e);
      },
      handleLazyLoad() {
        if (isInContainer(this.$el, this._scrollContainer)) {
          this.show = true;
          this.removeLazyLoadListener();
        }
      },
      addLazyLoadListener() {
        if (this.$isServer) return;

        const { scrollContainer } = this;
        let _scrollContainer = null;

        if (isHtmlElement(scrollContainer)) {
          _scrollContainer = scrollContainer;
        } else if (isString(scrollContainer)) {
          _scrollContainer = document.querySelector(scrollContainer);
        } else {
          _scrollContainer = getScrollContainer(this.$el);
        }

        if (_scrollContainer) {
          this._scrollContainer = _scrollContainer;
          this._lazyLoadHandler = throttle(200, this.handleLazyLoad);
          on(_scrollContainer, 'scroll', this._lazyLoadHandler);
          this.handleLazyLoad();
        }
      },
      removeLazyLoadListener() {
        const { _scrollContainer, _lazyLoadHandler } = this;

        if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return;

        off(_scrollContainer, 'scroll', _lazyLoadHandler);
        this._scrollContainer = null;
        this._lazyLoadHandler = null;
      },
      /**
       * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
       */
      getImageStyle(fit) {
        const { imageWidth, imageHeight } = this;
        const {
          clientWidth: containerWidth,
          clientHeight: containerHeight
        } = this.$el;

        if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

        const vertical = imageWidth / imageHeight < 1;

        if (fit === ObjectFit.SCALE_DOWN) {
          const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
          fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
        }

        switch (fit) {
          case ObjectFit.NONE:
            return { width: 'auto', height: 'auto' };
          case ObjectFit.CONTAIN:
            return vertical ? { width: 'auto' } : { height: 'auto' };
          case ObjectFit.COVER:
            return vertical ? { height: 'auto' } : { width: 'auto' };
          default:
            return {};
        }
      }
    }
  };
</script>
