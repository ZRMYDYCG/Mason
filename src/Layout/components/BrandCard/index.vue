<script setup lang="ts">
import { computed } from 'vue'
import { useGlobalStore } from '@/store/modules/global'
import stillLife from '@/assets/images/dashboard/mason-still-life.jpg'

const props = withDefaults(
  defineProps<{
    href?: string
  }>(),
  {
    href: 'https://mason.versakit.online'
  }
)

const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)

const openDocs = () => {
  window.open(props.href, '_blank')
}
</script>

<template>
  <button
    v-show="!isCollapse"
    type="button"
    class="brand-card"
    aria-label="Mason — Good Design Builds Better Days"
    @click="openDocs"
  >
    <span
      class="brand-card__media"
      :style="{ backgroundImage: `url(${stillLife})` }"
      role="img"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped>
.brand-card {
  display: block;
  flex: 0 0 280px;
  width: calc(100% - 20px);
  height: 280px;
  padding: 0;
  margin: 6px 10px 12px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.brand-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.brand-card:focus-visible {
  outline: 2px solid rgba(var(--color-primary-rgb), 0.35);
  outline-offset: 2px;
}

.brand-card__media {
  display: block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

html.dark .brand-card {
  border-color: var(--border-light);
  opacity: 0.92;
}
</style>
