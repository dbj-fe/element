<script>
  import bus from '../../bus';
  import { tintColor } from '../../color.js';
  import { ACTION_USER_CONFIG_UPDATE } from '../../components/theme/constant.js';
  const varMap = {
    'primary': '$--color-primary',
    'success': '$--color-success',
    'warning': '$--color-warning',
    'danger': '$--color-danger',
    'info': '$--color-info',
    'white': '$--color-white',
    'black': '$--color-black',
    'textPrimary': '$--color-text-primary',
    'textRegular': '$--color-text-regular',
    'textSecondary': '$--color-text-secondary',
    'textPlaceholder': '$--color-text-placeholder',
    'borderBase': '$--border-color-base',
    'borderLight': '$--border-color-light',
    'borderLighter': '$--border-color-lighter',
    'borderExtraLight': '$--border-color-extra-light'
  };
  const original = {
    primary: '#FFA800',
    primaryDisabledText: "#FFEECC",
    primaryDisabled: "#FFCB66",
    primaryHover: "#FFBB33",
    primaryClick: "#FA9200",
    primary2: '#19C370',
    primary2DisabledText: "#E3F7EA",
    primary2Disabled: "#BFDBAC",
    primary2Hover: "#59CEBA",
    primary2Click: "#00BB56",
    success: '#00BF53',
    warning: '#FF6A1E',
    danger: '#FF333A',
    info: '#999999',
    background: '#F0F0F0',
    background2: '#F5F5F5',
    background3: '#FAFAFA',
    white: '#FFFFFF',
    black: '#000000',
    textPrimary: '#333333',
    textRegular: '#666666',
    textSecondary: '#999999',
    textPlaceholder: '#CCCCCC',
    borderBase: '#E6E6E6',
    borderLight: '#F2F2F2',
    borderLighter: '#EBEEF5',
    borderExtraLight: '#F2F6FC'
  }
  export default {
    created() {
      bus.$on(ACTION_USER_CONFIG_UPDATE, this.setGlobal);
    },
    mounted() {
      this.setGlobal();
    },
    methods: {
      tintColor(color, tint) {
        return tintColor(color, tint);
      },
      setGlobal() {
        if (window.userThemeConfig) {
          this.global = window.userThemeConfig.global;
        }
      }
    },
    data() {
      return {
        global: {},
        primary: '',
        primaryDisabledText: "",
        primaryDisabled: "",
        primaryHover: "",
        primaryClick: "",
        primary2: '',
        primary2DisabledText: "",
        primary2Disabled: "",
        primary2Hover: "",
        primary2Click: "",
        success: '',
        warning: '',
        danger: '',
        info: '',
        white: '',
        black: '',
        textPrimary: '',
        textRegular: '',
        textSecondary: '',
        textPlaceholder: '',
        borderBase: '',
        borderLight: '',
        borderLighter: '',
        borderExtraLight: ''
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          Object.keys(original).forEach((o) => {
            if (value[varMap[o]]) {
              this[o] = value[varMap[o]]
            } else {
              this[o] = original[o]
            }
          });
        }
      }
    },
  }
</script>

## Color 色彩

Element 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

### 主色

Element 主要品牌颜色是鲜艳、友好的蓝色。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primary }"
      >Primary Color<div class="value">{{primary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primaryHover }"
      >Primary Color Hover<div class="value">{{primaryHover}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primaryClick }"
      >Primary Color Click<div class="value">{{primaryClick}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primaryDisabled }"
      >Primary Color Disabled<div class="value">{{primaryDisabled}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primaryDisabledText, color: '#333' }"
      >Primary Color Disabled Text<div class="value">{{primaryDisabledText}}</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primary2 }"
      >Primary Color<div class="value">{{primary2}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primary2Hover }"
      >Primary Color Hover<div class="value">{{primary2Hover}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primary2Click }"
      >Primary Color Click<div class="value">{{primary2Click}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primary2Disabled }"
      >Primary Color Disabled<div class="value">{{primary2Disabled}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: primary2DisabledText, color: '#333' }"
      >Primary Color Disabled Text<div class="value">{{primary2DisabledText}}</div></div>
    </div>
  </el-col>
  </el-col>
</el-row>

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: success }"
    >Success<div class="value">{{success}}</div>
      <!-- <div
        class="bg-color-sub"
      >
        <div
          class="bg-success-sub-item"
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor(success, (key + 8) / 10) }"
            >
        </div>
      </div> -->
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: warning }"
    >Warning<div class="value">{{warning}}</div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: danger }"
    >Danger<div class="value">{{danger}}</div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: info }"
    >Info<div class="value">{{info}}</div>
    </div>
  </el-col>
</el-row>

### 中性色

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textPrimary }"
      >主要文字<div class="value">{{textPrimary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textRegular }"
      >
      次要文字<div class="value">{{textRegular}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textSecondary }"
      >辅助文字<div class="value">{{textSecondary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textPlaceholder }"
      >提示/禁用文字<div class="value">{{textPlaceholder}}</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div
      class="demo-color-box demo-color-box-other"
      :style="{ background: black }"
      >基础黑色<div class="value">{{black}}</div></div>
      <div
      class="demo-color-box demo-color-box-other"
      :style="{ background: white, color: '#303133', border: '1px solid #e6e6e6' }"
      >基础白色<div class="value">{{white}}</div></div>
      <div class="demo-color-box demo-color-box-other bg-transparent">透明<div class="value">Transparent</div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div
      class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: background }"
      >背景色1<div class="value">{{background}}</div></div>
      <div
      class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: background2 }"
      >背景色2<div class="value">{{background2}}</div></div>
      <div
      class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: background3 }"
      >背景色3<div class="value">{{background3}}</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderBase }"
      >按钮、下拉框边框/深色分割线<div class="value">{{borderBase}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderLight }"
      >卡片边框/table分割线<div class="value">{{borderLight}}</div></div>
    </div>
  </el-col>
</el-row>
