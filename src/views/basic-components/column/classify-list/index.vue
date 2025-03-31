<template>
  <div class="page-container page-container--bg flex">
    <div class="poem-category flex">
      <MasonColumn>
        <template #header>
          <div class="truncate">诗歌分类</div>
        </template>

        <MasonList
          v-loading="categoryLoading"
          :list="categoryList"
          :options="categoryListOptions"
          :before-leave="beforeLeaveGuard"
          @switch="handleSwitchCategoryListItem"
          @row-context-menu="handleCategoryRowContextMenu"
        ></MasonList>

        <template #footer>
          <el-button v-ripple type="primary" class="block w-40">新增</el-button>
        </template>
      </MasonColumn>
    </div>

    <div class="poem-list">
      <!-- S 搜索表单 -->
      <MasonSearchFormFilter
        ref="searchFormFilterRef"
        :model="searchFormFilter"
        :inline="true"
        label-width="80"
        label-position="left"
        :loading="loadding"
        :search-handle="handleSearch"
        :reset-handle="handleReset"
      >
        <template #default="{ isFoldFormFilter }">
          <MasonSearchFormFilterItem>
            <el-form-item label="标题:" prop="title">
              <el-input
                v-model.trim="searchFormFilter.title"
                clearable
                placeholder="请输入标题"
                @clear="handleSearch"
              />
            </el-form-item>
          </MasonSearchFormFilterItem>

          <MasonSearchFormFilterItem>
            <el-form-item label="作者名称:" prop="author">
              <el-input
                v-model.trim="searchFormFilter.author"
                clearable
                placeholder="请输入作者"
                @clear="handleSearch"
              />
            </el-form-item>
          </MasonSearchFormFilterItem>

          <MasonSearchFormFilterItem>
            <el-form-item label="时期:" prop="dynasty">
              <el-input
                v-model.trim="searchFormFilter.dynasty"
                clearable
                placeholder="请输入时期"
                @clear="handleSearch"
              />
            </el-form-item>
          </MasonSearchFormFilterItem>

          <MasonSearchFormFilterItem v-show="!isFoldFormFilter">
            <el-form-item label="状态:" prop="publishStatus">
              <el-input
                v-model.trim="searchFormFilter.publishStatus"
                clearable
                placeholder="请输入状态"
                @clear="handleSearch"
              />
            </el-form-item>
          </MasonSearchFormFilterItem>
        </template>
      </MasonSearchFormFilter>
      <!-- E 搜索表单 -->

      <!-- S 表格列表 -->
      <MasonCustomTable
        ref="tableRef"
        v-loading="loadding"
        :data="dataList"
        :columns="columns"
        stripe
        :show-overflow-tooltip="true"
        :pagination="pagination"
        @page-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <template #otherOperate="{ row }">
          <el-button v-ripple type="primary" text size="small" @click="handleShowDetail(row)"
            >详情
          </el-button>
        </template>
      </MasonCustomTable>
      <!-- E 表格列表 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, resolveComponent, h, Component } from 'vue'
import { ElMessageBox } from 'element-plus'
import MasonColumn from '@/components/Column/index.vue'
import MasonList from '@/components/List/index.vue'
import MasonSearchFormFilter from '@/components/SearchFormFilter/index.vue'
import MasonSearchFormFilterItem from '@/components/SearchFormFilter/components/search-form-filter-item.vue'
import MasonCustomTable from '@/components/CustomTable/index.vue'

