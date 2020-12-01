## DbjCardList 卡片列表

自定义卡片列表组件

### 基本使用

:::demo
```html
<dbj-card-list
  v-model="checkedList"
  :data="list"
  :props="listProps"
  checkable
  @command="handleCardCmd"
/>
<script>
  export default {
    data() {
      return {
        checkedList: [],
        list: [],
        listProps: {
          id: "id",
          image: "thumbnail",
          name: "name",
          infos: [
            { prop: "uploader", label: "上传人" },
            { prop: "brandName", label: "品牌" },
            { prop: "productModel", label: "型号" },
            { prop: "texture", label: "材质" },
            { prop: "mouldLengthWidthHeight", label: "尺寸" }
          ],
          flag: {
            // img: require("../../assets/images/label-stop.png"), // 图片方式
            text: "停用", // tag方式，需要指定三个属性text、color、type
            color: "gray",
            type: "primary",
            prop: "enabled",
            showValue: false
          },
          tags: [
            {
              text: "商品",
              color: "#ffa800",
              prop: "sale",
              showValue: true,
              type: 'primary'
            },
            {
              text: "模型",
              color: "#ffa800",
              prop: "hasModel",
              showValue: true
            }
          ],
          commands: [
            { text: "编辑", value: "edit" },
            {
              text: "变更菜单",
              value: "editMenu",
              prop: "editMenu",
              showValue: true
            },
            {
              text: "更换图例",
              value: "changeLegend"
            },
            {
              text: "启用",
              value: "enable",
              prop: "enabled",
              showValue: false
            },
            {
              text: "停用",
              value: "disable",
              prop: "enabled",
              showValue: true
            }
          ]
        }
      };
    },
    mounted() {
      setTimeout(() => {
        this.list = [
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693679,
            "legendId":0,
            "mouldLengthWidthHeight":"300.00*300.00*600.00",
            "name":"配饰_植物_龟背竹",
            "nilLegend":false,
            "productModel":"",
            "sale":true,
            "texture": ["棉麻", "绒布", "粘胶人", "醋酸人造丝", "铜氨人造丝", "涤纶", "棉麻a", "绒布a", "粘胶人a", "醋酸人造丝a", "铜氨人造丝a", "涤纶a"],
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194440282_8839.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"12312321放松放松",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":false,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693678,
            "legendId":0,
            "mouldLengthWidthHeight":"500.00*500.00*1700.00",
            "name":"配饰_植物_鸭掌木配饰_植物_鸭掌木配饰_植物_鸭掌木配饰_植物_鸭掌木",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "texture": ["棉麻", "绒布", "粘胶", "醋酸", "铜氨", "涤纶"],
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194546997_7553.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693677,
            "legendId":0,
            "mouldLengthWidthHeight":"400.00*400.00*1700.00",
            "name":"配饰_植物_发财树配饰_植物_发财树配饰_植物_发财树配饰_植物_发财树",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "texture": ["棉麻", "绒布", "醋酸人造丝"],
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573195129692_7120.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":false,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693676,
            "legendId":0,
            "mouldLengthWidthHeight":"250.00*250.00*250.00",
            "name":"配饰_植物_小绿箩",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "texture": ["棉麻", "绒布", "涤纶"],
            "thumbnail":"https://ali-image.dabanjia.com/image/404.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":false,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693675,
            "legendId":0,
            "mouldLengthWidthHeight":"250.00*250.00*250.00",
            "name":"配饰_植物_孔雀竹芋",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "texture": ["棉麻", "绒布", "醋酸", "涤纶"],
            "thumbnail":"",
            "unit":"",
            "uploader":"崔迎"
          }
        ];
      }, 500);
    },
    methods: {
      handleCardCmd(cmd, item) {
        console.log(cmd, item);
      }
    }
  }
</script>
```
:::


### 高级用法：一些配置函数和info的slot的用法

