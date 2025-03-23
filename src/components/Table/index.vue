<!--
  * 封装原则: 不破坏原ElTable组件,只封装逻辑和最小粒度的样式
-->
<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'MasonTable'
})

const PAGE_SIZES = [10, 20, 30, 40, 50]

const TABLE_COLUMN_OPERATE = {
  DETAIL: Symbol('detail'),
  EDIT: Symbol('edit'),
  DELETE: Symbol('delete')
}

interface TableColumnOptions {
  [key: string]: any
}

interface Pagination {
  isShow: boolean
  total: number
  [key: string]: any
}

interface TableProps {
  /* 表格列table-column属性 */
  tableColumnOptions?: TableColumnOptions
  /* 是否有表格展开行 */
  expand?: boolean
  /* 表格columns集合，用于指定如何生成表格栏table-column */
  columns?: any[]
  pagination?: Pagination
}

withDefaults(defineProps<TableProps>(), {
  tableColumnOptions: () => ({}),
  expand: false,
  columns: () => [],
  pagination: () => ({ isShow: true, total: 0 })
})

const emits = defineEmits(['pageChange', 'sizeChange', 'detail', 'edit', 'delete'])

const elTableRef = ref(null)

// 详情按钮点击
const handleClickDetail = (column, $row) => {
  if (column.operateList[TABLE_COLUMN_OPERATE.DETAIL].action) {
    column.operateList[TABLE_COLUMN_OPERATE.DETAIL].action($row)
  } else {
    emits('detail', { data: $row })
  }
}

// 编辑按钮点击
const handleClickEdit = (column, $row) => {
  if (column.operateList[TABLE_COLUMN_OPERATE.EDIT].action) {
    column.operateList[TABLE_COLUMN_OPERATE.EDIT].action($row)
  } else {
    emits('edit', { data: $row })
  }
}

// 删除按钮点击
const handleClickDelete = (column, $row) => {
  if (column.operateList[TABLE_COLUMN_OPERATE.DELETE].action) {
    column.operateList[TABLE_COLUMN_OPERATE.DELETE].action($row)
  } else {
    emits('delete', { data: $row })
  }
}

// 分页相关操作
// 当前页码
const currentPage = ref(1)
// 页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page
  emits('pageChange', page)
}
// 每页条数
const pageSize = ref(PAGE_SIZES[0])
// 每页条数选项变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
  emits('sizeChange', size)
}

defineExpose({
  currentPage,
  pageSize,
  elTableRef
})
</script>

