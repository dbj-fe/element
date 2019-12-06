## DbjEmpty 空页面

打扮家空页面

### 基本使用

:::demo `title`属性指定空页面主提示，`tip`属性指定空页面的提示具体描述
```html
<dbj-empty
  title="还没有内容呢"
  tip="这里是解决方案描述"
/>
```
:::

### 自定义提示描述

:::demo 也通过`tip`的slot更改提示内容
```html
<dbj-empty
  title="还没有内容呢"
>
  <div slot="tip" class="dbj-empty__tip">
    这里是解决方案描述。<el-button type="text" size="small">文字链</el-button>
  </div>
</dbj-empty>
```
:::

### 自定义提示按钮

:::demo 也通过`tip`的slot更改提示内容
```html
<dbj-empty
  title="还没有内容呢"
>
  <el-button slot="tip" type="primary">主要按钮</el-button>
</dbj-empty>
```
:::

### 无提示描述

:::demo 不指定`tip`属性值且不指定`tip`的slot时不显示提示描述
```html
<dbj-empty
  title="还没有内容呢"
/>
```
:::

### 无图片

:::demo 不指定`tip`属性值且不指定`tip`的slot时不显示提示描述
```html
<dbj-empty
  title="还没有内容呢"
  tip="这里是解决方案描述"
  no-img
/>
```
:::

### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 主提示文字 | string | — | '没有数据' |
| tip | 提示描述 | string | — | — |
| no-img | 是否不要图片 | boolean | — | false |

### Slot
| name | 说明 |
|------|--------|
| tip | 提示描述 |
| img | 提示图片 |