// 模拟接口数据
const mockApi = {
  getPoemCategoryList: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            code: 'SUCCESS',
            data: [
              { id: '1', name: '唐诗' },
              { id: '2', name: '宋词' },
              { id: '3', name: '元曲' },
              { id: '4', name: '现代诗' }
            ],
            msg: '成功'
          }
        })
      }, 300)
    })
  },

  getPoemList: (params: any) => {
    const { title = '', category = '', page = 1, pageSize = 10 } = params

    // 模拟数据
    const allPoems = [
      {
        id: '1',
        title: '静夜思',
        author: '李白',
        category: '唐诗',
        dynasty: '唐代',
        publishStatus: '已发布',
        createTime: '2023-01-01',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '2',
        title: '春望',
        author: '杜甫',
        category: '唐诗',
        dynasty: '唐代',
        publishStatus: '已发布',
        createTime: '2023-01-02',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '3',
        title: '水调歌头',
        author: '苏轼',
        category: '宋词',
        dynasty: '宋代',
        publishStatus: '已发布',
        createTime: '2023-01-03',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '4',
        title: '念奴娇',
        author: '苏轼',
        category: '宋词',
        dynasty: '宋代',
        publishStatus: '草稿',
        createTime: '2023-01-04',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '5',
        title: '天净沙·秋思',
        author: '马致远',
        category: '元曲',
        dynasty: '元代',
        publishStatus: '已发布',
        createTime: '2023-01-05',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '6',
        title: '再别康桥',
        author: '徐志摩',
        category: '现代诗',
        dynasty: '现代',
        publishStatus: '已发布',
        createTime: '2023-01-06',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '7',
        title: '雨巷',
        author: '戴望舒',
        category: '现代诗',
        dynasty: '现代',
        publishStatus: '草稿',
        createTime: '2023-01-07',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '8',
        title: '登高',
        author: '杜甫',
        category: '唐诗',
        dynasty: '唐代',
        publishStatus: '已发布',
        createTime: '2023-01-08',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '9',
        title: '将进酒',
        author: '李白',
        category: '唐诗',
        dynasty: '唐代',
        publishStatus: '已发布',
        createTime: '2023-01-09',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '10',
        title: '满江红',
        author: '岳飞',
        category: '宋词',
        dynasty: '宋代',
        publishStatus: '已发布',
        createTime: '2023-01-10',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '11',
        title: '青玉案·元夕',
        author: '辛弃疾',
        category: '宋词',
        dynasty: '宋代',
        publishStatus: '已发布',
        createTime: '2023-01-11',
        cover: 'https://placeholder.com/30'
      },
      {
        id: '12',
        title: '沁园春·雪',
        author: '毛泽东',
        category: '现代诗',
        dynasty: '现代',
        publishStatus: '已发布',
        createTime: '2023-01-12',
        cover: 'https://placeholder.com/30'
      }
    ]

    // 过滤逻辑
    let filtered = allPoems
    if (title) {
      filtered = filtered.filter((item) => item.title.includes(title))
    }
    if (category) {
      filtered = filtered.filter((item) => item.category === category)
    }

    // 分页逻辑
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const list = filtered.slice(start, end)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            code: 'SUCCESS',
            data: {
              list,
              total: filtered.length
            },
            msg: '成功'
          }
        })
      }, 500)
    })
  }
}

// 分类
const categoryListOptions = {
  key: 'id',
  label: 'name'
}

const categoryList = ref<Array<{ id: string; name: string }>>([])

// 当前选中的分类
const currentCategoryIndex = ref<string>('')
const currentCategory = ref<Record<string, any>>({})

// 分类列表获取
const categoryLoading = ref<boolean>(false)
const categorySearchFormFilter = reactive<{ name: string }>({
  name: ''
})

const getCategoryList = async () => {
  categoryLoading.value = true

  const { name } = categorySearchFormFilter

  const params = {
    name
  }

  const apiRes = await mockApi.getPoemCategoryList(params).catch((error) => {
    // $message.error({
    //   message: error,
    //   duration: 3000
    // })
    setTimeout(() => {
      // 解决loadding闪烁
      categoryLoading.value = false
    }, 150)
  })

  if (apiRes && apiRes.data) {
    const { code, data, msg } = apiRes.data
    if (code === 'SUCCESS' && data) {
      categoryList.value = [
        {
          id: '',
          name: '全部'
        },
        ...data
      ]
    } else {
      // $message.error({
      //   message: msg,
      //   duration: 3000
      // })
    }
  }
  setTimeout(() => {
    // 解决loadding闪烁
    categoryLoading.value = false
  }, 150)
}
getCategoryList()

const beforeLeaveGuard = async (
  index: number,
  item: { id: string; name: string },
  value: string
) => {
  // 为诗歌列表搜索条件category诗歌分类赋值
  searchFormFilter.category = value

  const apiRes = await handleSearch()
  return apiRes
}

// 模版列表item切换事件响应
const handleSwitchCategoryListItem = (value: string, item: { id: string; name: string }) => {
  currentCategoryIndex.value = value
  currentCategory.value = item
}

// 右键点击事件回调
const handleCategoryRowContextMenu = (
  event: MouseEvent,
  value: string,
  item: { id: string; name: string }
) => {
  event.preventDefault()

  console.log(value, item)
}

const tableRef = ref<any>(null)

