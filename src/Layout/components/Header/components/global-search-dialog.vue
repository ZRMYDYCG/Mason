<template>
  <el-dialog
    v-model="visible"
    :title="t('search.title')"
    width="640px"
    destroy-on-close
    append-to-body
    class="global-search-dialog"
  >
    <div class="search-body">
      <el-input
        ref="inputRef"
        v-model="keyword"
        clearable
        :placeholder="t('search.placeholder')"
        @keyup.enter="handleEnter"
      >
        <template #prefix>
          <AppIcon name="search" :size="16" />
        </template>
      </el-input>

      <div class="search-results">
        <el-scrollbar v-if="filteredRoutes.length" class="results-scroll">
          <div class="results-list">
            <button
              v-for="item in filteredRoutes"
              :key="item.path"
              type="button"
              class="result-item"
              @click="handleSelect(item)"
            >
              <div class="result-title">{{ item.title }}</div>
              <div class="result-path">{{ item.path }}</div>
            </button>
          </div>
        </el-scrollbar>
        <el-empty v-else :description="t('search.empty')" class="results-empty" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { InputInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/store/modules/auth'
import type { Menu } from '@/api/interface/system'

type SearchItem = {
  id: number
  path: string
  title: string
  isLink: boolean
}

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const inputRef = ref<InputInstance>()
const keyword = ref('')
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n({ useScope: 'global' })

const getMenuTitle = (item: Menu) => {
  const titleKey = item.meta?.titleKey
  const rawTitle = item.meta?.title
  return titleKey ? t(titleKey) : rawTitle
}

const searchableRoutes = computed<SearchItem[]>(() => {
  const seen = new Set<string>()
  return (authStore.flatMenuListGet || [])
    .filter((item) => item.meta?.isEnable)
    .map((item) => {
      const title = getMenuTitle(item) || item.name || item.path
      return {
        id: item.id,
        path: item.path,
        title: title || item.path,
        isLink: item.meta?.isLink ?? false
      }
    })
    .filter((item) => {
      if (!item.path || seen.has(item.path)) return false
      seen.add(item.path)
      return true
    })
})

const normalizedKeyword = computed(() => keyword.value.trim().toLowerCase())

const filteredRoutes = computed(() => {
  const query = normalizedKeyword.value
  if (!query) return searchableRoutes.value.slice(0, 20)
  return searchableRoutes.value
    .filter((item) => {
      const title = item.title.toLowerCase()
      const path = item.path.toLowerCase()
      return title.includes(query) || path.includes(query)
    })
    .slice(0, 50)
})

const handleSelect = (item: SearchItem) => {
  visible.value = false
  keyword.value = ''
  if (item.isLink) {
    window.open(item.path, '_blank')
    return
  }
  if (item.path && item.path !== route.path) {
    router.push(item.path)
  }
}

const handleEnter = () => {
  if (filteredRoutes.value.length) handleSelect(filteredRoutes.value[0])
}

watch(
  () => visible.value,
  (val) => {
    if (!val) return
    keyword.value = ''
    nextTick(() => inputRef.value?.focus())
  }
)
</script>

<style scoped>
.search-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-results {
  min-height: 200px;
}

.results-scroll {
  height: 320px;
  max-height: 50vh;
}

:deep(.results-scroll .el-scrollbar__wrap) {
  max-height: inherit;
  overflow-y: auto;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 4px;
}

.result-item {
  width: 100%;
  padding: 10px 12px;
  color: var(--sys-text);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.result-item:hover {
  color: var(--sys-text);
  background-color: var(--sys-fill-light);
  border-color: var(--sys-border-light);
}

.result-item:focus-visible {
  outline: 2px solid rgba(var(--sys-brand-rgb), 0.35);
  outline-offset: 2px;
}

.result-title {
  font-size: 14px;
  font-weight: 600;
}

.result-path {
  margin-top: 4px;
  font-size: 12px;
  color: var(--sys-text-2);
}

.results-empty {
  margin-top: 20px;
}

:deep(.global-search-dialog) {
  --el-dialog-border-radius: 12px;
}

:deep(.global-search-dialog .el-dialog__body) {
  padding: 12px 16px 18px;
}

:deep(.global-search-dialog .el-input__wrapper) {
  border-radius: 8px;
}
</style>