:::demo 一、`info`的`prop`属性也可以是一个函数，通过函数计算显示属性信息。也可以通过`slot`属性指定一个自定义的dom结构。（#号是v-slot指令的缩写，[详情查看](https://cn.vuejs.org/v2/guide/components-slots.html)）二、`tag`、`flag`、`view`、`command`的`showValue`属性可以是函数，它们的使用方式相同，第一参数是当前项的数据，第二参数是使用`prop`属性从当前项数据中取到的值，函数返回一个`Boolean`值决定是否显示该项。三、当`showValue`或`prop`返回一个对象时(数组除外)，会以该对象覆盖配置。四、`disable`是一个函数，参数是`item`即当前项的数据。

```html
<dbj-card-list
  v-model="checkedList"
  :data="list"
  :props="listProps"
  checkable
  @command="handleCardCmd"
>
  <template #my-info="{item, index, info, infoIndex}">
    <span>{{ info.label }}：</span>
    <a>
      {{ item.brandName }}
    </a>
  </template>
</dbj-card-list>
<script>
  export default {
    data() {
      return {
        checkedList: [],
        list: [],
        listProps: {
          id: "id",
          image: "thumbnail",
          name: "name",
          disable: function(item) {
            return !item.enabled;
          },
          infos: [
            {
              prop: function(params) {
                let { item, index, info, infoIndex } = params;
                console.log(item, index, info, infoIndex);
                return `${item.uploader}（${item.phone}）`
              },
              label: "上传人"
            },
            {
              prop: function(params) {
                let { item, index, info, infoIndex } = params;
                if (item.width.indexOf('~') > -1) {
                  return {
                    value: `${item.width}mm`,
                    label: "宽度范围"
                  };
                }
                return `${item.width}mm`;
              },
              label: "宽度"
            },
            {
              tagType: "default",
              tagColor: "#FF333A",
              prop: function(params) {
                let { item, index, info, infoIndex } = params;
                return (item.heightList || []).map(h => `${h}mm`);
              },
              label: "高度"
            },
            {
              slot: 'my-info',
              label: '插槽元素测试'
            }
          ],
          flag: {
            text: "默认",
            color: "green",
            type: "primary",
            prop: "obj.flag",
            showValue: function(item, val) {
              if (val === 3) {
                return {
                  text: "自定义",
                  color: "#999",
                };
              }
              return val > 1;
            }
          },
          tags: [
            {
              text: "偶数",
              type: "primary",
              color: "#ffa800",
              prop: "obj.tag",
              showValue: function(item, val) {
                return !(val % 2);
              }
            },
            {
              text: "",
              color: "#ffa800",
              prop: "goodsCategoryName",
              showValue: function(item, val) {
                if (val) {
                  return {
                    text: val
                  };
                }
                return false;
              }
            }
          ],
          commands: [
            { text: "编辑", value: "edit" },
            {
              text: "TEST",
              value: "big1",
              prop: "obj.cmd",
              showValue: function(item, val) {
                return val > 1;
              }
            },
            {
              text: "上架",
              value: "sale",
              showValue: function(item, val) {
                if (!item.sale) {
                  return {
                    text: "下架",
                    value: "not-sale"
                  }
                }
                return true;
              }
            }
          ]
        }
      };
    },
    mounted() {
      setTimeout(() => {
        this.list = [
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"绿植",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693679,
            "legendId":0,
            "mouldLengthWidthHeight":"300.00*300.00*600.00",
            "name":"配饰_植物_龟背竹",
            "nilLegend":false,
            "productModel":"",
            "sale":true,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194440282_8839.jpg",
            "unit":"",
            "uploader":"崔迎",
            "phone": "13456789012",
            "heightList": [100, 320, 400],
            "width": "100",
            "obj": {
              "flag": 1,
              "view": 2,
              "tag": 2,
              "cmd": 3
            }
          },
          {
            "brandName":"无品牌",
            "code":"12312321放松放松",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":false,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693678,
            "legendId":0,
            "mouldLengthWidthHeight":"500.00*500.00*1700.00",
            "name":"配饰_植物_鸭掌木配饰_植物_鸭掌木配饰_植物_鸭掌木配饰_植物_鸭掌木",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194546997_7553.jpg",
            "unit":"",
            "uploader":"崔迎",
            "phone": "13456789012",
            "heightList": [100, 200, 400, 800, 1000, 1200, 1400, 1600],
            "width": "100~200",
            "obj": {
              "flag": 3,
              "view": 1,
              "tag": 4,
              "cmd": 3
            }
          },
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":false,
            "goodsCategoryName":"",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693677,
            "legendId":0,
            "mouldLengthWidthHeight":"400.00*400.00*1700.00",
            "name":"配饰_植物_发财树配饰_植物_发财树配饰_植物_发财树配饰_植物_发财树",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573195129692_7120.jpg",
            "unit":"",
            "uploader":"崔迎",
            "phone": "13456789012",
            "heightList": [100, 320],
            "width": "200",
            "obj": {
              "flag": 4,
              "view": 8,
              "tag": 1,
              "cmd": 1
            }
          }
        ];
      }, 500);
    },
    methods: {
      handleCardCmd(cmd, item) {
        console.log(cmd, item);
      }
    }
  }
</script>
```
:::

