<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const iconModules = import.meta.glob('/node_modules/lucide-vue-next/dist/esm/icons/*.js')
const allIconNames = Object.keys(iconModules)
  .map((path) => path.split('/').pop()?.replace(/\.js$/, '') ?? '')
  .filter((name) => !!name && name !== 'index')
  .sort((a, b) => a.localeCompare(b))

const keyword = ref('')
const iconSize = ref(28)
const strokeWidth = ref(2)
const iconColor = ref('#1f2937')
const showName = ref(true)
const copyMode = ref<'name' | 'component'>('name')
const viewMode = ref<'grid' | 'table'>('grid')
const tableCurrentPage = ref(1)
const tablePageSize = ref(50)
const galleryStyle = computed(() => ({
  '--preview-icon-color': iconColor.value
}))

const filteredIconNames = computed(() => {
  const value = keyword.value.trim().toLowerCase()
  if (!value) return allIconNames
  return allIconNames.filter((name) => name.includes(value))
})

const previewText = computed(() => {
  if (!filteredIconNames.value.length) return '暂无匹配图标'
  return `共 ${allIconNames.length} 个图标，当前显示 ${filteredIconNames.value.length} 个`
})

const tablePageIconNames = computed(() => {
  const start = (tableCurrentPage.value - 1) * tablePageSize.value
  return filteredIconNames.value.slice(start, start + tablePageSize.value)
})

watch([keyword, tablePageSize], () => {
  tableCurrentPage.value = 1
})

watch(filteredIconNames, () => {
  const pageCount = Math.max(1, Math.ceil(filteredIconNames.value.length / tablePageSize.value))
  if (tableCurrentPage.value > pageCount) tableCurrentPage.value = pageCount
})

const resetOptions = () => {
  keyword.value = ''
  iconSize.value = 28
  strokeWidth.value = 2
  iconColor.value = '#1f2937'
  showName.value = true
  copyMode.value = 'name'
  viewMode.value = 'grid'
  tableCurrentPage.value = 1
  tablePageSize.value = 50
}

const buildCopyText = (name: string) => {
  if (copyMode.value === 'component') {
    return buildComponentText(name)
  }
  return name
}

const buildComponentText = (name: string) =>
  `<AppIcon name="${name}" :size="${iconSize.value}" :stroke-width="${strokeWidth.value}" color="${iconColor.value}" />`

const copyText = async (text: string, message = '复制成功') => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success(message)
  } catch {
    ElMessage.error('复制失败')
  }
}

const handleCopyIcon = (name: string) => {
  copyText(buildCopyText(name), copyMode.value === 'component' ? '组件用法已复制' : '图标名称已复制')
}

const copyIconName = (name: string) => {
  copyText(name, '图标名称已复制')
}

const copyIconComponent = (name: string) => {
  copyText(buildComponentText(name), '组件用法已复制')
}

const copyVisibleNames = () => {
  if (!filteredIconNames.value.length) {
    ElMessage.warning('暂无可复制的图标')
    return
  }
  copyText(filteredIconNames.value.join('\n'), '当前列表已复制')
}
</script>

