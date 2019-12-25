## DbjSearchInput 搜索框

自定义搜索框组件

### 基本使用

:::demo 在输入框中回车、点击后面的搜索图标时会触发`search`事件，并同步改变keyword的值
```html
<dbj-search-input
  v-model="keyword"
  @search="searchPage"
/>
<script>
  export default {
    data() {
      return {
        keyword: ""
      };
    },
    methods: {
      searchPage(keyword) {
        console.log(keyword);
        console.log(this.keyword);
      }
    }
  }
</script>
```
:::

### 可清空

:::demo 使用`clearable`属性即可得到一个可清空的搜索框，点击清空按钮时也会触发`search`事件
```html
<dbj-search-input
  v-model="keyword"
  clearable
  @search="searchPage"
/>
<script>
  export default {
    data() {
      return {
        keyword: ""
      };
    },
    methods: {
      searchPage(keyword) {
        console.log(keyword);
        console.log(this.keyword);
      }
    }
  }
</script>
```
:::


### 切换不同类型

:::demo 使用`types`属性传入一个对象数组，每个对象至少包含两个属性：`value`是类型的值，`label`是类型的显示名称。
```html
<dbj-search-input
  v-model="keyword"
  :type.sync="keywordType"
  :types="keywordTypes"
  clearable
  @search="searchPage"
/>
<script>
  export default {
    data() {
      return {
        keywordTypes: [
          {
            value: -1,
            label: "全部"
          },
          {
            value: 1,
            label: "业主信息"
          },
          {
            value: 2,
            label: "项目名称"
          },
          {
            value: 3,
            label: "项目编码"
          }
        ],
        keywordType: -1,
        keyword: ""
      };
    },
    methods: {
      searchPage(keyword, keywordType) {
        console.log(keyword, keywordType);
        console.log(this.keyword, this.keywordType);
      }
    }
  }
</script>
```
:::

### 切换类型时显示不同的占位文本

:::demo types的单个对象添加`placeholder`属性
```html
<dbj-search-input
  v-model="query.keyword"
  :type.sync="query.keywordType"
  :types="keywordTypes"
  clearable
  @search="searchPage"
/>
<script>
  export default {
    data() {
      return {
        keywordTypes: [
          {
            value: -1,
            label: "全部",
            placeholder: "业主信息/项目名称/项目编码"
          },
          {
            value: 1,
            label: "业主信息",
            placeholder: "请输入业主信息"
          },
          {
            value: 2,
            label: "项目名称",
            placeholder: "请输入项目名称"
          },
          {
            value: 3,
            label: "项目编码",
            placeholder: "请输入项目编码"
          }
        ],
        query: {
          keywordType: -1,
          keyword: ""
        }
      };
    },
    methods: {
      searchPage(keyword, keywordType) {
        console.log(keyword, keywordType);
        console.log(this.query.keyword, this.query.keywordType);
      }
    }
  }
</script>
```
:::

### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | string | — | — |
| placeholder | 输入框占位文本 | string | — | — |
| clearable | 是否可清空 | boolean | — | false |
| types | 关键字类型列表，为空或空列表时，不显示切换框，数组每一项的属性见下表 | array | — | — |
| type | 当前类型的值，支持 .sync 修饰符 | string / number | — | — |

### Events
| 事件名称      | 说明          | 回调参数 |
|----------- |-------------- | -- |
| search | 在输入框中按下Enter键、点击搜索按钮、点击清除按钮时触发 | (keyword: string, keywordType: string \| number) |


### types单个对象的Props
| name | 说明 | 类型 |
|------|-----|------|
| value | 类型的值 | string / number |
| label | 显示的文字 | string |
| placeholder | 切换类型时显示的占位文字 | string |
