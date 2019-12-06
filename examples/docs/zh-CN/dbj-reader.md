## DbjReader 文件内容读取

自定义文件内容组件


### 基本用法

:::demo 使用`dbj-reader`组件实现文件内容读取。
```html
<dbj-reader
  file-type="json"
  :max-size="2*1024"
  tip="仅支持.json格式文件，小于2KB"
  v-model="fileContent"
  @error="handleError"
/>
<script>
  export default {
    data() {
      return {
        fileContent: ''
      };
    },
    methods: {
      handleError(msg, file) {
        console.log(msg, file);
        this.$message.error(msg);
      }
    }
  }
</script>
```
:::

### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 文件内容 | string | — | — |
| file-type | 支持的文件文件后缀，多个用逗号分割 | string | — | — |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string | — | — |
| max-size | 支持的文件最大大小，超出报错，为0时无限制 | number | — | 0 |
| tip | 上传提示文字 | string | — | — |

### Events
| 事件名称      | 说明          | 回调参数 |
|----------- |-------------- | -- |
| error | 超出大小或文件类型不匹配时触发 | (errMsg: string, file: File) |

### Slot
| name | 说明 |
|------|--------|
| — | 触发文件选择框的内容 |