### 列表无Tags时

:::demo `props`中没有`tags`属性时，列表就没有tags。
```html
<dbj-card-list
  v-model="checkedList"
  :data="list"
  :props="listProps"
  checkable
  @command="handleCardCmd"
/>
<script>
  export default {
    data() {
      return {
        checkedList: [],
        list: [],
        listProps: {
          id: "id",
          image: "thumbnail",
          name: "name",
          infos: [
            { prop: "uploader" },
            { prop: "brandName" },
            { prop: "mouldLengthWidthHeight" }
          ],
          flag: {
            img: require("../../assets/images/label-stop.png"),
            prop: "enabled",
            showValue: false
          },
          views: [
            {
              text: "俯",
              prop: "hasVerticalView",
              showValue: true,
              image: "verticalViewThumbnail",
              emptyImg: require("../../assets/images/loading-img@2x.png")
            },
            {
              text: "正",
              prop: "hasFrontView",
              showValue: true,
              image: "frontViewThumbnail",
              emptyImg: require("../../assets/images/loading-img@2x.png")
            },
            {
              text: "侧",
              prop: "hasSideView",
              showValue: true,
              image: "sideViewThumbnail",
              emptyImg: require("../../assets/images/loading-img@2x.png")
            }
          ],
          commands: [
            { text: "编辑", value: "edit" },
            {
              text: "变更菜单",
              value: "editMenu",
              prop: "editMenu",
              showValue: true
            },
            {
              text: "更换图例",
              value: "changeLegend"
            },
            {
              text: "启用",
              value: "enable",
              prop: "enabled",
              showValue: false
            },
            {
              text: "停用",
              value: "disable",
              prop: "enabled",
              showValue: true
            }
          ]
        }
      };
    },
    mounted() {
      setTimeout(() => {
        this.list = [
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693679,
            "legendId":0,
            "mouldLengthWidthHeight":"300.00*300.00*600.00",
            "name":"配饰_植物_龟背竹",
            "nilLegend":false,
            "productModel":"",
            "sale":true,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194440282_8839.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"12312321放松放松",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":false,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693678,
            "legendId":0,
            "mouldLengthWidthHeight":"500.00*500.00*1700.00",
            "name":"配饰_植物_鸭掌木配饰_植物_鸭掌木配饰_植物_鸭掌木配饰_植物_鸭掌木",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194546997_7553.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693677,
            "legendId":0,
            "mouldLengthWidthHeight":"400.00*400.00*1700.00",
            "name":"配饰_植物_发财树配饰_植物_发财树配饰_植物_发财树配饰_植物_发财树",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573195129692_7120.jpg",
            "unit":"",
            "uploader":"崔迎"
          }
        ];
      }, 500);
    },
    methods: {
      handleCardCmd(cmd, item) {
        console.log(cmd, item);
      }
    }
  }
</script>
```
:::

### 标题一行展示（无tags时使用）

