<script setup lang="ts">
import { ref, reactive, onMounted, resolveComponent, h } from 'vue'
import MasonSearchFormFilter from '@/components/SearchFormFilter/index.vue'
import MasonSearchFormFilterItem from '@/components/SearchFormFilter/components/search-form-filter-item.vue'
import MasonCustomTable from '@/components/CustomTable/index.vue'
import { ElMessageBox } from 'element-plus'

const tableRef = ref<any>(null)

const loadding = ref(false)
const dataList = ref([])

// 筛选条件
const searchFormFilterRef = ref<any>(null)
const searchFormFilter = reactive({
  title: '',
  author: '',
  dynasty: '',
  publishStatus: ''
})

// 列表列配置
const columns = [
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
      formatFunction: ({ value }) => {
        const component = {
          setup() {
            const ElImage = resolveComponent('ElImage')
            return () => {
              return h(ElImage, {
                src: value,
                fit: 'cover',
                'preview-src-list': [value],
                'preview-teleported': true,
                'hide-on-click-modal': true,
                class: 'cover'
              })
            }
          }
        }

        return component
      }
    },
    minWidth: 60
  },
  {
    label: '作者',
    prop: 'author'
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
      formatFunction: ({ value }) => {
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
]

// 分页配置
const pagination = ref({
  layout: 'total, prev, pager, next, sizes, jumper',
  // 数据总条数
  total: 0,
  isShow: true
})

// 模拟数据
const mockData = [
  {
    title: '静夜思',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '李白',
    dynasty: '唐朝',
    publishStatus: '已发布',
    createTime: '2023-01-01'
  },
  {
    title: '春眠不觉晓',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '孟浩然',
    dynasty: '唐朝',
    publishStatus: '已发布',
    createTime: '2023-02-01'
  },
  {
    title: '登鹳雀楼',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '王之涣',
    dynasty: '唐朝',
    publishStatus: '未发布',
    createTime: '2023-03-01'
  }
]

// 获取数据列表
const getDataList = async () => {
  loadding.value = true

  // 模拟分页逻辑
  const { currentPage, pageSize = 10 } = tableRef.value

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = mockData.slice(startIndex, endIndex)

  setTimeout(() => {
    dataList.value = paginatedData
    pagination.value.total = mockData.length
    loadding.value = false
  }, 1500) // 模拟网络延迟
}

// 页码变化
const handleCurrentChange = () => {
  getDataList()
}

// 每页条数选项变化
const handleSizeChange = () => {
  getDataList()
}

// 搜索
const handleSearch = () => {
  tableRef.value.currentPage = 1
  getDataList()
}

onMounted(() => {
  handleSearch()
})

// 重置
const handleReset = () => {
  // 重置表单搜索条件
  tableRef.value.currentPage = 1
  searchFormFilterRef.value.$refs.searchFormFilterRef.resetFields()
  handleSearch()
}

// 详情
const handleShowDetail = (row) => {
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

<template>
  <div class="page-container">
    <el-card shadow="never">
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
          <el-button type="primary" text size="small" @click="handleShowDetail(row)"
            >详情
          </el-button>
        </template>
      </MasonCustomTable>
      <!-- E 表格列表 -->
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
