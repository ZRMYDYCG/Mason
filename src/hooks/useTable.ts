import { ref, reactive } from 'vue'

type Pagination = {
  currentPage: number
  pageSize: number
  total: number
}

type SortParams = {
  prop?: string
  order?: 'ascending' | 'descending' | null
}

type FetchDataFn<T = any> = (params: Record<string, any>) => Promise<{
  list: T[]
  total: number
}>

export function useTable<T = any>(
  fetchDataFn: FetchDataFn<T>,
  initQueryParams: Record<string, any> = {}
) {
  // 表格数据
  const tableData = ref<any>([])
  // 加载状态
  const loading = ref(false)
  // 分页参数
  const pageParams = reactive<Pagination>({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
  // 排序参数
  const sortParams = ref<SortParams>({})
  // 查询参数
  const queryParams = ref<Record<string, any>>(initQueryParams)

  // 获取表格数据
  const fetchData = async () => {
    try {
      loading.value = true

      // 组合请求参数
      const params = {
        ...queryParams.value,
        page: pageParams.currentPage,
        pageSize: pageParams.pageSize,
        ...(sortParams.value.prop
          ? {
              sortField: sortParams.value.prop,
              sortOrder: sortParams.value.order
            }
          : {})
      }

      const { list, total } = await fetchDataFn(params)

      tableData.value = list
      pageParams.total = total
    } finally {
      loading.value = false
    }
  }

  // 分页变化
  const handlePageChange = async (newPage: number) => {
    pageParams.currentPage = newPage
    await fetchData()
  }

  // 每页数量变化
  const handleSizeChange = async (newSize: number) => {
    pageParams.pageSize = newSize
    pageParams.currentPage = 1
    await fetchData()
  }

  // 排序变化
  const handleSortChange = async ({ prop, order }: { prop: any; order: any }) => {
    sortParams.value = { prop, order }
    await fetchData()
  }

  // 查询方法
  const handleSearch = async (params?: Record<string, any>) => {
    queryParams.value = { ...queryParams.value, ...params }
    pageParams.currentPage = 1
    await fetchData()
  }

  return {
    // 状态
    tableData,
    loading,
    pageParams,
    queryParams,

    // 方法
    fetchData,
    handlePageChange,
    handleSizeChange,
    handleSortChange,
    handleSearch
  }
}