:::demo 设置`one-line-title`属性为`true`，标题就会显示在一行。
```html
<dbj-card-list
  v-model="checkedList"
  :data="list"
  :props="listProps"
  checkable
  one-line-title
  @command="handleCardCmd"
/>
<script>
  export default {
    data() {
      return {
        checkedList: [],
        list: [],
        listProps: {
          id: "id",
          image: "thumbnail",
          name: "name",
          infos: [
            { prop: "uploader", label: "上传人" },
            { prop: "brandName", label: "品牌" },
            { prop: "productModel", label: "型号" },
            { prop: "mouldLengthWidthHeight", label: "尺寸" }
          ],
          flag: {
            img: require("../../assets/images/label-stop.png"),
            prop: "enabled",
            showValue: false
          },
          commands: [
            { text: "编辑", value: "edit" },
            {
              text: "变更菜单",
              value: "editMenu",
              prop: "editMenu",
              showValue: true
            },
            {
              text: "更换图例",
              value: "changeLegend"
            },
            {
              text: "启用",
              value: "enable",
              prop: "enabled",
              showValue: false
            },
            {
              text: "停用",
              value: "disable",
              prop: "enabled",
              showValue: true
            }
          ]
        }
      };
    },
    mounted() {
      setTimeout(() => {
        this.list = [
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693679,
            "legendId":0,
            "mouldLengthWidthHeight":"300.00*300.00*600.00",
            "name":"配饰_植物_龟背竹",
            "nilLegend":false,
            "productModel":"",
            "sale":true,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194440282_8839.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"12312321放松放松",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":false,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693678,
            "legendId":0,
            "mouldLengthWidthHeight":"500.00*500.00*1700.00",
            "name":"配饰_植物_鸭掌木配饰_植物_鸭掌木配饰_植物_鸭掌木配饰_植物_鸭掌木",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194546997_7553.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693677,
            "legendId":0,
            "mouldLengthWidthHeight":"400.00*400.00*1700.00",
            "name":"配饰_植物_发财树配饰_植物_发财树配饰_植物_发财树配饰_植物_发财树",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573195129692_7120.jpg",
            "unit":"",
            "uploader":"崔迎"
          }
        ];
      }, 500);
    },
    methods: {
      handleCardCmd(cmd, item) {
        console.log(cmd, item);
      }
    }
  }
</script>
```
:::


### 有视图切换的列表

