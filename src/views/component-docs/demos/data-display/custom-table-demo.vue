<script setup lang="ts">
import { ref } from 'vue'
import CustomTable from '@/components/custom-table/index.vue'
import DocExample from '../../components/doc-example.vue'

const tableData = ref([
  { id: 1, name: '张三', role: '管理员', department: '技术部', status: '在职', salary: 25000, joinDate: '2023-01-15' },
  { id: 2, name: '李四', role: '编辑', department: '内容部', status: '在职', salary: 18000, joinDate: '2023-03-22' },
  { id: 3, name: '王五', role: '访客', department: '市场部', status: '离职', salary: 15000, joinDate: '2022-11-08' },
  { id: 4, name: '赵六', role: '管理员', department: '技术部', status: '在职', salary: 28000, joinDate: '2023-06-01' },
  { id: 5, name: '孙七', role: '编辑', department: '设计部', status: '在职', salary: 20000, joinDate: '2023-09-18' },
  { id: 6, name: '周八', role: '访客', department: '财务部', status: '在职', salary: 16000, joinDate: '2022-07-12' }
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 70, isVisible: true, sortable: true },
  { prop: 'name', label: '姓名', minWidth: 100, isVisible: true },
  { prop: 'role', label: '角色', minWidth: 100, isVisible: true },
  { prop: 'department', label: '部门', minWidth: 120, isVisible: true },
  { prop: 'status', label: '状态', width: 80, isVisible: true },
  { prop: 'salary', label: '薪资', minWidth: 100, isVisible: true, sortable: true },
  { prop: 'joinDate', label: '入职日期', minWidth: 120, isVisible: true }
])

const basicCode = `<script setup>
import { ref } from 'vue'
import CustomTable from '@/components/custom-table/index.vue'

const tableData = ref([
  { id: 1, name: '张三', role: '管理员', department: '技术部', status: '在职', salary: 25000, joinDate: '2023-01-15' },
  { id: 2, name: '李四', role: '编辑', department: '内容部', status: '在职', salary: 18000, joinDate: '2023-03-22' }
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 70, isVisible: true, sortable: true },
  { prop: 'name', label: '姓名', minWidth: 100, isVisible: true },
  { prop: 'role', label: '角色', minWidth: 100, isVisible: true },
  { prop: 'department', label: '部门', minWidth: 120, isVisible: true },
  { prop: 'status', label: '状态', width: 80, isVisible: true },
  { prop: 'salary', label: '薪资', minWidth: 100, isVisible: true, sortable: true },
  { prop: 'joinDate', label: '入职日期', minWidth: 120, isVisible: true }
])
<\/script>

<template>
  <CustomTable
    :columns="columns"
    :data="tableData"
    :is-show-setting="true"
    :pagination="{ isShow: true, total: tableData.length }"
    border
  />
</template>`

const hideSettingCode = `<CustomTable
  :columns="columns"
  :data="tableData"
  :is-show-setting="false"
  :pagination="{ isShow: false }"
  border
/>`

const slotCode = `<CustomTable
  :columns="columns"
  :data="tableData"
  :is-show-setting="true"
  :pagination="{ isShow: true, total: tableData.length }"
  border
>
  <template #empty>
    <div>暂无数据</div>
  </template>
</CustomTable>`
</script>

<template>
  <div class="demo-stack">
    <DocExample title="基础用法" :code="basicCode">
      <template #description>
        在 MasonTable 之上叠加「表格设置」与「列设置」。右上角可调整尺寸 / 斑马纹 / 边框，以及列显隐、排序、宽度、固定。
        列需提供 <code>isVisible</code> 字段供列设置使用。
      </template>
      <CustomTable
        :columns="columns"
        :data="tableData"
        :is-show-setting="true"
        :pagination="{ isShow: true, total: tableData.length }"
        border
      />
    </DocExample>

    <DocExample title="隐藏设置入口" :code="hideSettingCode">
      <template #description>
        设置 <code>is-show-setting="false"</code> 后隐藏右上角按钮，行为接近普通 MasonTable。
      </template>
      <CustomTable
        :columns="columns"
        :data="tableData.slice(0, 3)"
        :is-show-setting="false"
        :pagination="{ isShow: false }"
        border
      />
    </DocExample>

    <DocExample title="透传插槽" :code="slotCode">
      <template #description>
        <code>#empty</code>、<code>#otherOperate</code> 等会透传给内部 MasonTable。可在右上角打开设置体验列显隐与样式。
      </template>
      <CustomTable
        :columns="columns"
        :data="tableData.slice(0, 4)"
        :is-show-setting="true"
        :pagination="{ isShow: true, total: tableData.length }"
        border
      >
        <template #empty>
          <div>暂无数据</div>
        </template>
      </CustomTable>
    </DocExample>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
