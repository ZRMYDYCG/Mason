<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** 图标名称（对应assets/svg目录下的svg文件名） */
  name: string
  /** 预设尺寸（当未指定width/height时生效） */
  size?: 'small' | 'medium' | 'large'
  /** 自定义宽度 */
  width?: string
  /** 自定义高度 */
  height?: string
  /** 自定义class */
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium'
})

const sizeMap = {
  small: 16,
  medium: 24,
  large: 32
}

// 处理数字自动补px
const parseDimension = (value?: string): string | undefined => {
  if (!value) return undefined
  return /^\d*\.?\d+$/.test(value) ? `${value}px` : value
}

const svgSrc = computed(() => {
  return new URL(`/src/assets/svg/${props.name}.svg`, import.meta.url).href
})

const dimensions = computed(() => {
  const baseSize = sizeMap[props.size]
  return {
    width: parseDimension(props.width) ?? `${baseSize}px`,
    height: parseDimension(props.height) ?? `${baseSize}px`
  }
})
</script>

<template>
  <img
    :src="svgSrc"
    :style="{
      width: dimensions.width,
      height: dimensions.height
    }"
    :class="props.class"
    aria-hidden="true"
    alt="#"
  />
</template>

<style lang="scss">
// 尺寸变量
$icon-size-small: 16px;
$icon-size-medium: 24px;
$icon-size-large: 32px;

// 基础样式
img {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.2s ease; // 过渡效果

  // 尺寸预设（备用方案）
  &[data-size='small'] {
    width: $icon-size-small;
    height: $icon-size-small;
  }
  &[data-size='medium'] {
    width: $icon-size-medium;
    height: $icon-size-medium;
  }
  &[data-size='large'] {
    width: $icon-size-large;
    height: $icon-size-large;
  }

  // 禁用样式
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // 高对比度模式支持
  @media (forced-colors: active) {
    forced-color-adjust: auto;
  }
}
</style>