// 筛选条件
const searchFormFilterRef = ref<any>(null)
const searchFormFilter = reactive<{
  title: string
  category: string
  author: string
  dynasty: string
  publishStatus: string
}>({
  title: '',
  category: '',
  author: '',
  dynasty: '',
  publishStatus: ''
})

// 列表列配置
const columns = ref<
  Array<{ label: string; prop: string; width?: number; minWidth?: number; dataFormatConf?: any }>
>([
  {
    label: '#',
    prop: '$index',
    width: 80
  },
  {
    label: '标题',
    prop: 'title'
  },
  {
    label: '封面',
    prop: 'cover',
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ value }: { value: string }) => {
        const ElImage = resolveComponent('ElImage') as Component

        return {
          setup() {
            return () => {
              return h(ElImage, {
                src: value,
                fit: 'cover',
                'preview-src-list': [value],
                'preview-teleported': true,
                class: 'cover'
              })
            }
          }
        }
      }
    },
    minWidth: 60
  },
  {
    label: '作者',
    prop: 'author'
  },
  {
    label: '分类',
    prop: 'category'
  },
  {
    label: '时期',
    prop: 'dynasty'
  },
  {
    label: '状态',
    prop: 'publishStatus',
    dataFormatConf: {
      withScopeRow: true,
      formatFunction: ({ value }: { value: string }) => {
        return `${value}`
      }
    }
  },
  {
    label: '创建日期',
    prop: 'createTime'
  },
  {
    label: '操作',
    prop: 'TABLE_COLUMN_OPTS',
    fixed: 'right',
    width: 200,
    overflowTooltip: false
  }
])

// 分页配置
const pagination = ref<{ layout: string; total: number; currentPage?: number; pageSize?: number }>({
  layout: 'total, prev, pager, next, sizes, jumper',
  // 数据总条数
  total: 0
})

// 获取数据列表
const loadding = ref<boolean>(false)
const dataList = ref<any[]>([])
const getDataList = async () => {
  // 接口请求状态
  let apiReqStatus = false
  loadding.value = true

  const { title, category, author, dynasty, publishStatus } = searchFormFilter

  const { currentPage, pageSize } = tableRef.value || { currentPage: 1, pageSize: 10 }
  const params = {
    title,
    category,
    author,
    dynasty,
    publishStatus,
    page: currentPage,
    pageSize
  }

  const apiRes = await mockApi.getPoemList(params).catch((error) => {
    // $message.error({
    //   message: error,
    //   duration: 3000
    // })
    setTimeout(() => {
      // 解决loadding闪烁
      loadding.value = false
    }, 150)
  })

  if (apiRes && apiRes.data) {
    const { code, data, msg } = apiRes.data
    if (code === 'SUCCESS' && data) {
      const { list, total } = data
      dataList.value = list
      pagination.value.total = total
      apiReqStatus = true
    } else {
      // $message.error({
      //   message: msg,
      //   duration: 3000
      // })
    }
  }
  setTimeout(() => {
    // 解决loadding闪烁
    loadding.value = false
  }, 150)
  return apiReqStatus
}

// 页码变化
const handleCurrentChange = (currentPage: number) => {
  if (tableRef.value) {
    tableRef.value.currentPage = currentPage
    getDataList()
  }
}

// 每页条数选项变化
const handleSizeChange = (pageSize: number) => {
  if (tableRef.value) {
    tableRef.value.pageSize = pageSize
    getDataList()
  }
}

// 搜索
const handleSearch = async () => {
  tableRef.value && (tableRef.value.currentPage = 1)
  const apiRes = await getDataList()
  return apiRes
}

onMounted(() => {
  handleSearch()
})

// 重置
const handleReset = () => {
  // 重置表单搜索条件
  tableRef.value && (tableRef.value.currentPage = 1)
  searchFormFilterRef.value && searchFormFilterRef.value.$refs.searchFormFilterRef.resetFields()

  handleSearch()
}

// 详情
const handleShowDetail = (row: Record<string, any>) => {
  ElMessageBox.confirm(
    `
      根据自身业务需要，使用row数据进行相关逻辑处理。
      <br />
      ${JSON.stringify(row)}
    `,
    '提示',
    {
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {})
    .catch(() => {})
  console.log(row)
}
</script>

<style lang="scss" scoped>
:deep(.cover) {
  width: 30px;
}

.poem-category {
  width: 188px;
  height: 260px;
}

.poem-list {
  flex: 1;
  margin-left: 16px;
}
</style>
