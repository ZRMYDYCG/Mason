<script setup lang="ts">
import { ref } from 'vue'
import MasonTable from '@/components/Table/index.vue'
import MasonSearchFormFilter from '@/components/SearchFormFilter/index.vue'
import MasonSearchFormFilterItem from '@/components/SearchFormFilter/components/search-form-filter-item.vue'

// 列表列配置
const columns = [
  {
    label: '用户名',
    prop: 'username'
  },
  {
    label: 'IP地址',
    prop: 'ip'
  },
  {
    label: '浏览器',
    prop: 'browser'
  },
  {
    label: '请求耗时',
    prop: 'requestTime'
  },
  {
    label: '日期',
    prop: 'createTime'
  }
]
// 分页配置
const pagination = ref({
  layout: 'total, prev, pager, next, sizes, jumper',
  // 数据总条数
  total: 0,
  isShow: true
})
// 表格数据
const tableData = ref([
  {
    username: 'user123',
    ip: '192.168.1.1',
    browser: 'Chrome 91.0',
    requestTime: '200ms',
    createTime: '2021-07-15 14:30:00'
  },
  {
    username: 'test456',
    ip: '10.0.0.2',
    browser: 'Firefox 89.0',
    requestTime: '350ms',
    createTime: '2021-07-16 09:45:00'
  },
  {
    username: 'example789',
    ip: '172.16.0.3',
    browser: 'Safari 14.1',
    requestTime: '150ms',
    createTime: '2021-07-17 16:50:00'
  },
  {
    username: 'sample101',
    ip: '192.168.1.4',
    browser: 'Edge 92.0',
    requestTime: '400ms',
    createTime: '2021-07-18 12:20:00'
  },
  {
    username: 'demo202',
    ip: '10.0.0.5',
    browser: 'Chrome 90.0',
    requestTime: '250ms',
    createTime: '2021-07-19 18:05:00'
  }
])
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
    <MasonTable
      :height="500"
      :columns="columns"
      :pagination="pagination"
      :data="tableData"
    ></MasonTable>
  </el-card>
</template>

<style scoped lang="scss"></style>
