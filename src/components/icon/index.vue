<template>
  <div v-if="type === 'uno'" :class="icon" />
  <iconify-icon v-else-if="type === 'iconify'" :icon="icon" class="icon" :aria-hidden="false" />
  <svg v-else-if="type === 'svg'" class="svg">
    <use :href="svgSymbolId" fill="currentColor" />
  </svg>
  <i v-else-if="type === 'iconfont'" :class="iconfontClassName" />
  <span v-else>Unsupported type: {{ type }}</span>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
defineOptions({ name: 'Icon' })

const props = withDefaults(
  defineProps<{
    type?: 'uno' | 'svg' | 'iconify' | 'iconfont'
    icon: string
    prefix?: string
    fontFamily?: string
    fontUrl?: string
  }>(),
  {
    type: 'iconify',
    prefix: 'icon',
    fontFamily: 'iconfont',
  }
)

onBeforeMount(() => {
  if (props.type === 'iconfont' && props.fontUrl) {
    const existingLink = document.querySelector(`link[href="${props.fontUrl}"]`)
    if (!existingLink) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = props.fontUrl
      document.head.appendChild(link)
    }
  }
})

const svgSymbolId = computed(() => `#${props.prefix}-${props.icon}`)

const iconfontClassName = computed(() => `${props.fontFamily} ${props.prefix}-${props.icon}`)
</script>

<style scoped lang="scss">
.icon {
  @apply inline-block align-mid text-xl;
}
.svg {
  @apply inline-block align-mid;
  width: 1rem;
  height: 1rem;
}
</style>
