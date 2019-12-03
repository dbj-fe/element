<template>
  <el-input
    v-model="keyword"
    class="dbj-search-input"
    :class="{
      'dbj-search-input--with-switch': withSwitch
    }"
    :placeholder="realPh"
    :clearable="clearable"
    @keydown.enter.native="handleSearch"
    @clear="handleSearch"
  >
    <el-select
      v-if="types && types.length"
      slot="prepend"
      v-model="keywordType"
    >
      <el-option
        v-for="tp in types"
        :key="tp.value"
        :label="tp.label"
        :value="tp.value"
      />
    </el-select>
    <el-button
      slot="append"
      icon="dbj-icon-search"
      @click="handleSearch"
    />
  </el-input>
</template>

<script>
import ElInput from 'element-ui/packages/input';
import ElButton from 'element-ui/packages/button';
import ElSelect from 'element-ui/packages/select';
import ElOption from 'element-ui/packages/option';
export default {
  name: 'DbjSearchInput',
  components: {
    ElInput,
    ElButton,
    ElSelect,
    ElOption
  },
  model: {
    prop: 'value',
    event: 'search'
  },
  props: {
    value: String,
    types: Array,
    type: [String, Number],
    placeholder: {
      type: String,
      default: '请输入关键字'
    },
    clearable: Boolean
  },
  data() {
    return {
      keyword: '',
      keywordType: ''
    };
  },
  computed: {
    withSwitch() {
      return Boolean(this.types && this.types.length);
    },
    realPh() {
      if (this.withSwitch) {
        for (let i = 0; i < this.types.length; i++) {
          let obj = this.types[i];
          if (obj.value === this.keywordType && obj.placeholder) {
            return obj.placeholder;
          }
        }
      }
      return this.placeholder;
    }
  },
  watch: {
    value: {
      handler(val) {
        if (this.keyword !== val) {
          this.keyword = val;
        }
      },
      immediate: true
    },
    type: {
      handler(val) {
        if (this.keywordType !== val) {
          this.keywordType = val;
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSearch() {
      if (this.withSwitch) {
        this.$emit('update:type', this.keywordType);
        this.$emit('search', this.keyword, this.keywordType);
      } else {
        this.$emit('search', this.keyword);
      }
    }
  }
};
</script>
