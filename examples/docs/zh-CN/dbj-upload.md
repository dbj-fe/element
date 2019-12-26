## DbjUpload 文件上传

自定义上传组件，符合打扮家设计规范

### 基本使用

:::demo 可通过 slot 你可以传入自定义的上传按钮类型，`tip`传入你的提示
```html
<dbj-upload
  v-model="url"
  type="resource"
  file-type="jpg,png"
  tip="仅支持.jpg和.png格式文件，小于1MB"
  :max-size="1*1024*1024"
  :request-token="getUploadToken"
  @error="handleError"
>
</dbj-upload>
<p>
  <el-button @click="print">打印数据</el-button>
</p>
<script>
  export default {
    data() {
      return {
        url: ''
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
        console.log('url:', this.url);
      }
    }
  }
</script>
```
:::

### 计算文件MD5

:::demo 指定`md5`参数为`true`，通过`md5-value`传入原文件的MD5值，支持`sync`修饰符
```html
<dbj-upload
  v-model="url"
  :md5-value.sync="md5"
  md5
  type="resource"
  file-type="jpg,png"
  tip="仅支持.jpg和.png格式文件，小于1MB"
  :max-size="1*1024*1024"
  :request-token="getUploadToken"
  @error="handleError"
>
</dbj-upload>
<p>
  <el-button @click="print">打印数据</el-button>
</p>
<script>
  export default {
    data() {
      return {
        url: '',
        md5: ''
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
        console.log('url:', this.url);
        console.log('md5:', this.md5);
      }
    }
  }
</script>
```
:::


### 多文件上传

:::demo 指定`multiple`参数为`true`即可
```html
<dbj-upload
  type="resource"
  file-type="jpg,png"
  tip="仅支持.jpg和.png格式文件，小于1MB"
  v-model="fileList"
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
        fileList: [{
          url: '',
          md5: ''
        }]
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

### 在表单中使用

:::demo 单文件上传时，配置`required`为`true`即可设置文件为必须上传，文件上传成功后清除错误提示
```html
<el-form ref="form" :model="form" :rules="formRules" label-width="80px" :style="{width: '542px'}">
  <el-form-item label="名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="文件上传" prop="fileUrl">
    <dbj-upload
      type="resource"
      v-model="form.fileUrl"
      :md5-value.sync="form.fileMd5"
      md5
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
      return {
        form: {
          name: '',
          fileUrl: '',
          fileMd5: ''
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          fileUrl: [
            { required: true, message: '请上传文件' }
          ]
        }
      };
    },
    mounted() {
      // 模拟获取数据
      setTimeout(() => {
        this.form.name = 'test';
        this.form.fileUrl = 'https://ali-res-test.dabanjia.com/res/20191225/1577257825312_6432%24big.jpg';
        this.form.fileMd5 = '84aa1f09b5a9274109b32c336a1f6ed0';
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

### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 必选参数，文件类型 | string | image/resource/video | — |
| value / v-model | `multiple`为`true`时，该参数类型为数组，数组每一项的属性见下表。当为`false`时，该参数类型为string | array / string | — | — |
| md5-value | md5值，`multiple`为`false`时才有用，支持 .sync 修饰符 | string | — | — |
| multiple | 是否支持多选文件 | boolean | — | false |
| file-type | 支持的文件文件后缀，多个用逗号分割 | string | — | — |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string | — | — |
| max-size | 支持的文件最大大小，超出报错，为0时无限制 | number | — | 0 |
| tip | 上传提示文字 | string | — | — |
| md5 | 上传成功后是否计算MD5值 | boolean | — | false |
| request-token | 请求上传文件的token函数，这个参数在项目中统一设置，不需要自己设置 | function(type) | — | — |

### Events
| 事件名称      | 说明          | 回调参数 |
|----------- |-------------- | -- |
| success | 单个文件上传成功时触发 | (currentFile: object, fileList: array) |
| complete | 所有文件上传成功时触发 | (fileList: array) |
| progress | 文件上传时的进度 | (percent: number, total: number, loaded: number) |
| error | 文件上传失败时触发，超出大小或文件类型不匹配时也会触发 | (errMsg: string, file: File) |

### Slot
| name | 说明 |
|------|--------|
| — | 触发文件选择框的内容 |

### value单个对象的Props
| name | 说明 | 类型 |
|------|-----|------|
| url | 文件地址 | string |
| md5 | 文件的MD5 | string |
