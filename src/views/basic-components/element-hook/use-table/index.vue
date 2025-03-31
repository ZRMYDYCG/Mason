<template>
  <div>
    <el-table :data="tableData" v-loading="loading" @sort-change="handleSortChange">
      <el-table-column prop="name" label="姓名" sortable />
      <el-table-column prop="age" label="年龄" />
    </el-table>

    <el-pagination
      v-model:current-page="pageParams.currentPage"
      v-model:page-size="pageParams.pageSize"
      :total="pageParams.total"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@/hooks/useTable'

const api = {
  getUsers: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            list: [
              { name: '张三', age: 20 },
              { name: '王五', age: 30 },
              { name: '李四', age: 25 },
              { name: '李四', age: 25 },
              { name: '李四', age: 25 },
              { name: '张三', age: 20 },
              { name: '王五', age: 30 },
              { name: '李四', age: 25 },
              { name: '李四', age: 25 },
              { name: '李四', age: 25 },
              { name: '张三', age: 20 },
              { name: '王五', age: 30 },
              { name: '李四', age: 25 },
              { name: '李四', age: 25 },
              { name: '李四', age: 25 },
              { name: '李四', age: 25 }
            ],
            total: 16
          }
        })
      }, 1000)
    })
  }
}

const fetchUsers = async (params) => {
  const res = await api.getUsers(params)
  return {
    list: res.data.list,
    total: res.data.total
  }
}

const {
  tableData,
  loading,
  pageParams,
  handlePageChange,
  handleSizeChange,
  handleSortChange,
  handleSearch
} = useTable(fetchUsers, { currentPage: 1, pageSize: 10 })

handleSearch()
</script>
