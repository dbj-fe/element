## Image 图片
图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等

### 基础用法

:::demo 可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。
```html
<div class="demo-image">
  <div class="block" v-for="fit in fits" :key="fit">
    <span class="demonstration">{{ fit }}</span>
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :fit="fit"></el-image>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'http://mvfurniture.dabanjia.com/Admin_4_1495528721494_0.jpg'
      }
    }
  }
</script>
```
:::

### 图片尺寸

:::demo 图片组件提供了四种标准尺寸，通过size属性设置，取值有large、medium、small、mini。
```html
<div class="demo-image">
  <div>
    <el-image
      src="http://mvfurniture.dabanjia.com/Admin_4_1495528721494_0.jpg"
      size="large"></el-image>
    <span class="demonstration">large 480px*480px</span>
  </div>
  <div>
    <el-image
      src="http://mvfurniture.dabanjia.com/Admin_4_1495528721494_0.jpg"
      size="medium"></el-image>
    <span class="demonstration">medium 224px*224px</span>
  </div>
  <div>
    <el-image
      src="http://mvfurniture.dabanjia.com/Admin_4_1495528721494_0.jpg"
      size="small"></el-image>
    <span class="demonstration">small 160px*160px</span>
  </div>
  <div>
    <el-image
      src="http://mvfurniture.dabanjia.com/Admin_4_1495528721494_0.jpg"
      size="mini"></el-image>
    <span class="demonstration">mini 48px*48px</span>
  </div>
</div>

```
:::


### 占位内容

:::demo 可通过`slot = placeholder`可自定义占位内容
```html
<div class="demo-image__placeholder">
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image :src="src"></el-image>
  </div>
  <div class="block">
    <span class="demonstration">自定义</span>
    <el-image :src="src">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      }
    }
  }
</script>
```
:::

### 默认状态

:::demo 当图片的src为空时，显示默认状态
```html
<div class="demo-image__error">
  <div class="block">
    <el-image src=""></el-image>
  </div>
</div>
```
:::

### 加载失败

:::demo 可通过`slot = error`可自定义加载失败内容
```html
<div class="demo-image__error">
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image src="aaaa"></el-image>
  </div>
  <div class="block">
    <span class="demonstration">自定义</span>
    <el-image src="aaaa">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</div>
```
:::

### 懒加载

:::demo 可通过`lazy`开启懒加载功能，当图片滚动到可视范围内才会加载。可通过`scroll-container`来设置滚动容器，若未定义，则为最近一个`overflow`值为`auto`或`scroll`的父元素。
```html
<div class="demo-image__lazy">
  <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
</div>

<script>
  export default {
    data() {
      return {
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| src | 图片源，同原生 | string | — | - |
| size | 图片标准尺寸 | string | large / medium / small / mini | - |
| fit | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string | fill / contain / cover / none / scale-down | scale-down |
| alt | 原生 alt | string | - | - |
| referrer-policy | 原生 referrerPolicy | string | - | - |
| lazy | 是否开启懒加载 | boolean | — | false |
| ossCompress | 是否开启oss的图片压缩，需要设置size才生效 | boolean | — | true |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | string / HTMLElement | — | 最近一个 overflow 值为 auto 或 scroll 的父元素 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |

### Slots
| 名称    | 说明         |
|---------|-------------|
| placeholder | 图片未加载的占位内容 |
| default | 图片src为空时的默认内容 |
| error | 加载失败的内容 |


