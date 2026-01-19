<script setup lang="ts">
import BorderBox13 from './border-box.vue'

interface IItemWrapProps {
  title?: number | string
}

const props = withDefaults(defineProps<IItemWrapProps>(), {
  title: ''
})
</script>

<template>
  <BorderBox13>
    <div class="item_title" v-if="title !== ''">
      <div class="zuo"></div>
      <span class="title-inner"> &nbsp;&nbsp;{{ title }}&nbsp;&nbsp; </span>
      <div class="you"></div>
    </div>
    <div :class="title !== '' ? 'item_title_content' : 'item_title_content_def'">
      <slot></slot></div
  ></BorderBox13>
</template>

<style scoped>
.item_title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 38px;
  line-height: calc(100% - 38px);
  color: #31abe3;
  text-align: center;

  .zuo,
  .you {
    width: 58px;
    height: 14px;
    background-image: url('@/assets/img/titles/zuo.png');
  }

  .you {
    transform: rotate(180deg);
  }

  .title-inner {
    font-weight: 900;
    letter-spacing: 2px;
    background: linear-gradient(92deg, #0072ff 0%, #00eaff 48%, #01aaff 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

:deep(.dv-border-box-content) {
  box-sizing: border-box;
  padding: 6px 16px 0;
}

.item_title_content {
  height: calc(100% - 38px);
}

.item_title_content_def {
  width: 100%;
  height: 100%;
}
</style>
