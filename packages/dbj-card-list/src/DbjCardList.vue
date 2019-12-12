<template>
  <div
    v-if="data.length > 0"
    class="dbj-card-list"
    :class="{'is-checkable': checkable}"
  >
    <dbj-card
      v-for="(item, idx) in data"
      :key="idx"
      :item="item"
      :idx="idx"
      :id-key="props.id"
      :image-key="props.image"
      :name-key="props.name"
      :flag="props.flag"
      :infos="props.infos"
      :commands="props.commands"
      :tags="props.tags"
      :views="props.views"
      :one-line-title="oneLineTitle"
    >
      <slot
        slot="imgAppend"
        name="imgAppend"
        :data="item"
      />
      <slot
        slot="info"
        name="info"
        :item="item"
        :index="idx"
      />
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
  }
};
</script>