<template>
  <div class="icon-gallery" :style="galleryStyle">
    <div class="gallery-toolbar">
      <div class="toolbar-main">
        <el-input v-model="keyword" clearable placeholder="搜索图标名称，例如 user / arrow / chart">
          <template #prefix>
            <AppIcon name="search" :size="16" />
          </template>
        </el-input>

        <el-segmented
          v-model="copyMode"
          :options="[
            { label: '复制名称', value: 'name' },
            { label: '复制组件', value: 'component' }
          ]"
        />

        <el-segmented
          v-model="viewMode"
          :options="[
            { label: '网格', value: 'grid' },
            { label: '表格', value: 'table' }
          ]"
        />

        <el-button @click="copyVisibleNames">
          <AppIcon name="copy" :size="16" />
          复制当前列表
        </el-button>

        <el-button @click="resetOptions">
          <AppIcon name="rotate-ccw" :size="16" />
          重置
        </el-button>
      </div>

      <div class="toolbar-options">
        <label class="option-item">
          <span>大小</span>
          <el-slider v-model="iconSize" :min="16" :max="48" :step="1" />
          <strong>{{ iconSize }}px</strong>
        </label>

        <label class="option-item">
          <span>线宽</span>
          <el-slider v-model="strokeWidth" :min="1" :max="3" :step="0.25" />
          <strong>{{ strokeWidth }}</strong>
        </label>

        <div class="color-option">
          <span>颜色</span>
          <el-color-picker v-model="iconColor" />
        </div>

        <el-switch v-model="showName" active-text="显示名称" />
      </div>

      <div class="toolbar-summary">
        {{ previewText }}
      </div>
    </div>

    <div class="icon-list">
      <el-empty v-if="!filteredIconNames.length" description="没有找到匹配的图标" />

      <div v-else-if="viewMode === 'grid'" class="icon-grid">
        <button
          v-for="name in filteredIconNames"
          :key="name"
          class="icon-card"
          type="button"
          :title="name"
          @click="handleCopyIcon(name)"
        >
          <AppIcon
            :key="`${name}-${iconColor}-${iconSize}-${strokeWidth}`"
            :name="name"
            :size="iconSize"
            :stroke-width="strokeWidth"
            color="var(--preview-icon-color)"
          />
          <span v-if="showName">{{ name }}</span>
        </button>
      </div>

      <div v-else class="icon-table-view">
        <el-table
          class="icon-table"
          :data="tablePageIconNames"
          height="100%"
          border
        >
          <el-table-column label="图标" width="96" align="center">
            <template #default="{ row }">
              <div class="table-icon-cell">
                <AppIcon
                  :key="`table-${row}-${iconColor}-${iconSize}-${strokeWidth}`"
                  :name="row"
                  :size="iconSize"
                  :stroke-width="strokeWidth"
                  color="var(--preview-icon-color)"
                />
              </div>
            </template>
          </el-table-column>

          <el-table-column label="名称" min-width="180">
            <template #default="{ row }">
              <span class="table-icon-name">{{ row }}</span>
            </template>
          </el-table-column>

          <el-table-column label="组件用法" min-width="360">
            <template #default="{ row }">
              <code class="usage-code">{{ buildComponentText(row) }}</code>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="188" align="center">
            <template #default="{ row }">
              <div class="table-actions">
                <el-button link type="primary" @click="copyIconName(row)">名称</el-button>
                <el-button link type="primary" @click="copyIconComponent(row)">组件</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-pagination">
          <el-pagination
            v-model:current-page="tableCurrentPage"
            v-model:page-size="tablePageSize"
            :page-sizes="[20, 50, 100, 200]"
            :total="filteredIconNames.length"
            layout="total, sizes, prev, pager, next, jumper"
            background
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gallery-toolbar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 8px;
}

.toolbar-main {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) auto auto auto auto;
  gap: 12px;
  align-items: center;
}

.toolbar-options {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr) auto auto;
  gap: 16px;
  align-items: center;
}

.option-item,
.color-option {
  display: grid;
  grid-template-columns: auto minmax(120px, 1fr) auto;
  gap: 10px;
  align-items: center;
  min-width: 0;
  color: var(--text-secondary);
  font-size: 13px;
}

.color-option {
  grid-template-columns: auto auto;
}

.option-item strong {
  min-width: 42px;
  color: var(--text-primary);
  font-weight: 500;
  text-align: right;
}

.toolbar-summary {
  color: var(--text-secondary);
  font-size: 13px;
}

.icon-list {
  height: calc(100vh - 300px);
  min-height: 360px;
  padding: 4px;
  overflow: auto;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  gap: 12px;
}

.icon-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 96px;
  padding: 14px 10px;
  cursor: pointer;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.icon-card:hover {
  border-color: var(--el-color-primary);
  box-shadow: 0 8px 20px rgb(0 0 0 / 8%);
  transform: translateY(-2px);
}

.icon-card :deep(svg) {
  color: var(--preview-icon-color);
  stroke: var(--preview-icon-color) !important;
}

.icon-card span {
  width: 100%;
  overflow: hidden;
  font-size: 12px;
  line-height: 18px;
  color: var(--text-secondary);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-table-view {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 12px;
  height: 100%;
}

.icon-table {
  height: 100%;
}

.table-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0 0;
  border-top: 1px solid var(--border-default);
}

.table-icon-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--preview-icon-color);
}

.table-icon-cell :deep(svg) {
  color: var(--preview-icon-color);
  stroke: var(--preview-icon-color) !important;
}

.table-icon-name {
  color: var(--text-primary);
  font-weight: 500;
}

.usage-code {
  display: inline-block;
  max-width: 100%;
  padding: 4px 8px;
  overflow: hidden;
  color: var(--text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
  background: var(--fill-secondary);
  border-radius: 6px;
}

.table-actions {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .toolbar-main,
  .toolbar-options {
    grid-template-columns: 1fr;
  }

  .option-item {
    grid-template-columns: 42px minmax(120px, 1fr) 42px;
  }

  .icon-list {
    height: calc(100vh - 420px);
    min-height: 320px;
  }
}
</style>