<template>
  <div class="mason-table" :class="{ 'mason-table-pagination': pagination.isShow }">
    <el-table ref="elTableRef" v-bind="$attrs">
      <!--   S 表格展开行   -->
      <el-table-column v-if="expand" type="expand">
        <template #default="{ $row }">
          <slot name="expand" :row="$row"></slot>
        </template>
      </el-table-column>
      <!--   E 表格展开行   -->

      <!-- S 需要调用el-table-column组件时 -->
      <slot></slot>
      <!-- S 需要调用el-table-column组件时 -->

      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        v-bind="{
          ...tableColumnOptions
        }"
        :type="column.prop === 'TABLE_COLUMN_CHECKBOX' ? 'selection' : 'default'"
        :prop="column.prop"
        :fixed="column.fixed"
        :width="column.width"
        :min-width="column.minWidth"
        :sortable="column.sortable"
        :show-overflow-tooltip="column.showOverflowTooltip"
      >
        <!--    S 表头单元格    -->
        <template #header>
          <template v-if="column?.tableHeaderConfig?.isShowTips">
            <span>{{ column.label }}</span>
            <el-tooltip
              :content="column.tableHeaderConfig.tipsText"
              placement="top"
              effect="light"
            ></el-tooltip>
          </template>
          <span v-else>{{ column.label }}</span>
        </template>
        <!--    E 表头单元格    -->
        <!--    S 表body单元格    -->
        <template v-if="column.prop !== 'TABLE_COLUMN_CHECKBOX'" #default="{ $index, row: $row }">
          <!--     S 1. 展示索引     -->
          <template v-if="column.prop === '$index'">
            <span>{{ $index + 1 }}</span>
          </template>
          <!--     E 展示索引     -->
          <!--     S 2. 操作栏按钮展示     -->
          <template v-else-if="column.prop === 'TABLE_COLUMN_OPTS'">
            <div class="operation-btns">
              <el-button
                v-if="column.operateList && column.operateList[TABLE_COLUMN_OPERATE.DETAIL]"
                type="primary"
                element-loading
                text
                size="small"
                @click.stop="handleClickDetail(column, $row)"
                >{{
                  column.operateList[TABLE_COLUMN_OPERATE.DETAIL].btnText
                    ? column.operateList[TABLE_COLUMN_OPERATE.DETAIL].btnText
                    : '详情'
                }}</el-button
              >
              <el-button
                v-if="column.operateList && column.operateList[TABLE_COLUMN_OPERATE.EDIT]"
                type="text"
                text
                size="small"
                @click.stop="handleClickEdit(column, $row)"
                >{{
                  column.operateList[TABLE_COLUMN_OPERATE.EDIT].btnText
                    ? column.operateList[TABLE_COLUMN_OPERATE.EDIT].btnText
                    : '编辑'
                }}</el-button
              >
              <el-button
                v-if="column.operateList && column.operateList[TABLE_COLUMN_OPERATE.DELETE]"
                type="text"
                text
                size="small"
                @click.stop="handleClickDelete(column, $row)"
                >删除</el-button
              >
              <slot name="otherOperate" :row="$row" :index="$index"></slot>
            </div>
          </template>
          <!--     E 操作栏按钮展示     -->
          <!--     S 3. 展示数据    -->
          <template v-else>
            <template v-if="column.dataFormatConf">
              <template v-if="column?.dataFormatConf?.withScopeRow === true">
                <template v-if="column?.dataFormatConf?.renderType === 'html'">
                  <component
                    :is="
                      column.dataFormatConf?.formatFunction(
                        {
                          row: $row,
                          value: $row[column.prop]
                        },
                        ...(column.dataFormatConf.params ? column.dataFormatConf.params : [])
                      )
                    "
                  ></component>
                </template>
                <template v-else>
                  {{
                    column.dataFormatConf.formatFunction(
                      {
                        row: $row,
                        value: $row[column.prop]
                      },
                      ...(column.dataFormatConf.params ? column.dataFormatConf.params : [])
                    )
                  }}
                </template>
              </template>
              <template v-else>
                <template v-if="column?.dataFormatConf?.renderType === 'html'">
                  <component
                    :is="
                      column.dataFormatConf.formatFunction(
                        $row[column.prop],
                        ...(column.dataFormatConf.params ? column.dataFormatConf.params : [])
                      )
                    "
                  >
                  </component>
                </template>
                <template v-else>
                  {{
                    column.dataFormatConf.formatFunction(
                      $row[column.prop],
                      ...(column.dataFormatConf.params ? column.dataFormatConf.params : [])
                    )
                  }}
                </template>
              </template>
            </template>
            <template v-else> {{ $row[column.prop] }} </template>
          </template>
          <!--     E 展示数据    -->
        </template>
        <!--    E 表body单元格    -->
      </el-table-column>

      <template #empty>
        <slot name="empty"></slot>
      </template>
    </el-table>

    <el-pagination
      v-if="pagination.isShow"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="PAGE_SIZES"
      :small="pagination.small"
      :background="true"
      :layout="pagination.layout ? pagination.layout : 'total, sizes, prev, pager, next, jumper'"
      :total="pagination.total || 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<style scoped lang="scss">
.mason-table {
  .mason-table-pagination {
    margin-bottom: 16px;
  }

  .operation-btns {
    :deep(.el-button) {
      padding: 5px;
    }
  }

  .el-pagination {
    margin-top: 12px;
    margin-left: 16px;
  }
}
</style>
