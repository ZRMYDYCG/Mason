<template>
  <div class="role-manage">
    <div class="card search-container mb10">
      <el-form ref="searchFormRef" :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="角色：">
          <el-input v-model="searchForm.role" placeholder="输入角色" clearable />
        </el-form-item>
        <el-form-item label="超级管理员" prop="isSuper">
          <el-select v-model="searchForm.isSuper">
            <el-option
              v-for="item in superOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">
            <AppIcon name="search" class="btn-icon mr4" /><span>搜索</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card table-container">
      <div class="table-btns mb18">
        <el-button type="primary" class="table-button" @click="handleNew">
          <AppIcon name="plus" class="btn-icon mr4" /><span>新增角色</span>
        </el-button>
      </div>
      <CustomTable
        class="table-content"
        :columns="columns"
        :data="tableData"
        :is-show-setting="true"
        :pagination="{
          isShow: true,
          total: pagination.total,
          layout: 'total, sizes, prev, pager, next, jumper'
        }"
        border
        @page-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <template #otherOperate="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row)">
            <AppIcon name="square-pen" class="btn-icon mr4" /> <span>编辑</span>
          </el-button>
          <el-popconfirm
            @confirm="handleDelete(row.id)"
            confirm-button-text="确认"
            cancel-button-text="否"
            title="确认删除该角色?"
          >
            <template #reference>
              <el-button link type="primary" size="small">
                <AppIcon name="trash-2" class="btn-icon mr4" /><span>删除</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </CustomTable>
    </div>
    <RoleDialog ref="roleDialogRef" @refresh="onSearch" />
  </div>
</template>

<script setup lang="ts">
import RoleDialog from './components/role-dialog.vue'
import CustomTable from '@/components/custom-table/index.vue'
import { h, onMounted, ref, reactive, resolveComponent } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { deleteRole, getRoleList } from '@/api/modules/system'
import { Role } from '@/api/interface/system'

onMounted(() => {
  onSearch()
})

const tableData = ref<Role[]>([])

const searchFormRef = ref<FormInstance>()
const searchForm = reactive({
  role: '',
  isSuper: 2
})

const superOptions = [
  {
    value: 2,
    label: '全部'
  },
  {
    value: 1,
    label: '是'
  },
  {
    value: 0,
    label: '否'
  }
]

const columns = ref([
  { prop: 'id', label: 'Id', width: 50, isVisible: true },
  { prop: 'role', label: '角色', width: 150, isVisible: true },
  { prop: 'roleName', label: '角色名称', width: 150, isVisible: true },
  {
    prop: 'isSuper',
    label: '超级管理员',
    width: 150,
    isVisible: true,
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ row }: { row: Role }) => ({
        setup() {
          const ElTag = resolveComponent('ElTag')
          return () =>
            h(
              ElTag,
              { type: row.isSuper === 1 ? 'success' : 'danger' },
              () => (row.isSuper === 1 ? '是' : '否')
            )
        }
      })
    }
  },
  { prop: 'createdAt', label: '创建时间', width: 180, isVisible: true },
  { prop: 'remark', label: '备注', isVisible: true },
  {
    prop: 'TABLE_COLUMN_OPTS',
    label: '操作',
    width: 160,
    fixed: 'right',
    isVisible: true
  }
])

const pagination = reactive({
  total: 0,
  pageSize: 10,
  currentPage: 1
})

async function onSearch() {
  const searchParam = {
    role: searchForm.role,
    isSuper: searchForm.isSuper,
    pageNo: pagination.currentPage,
    pageSize: pagination.pageSize
  }
  const { data } = await getRoleList(searchParam)
  tableData.value = data.rows
  pagination.total = data.count
}

const handleSizeChange = async (val: number) => {
  pagination.pageSize = val
  pagination.currentPage = 1
  await onSearch()
}
const handleCurrentChange = async (val: number) => {
  pagination.currentPage = val
  await onSearch()
}

const handleDelete = async (id: number) => {
  const res = await deleteRole(id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
  } else {
    onSearch()
    ElMessage.success(res.msg)
  }
}

const roleDialogRef = ref<InstanceType<typeof RoleDialog>>()
const handleNew = () => {
  roleDialogRef.value?.handleNew()
}
const handleEdit = (row: Role) => {
  roleDialogRef.value?.handleEdit(row)
}
</script>

<style scoped>
.el-select {
  width: 100px;
}
</style>
