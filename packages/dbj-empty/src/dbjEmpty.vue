<template>
  <div class="dbj-empty" :class="{'dbj-empty--no-img': noImg}">
    <div class="dbj-empty__body">
      <slot name="img">
        <img v-if="!noImg" class="dbj-empty__img" src="./asset/default-empty@2x.png">
      </slot>
      <div class="dbj-empty__title">
        {{ title }}
      </div>
      <slot name="tip">
        <div v-if="tip" class="dbj-empty__tip">
          {{ tip }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DbjEmpty',
  props: {
    title: {
      type: String,
      default: '没有数据'
    },
    tip: String,
    noImg: Boolean
  }
};
</script>