:::demo 配置`props`的`views`属性即可。
```html
<dbj-card-list
  v-model="checkedList"
  :data="list"
  :props="listProps"
  checkable
  @command="handleCardCmd"
/>
<script>
  export default {
    data() {
      return {
        checkedList: [],
        list: [],
        listProps: {
          id: "id",
          image: "thumbnail",
          name: "name",
          infos: [
            { prop: "uploader", label: "上传人" },
            { prop: "brandName", label: "品牌" },
            { prop: "productModel", label: "型号" },
            { prop: "mouldLengthWidthHeight", label: "尺寸" }
          ],
          flag: {
            img: require("../../assets/images/label-stop.png"),
            prop: "enabled",
            showValue: false
          },
          tags: [
            {
              text: "商品",
              color: "#ffa800",
              prop: "sale",
              showValue: true,
              type: 'primary'
            },
            {
              text: "模型",
              color: "#ffa800",
              prop: "hasModel",
              showValue: true
            }
          ],
          views: [
            {
              text: "俯",
              prop: "hasVerticalView",
              showValue: true,
              image: "verticalViewThumbnail"
            },
            {
              text: "正",
              prop: "hasFrontView",
              showValue: true,
              image: "frontViewThumbnail"
            },
            {
              text: "侧",
              prop: "hasSideView",
              showValue: true,
              image: "sideViewThumbnail",
              emptyImg: require("../../assets/images/loading-img@2x.png")
            }
          ],
          commands: [
            { text: "编辑", value: "edit" },
            {
              text: "变更菜单",
              value: "editMenu",
              prop: "editMenu",
              showValue: true
            },
            {
              text: "更换图例",
              value: "changeLegend"
            },
            {
              text: "启用",
              value: "enable",
              prop: "enabled",
              showValue: false
            },
            {
              text: "停用",
              value: "disable",
              prop: "enabled",
              showValue: true
            }
          ]
        }
      };
    },
    mounted() {
      setTimeout(() => {
        this.list = [
          {
            "brandName":"全屋优品",
            "code":"BIM_QuanWuYouPin_190428504",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "frontViewThumbnail":"",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":true,
            "id":158882,
            "legendId":253,
            "mouldLengthWidthHeight":"2265.00*2264.00*1203.00",
            "name":"全屋优品_XZ-W303-1.8米床2014_BIM_QuanWuYouPin_190428504",
            "nilLegend":true,
            "productModel":"XZ-W303",
            "relationQuotaNum":0,
            "sale":true,
            "sideViewThumbnail":"",
            "thumbnail":"https://ali-image.dabanjia.com/image/20190514/MATERIAL_1557795734878_3004.jpg",
            "unit":"件",
            "uploader":" 张一纯",
            "verticalViewThumbnail":"https://ali-image.dabanjia.com/image/20190408/member_1554693805973_6902.png"
          },
          {
            "brandName":"全屋优品",
            "code":"BIM_QuanWuYouPin_190428502",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "frontViewThumbnail":"",
            "hasFrontView":false,
            "hasModel":false,
            "hasSideView":false,
            "hasVerticalView":true,
            "id":158880,
            "legendId":253,
            "mouldLengthWidthHeight":"2216.00*2267.00*1220.00",
            "name":"全屋优品_XZ-W302-1.8米床2014_BIM_QuanWuYouPin_190428502",
            "nilLegend":true,
            "productModel":"XZ-W302-1.8米床2014",
            "relationQuotaNum":0,
            "sale":false,
            "sideViewThumbnail":"",
            "thumbnail":"https://ali-image.dabanjia.com/image/20190514/MATERIAL_1557795516730_0685.jpg",
            "unit":"件",
            "uploader":" 张一纯",
            "verticalViewThumbnail":"https://ali-image.dabanjia.com/image/20190408/member_1554693805973_6902.png"
          },
          {
            "brandName":"全屋优品",
            "code":"BIM_QuanWuYouPin_190428269",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "frontViewThumbnail":"",
            "hasFrontView":true,
            "hasModel":true,
            "hasSideView":true,
            "hasVerticalView":true,
            "id":158744,
            "legendId":253,
            "mouldLengthWidthHeight":"1800.00*2394.00*1197.00",
            "name":"全屋优品_O216 1.8米床_BIM_QuanWuYouPin_190428269",
            "nilLegend":true,
            "productModel":"O216 ",
            "relationQuotaNum":0,
            "sale":true,
            "sideViewThumbnail":"",
            "thumbnail":"https://ali-image.dabanjia.com/image/20190513/MATERIAL_1557740535953_4907.jpg",
            "unit":"件",
            "uploader":"宋颂",
            "verticalViewThumbnail":"https://ali-image.dabanjia.com/image/20190408/member_1554693805973_6902.png"
          }
        ];
      }, 500);
    },
    methods: {
      handleCardCmd(cmd, item) {
        console.log(cmd, item);
      }
    }
  }
</script>
```
:::

### 列表单选

:::demo 设置`is-raido`属性为`true`即可
```html
<dbj-card-list
  v-model="checkedList"
  :data="list"
  :props="listProps"
  checkable
  is-radio
  @command="handleCardCmd"
/>
<script>
  export default {
    data() {
      return {
        checkedList: [],
        list: [],
        listProps: {
          id: "id",
          image: "thumbnail",
          name: "name",
          infos: [
            { prop: "uploader", label: "上传人" },
            { prop: "brandName", label: "品牌" },
            { prop: "productModel", label: "型号" },
            { prop: "mouldLengthWidthHeight", label: "尺寸" }
          ],
          flag: {
            img: require("../../assets/images/label-stop.png"),
            prop: "enabled",
            showValue: false
          },
          tags: [
            {
              text: "商品",
              color: "#ffa800",
              prop: "sale",
              showValue: true,
              type: 'primary'
            },
            {
              text: "模型",
              color: "#ffa800",
              prop: "hasModel",
              showValue: true
            }
          ],
          commands: [
            { text: "编辑", value: "edit" },
            {
              text: "变更菜单",
              value: "editMenu",
              prop: "editMenu",
              showValue: true
            },
            {
              text: "更换图例",
              value: "changeLegend"
            },
            {
              text: "启用",
              value: "enable",
              prop: "enabled",
              showValue: false
            },
            {
              text: "停用",
              value: "disable",
              prop: "enabled",
              showValue: true
            }
          ]
        }
      };
    },
    mounted() {
      setTimeout(() => {
        this.list = [
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693679,
            "legendId":0,
            "mouldLengthWidthHeight":"300.00*300.00*600.00",
            "name":"配饰_植物_龟背竹",
            "nilLegend":false,
            "productModel":"",
            "sale":true,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194440282_8839.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"12312321放松放松",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":false,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693678,
            "legendId":0,
            "mouldLengthWidthHeight":"500.00*500.00*1700.00",
            "name":"配饰_植物_鸭掌木",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194546997_7553.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693677,
            "legendId":0,
            "mouldLengthWidthHeight":"400.00*400.00*1700.00",
            "name":"配饰_植物_发财树",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573195129692_7120.jpg",
            "unit":"",
            "uploader":"崔迎"
          }
        ];
        this.checkedList = [this.list[0].id];
      }, 500);
    },
    methods: {
      handleCardCmd(cmd, item) {
        console.log(cmd, item);
      }
    }
  }
</script>
```
:::

