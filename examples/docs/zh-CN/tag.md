## Tag 标签

用于标记和选择。

### 基础用法

:::demo 由`type`属性来选择tag的类型，也可以通过`color`属性来自定义标签颜色，除了默认的主色外，还有`green`和`gray`两个内置的颜色。

```html
<p>
  <el-tag>普通标签</el-tag>
  <el-tag color="green">普通标签</el-tag>
  <el-tag color="gray">普通标签</el-tag>
</p>
<p>
  <el-tag type="primary">主要标签</el-tag>
  <el-tag type="primary" color="green">主要标签</el-tag>
  <el-tag type="primary" color="gray">主要标签</el-tag>
</p>
<p>
  <el-tag type="secondary">次要标签</el-tag>
  <el-tag type="secondary" color="green">次要标签</el-tag>
  <el-tag type="secondary" color="gray">次要标签</el-tag>
</p>
```
:::

### 自定义颜色

:::demo 通过`color`属性传入具体的色值来自定义标签颜色。

```html
<p>
  <el-tag color="#FF6A1E">普通标签</el-tag>
  <el-tag color="#FF333A">普通标签</el-tag>
  <el-tag color="#00bf53">普通标签</el-tag>
</p>
<p>
  <el-tag type="primary" color="#FF6A1E">主要标签</el-tag>
  <el-tag type="primary" color="#FF333A">主要标签</el-tag>
  <el-tag type="primary" color="#00bf53">主要标签<i class="el-icon-message-solid"></i></el-tag>
</p>
<p>
  <el-tag type="secondary" color="#FF6A1E">次要标签</el-tag>
  <el-tag type="secondary" color="#FF333A">次要标签</el-tag>
  <el-tag type="secondary" color="#00bf53">次要标签</el-tag>
</p>
```
:::

### 角标

:::demo 设置`corner`属性为`true`即可定义标签为角标。

```html
<p>
  <el-tag corner>分享<i class="el-icon-share"></i></el-tag>
  <el-tag color="green" corner>普标签</el-tag>
  <el-tag color="gray" corner>普标签</el-tag>
  <el-tag color="#FF333A" corner>普标签</el-tag>
</p>
<p>
  <el-tag type="secondary" corner>次标签</el-tag>
  <el-tag type="secondary" color="green" corner>次标签</el-tag>
  <el-tag type="secondary" color="gray" corner>次标签</el-tag>
  <el-tag type="secondary" color="#FF333A" corner>次标签</el-tag>
</p>
```
:::

### 可移除标签

:::demo 设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，true 为关闭。

```html
<el-tag
  v-for="tag in tags"
  :key="tag.name"
  closable
  :type="tag.type">
  {{tag.name}}
</el-tag>

<script>
  export default {
    data() {
      return {
        tags: [
          { name: '普通标签', type: '' },
          { name: '主要标签', type: 'primary' },
          { name: '次要标签', type: 'secondary' }
        ]
      };
    }
  }
</script>
```
:::

### 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现

:::demo
```html
<el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
  export default {
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 类型 | string | primary/secondary | — |
| color | 主题色 | string | green/gray/具体色值 | — |
| corner | 是否是角标 | boolean | — | false |
| closable | 是否可关闭 | boolean | — | false |
| disable-transitions | 是否禁用渐变动画 | boolean | — | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 点击 Tag 时触发的事件 | — |
| close | 关闭 Tag 时触发的事件 | — |