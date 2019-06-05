## DbjUpload 上传

自定义上传组件，符合打扮家设计规范

### 单文件上传

:::demo 通过 slot 你可以传入自定义的上传按钮类型，tip 传入你的提示
```html
<dbj-upload
  type="resource"
  file-type="jpg,png"
  tip="仅支持.jpg和.png格式文件，小于1MB"
  :max-size="1*1024*1024"
  :request-token="getUploadToken"
  @error="handleError"
>
</dbj-upload>
<script>
  export default {
    data() {
      return {
      };
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

### 多文件上传

:::demo 指定multiple参数为true即可
```html
<dbj-upload
  type="resource"
  file-type="jpg,png"
  tip="仅支持.jpg和.png格式文件，小于1MB"
  :max-size="1*1024*1024"
  multiple
  :request-token="getUploadToken"
  @error="handleError"
>
</dbj-upload>
<script>
  export default {
    data() {
      return {
      };
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

### 文件上传在表单中使用

:::demo 可通过v-model传递原有文件，参数类型是数组，上传成功后更改传递的数组
```html
<el-form ref="form" :model="form" :rules="formRules" label-width="80px" :style="{width: '542px'}">
  <el-form-item label="名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="文件上传" prop="fileList">
    <dbj-upload
      type="resource"
      v-model="form.fileList"
      file-type="jpg,png"
      tip="仅支持.jpg和.png格式文件，小于1MB"
      :max-size="1*1024*1024"
      :request-token="getUploadToken"
      @error="handleError"
    >
    </dbj-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      const validateFileList = (rule, value, callback) => {
        if (!value.length) {
          callback(new Error('请上传文件'));
        } else {
          callback();
        }
      }
      return {
        form: {
          name: '',
          fileList: []
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          fileList: [
            { required: true, validator: validateFileList }
          ]
        }
      };
    },
    mounted() {
      // 模拟获取数据
      setTimeout(() => {
        this.form.name = 'test';
        this.form.fileList = [
          {
            url: 'https://ali-res-test.dabanjia.com/res/20190528/1559019538585_0346$bg_dl_vr.jpg'
          }
        ]
      }, 100);
    },
    methods: {
      getUploadToken(type) {
        return require("../../service").getUploadToken(type);
      },
      handleError(msg, file) {
        console.log(msg, file);
        this.$message.error(msg);
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.form);
          }
        })
      }
    }
  }
</script>
```
:::

### 文件夹上传

:::demo 使用`dbj-dir-upload`组件实现文件夹上传。
```html
<dbj-dir-upload
  tip="每个模型需上传小于200MB的.pak和.mwasset格式文件，效果优化参数.json文件选填，小于2KB"
  :request-token="getUploadToken"
  v-model="fileList"
  @error="handleError"
>
</dbj-dir-upload>
<script>
  export default {
    data() {
      return {
        fileList: [
          {
            url: 'https://ali-res-test.dabanjia.com/res/20190604/文件资源$1559620404935_5569$DBJ_3_1.pak',
            md5Value: 'c869ad409fffc7097e94c5dfda4c165b',
            md5: true,
            fileType: 'pak',
            tip: '仅支持.pak格式文件，小于200MB'
          },
          {
            url: 'https://ali-res-test.dabanjia.com/res/20190604/文件资源$1559620404931_3196$DBJ_3_1_bak.mwasset',
            md5Value: '4f00ce3fff29fe935b72274bb95b7ecf',
            md5: true,
            fileType: 'mwasset',
            tip: '仅支持.mwasset格式文件，小于200MB'
          },
          {
            read: true,
            content: 'test',
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
      }
    }
  }
</script>
```
:::

### 文件内容读取

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
| action | 必选参数，上传的地址 | string | — | — |
| headers | 设置上传的请求头部 | object | — | — |
| multiple | 是否支持多选文件 | boolean | — | — |
| data | 上传时附带的额外参数 | object | — | — |
| name | 上传的文件字段名 | string | — | file |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| show-file-list | 是否显示已上传文件列表 | boolean | — | true |
| drag | 是否启用拖拽上传 | boolean | — | false |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效）| string | — | — |
| on-preview | 点击文件列表中已上传的文件时的钩子 | function(file) | — | — |
| on-remove | 文件列表移除文件时的钩子 | function(file, fileList) | — | — |
| on-success | 文件上传成功时的钩子 | function(response, file, fileList) | — | — |
| on-error | 文件上传失败时的钩子 | function(err, file, fileList) | — | — |
| on-progress | 文件上传时的钩子 | function(event, file, fileList) | — | — |
| on-change | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 | function(file, fileList) | — | — |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 | function(file) | — | — |
| before-remove | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。| function(file, fileList) | — | — |
| list-type | 文件列表的类型 | string | text/picture/picture-card | text |
| auto-upload | 是否在选取文件后立即进行上传 | boolean | — | true |
| file-list | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] | array | — | [] |
| http-request | 覆盖默认的上传行为，可以自定义上传的实现 | function | — | — |
| disabled | 是否禁用 | boolean | — | false |
| limit | 最大允许上传个数 |  number | — | — |
| on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | — | - |

### Slot
| name | 说明 |
|------|--------|
| trigger | 触发文件选择框的内容 |
| tip | 提示说明文字 |

### Methods
| 方法名      | 说明          | 参数 |
|----------- |-------------- | -- |
| clearFiles | 清空已上传的文件列表（该方法不支持在 before-upload 中调用） | — |
| abort      | 取消上传请求    | （ file: fileList 中的 file 对象 ） |
| submit     | 手动上传文件列表 |  —                                |
