<script setup lang="ts">
import type { Component } from 'vue'
import { computed, defineAsyncComponent, useAttrs } from 'vue'
import { CircleHelp } from 'lucide-vue-next'

interface Props {
  name?: string
  size?: number | string
  strokeWidth?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 18,
  strokeWidth: 2,
  color: 'currentColor'
})

const iconModules = import.meta.glob('/node_modules/lucide-vue-next/dist/esm/icons/*.js')
const componentCache = new Map<string, Component>()
const attrs = useAttrs()
const iconStyle = computed(() => ({
  color: props.color,
  '--app-icon-color': props.color
}))

const iconComponent = computed<Component>(() => {
  if (!props.name) return CircleHelp
  const cached = componentCache.get(props.name)
  if (cached) return cached

  const path = `/node_modules/lucide-vue-next/dist/esm/icons/${props.name}.js`
  const loader = iconModules[path]
  const asyncComponent = defineAsyncComponent(async () => {
    try {
      if (!loader) return CircleHelp
      const mod: any = await loader()
      return mod?.default ?? mod
    } catch {
      return CircleHelp
    }
  })

  componentCache.set(props.name, asyncComponent as unknown as Component)
  return asyncComponent as unknown as Component
})
</script>

<template>
  <!-- Use div (not span): Element Plus collapse hides `.el-sub-menu__title > span` -->
  <div class="app-icon" v-bind="attrs" :style="iconStyle">
    <component
      :is="iconComponent"
      :size="props.size"
      :color="props.color"
      :stroke-width="props.strokeWidth"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.app-icon {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: var(--app-icon-color);
  cursor: pointer;
}

.app-icon :deep(svg) {
  color: var(--app-icon-color);
  stroke: var(--app-icon-color);
}
</style>
