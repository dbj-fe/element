<template>
  <div
    v-if="data.length > 0"
    class="dbj-card-list"
    :class="{'is-checkable': checkable}"
  >
    <dbj-card
      v-for="(item, idx) in data"
      :key="typeof props.id === 'string' ? item[props.id] : idx"
      :item="item"
      :idx="idx"
      :id-key="props.id"
      :image-key="props.image"
      :oss-compress="props.ossCompress"
      :name-key="props.name"
      :flag="props.flag"
      :disable="props.disable"
      :infos="props.infos"
      :commands="props.commands"
      :tags="props.tags"
      :views="props.views"
      :one-line-title="oneLineTitle"
    >
      <template v-for="slotName in scopedSlotKeys" #[slotName]="slotProps">
        <slot
          :name="slotName"
          :item="item"
          :index="idx"
          :info="slotProps.info"
          :infoIndex="slotProps.index"
        />
      </template>
    </dbj-card>
  </div>
</template>

<script>
import DbjCard from './DbjCard';
export default {
  name: 'DbjCardList',
  components: { DbjCard },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    props: {
      type: Object,
      default: function() {
        return {};
      }
    },
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    checkable: {
      type: Boolean,
      default: false
    },
    deletable: {
      type: Boolean,
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    oneLineTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    scopedSlotKeys() {
      return Object.keys(this.$scopedSlots);
    }
  }
};
</script>
