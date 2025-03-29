<script setup lang="ts">
import { ref, useAttrs, computed, watch } from 'vue'
import MasonTable from '../Table/index.vue'
import MasonStyleSetting from './style-setting.vue'
import MasonColumnSetting from './column-setting.vue'

interface IMasonCustomTableProps {
  isShowSetting: boolean
}

withDefaults(defineProps<IMasonCustomTableProps>(), {
  isShowSetting: true
})

const attrs = useAttrs()

const tableAttrs = computed(() => {
  return {
    ...attrs,
    ...tableStyleConfig.value,
    columns: computedColumns.value
  }
})

const MasonTableRef = ref<InstanceType<typeof MasonTable> | null>(null)

// 表格风格设置配置
const tableStyleConfig = ref({
  // Table 的尺寸
  size: 'default',
  // 是否为斑马纹 table
  stripe: true,
  // 是否带有纵向边框
  border: true
})

// 表格列column设置配置
const tableColumnConfig = ref(attrs.columns || [])

const computedColumns = computed(() => {
  return tableColumnConfig.value.filter((column) => {
    return column.isVisible !== false
  })
})

const tableStyleSettingPopoverRef = ref()

watch(
  () => tableStyleConfig.value,
  () => {
    // 表格的尺寸变化后，动态调整popover位置
    tableStyleSettingPopoverRef.value?.popperRef?.popperInstanceRef?.update()
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="mason-custom-table">
    <div v-if="isShowSetting" class="mason-custom-table__setting">
      <el-popover title="表格设置" placement="top" :width="400" trigger="click" :hide-after="0">
        <template #reference>
          <el-button circle>
            <template #icon>
              <i class="iconfont icon-biaoge"></i>
            </template>
          </el-button>
        </template>
        <MasonStyleSetting v-model:config="tableStyleConfig"></MasonStyleSetting>
      </el-popover>
      <el-popover title="表格列设置" placement="top" trigger="click" width="auto">
        <template #reference>
          <el-button circle>
            <template #icon>
              <i class="iconfont icon-film"></i>
            </template>
          </el-button>
        </template>
        <MasonColumnSetting v-model:tableColumns="tableColumnConfig"></MasonColumnSetting>
      </el-popover>
    </div>
    <MasonTable ref="MasonTableRef" v-bind="tableAttrs">
      <slot></slot>
      <template #otherOperate="{ row: $row }">
        <slot name="otherOperate" :row="$row"></slot>
      </template>
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </MasonTable>
  </div>
</template>

<style lang="scss" scoped>
.mason-custom-table {
  .mason-custom-table__setting {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
}
</style>
