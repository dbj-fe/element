<template>
  <div style="margin: 20px;">
    <el-form
      ref="form"
      class="ms-form"
      :model="form"
      label-width="80px"
      :style="{ width: '542px' }"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item
        label="名称"
        prop="name"
      >
        <dbj-dir-upload
          ref="uploader"
          :request-token="getUploadToken"
          v-model="model.fileList"
          :filter="model.fileFilter"
          :showFileList="false"
          tip="每个模型需上传小于200MB的.pak和.mwasset格式文件，效果优化参数.json文件选填，小于2KB"
          @pre-upload="check"
          @input="handleChange(false)"
          @complete="handleChange(true)"
          @error="handleError"
        />
       
      </el-form-item>
      <el-form-item label="文件上传">
        <dbj-upload
          type="resource"
          v-model="form.fileList"
          md5
          file-type="jpg,png"
          tip="仅支持.jpg和.png格式文件，小于1MB"
          :max-size="1 * 1024 * 1024"
          :request-token="getUploadToken"
          :tip-msg="false"
          multiple
          :limit="3"
          :customRules="customRules"
          @error="handleError"
        >
          <template #infos="{file}">
            <div
              class="infos"
              style="width: 48px;height: 48px;"
            >
              <img
                v-if="!file.url"
                style="width: 48px;height: 48px;vertical-align: middle;"
                src="https://ali-image-test.dabanjia.com/image/20200604/1591261736269_7336%24loading-img2x.png?x-oss-process=image/resize,m_lfit,h_48,w_48"
                alt=""
              />
              <img
                v-else
                style="width: 48px;height: 48px;vertical-align: middle;"
                :src="`${file.url}?x-oss-process=image/resize,m_lfit,h_48,w_48`"
              />
            </div>
          </template>
        </dbj-upload>

      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSubmit"
        >提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const gcd = (w, h) => {
  if (h == 0) {
    return w;
  }
  var r = w % h;
  return gcd(h, r);
};
export default {
  data() {
    return {
      model: {
        fileList: [
          {
            url:
              'https://ali-res-test.dabanjia.com/res/20190604/文件资源$1559620404935_5569$DBJ_3_1.pak',
            md5Value: 'c869ad409fffc7097e94c5dfda4c165b'
          },
        
         {
            url:
              'https://ali-res-test.dabanjia.com/res/20190604/文件资源$1559620404931_3196$DBJ_3_1_bak.mwasset',
            md5Value: '4f00ce3fff29fe935b72274bb95b7ecf'
          }, {
            content: 'test'
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
      },
      form: {
        fileList: [
          {
            url:
              'https://ali-res-test.dabanjia.com/res/20191225/1577257825312_6432%24big.jpg'
          },
          {
            url:
              'https://ali-res-test.dabanjia.com/res/20191225/1577257825312_6432%24big.jpg'
          }
        ],
        name: ''
      },
      imageScale: ['1:1', '16:9']
    };
  },
  methods: {
    check(file, a) {
      return []
    },
    fileFilter(file, a) {
      console.log(file, a, '--------');

      return file;
    },
    getUploadToken(type) {
      return require('../service').getUploadToken(type);
    },
    handleError(msg, file) {
      console.log(msg, file);
      this.$message.error(msg);
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form,this.model);
        }
      });
    },
    handleChange() {
      console.log('change');
    },
    customRules(file) {
      return new Promise((resolve, reject) => {
        if (this.imageScale.length) {
          const windowURL = window.URL || window.webkitURL,
            image = new Image();
          image.src = windowURL.createObjectURL(file);
          image.onload = () => {
            const num = gcd(image.width, image.height),
              str = `${image.width / num}:${image.height / num}`;
            console.log(str, image);
            if (this.imageScale.indexOf(str) === -1) {
              reject({ errMsg: '比例不对' });
            } else {
              resolve();
            }
          };
        } else {
          resolve();
        }
      });
    }
  }
};
</script>
<style scoped>
.ms-form {
  width: 400px;
}
.ms-form .el-form-item--medium {
  color: red;
}
.ms-form .el-form-item--medium > .el-form-item__content {
  color: gold;
}
.ms-form
  .el-form-item--medium
  > .el-form-item__content
  .dbj-upload__list
  .infos {
  color: gold;
}
.ms-form .infos + div {
  color: gold;
}
.ms-form
  .el-form-item--medium
  .dbj-upload__list
  >>> .dbj-upload-file__list-item {
  padding: 8px;
}
</style>