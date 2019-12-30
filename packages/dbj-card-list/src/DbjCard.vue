<template>
  <el-card
    class="dbj-card"
    :class="{
      'is-checked': isChecked
    }"
  >
    <div
      class="dbj-card__inner"
      @click="handleCardClick"
    >
      <img
        v-if="flag"
        v-show="flagShow"
        class="dbj-card__flag"
        :src="flag.img"
      >
      <div
        class="dbj-card__pic"
        @click="handleImageClick"
      >
        <span
          v-if="$parent.checkable"
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
      <div class="dbj-card__checked-border" />
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
            v-for="(info, idx2) in infos"
            :key="idx2"
            class="dbj-card__info"
            :title="getValueByPath(item, info.prop)"
          >
            <span v-if="info.label">{{ info.label }}：</span>{{ getValueByPath(item, info.prop) || '暂无' }}
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
          <el-dropdown-menu slot="dropdown">
            <template v-for="(command, idx2) in commands">
              <el-dropdown-item
                v-if="!command.prop || (command.prop && item[command.prop] === command.showValue)"
                :key="idx2"
                :command="command.value"
              >
                {{ command.text }}
              </el-dropdown-item>
            </template>
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
import { getValueByPath } from 'element-ui/src/utils/util';

export default {
  name: 'DbjCard',
  components: {
    ElCard,
    ElImage,
    ElTag,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
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
      currentEmptyImg: ''
    };
  },
  computed: {
    getValueByPath() {
      return getValueByPath;
    },
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
    flagShow() {
      if (this.flag) {
        let val = getValueByPath(this.item, this.flag.prop);
        if (val === this.flag.showValue) {
          return true;
        }
      }
      return false;
    },
    displayedViews() {
      return this.views.filter(view => this.viewShow(view));
    },
    displayedTags() {
      return this.tags.filter(tag => this.tagShow(tag));
    }
  },
  methods: {
    handleCardClick() {
      if (this.$parent.checkable) {
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
    tagShow(tag) {
      if (tag) {
        let val = getValueByPath(this.item, tag.prop);
        if (val === tag.showValue) {
          return true;
        }
      }
      return false;
    },
    viewShow(view) {
      if (view) {
        let val = getValueByPath(this.item, view.prop);
        if (val === view.showValue) {
          return true;
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
    }
  }
};
</script>
