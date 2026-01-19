<template>
  <div class="system-log">
    <div class="card">
      <div class="search-container mb10">
        <el-form ref="searchFormRef" :inline="true" :model="searchForm" class="search-form">
          <el-form-item :label="t('systemLog.label.user')">
            <el-input
              v-model="searchForm.username"
              :placeholder="t('systemLog.placeholder.username')"
              clearable
            />
          </el-form-item>
          <el-form-item :label="t('systemLog.label.path')">
            <el-input
              v-model="searchForm.path"
              :placeholder="t('systemLog.placeholder.path')"
              clearable
            />
          </el-form-item>
          <el-form-item :label="t('systemLog.label.method')">
            <el-select
              v-model="searchForm.method"
              :placeholder="t('systemLog.placeholder.all')"
              clearable
            >
              <el-option label="GET" value="GET" />
              <el-option label="POST" value="POST" />
              <el-option label="PUT" value="PUT" />
              <el-option label="PATCH" value="PATCH" />
              <el-option label="DELETE" value="DELETE" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemLog.label.status')">
            <el-select
              v-model="searchForm.status"
              :placeholder="t('systemLog.placeholder.all')"
              clearable
            >
              <el-option label="200" :value="200" />
              <el-option label="400" :value="400" />
              <el-option label="401" :value="401" />
              <el-option label="403" :value="403" />
              <el-option label="404" :value="404" />
              <el-option label="500" :value="500" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemLog.label.range')">
            <el-date-picker
              v-model="searchForm.range"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              :start-placeholder="t('systemLog.placeholder.start')"
              :end-placeholder="t('systemLog.placeholder.end')"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch(true)">{{
              t('systemLog.action.search')
            }}</el-button>
            <el-button @click="onReset">{{ t('systemLog.action.reset') }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-container">
        <el-table class="table-content" :data="tableData" style="width: 100%">
          <el-table-column prop="id" :label="t('systemLog.label.id')" width="80" />
          <el-table-column prop="username" :label="t('systemLog.label.user')" width="160">
            <template #default="{ row }">
              {{ row.username || row.userId || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="method" :label="t('systemLog.label.method')" width="110">
            <template #default="{ row }">
              <el-tag :type="getMethodTag(row.method)" size="small">{{ row.method }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="path"
            :label="t('systemLog.label.path')"
            min-width="200"
            show-overflow-tooltip
          />
          <el-table-column prop="status" :label="t('systemLog.label.status')" width="110">
            <template #default="{ row }">
              <el-tag :type="row.status >= 400 ? 'danger' : 'success'" size="small">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="ip" :label="t('systemLog.label.ip')" width="140" />
          <el-table-column
            prop="duration"
            :label="t('systemLog.label.duration')"
            width="140"
          />
          <el-table-column prop="createdAt" :label="t('systemLog.label.time')" width="180" />
          <el-table-column
            prop="requestParams"
            :label="t('systemLog.label.params')"
            min-width="220"
            show-overflow-tooltip
          />
          <el-table-column
            fixed="right"
            :label="t('systemLog.label.actions')"
            width="120"
            align="center"
          >
            <template #default="{ row }">
              <el-popconfirm
                @confirm="handleDelete(row.id)"
                :confirm-button-text="t('systemLog.action.confirm')"
                :cancel-button-text="t('systemLog.action.cancel')"
                :title="t('systemLog.message.deleteConfirm')"
              >
                <template #reference>
                  <el-button link type="primary" size="small">{{
                    t('systemLog.action.delete')
                  }}</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="table-pagination mt18"
          :total="pagination.total"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :page-sizes="[10, 25, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { deleteSystemLog, getSystemLogList } from '@/api/modules/system'
import type { SystemLog } from '@/api/interface/system'

const { t } = useI18n({ useScope: 'global' })

const searchFormRef = ref<FormInstance>()
const searchForm = reactive({
  username: '',
  path: '',
  method: '',
  status: undefined as number | undefined,
  range: [] as [string, string] | []
})

const tableData = ref<SystemLog[]>([])

const pagination = reactive({
  total: 0,
  pageSize: 10,
  currentPage: 1
})

const getMethodTag = (method: string) => {
  switch (method?.toUpperCase()) {
    case 'GET':
      return 'success'
    case 'POST':
      return 'info'
    case 'PUT':
    case 'PATCH':
      return 'warning'
    case 'DELETE':
      return 'danger'
    default:
      return 'info'
  }
}

const onSearch = async (reset = false) => {
  if (reset) pagination.currentPage = 1
  const [startTime, endTime] = Array.isArray(searchForm.range) ? searchForm.range : []

  const params = {
    username: searchForm.username,
    path: searchForm.path,
    method: searchForm.method,
    status: searchForm.status,
    startTime: startTime || '',
    endTime: endTime || '',
    pageNo: pagination.currentPage,
    pageSize: pagination.pageSize
  }

  const { data } = await getSystemLogList(params)
  tableData.value = data.rows
  pagination.total = data.count
}

const onReset = async () => {
  searchFormRef.value?.resetFields()
  searchForm.status = undefined
  searchForm.range = []
  await onSearch(true)
}

const handleSizeChange = async (val: number) => {
  pagination.pageSize = val
  await onSearch(true)
}

const handleCurrentChange = async (val: number) => {
  pagination.currentPage = val
  await onSearch()
}

const handleDelete = async (id: number) => {
  const res = await deleteSystemLog(id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success(res.msg)
  await onSearch()
}

onMounted(() => {
  onSearch()
})
</script>

<style scoped>
.search-form .el-input {
  --el-input-width: 200px;
}

.search-form .el-select {
  --el-select-width: 160px;
}

.search-form .el-date-editor {
  width: 320px;
}

.table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.table-content {
  flex: 1;
}

.table-pagination {
  justify-content: right;
}
</style>
