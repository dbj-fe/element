## DbjUploadImage 图片上传

自定义图片上传组件，符合打扮家设计规范

### 基本使用

:::demo
```html
<dbj-upload-image
  v-model="url"
  :max-size="1*1024*1024"
  :request-token="getUploadToken"
  file-type="jpg,png"
  tip="仅支持.jpg和.png格式文件，小于1MB"
  @error="handleError"
>
</dbj-upload-image>
<script>
  export default {
    data() {
      return {
        url: ''
      };
    },
    methods: {
      getUploadToken(type) {
        return require("../../service").getUploadToken('IMAGE');
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

### 修改按钮名称

:::demo 通过`btn-text`属性指定按钮名字
```html
<dbj-upload-image
  v-model="url"
  :max-size="1*1024*1024"
  :request-token="getUploadToken"
  btn-text="LOGO"
  file-type="jpg,png"
  tip="仅支持.jpg和.png格式文件，小于1MB"
  @error="handleError"
>
</dbj-upload-image>
<script>
  export default {
    data() {
      return {
        url: ''
      };
    },
    methods: {
      getUploadToken(type) {
        return require("../../service").getUploadToken('IMAGE');
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

### 替换图片

:::demo
```html
<dbj-upload-image
  v-model="url"
  :max-size="1*1024*1024"
  :request-token="getUploadToken"
  tip="建议使用224*224的.jpg、.png、.bmp格式图片，图片不大于1M"
  @error="handleError"
>
</dbj-upload-image>
<script>
  export default {
    data() {
      return {
        url: 'https://ali-image-test.dabanjia.com/image/20191205/1575534832519_2459%24big.jpg'
      };
    },
    methods: {
      getUploadToken(type) {
        return require("../../service").getUploadToken('IMAGE');
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

:::demo 可通过v-model传递原有文件，参数类型是数组，上传成功后更改传递的数组
```html
<el-form ref="form" :model="form" :rules="formRules" label-width="80px" :style="{width: '542px'}">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="头像" prop="image">
    <dbj-upload-image
      v-model="form.image"
      :max-size="1*1024*1024"
      :request-token="getUploadToken"
      btn-text="头像"
      file-type="jpg,png"
      tip="仅支持.jpg和.png格式文件，小于1MB"
      @error="handleError"
    >
    </dbj-upload-image>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button @click="handleReset">重置</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          image: ''
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          image: [
            { required: true, message: '请上传头像' }
          ]
        }
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
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.form);
          }
        })
      },
      handleReset() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
```
:::

### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值，图片的地址 | string | — | — |
| btn-text | 按钮名称 | string | — | '图片' |
| file-type | 支持的图片文件后缀，多个用逗号分割 | string | — | 'jpg,png,bmp' |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string | — | 'image/jpg,image/jpeg,image/png,image/bmp' |
| max-size | 支持的文件最大大小，超出报错，为0时无限制 | number | — | 0 |
| tip | 上传提示文字 | string | — | — |
| request-token | 请求上传文件的token函数，这个参数在项目中统一设置，不需要自己设置 | function(type) | — | — |

### Events
| 事件名称      | 说明          | 回调参数 |
|----------- |-------------- | -- |
| success | 图片上传成功时触发 | (url: string) |
| progress | 图片上传时的进度 | (percent: number, total: number, loaded: number) |
| error | 图片上传失败时触发，超出大小或文件类型不匹配时也会触发 | (message: string, file: File) |
