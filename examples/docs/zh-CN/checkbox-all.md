## Checkbox-all 全选框

一组备选项中进行多选

### 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。
子项可以为所有可勾选数据，抽离 id 项

:::demo 在`el-checkbox-all`元素中定义`v-model`绑定变量，默认绑定变量的值会是`Array`，若子项选中则展示以及选择，全选对应`。

```html
<template>
  <!-- `checked` 为 true 或 false -->
  <checkbox-all v-model="checkedList" :list="idList" />
  <el-checkbox-group v-model="checkedList">
    <div style="margin: 15px 0;"></div>
    <el-checkbox v-for="city in cityData" :label="city.id" :key="city.id"
      >{{city.name}}</el-checkbox
    >
  </el-checkbox-group>
      <div style="margin: 15px 0;"></div>
  <el-button @click="getCheckedList">获取勾选数据</el-button>
</template>
<script>
  const cityOptions = [
    { id: 1, name: "上海" },
    { id: 2, name: "北京" },
    { id: 3, name: "广州" },
    { id: 4, name: "深圳" }
  ];

  export default {
    data() {
      return {
        checkedList: [1],
        cityData: cityOptions
      };
    },
    computed: {
      idList() {
        return this.cityData.map(item => item.id);
      }
    },
    methods: {
      getCheckedList() {
        console.log(this.checkedList);
      }
    }
  };
</script>
```

:::

### Checkbox-button Attributes

| 参数        | 说明                                                                  | 类型                      | 可选值 | 默认值 |
| ----------- | --------------------------------------------------------------------- | ------------------------- | ------ | ------ |
| label       | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效） | string / number / boolean | —      | —      |
| true-label  | 选中时的值                                                            | string / number           | —      | —      |
| false-label | 没有选中时的值                                                        | string / number           | —      | —      |
| disabled    | 是否禁用                                                              | boolean                   | —      | false  |
| name        | 原生 name 属性                                                        | string                    | —      | —      |
| checked     | 当前是否勾选                                                          | boolean                   | —      | false  |
