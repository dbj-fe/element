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

### 在表单中使用

:::demo 配置`required`为`true`即可设置文件为必须上传，文件上传成功后清除错误提示
```html
<el-form ref="form" :model="form" :rules="formRules" label-width="80px" :style="{width: '542px'}">
  <el-form-item label="名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="文件上传" prop="fileContent">
    <dbj-reader
      file-type="json"
      :max-size="2*1024"
      tip="仅支持.json格式文件，小于2KB"
      v-model="form.fileContent"
      @error="handleError"
    />
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
          fileContent: ''
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          fileContent: [
            { required: true, message: '请上传文件' }
          ]
        }
      };
    },
    mounted() {
      // 模拟获取数据
      setTimeout(() => {
        this.form.name = 'test';
        this.form.fileContent = 'hello world';
      }, 100);
    },
    methods: {
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
