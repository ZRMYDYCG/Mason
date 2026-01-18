<script setup lang="ts">
import type { Component } from 'vue'
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { CircleHelp } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  selected?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', value: string): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v)
})

const iconModules = import.meta.glob('/node_modules/lucide-vue-next/dist/esm/icons/*.js')
const allIconNames = Object.keys(iconModules)
  .map((p) => p.split('/').pop()?.replace(/\.js$/, '') ?? '')
  .filter((name) => !!name && name !== 'index')
  .sort()

const keyword = ref('')
const currentPage = ref(1)
const pageSize = ref(120)

watch(keyword, () => {
  currentPage.value = 1
})

const filteredIconNames = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return allIconNames
  return allIconNames.filter((n) => n.includes(k))
})

const pageCount = computed(() =>
  Math.max(1, Math.ceil(filteredIconNames.value.length / pageSize.value))
)

watch(pageSize, () => {
  currentPage.value = 1
})

watch(currentPage, () => {
  if (currentPage.value > pageCount.value) currentPage.value = pageCount.value
  if (currentPage.value < 1) currentPage.value = 1
})

const pagedIconNames = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredIconNames.value.slice(start, start + pageSize.value)
})

const componentCache = new Map<string, Component>()
const getIconComponent = (name: string): Component => {
  const cached = componentCache.get(name)
  if (cached) return cached

  const path = `/node_modules/lucide-vue-next/dist/esm/icons/${name}.js`
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

  componentCache.set(name, asyncComponent as unknown as Component)
  return asyncComponent as unknown as Component
}

const handleSelect = (name: string) => {
  emit('select', name)
  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" title="选择图标" width="920">
    <div class="toolbar">
      <el-input
        v-model="keyword"
        placeholder="搜索图标名称（例如：bell / user / arrow）"
        clearable
      />
      <el-select v-model="pageSize" style="width: 120px">
        <el-option :value="60" label="60/页" />
        <el-option :value="120" label="120/页" />
        <el-option :value="240" label="240/页" />
      </el-select>
    </div>

    <el-scrollbar height="520px">
      <div class="grid">
        <button
          v-for="name in pagedIconNames"
          :key="name"
          type="button"
          class="item"
          :class="{ active: name === props.selected }"
          @click="handleSelect(name)"
        >
          <component :is="getIconComponent(name)" :size="22" />
          <div class="label">{{ name }}</div>
        </button>
      </div>
    </el-scrollbar>

    <div class="pager">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredIconNames.length"
        layout="total, prev, pager, next"
      />
    </div>
  </el-dialog>
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  gap: 10px;
  padding: 4px;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 88px;
  padding: 10px 8px;
  cursor: pointer;
  background: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
}

.item:hover {
  border-color: var(--el-color-primary);
}

.item.active {
  border-color: var(--el-color-primary);
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

.label {
  width: 100%;
  overflow: hidden;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pager {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