### 可删除

:::demo 设置`deletable`属性为`true`即可
```html
<dbj-card-list
  :data="list"
  :props="listProps"
  deletable
  @delete="handleDelete"
/>
<script>
  export default {
    data() {
      return {
        list: [],
        listProps: {
          id: "id",
          image: "thumbnail",
          name: "name",
          infos: [
            { prop: "uploader", label: "上传人" },
            { prop: "brandName", label: "品牌" },
            { prop: "productModel", label: "型号" },
            { prop: "mouldLengthWidthHeight", label: "尺寸" }
          ],
          flag: {
            img: require("../../assets/images/label-stop.png"),
            prop: "enabled",
            showValue: false
          },
          tags: [
            {
              text: "商品",
              color: "#ffa800",
              prop: "sale",
              showValue: true,
              type: 'primary'
            },
            {
              text: "模型",
              color: "#ffa800",
              prop: "hasModel",
              showValue: true
            }
          ]
        }
      };
    },
    mounted() {
      setTimeout(() => {
        this.list = [
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693679,
            "legendId":0,
            "mouldLengthWidthHeight":"300.00*300.00*600.00",
            "name":"配饰_植物_龟背竹",
            "nilLegend":false,
            "productModel":"",
            "sale":true,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194440282_8839.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"12312321放松放松",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":false,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693678,
            "legendId":0,
            "mouldLengthWidthHeight":"500.00*500.00*1700.00",
            "name":"配饰_植物_鸭掌木",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573194546997_7553.jpg",
            "unit":"",
            "uploader":"崔迎"
          },
          {
            "brandName":"无品牌",
            "code":"",
            "companyId":1,
            "companyName":"美屋三六五科技有限公司",
            "editMenu":true,
            "enabled":true,
            "goodsCategoryName":"盆栽",
            "hasFrontView":false,
            "hasModel":true,
            "hasSideView":false,
            "hasVerticalView":false,
            "id":693677,
            "legendId":0,
            "mouldLengthWidthHeight":"400.00*400.00*1700.00",
            "name":"配饰_植物_发财树",
            "nilLegend":false,
            "productModel":"",
            "sale":false,
            "thumbnail":"https://ali-image.dabanjia.com/image/20191108/DBJ_1573195129692_7120.jpg",
            "unit":"",
            "uploader":"崔迎"
          }
        ];
      }, 500);
    },
    methods: {
      handleDelete(item, idx) {
        console.log(item, idx);
        this.list.splice(idx, 1);
      }
    }
  }
</script>
```
:::


### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 选中项的id数组 | array | — | [] |
| data | 列表数据 | array | — | [] |
| props | 配置选项，具体看下表 | object | — | {} |
| checkable | 是否可选择 | boolean | — | false |
| isRadio | 是否单选 | boolean | — | false |
| deletable | 是否可删除 | boolean | — | false |
| oneLineTitle | 卡片标题是否一行显示 | boolean | — | false |

