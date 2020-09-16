<template>
  <el-checkbox
    v-model="isCheckAll"
    :disabled="list && list.length == 0 ? true : false"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </el-checkbox>
</template>
<script>
import ElCheckbox from 'element-ui/packages/checkbox';
export default {
  name: 'CheckboxAll',
  components: {ElCheckbox},
  props: {
    // 当前选中项的id数组
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    // 当前页面所有项的id
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isCheckAll: false,
      isIndeterminate: false
    };
  },
  watch: {
    value(value) {
      this.showStatus();
    }
  },
  mounted() {
    if (this.value.length > 0) {
      this.showStatus();
    }
  },
  methods: {
    showStatus() {
      let currCount = this.list.length;
      let checkedCount = this.value.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < currCount;
      // 避免数据未获取时，总id列表长度为0
      this.isCheckAll = currCount !== 0 && checkedCount === currCount;
    },
    handleCheckAllChange(val) {
      this.$emit('input', val ? this.list : []);
      this.isIndeterminate = false;
    }
  }
};
</script>


