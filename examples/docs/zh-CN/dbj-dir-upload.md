## DbjDirUpload 文件夹上传

自定义文件夹上传组件，使用时指定需要上传的文件类型，组件会从文件夹的一级目录下筛选匹配的文件进行上传。

### 基本使用

:::demo 使用`dbj-dir-upload`组件实现文件夹上传。
```html
<dbj-dir-upload
  tip="每个模型需上传小于200MB的.pak和.mwasset格式文件，效果优化参数.json文件选填，小于2KB"
  :request-token="getUploadToken"
  v-model="fileList"
  :filter="fileFilter"
  @error="handleError"
>
</dbj-dir-upload>
<p>
  <el-button @click="print">打印数据</el-button>
</p>
<script>
  export default {
    data() {
      return {
        fileList: [
          {
            url: '',
            md5Value: ''
          },
          {
            url: '',
            md5Value: ''
          },
          {
            content: ''
          }
        ],
        fileFilter: [
          {
            md5: true,
            fileType: 'pak',
            tip: '仅支持.pak格式文件，小于200MB'
          },
          {
            md5: true,
            fileType: 'mwasset',
            tip: '仅支持.mwasset格式文件，小于200MB'
          },
          {
            read: true,
            fileType: 'json',
            tip: '仅支持.json格式文件，小于1MB'
          }
        ]
      };
    },
    methods: {
      getUploadToken(type) {
        return require("../../service").getUploadToken(type);
      },
      handleError(msg, file) {
        console.log(msg, file);
        this.$message.error(msg);
      },
      print() {
        console.log('fileList:', this.fileList);
      }
    }
  }
</script>
```
:::

### 已有数据时替换

:::demo 可以指定url和md5Value数据。
```html
<dbj-dir-upload
  tip="每个模型需上传小于200MB的.pak和.mwasset格式文件，效果优化参数.json文件选填，小于2KB"
  :request-token="getUploadToken"
  v-model="fileList"
  :filter="fileFilter"
  @error="handleError"
>
</dbj-dir-upload>
<script>
  export default {
    data() {
      return {
        fileList: [
          {
            url: '',
            md5Value: ''
          },
          {
            url: '',
            md5Value: ''
          },
          {
            content: ''
          }
        ],
        fileFilter: [
          {
            md5: true,
            fileType: 'pak',
            tip: '仅支持.pak格式文件，小于200MB'
          },
          {
            md5: true,
            fileType: 'mwasset',
            tip: '仅支持.mwasset格式文件，小于200MB'
          },
          {
            read: true,
            fileType: 'json',
            tip: '仅支持.json格式文件，小于1MB'
          }
        ]
      };
    },
    mounted() {
      // 模拟获取数据
      setTimeout(() => {
        this.fileList = [
          {
            url: 'https://ali-res-test.dabanjia.com/res/20190604/文件资源$1559620404935_5569$DBJ_3_1.pak',
            md5Value: 'c869ad409fffc7097e94c5dfda4c165b'
          },
          {
            url: 'https://ali-res-test.dabanjia.com/res/20190604/文件资源$1559620404931_3196$DBJ_3_1_bak.mwasset',
            md5Value: '4f00ce3fff29fe935b72274bb95b7ecf'
          },
          {
            content: 'test'
          }
        ];
      }, 500);
    },
    methods: {
      getUploadToken(type) {
        return require("../../service").getUploadToken(type);
      },
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
| value / v-model | 文件数据，数组每一项的属性见下表,属性含`content`字段时代表文件不做展示，如`json`文件 | array | -| — |
| filter | 过滤器，使用数组时要与value中的项一一对应，数组每一项的属性见下表,为函数时，按照自定义规则对上传文件列表进行过滤,需返回File[] | array / function(files: File[]) | — | — |
| tip | 上传提示文字 | string | — | — |
| show-file-list | 是否显示已上传文件列表 |boolean | — | true |
| request-token | 请求上传文件的token函数，这个参数在项目中统一设置，不需要自己设置 | function(type) | — | — |

### Events
| 事件名称      | 说明          | 回调参数 |
|----------- |-------------- | -- |
| pre-upload | 文件上传前触发 | (files: File[]) |
| complete | 所有文件上传成功时触发 | (fileList: array) |
| error | 文件上传失败时触发 | (errMsg: string, file: File) |

### Slot
| name | 说明 |
|------|--------|
| — | 触发文件选择框的内容 |

### value单个对象的Props
| name | 说明 | 类型 |
|------|-----|------|
| url | 文件地址 | string |
| md5Value | 文件的MD5 | string |
| content | 文件内容（read为true时有效） | string |

### filter单个对象的Props
| name | 说明 | 类型 |
|------|-----|------|
| read | 是否是读取文件内容 | boolean |
| md5 | 上传成功后是否计算MD5值 | boolean |
| fileType | 支持的文件文件后缀，不支持多个 | string |
| maxSize | 支持的文件最大大小，超出报错，为0时无限制 | number |
| tip | 单个文件上传提示文字 | string |
