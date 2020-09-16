<template>
  <div class="info-tree">
    <div
      v-for="(item, index) in listData"
      :key="index"
      class="box-card"
    >
      <component
        :is="currentView"
        :item-data="item"
        :left-val="leftVal"
        @change-view="openList(item)"
      />
      <el-collapse-transition>
        <div
          v-if="item[`${item.parent?'list':'subStructure'}`]&&item.show"
          class="itemChildren"
        >
          <dbj-info-tree
            :list="item[`${item.parent?'list':'subStructure'}`]"
            :init="false"
            :info-col="infoCol"
          />
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>
<script>
// 默认树形col
import InfoCol from './infoCol';

export default {
  name: 'dbjInfoTree',
  components: {},
  props: {
    list: {
      type: Array,
      default() {
        // 示例数据
        return [
          {
            name: '测试1',
            show: true,
            code: '编码',
            subStructure: [
              {
                parent: true,
                show: true,
                list: [
                  {
                    name: '测试2',
                    code: '编码2',
                    show: true
                  }
                ],
                type: 2
              }
            ]
          }
        ];
      }
    },
    // 树形层级之间的距离
    leftVal: {
      type: Number,
      default: 32
    },
    init: {
      type: Boolean,
      default: true
    },
    // 树形组件的col项
    infoCol: {
      type: Object,
      default: () => {
        return InfoCol;
      }
    }
  },
  data() {
    return {
      currentView: this.infoCol
    };
  },
  computed: {
    listData() {
      // 初始数据需要动态分级
      if (this.init) {
        return this.getList();
      }
      return this.list;
    }
  },
  methods: {
    openList(item) {
      item.show = !item.show;
      console.log(this.list);
    },
    getList() {
      // 若含有parent字段，当前级别只展示标题（或自定义）默认下一级（所有子集）左侧距离相同
      // 为list整体数据分层级，形成左侧树形样式
      const setGrade = (arr, grade = 1) => {
        arr.forEach((item, index) => {
          // 记住当前项的grade
          let newGrade = grade;
          let key = 'subStructure';
          if (item.parent) {
            newGrade--;
            key = 'list';
          }
          item.grade = grade;
          item.show = false;
          if (item[key] && item[key].length > 0) {
            return setGrade(item[key], ++newGrade);
          }
        });
      };
      setGrade(this.list);
      return this.list;
    }
  }
};
</script>


