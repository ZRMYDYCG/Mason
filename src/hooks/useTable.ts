import { ref } from 'vue'

export const PAGE_SIZES = [10, 20, 30, 40, 50]
export const TABLE_COLUMN_OPERATE = {
  DETAIL: Symbol('detail'),
  EDIT: Symbol('edit'),
  DELETE: Symbol('delete')
}

export default function useTable(
  emit: any,
  options?: {
    pagination?: {
      initialPageSize?: number
      pageSizes?: number[]
    }
  }
) {
  // 分页相关
  const currentPage = ref(1)
  const pageSize = ref(options?.pagination?.initialPageSize || PAGE_SIZES[0])

  // 分页事件处理
  const handleSizeChange = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
    emit('sizeChange', size)
  }

  const handleCurrentChange = (page: number) => {
    currentPage.value = page
    emit('pageChange', page)
  }

  // 操作按钮通用处理
  const createOperationHandler = (type: symbol) => (column: any, row: any) => {
    const operation = column.operateList?.[type]
    if (operation?.action) {
      operation.action(row)
    } else {
      // 利用 Symbol 描述符生成事件名
      emit(type.description?.toLowerCase(), { data: row })
    }
  }

  return {
    // 分页相关
    pagination: {
      currentPage,
      pageSize,
      pageSizes: options?.pagination?.pageSizes || PAGE_SIZES,
      handleSizeChange,
      handleCurrentChange
    },

    // 操作处理
    operations: {
      handleDetail: createOperationHandler(TABLE_COLUMN_OPERATE.DETAIL),
      handleEdit: createOperationHandler(TABLE_COLUMN_OPERATE.EDIT),
      handleDelete: createOperationHandler(TABLE_COLUMN_OPERATE.DELETE)
    }
  }
}
