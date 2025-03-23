<template>
  <i
    @click="changeCollapse"
    :class="['iconfont', isCollapse ? 'icon-toggle-right' : 'icon-toggle-left']"
  ></i>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global'
import { computed } from 'vue'

const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)

const changeCollapse = () => {
  globalStore.setCollapseState(!isCollapse.value)
}
</script>
