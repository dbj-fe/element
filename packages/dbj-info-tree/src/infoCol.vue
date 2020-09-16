<template>
  <div
    :class="{'view-cabinet-container':true,'item-only-tip':itemData.parent}"
    @click="$emit('change-view')"
  >
    <div
      class="item-body"
      :style="`padding-left:${itemData.grade*leftVal}px`"
    >
      <div class="group">
        <a
          v-if="getLength(itemData[`${itemData.parent?'list':'subStructure'}`]) != 0"
          :class="itemData.show?'is-active':null"
        > <i class="icon-nav-normal" /></a>
      </div>
      <template v-if="itemData.parent">
        <div class="item-tip">
          <i
            v-if="showTypeGroup.iconName"
            :class="showTypeGroup.iconName"
          /> {{ `${showTypeGroup.name||'暂无'}（${itemData.list.length}）` }}
        </div>
      </template>
      <template v-else>
        <div class="material-popover">
          <img
            v-if="itemData.thumbnailUrl"
            class="material-thumbnail"
            :src="`${itemData.thumbnailUrl}?x-oss-process=image/resize,m_lfit,h_150,w_150`"
          >
          <img
            v-else
            class="thumbnail"
            src="https://ali-image-test.dabanjia.com/image/20200604/1591261736269_7336%24loading-img2x.png"
            width="80"
            height="80"
          >
        </div>
        <div class="content-detail">
          <div class="name">
            <span :class="itemData.errorStatus==3?'error':''">{{ itemData.name||'暂无' }}</span>
            <!-- 异常信息统计 -->
            <span
              v-if="itemData.errorStatus&&itemData.errorStatus!=0&&itemData.errorStatus!=3 "
              class="error-tag "
            >
              {{ showErrorMsg(itemData.errorStatus) }}
            </span>
          </div>
          <div>
            <span :title="itemData.code">编号：{{ itemData.code ||"-" }}
            </span>
          </div>
          <div
            v-if="itemData.brand||itemData.brand===''"
            class="attribute"
          >
            <span :title="itemData.brand">
              {{ itemData.brand ||"品牌" }}
            </span>
            <span :title="itemData.version">
              <b class="next" />
              {{ itemData.version ||"型号" }}
            </span>
          </div>
          <div
            v-if="itemData.substrate||itemData.substrate===''"
            class="attribute"
          >
            <span :title="itemData.substrate">
              {{ itemData.substrate ||"基材" }}
            </span>
            <span :title="itemData.material">
              <b class="next" />
              {{ itemData.material ||"材质" }}
            </span>
          </div>
          <div
            v-if="getLength(itemData.subheads)>0"
            class="other-detail-ctn"
          >
            <template>
              <span
                v-for="(subhead,index1) in itemData.subheads"
                :key="subhead.id"
                :class="{'error':subhead.errored}"
              >
                <b
                  v-if="index1!=0"
                  class="next"
                />
                {{ subhead.name||typeName[subhead.type] }}
              </span>
            </template>
          </div>
        </div>
      </template>
    </div>
    <template v-if="!itemData.parent">
      <div class="item-cont">
        <!-- 可批量自定义放置，按百分比布局 -->
        <p>
          <span>-</span>
          <span>示例数据</span>
        </p>
      </div>
      <div class="item-count">
        <p>
          <span>{{ itemData.totalPrice||"-" }}</span>
          <span>总价</span>
        </p>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'InfoCol',
  props: {
    // 当前渲染item项
    itemData: {
      type: Object,
      default() {
        return {};
      }
    },
    // 左侧每级距离
    leftVal: {
      type: Number,
      default: 32
    },
    // 仅分类信息展示
    typeList: {
      type: Array,
      default() {
        return [{ iconName: 'icon-drawer', name: '示例数据', type: '2' }];
      }
    },
    // 列表整体异常状态模板
    errorMsg: {
      type: Array,
      default() {
        return [
          { code: 1, text: '已删除' },
          { code: 2, text: '已下架' },
          { code: 4, text: '缺少信息' },
          { code: 5, text: '未知' }
        ];
      }
    }
  },
  computed: {
    showTypeGroup() {
      const itemData = this.itemData;
      const typeItem = this.typeList.filter(item => {
        const type =
          itemData.grade > 2
            ? `${itemData.parentType}_${itemData.type}`
            : itemData.type;
        return type === item.type;
      });
      let data = {};
      if (typeItem && typeItem.length > 0) {
        data = typeItem[0];
      }
      return data;
    }
  },
  methods: {
    showErrorMsg(code) {
      let text;
      this.errorMsg.filter(item => {
        if (item.code === code) {
          text = item.text;
        }
      });
      return text;
    }, getLength(value) {
      if (Array.isArray(value)) {
        return value.length;
      } else {
        return 0;
      }
    }
  }
};
</script>


