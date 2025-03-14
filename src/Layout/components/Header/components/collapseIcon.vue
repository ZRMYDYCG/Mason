<template>
  <iconpark-icon
    :name="isCollapse ? 'indent-right' : 'indent-left'"
    size="20"
    @click="changeCollapse"
    class="cursor-pointer mr-3"
  ></iconpark-icon>
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