### Events
| 事件名称      | 说明          | 回调参数 |
|----------- |-------------- | -- |
| command | 点击右下角菜单中的按钮时触发 | (cmd: string, item: object) |
| image-click | 卡片的图片被点击时触发 | (item: object) |
| delete | 当设置`deletable`为`true`时，点击右上角的删除按钮时触发 | (item: object, idx: number) |

### Slot
| name | 说明 |
|------|--------|
| image | 卡片图片，参数为 { item, index } |
| imgAppend | 图片后面的内容，参数为 { item, index } |
| info | 信息区域的内容，参数为 { item, index } |

### props属性
| name | 说明 | 类型 | 默认值 |
|------|-----|------|------|
| id | 指定id字段名称 | string | 'id' |
| image | 指定缩略图的字段名称 | string | 'image' |
| ossCompress | 缩略图是否使用oss的压缩参数 | boolean \| Function(item, index) | true |
| name | 指定标题字段名称 | string | 'name' |
| flag | 左上角的斜角标签配置选项，可选，具体见下表 | object | — |
| disable | 是否禁选，参数是当前项的数据 | Function(item, index) | — |
| tags | 标题下面的标签配置选项，可选，具体见下表 | array | — |
| infos | 数据信息配置选项，可选，具体见下表 | array | — |
| views | 视图配置选项，可选，具体见下表 | array | — |
| commands | 操作按钮配置选项，可选，具体见下表 | array | — |

### flag属性
| name | 说明 | 类型 | 可选值 | 默认值 |
|------|-----|------|------|------|
| img | 方式一：斜角标签的图片地址 | string | — | — |
| text | 方式二：斜角标签的显示文字，同Tag标签的内容 | string | — | — |
| color | 方式二：斜角标签的主题颜色，同Tag标签的color属性 | string | green/gray/具体色值 | — |
| type | 方式二：斜角标签的主题，同Tag标签的type属性 | string | primary/secondary | — |
| prop | 指定字段名称 | string | — | — |
| showValue | 指定字段的属性值等于该值时显示标签 | string \| number \| boolean | — | — |

### infos单项的属性
| name | 说明 | 类型 | 可选值 | 默认值 |
|------|-----|------|------|------|
| prop | 指定要显示的字段名称，该字段的值显示在卡片信息中。当需要一行显示多个属性时，可以用函数实现 | string \| Function({item, index, info, infoIndex}) | — | — |
| label | 冒号前面的文字，可选 | string | — | — |
| tagColor | 标签主题颜色，同Tag标签的color属性（当属性值是数组时显示标签样式） | string | green/gray/具体色值 | gray |
| tagType | 标签类型，同Tag标签组件的type属性（当属性值是数组时显示标签样式） | string | primary/secondary/default | secondary |
| slot | 指定slot的名字，slot元素通过dbj-card-list传入即可 | string | — | — |

### tags单项的属性
| name | 说明 | 类型 | 可选值 | 默认值 |
|------|-----|------|------|------|
| text | 显示的文字，同Tag标签的内容 | string | — | — |
| color | 标签主题颜色，同Tag标签的color属性 | string | green/gray/具体色值 | — |
| type | 标签类型，同Tag标签组件的type属性 | string | primary/secondary | — |
| prop | 指定字段的名称 | string | — | — |
| showValue | 指定字段的属性值等于该值时显示标签 | string \| number \| boolean \| Function(item, value) | — | — |

### views单项的属性
| name | 说明 | 类型 | 默认值 |
|------|-----|------|------|
| text | 显示的文字，一个汉字或字符 | string | — |
| image | 对应图片的字段名称 | string | — |
| emptyImg | 图片为空时显示的空图片，可选，没有用默认 | string | — |
| prop | 指定字段的名称 | string | — |
| showValue | 指定字段的属性值等于该值时显示标签 | string \| number \| boolean \| Function(item, value) | — |

### commands单项的属性
| name | 说明 | 类型 | 默认值 |
|------|-----|------|------|
| text | 菜单按钮显示的名称 | string | — |
| value | 命令的名称，触发`command`事件时的命令名称 | string | — |
| prop | 指定字段的名称 | string | — |
| showValue | 指定字段的属性值等于该值时显示标签 | string \| number \| boolean \| Function(item, value) | — |
