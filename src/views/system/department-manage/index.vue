<template>
  <div class="card department-manage">
    <div class="table-btns mb18">
      <el-button type="primary" class="table-button" @click="handleNew">
        <AppIcon name="plus" class="btn-icon mr4" /><span>新增部门</span>
      </el-button>
    </div>
    <CustomTable
      class="table-content"
      :columns="columns"
      :data="tableData"
      :is-show-setting="true"
      :pagination="{ isShow: false }"
      row-key="id"
      default-expand-all
      border
      :table-column-options="{ showOverflowTooltip: true }"
    >
      <template #otherOperate="{ row }">
        <el-button link type="primary" size="small" @click="handleEdit(row)">
          <AppIcon name="square-pen" class="btn-icon mr4" /> <span>编辑</span>
        </el-button>
        <el-popconfirm
          @confirm="handleDelete(row.id)"
          confirm-button-text="确认"
          cancel-button-text="否"
          title="确认删除该部门?"
        >
          <template #reference>
            <el-button link type="primary" size="small">
              <AppIcon name="trash-2" class="btn-icon mr4" /><span>删除</span>
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </CustomTable>
    <DepartmentDialog ref="deptDialogRef" @refresh="onSearch" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Department } from '@/api/interface/system'
import { deleteDept, getDepartmentsAll } from '@/api/modules/system'
import CustomTable from '@/components/custom-table/index.vue'
import DepartmentDialog from './components/department-dialog.vue'

onMounted(() => {
  onSearch()
})

const tableData = ref<Department[]>([])

const columns = ref([
  { prop: 'name', label: '部门名称', isVisible: true, showOverflowTooltip: true },
  { prop: 'id', label: '部门ID', isVisible: true, showOverflowTooltip: true },
  { prop: 'sort', label: '顺序', isVisible: true },
  {
    prop: 'TABLE_COLUMN_OPTS',
    label: '操作',
    width: 160,
    fixed: 'right',
    isVisible: true
  }
])

async function onSearch() {
  const { data } = await getDepartmentsAll()
  tableData.value = data
}

const handleDelete = async (id: number) => {
  const res = await deleteDept(id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
  } else {
    onSearch()
    ElMessage.success(res.msg)
  }
}

const deptDialogRef = ref<InstanceType<typeof DepartmentDialog>>()
const handleNew = () => {
  deptDialogRef.value?.handleNew()
}
const handleEdit = (row: Department) => {
  deptDialogRef.value?.handleEdit(row)
}
</script>

<style scoped>
.department-manage {
  height: 100%;
}
</style>
