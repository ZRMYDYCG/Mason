<script setup lang="ts">
import { computed, ref } from 'vue'
import { merge } from 'lodash-es'
import { useElementSize } from '@vueuse/core'

interface IBorderBoxProps {
  color?: [string, string]
  backgroundColor?: string
}

const props = withDefaults(defineProps<IBorderBoxProps>(), {
  color: () => [],
  backgroundColor: 'transparent'
})

const defaultColor = ['#6586ec', '#2cf7fe']
const domRef = ref(null)
const { width, height } = useElementSize(domRef, { width: 0, height: 0 }, { box: 'border-box' })
const mergedColor = computed<[string, string]>(() => {
  return merge(defaultColor, props.color)
})
</script>

<template>
  <div class="dv-border-box-13 dv-border-box" ref="domRef">
    <svg :width="width" :height="height" class="dv-border-svg-container">
      <path
        :fill="backgroundColor"
        :stroke="mergedColor[0]"
        :d="`
            M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
            L ${width - 20} 10 L ${width - 5} 25
            L ${width - 5} ${height - 5} L 20 ${height - 5}
            L 5 ${height - 20} L 5 20
        `"
      />

      <path
        fill="transparent"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="10, 5"
        :stroke="mergedColor[0]"
        :d="`M 16 9 L 61 9`"
      />

      <path
        fill="transparent"
        stroke="{mergedColor[1]}"
        :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`"
      />

      <path
        fill="transparent"
        :stroke="mergedColor[1]"
        :d="`M ${width - 5} ${height - 30} L ${width - 5} ${height - 5} L ${
          width - 30
        } ${height - 5}`"
      />
    </svg>
    <div class="dv-border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dv-border-box {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.dv-border-svg-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: block;
}
.dv-border-box-content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
