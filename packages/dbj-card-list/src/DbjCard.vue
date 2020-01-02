<template>
  <el-card
    class="dbj-card"
    :class="{
      'is-checked': isChecked,
      'is-disabled': isDisabled
    }"
  >
    <div
      class="dbj-card__inner"
      @click="handleCardClick"
    >
      <template v-if="flag">
        <el-tag
          v-if="flag.text"
          v-show="flagShow"
          :type="flag.type"
          :color="flag.color"
          corner
          class="dbj-card__flag"
          >
          {{ flag.text }}
        </el-tag>
        <img
          v-else
          v-show="flagShow"
          class="dbj-card__flag"
          :src="flag.img"
        >
      </template>
      <div
        class="dbj-card__pic"
        @click="handleImageClick"
      >
        <span
          v-if="$parent.checkable && !isDisabled"
          class="dbj-card__checkbox"
          :class="{
            'is-radio': $parent.isRadio
          }"
          type="checkbox"
        />
        <el-image
          v-if="item[currentImgKey || imageKey]"
          :src="item[currentImgKey || imageKey]"
          size="medium"
        >
        </el-image>
        <el-image
          v-else
          :oss-compress="false"
          :src="currentEmptyImg"
          size="medium"
        >
        </el-image>
        <slot name="imgAppend" />
      </div>
      <div class="dbj-card__checked-border"></div>
      <div class="dbj-card__info-wrapper">
        <div
          class="dbj-card__title-wrapper"
          :class="{
            'has-tags': displayedTags.length,
            'one-line-title': oneLineTitle
          }"
        >
          <div class="dbj-card__views-wrapper">
            <div class="dbj-card__title" :title="item[nameKey]">
              {{ item[nameKey] }}
            </div>
            <div
              v-if="displayedViews.length"
              class="dbj-card__views"
              @click="e => e.stopPropagation()"
            >
              <span
                v-for="(view, idx2) in displayedViews"
                :key="idx2"
                class="dbj-card__view"
                @mousemove="handleViewOver(view)"
                @mouseout="handleViewOut"
              >{{ view.text }}</span>
            </div>
          </div>
          <div
            v-if="tags.length"
            class="dbj-card__tags"
          >
            <el-tag
              v-for="(tag, idx2) in displayedTags"
              :key="idx2"
              :type="tag.type"
              :color="tag.color"
            >{{ tag.text }}</el-tag>
          </div>
        </div>
        <ul v-if="infos.length" class="dbj-card__infos">
          <li
            v-for="(info, idx2) in infos2"
            :key="idx2"
            class="dbj-card__info"
            :class="{
              [`dbj-card__info--${info.slot}`]: info.slot,
              'is-array': isArray(info.value)
            }"
            :title="isArray(info.value) ? '' : info.value"
          >
            <slot v-if="info.slot" :name="info.slot" :info="info" :index="idx2" />
            <template v-else-if="isArray(info.value)">
              <div v-if="info.label">{{ info.label }}：</div>
              <div class="dbj-card__info-values-wrapper">
                <ul ref="infoList" :data-idx="idx2" class="dbj-card__info-values">
                  <li v-for="v in info.value" :key="v">{{v}}</li>
                </ul>
              </div>
              <el-tooltip v-if="info.showMoreBtn" placement="bottom">
                <div class="dbj-card__info-more-btn">共{{info.value.length}}个<i class="dbj-icon-arrow-right-d"></i></div>
                <ul slot="content" class="dbj-card__info-values">
                  <li v-for="v in info.value" :key="v">{{v}}</li>
                </ul>
              </el-tooltip>
            </template>
            <template v-else>
              <span v-if="info.label">{{ info.label }}：</span>{{ info.value || '暂无' }}
            </template>
          </li>
        </ul>
        <slot name="info" />
      </div>
      <div
        class="dbj-card__dropdown"
        @click="e => e.stopPropagation()"
      >
        <el-dropdown
          v-if="commands.length > 0"
          trigger="click"
          size="medium"
          placement="bottom-end"
          @command="editItem"
        >
          <i class="dbj-icon-menu" />
          <el-dropdown-menu slot="dropdown" class="dbj-card__dropdown-menu">
            <el-dropdown-item
              v-for="(command, idx2) in displayedCmds"
              :key="idx2"
              :command="command.value"
            >
              {{ command.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        v-if="$parent.deletable"
        class="dbj-card__del-btn"
        @click="$parent.$emit('delete', item, idx)"
      >
        <i class="dbj-icon-close" />
      </div>
    </div>
  </el-card>
</template>

<script>
import ElCard from 'element-ui/packages/card';
import ElImage from 'element-ui/packages/image';
import ElTag from 'element-ui/packages/tag';
import ElDropdown from 'element-ui/packages/dropdown';
import ElDropdownMenu from 'element-ui/packages/dropdown-menu';
import ElDropdownItem from 'element-ui/packages/dropdown-item';
import ElTooltip from 'element-ui/packages/tooltip';
import { getValueByPath } from 'element-ui/src/utils/util';

export default {
  name: 'DbjCard',
  components: {
    ElCard,
    ElImage,
    ElTag,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElTooltip
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    },
    idx: {
      type: Number,
      default: -1
    },
    idKey: {
      type: String,
      default: 'id'
    },
    imageKey: {
      type: String,
      default: 'image'
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    flag: {
      type: Object,
      default: function() {
        return null;
      }
    },
    disable: {
      type: Function
    },
    infos: {
      type: Array,
      default: function() {
        return [];
      }
    },
    commands: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tags: {
      type: Array,
      default: function() {
        return [];
      }
    },
    views: {
      type: Array,
      default: function() {
        return [];
      }
    },
    oneLineTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentImgKey: '',
      currentEmptyImg: '',
      showMoreBtnIdxMap: {}
    };
  },
  computed: {
    model: {
      get() {
        return this.$parent.value;
      },
      set(val) {
        this.$parent.$emit('input', val);
      }
    },
    isChecked() {
      return this.model.indexOf(this.item[this.idKey]) > -1;
    },
    isDisabled() {
      return this.disable && this.disable({ ...this.item });
    },
    flagShow() {
      return this.itemShow(this.flag);
    },
    displayedViews() {
      return this.views.filter(view => this.itemShow(view));
    },
    displayedTags() {
      return this.tags.filter(tag => this.itemShow(tag));
    },
    displayedCmds() {
      return this.commands.filter(cmd => !(cmd.prop || (typeof cmd.showValue === 'function')) || this.itemShow(cmd));
    },
    infos2() {
      return this.infos.map((info, idx2) =>
        ({
          ...info,
          value: this.getInfoValue(this.item, info.prop, info, this.idx, idx2),
          showMoreBtn: this.showMoreBtnIdxMap[idx2 + ''] || false
        })
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.infoList && this.$refs.infoList.length) {
        this.showMoreBtnIdxMap = this.$refs.infoList.reduce((res, dom, idx) => ({...res, [dom.dataset.idx]: dom.scrollHeight > 30}), {});
      }
    });
  },
  methods: {
    handleCardClick() {
      if (this.$parent.checkable) {
        if (this.isDisabled) {
          return;
        }
        if (this.$parent.isRadio) {
          this.model = [this.item[this.idKey]];
        } else {
          let currId = this.item[this.idKey];
          let idx = this.model.indexOf(currId);
          if (idx >= 0) {
            this.model = this.model.filter(item => item !== currId);
          } else {
            this.model = [...this.model, currId];
          }
        }
      }
    },
    handleImageClick() {
      this.$parent.$emit('image-click', this.item);
    },
    getInfoValue(item, prop, info, idx, idx2) {
      if (typeof prop === 'function') {
        return prop({
          item: { ...item },
          index: idx,
          info: { ...info },
          infoIndex: idx2
        });
      } else {
        return getValueByPath(item, prop);
      }
    },
    itemShow(item) {
      if (item) {
        let val = getValueByPath(this.item, item.prop);
        if (typeof item.showValue === 'function') {
          return (item.showValue)({ ...this.item }, val);
        } else {
          if (val === item.showValue) {
            return true;
          }
        }
      }
      return false;
    },
    editItem(cmd) {
      this.$parent.$emit('command', cmd, this.item);
    },
    handleViewOver(view) {
      if (typeof view.image !== 'undefined') {
        this.currentImgKey = view.image;
        this.currentEmptyImg = view.emptyImg;
      }
    },
    handleViewOut() {
      this.currentImgKey = '';
      this.currentEmptyImg = '';
    },
    isArray(param) {
      return Array.isArray(param);
    }
  }
};
</script>
