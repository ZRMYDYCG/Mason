<script setup lang="ts">
import { ref } from 'vue'
import MasonTable from '@/components/Table/index.vue'
import MasonSearchFormFilter from '@/components/SearchFormFilter/index.vue'
import MasonSearchFormFilterItem from '@/components/SearchFormFilter/components/search-form-filter-item.vue'

const tableData = ref([
  {
    id: 1,
    path: '/user/list',
    grouping: '系统管理',
    description: '获取用户列表',
    requestType: 'GET',
    publishStatus: '已发布',
    createTime: '2024-01-01'
  },
  {
    id: 2,
    path: '/user/delete',
    grouping: '系统管理',
    description: '删除用户',
    requestType: 'POST',
    publishStatus: '已发布',
    createTime: '2024-02-01'
  }
])

// 列表列配置
const columns = [
  {
    label: 'ID',
    prop: 'id',
    width: 80
  },
  {
    label: '路径',
    prop: 'path'
  },
  {
    label: '分组',
    prop: 'grouping'
  },
  {
    label: '描述',
    prop: 'description'
  },
  {
    label: '请求类型',
    prop: 'requestType'
  },
  {
    label: '状态',
    prop: 'publishStatus'
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
</script>

<template>
  <el-card style="margin-bottom: 20px">
    <MasonSearchFormFilter
      ref="masonSearchFormFilterRef"
      :label-width="80"
      :is-show-fold-unfold-btn="false"
    >
      <template #default>
        <MasonSearchFormFilterItem>
          <el-form-item label="标题:" prop="title">
            <el-input clearable placeholder="请输入搜索关键词" />
          </el-form-item>
        </MasonSearchFormFilterItem>
      </template>
    </MasonSearchFormFilter>
  </el-card>
  <el-card>
    <el-row>
      <el-button type="primary" style="margin-bottom: 20px">
        <template #icon>
          <i class="iconfont icon-add" />
        </template>
        新增
      </el-button>
    </el-row>
    <MasonTable :height="500" :columns="columns" :pagination="pagination" :data="tableData">
      <template #otherOperate="">
        <el-button type="primary" text size="small">详情</el-button>
        <el-button type="primary" text size="small">编辑</el-button>
        <el-button type="primary" text size="small">删除</el-button>
      </template>
    </MasonTable>
  </el-card>
</template>

<style scoped lang="scss"></style>
