<script setup lang="ts">
import { resolveComponent, h, nextTick, computed } from 'vue'
import MasonTable from '../Table/index.vue'

interface IColumnSettingProps {
  tableColumns: any[]
}

const props = withDefaults(defineProps<IColumnSettingProps>(), {
  tableColumns: () => []
})

const emits = defineEmits(['update:tableColumns'])

const dataFormatToElSwitch = (field) => {
  return {
    renderType: 'html',
    withScopeRow: true,
    formatFunction: ({ row }) => {
      const component = {
        setup() {
          const ElSwitch = resolveComponent('ElSwitch')
          return () => {
            return h(ElSwitch, {
              'model-value': row[field],
              'onUpdate:modelValue': (checked) => {
                updateColumns(field, checked, row)
              }
            })
          }
        }
      }
    }
  }
}

// 表格列设置功能表格列配置
const columnSettingTableColumns = [
  {
    label: '序号',
    prop: '$index',
    width: 80,
    sortable: true
  },
  {
    label: '列名称',
    prop: 'columnTitle',
    width: 160
  },
  {
    label: '是否显示',
    prop: 'isVisible',
    width: 80,
    dataFormatConf: dataFormatToElSwitch('isVisible')
  },
  {
    label: '开启排序',
    prop: 'sortable',
    width: 80,
    dataFormatConf: dataFormatToElSwitch('sortable')
  },
  {
    label: '宽度',
    prop: 'width',
    width: 110,
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ row }) => {
        const component = {
          setup() {
            const ElInput = resolveComponent('ElInput')
            return () => {
              return h(
                ElInput,
                {
                  'model-value': row.width,
                  clearable: true,
                  placeholder: 'auto',
                  'onUpdate:modelValue': (inputValue) => {
                    updateColumns('width', inputValue, row)
                  },
                  onClear: () => {
                    updateColumns('width', 'auto', row)
                  }
                },
                () => []
              )
            }
          }
        }

        return component
      }
    }
  },
  {
    label: '是否固定',
    prop: 'fixed',
    width: 130,
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ row }) => {
        const component = {
          setup() {
            const ElSelect = resolveComponent('ElSelect')
            const ElOption = resolveComponent('ElOption')
            return () => {
              return h(
                ElSelect,
                {
                  'model-value': row.fixed,
                  clearable: true,
                  'onUpdate:modelValue': (selectedValue) => {
                    updateColumns('fixed', selectedValue, row)
                  },
                  onClear: () => {
                    updateColumns('fixed', false, row)
                  }
                },
                () => [
                  h(ElOption, {
                    value: false,
                    label: '不固定'
                  }),
                  h(ElOption, {
                    value: 'left',
                    label: '固定-左侧'
                  }),
                  h(ElOption, {
                    value: 'right',
                    label: '固定-右侧'
                  })
                ]
              )
            }
          }
        }

        return component
      }
    }
  }
]

// 更新表格列
const updateColumns = (field, value, row) => {
  nextTick(() => {
    const tableColumns = [...props.tableColumns]
    const index = tableColumns.findIndex((column) => {
      return column.prop === row.originColumnProp
    })
    if (index !== -1) {
      tableColumns[index][field] = value
      emits('update:tableColumns', tableColumns)
    }
  })
}

// 列设置表格数据
const columnSettingTableData = computed(() => {
  const columnSettingTableDataFormated = []
  props.tableColumns.forEach((tbColumn) => {
    const columnSettingTableDataFormatedRow = {
      // 记录原始表格prop, 后期做映射动态调整是否显示、是否开启排序、是否固定列等状态
      originColumnProp: tbColumn.prop
    }
    columnSettingTableColumns.forEach((columnSettingTableColumn) => {
      let columnSettingTableDataFormatedColValue = null
      if (columnSettingTableColumn.prop === 'isVisible') {
        // 是否显示
        columnSettingTableDataFormatedColValue = tbColumn.isVisible !== false
      } else if (columnSettingTableColumn.prop === 'columnTitle') {
        // 列名称
        columnSettingTableDataFormatedColValue = tbColumn.label
      } else if (columnSettingTableColumn.prop === 'sortable') {
        // 是否开启排序
        columnSettingTableDataFormatedColValue = tbColumn.sortable === true
      } else if (columnSettingTableColumn.prop === 'width') {
        // 列宽设置
        columnSettingTableDataFormatedColValue = [undefined].includes(tbColumn.width)
          ? 'auto'
          : tbColumn.width
      } else if (columnSettingTableColumn.prop === 'fixed') {
        // 是否固定列
        columnSettingTableDataFormatedColValue = [undefined, false].includes(tbColumn.fixed)
          ? false
          : tbColumn.fixed
      }
      columnSettingTableDataFormatedRow[columnSettingTableColumn.prop] =
        columnSettingTableDataFormatedColValue
    })
    columnSettingTableDataFormated.push(columnSettingTableDataFormatedRow)
  })
  return columnSettingTableDataFormated
})
</script>

<template>
  <MasonTable
    :columns="columnSettingTableColumns"
    :data="columnSettingTableData"
    :height="300"
    size="small"
    :show-overflow-tooltip="true"
    :pagination="{ isShow: false }"
  ></MasonTable>
</template>

<style lang="scss" scoped>
.nt-table {
  padding-bottom: 0;
  margin-bottom: 0;

  :deep(.el-table) {
    .el-table__inner-wrapper {
      &::before {
        display: none;
      }
    }
  }
}
</style>
