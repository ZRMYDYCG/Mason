<script setup lang="ts">
import { ref } from 'vue'
import MasonTable from '@/components/Table/index.vue'
import { TABLE_COLUMN_OPERATE } from '@/components/Table/constants'
import { useMessage } from '@/components/Toast'
import DocExample from '../../components/DocExample.vue'

const message = useMessage()

const demoData = ref([
  { id: 1, name: '张三', role: '管理员', department: '技术部', status: '在职', joinDate: '2023-01-15' },
  { id: 2, name: '李四', role: '编辑', department: '内容部', status: '在职', joinDate: '2023-03-22' },
  { id: 3, name: '王五', role: '访客', department: '市场部', status: '离职', joinDate: '2022-11-08' },
  { id: 4, name: '赵六', role: '管理员', department: '技术部', status: '在职', joinDate: '2023-06-01' },
  { id: 5, name: '孙七', role: '编辑', department: '设计部', status: '在职', joinDate: '2023-09-18' },
  { id: 6, name: '周八', role: '访客', department: '财务部', status: '在职', joinDate: '2022-07-12' },
  { id: 7, name: '吴九', role: '管理员', department: '技术部', status: '在职', joinDate: '2023-02-28' },
  { id: 8, name: '郑十', role: '编辑', department: '运营部', status: '离职', joinDate: '2022-12-05' }
])

const basicColumns = [
  { prop: 'name', label: '姓名', minWidth: 100 },
  { prop: 'role', label: '角色', minWidth: 100 },
  { prop: 'department', label: '部门', minWidth: 120 },
  { prop: 'status', label: '状态', minWidth: 80 }
]

const operateColumns = [
  { prop: 'name', label: '姓名', minWidth: 100 },
  { prop: 'role', label: '角色', minWidth: 100 },
  {
    prop: 'TABLE_COLUMN_OPTS',
    label: '操作',
    width: 200,
    operateList: {
      [TABLE_COLUMN_OPERATE.DETAIL]: { btnText: '详情' },
      [TABLE_COLUMN_OPERATE.EDIT]: { btnText: '编辑' },
      [TABLE_COLUMN_OPERATE.DELETE]: {}
    }
  }
]

const indexColumns = [
  { prop: '$index', label: '序号', width: 70 },
  { prop: 'name', label: '姓名', minWidth: 100 },
  { prop: 'department', label: '部门', minWidth: 120 },
  { prop: 'joinDate', label: '入职日期', minWidth: 120 }
]

const expandColumns = [
  { prop: 'name', label: '姓名', minWidth: 100 },
  { prop: 'role', label: '角色', minWidth: 100 },
  { prop: 'department', label: '部门', minWidth: 120 }
]

const handlePageChange = (page: number) => {
  message.info(`切换到第 ${page} 页`)
}

const handleSizeChange = (size: number) => {
  message.info(`每页显示 ${size} 条`)
}

const handleDetail = (payload: { data: { name: string } }) => {
  message.success(`查看详情：${payload.data.name}`)
}

const handleEdit = (payload: { data: { name: string } }) => {
  message.success(`编辑：${payload.data.name}`)
}

const handleDelete = (payload: { data: { name: string } }) => {
  message.success(`删除：${payload.data.name}`)
}

const basicCode = `<script setup>
import { ref } from 'vue'
import MasonTable from '@/components/Table/index.vue'

const demoData = ref([
  { id: 1, name: '张三', role: '管理员', department: '技术部', status: '在职' },
  { id: 2, name: '李四', role: '编辑', department: '内容部', status: '在职' }
])

const columns = [
  { prop: 'name', label: '姓名', minWidth: 100 },
  { prop: 'role', label: '角色', minWidth: 100 },
  { prop: 'department', label: '部门', minWidth: 120 },
  { prop: 'status', label: '状态', minWidth: 80 }
]

const onPageChange = (page) => console.log(page)
const onSizeChange = (size) => console.log(size)
<\/script>

<template>
  <MasonTable
    :data="demoData"
    :columns="columns"
    :pagination="{ isShow: true, total: demoData.length }"
    border
    @page-change="onPageChange"
    @size-change="onSizeChange"
  />
</template>`

const operateCode = `<script setup>
import MasonTable from '@/components/Table/index.vue'
import { TABLE_COLUMN_OPERATE } from '@/components/Table/constants'

const columns = [
  { prop: 'name', label: '姓名', minWidth: 100 },
  { prop: 'role', label: '角色', minWidth: 100 },
  {
    prop: 'TABLE_COLUMN_OPTS',
    label: '操作',
    width: 200,
    operateList: {
      [TABLE_COLUMN_OPERATE.DETAIL]: { btnText: '详情' },
      [TABLE_COLUMN_OPERATE.EDIT]: { btnText: '编辑' },
      [TABLE_COLUMN_OPERATE.DELETE]: {}
    }
  }
]
<\/script>

<template>
  <MasonTable
    :data="demoData"
    :columns="columns"
    :pagination="{ isShow: false }"
    border
    @detail="handleDetail"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>`

const indexCode = `<MasonTable
  :data="demoData"
  :columns="[
    { prop: '$index', label: '序号', width: 70 },
    { prop: 'name', label: '姓名', minWidth: 100 },
    { prop: 'department', label: '部门', minWidth: 120 },
    { prop: 'joinDate', label: '入职日期', minWidth: 120 }
  ]"
  :pagination="{ isShow: false }"
  border
  stripe
/>`

const expandCode = `<MasonTable
  :data="demoData"
  :columns="columns"
  :expand="true"
  :pagination="{ isShow: false }"
  border
>
  <template #expand="{ row }">
    <div class="expand-content">
      <p><strong>姓名：</strong>{{ row.name }}</p>
      <p><strong>角色：</strong>{{ row.role }}</p>
      <p><strong>部门：</strong>{{ row.department }}</p>
      <p><strong>入职日期：</strong>{{ row.joinDate }}</p>
    </div>
  </template>
</MasonTable>`

const emptyCode = `<MasonTable
  :data="[]"
  :columns="columns"
  :pagination="{ isShow: false }"
  border
>
  <template #empty>
    <div class="empty-state">
      <p>📭</p>
      <p>暂无数据，请稍后再试</p>
    </div>
  </template>
</MasonTable>`

const sizeCode = `<MasonTable :data="rows" :columns="columns" size="large" border :pagination="{ isShow: false }" />
<MasonTable :data="rows" :columns="columns" size="default" border :pagination="{ isShow: false }" />
<MasonTable :data="rows" :columns="columns" size="small" border :pagination="{ isShow: false }" />`

const attrsCode = `<MasonTable
  :data="demoData"
  :columns="columns"
  :pagination="{ isShow: false }"
  :table-column-options="{ showOverflowTooltip: true }"
  stripe
  border
  height="200"
/>`
</script>

<template>
  <div class="demo-stack">
    <DocExample title="基础用法" :code="basicCode">
      <template #description>
        通过 <code>columns</code> 描述列结构，<code>data</code> 传入数据；内置分页，并透传
        <code>el-table</code> 属性（如 <code>border</code>）。
      </template>
      <MasonTable
        :data="demoData"
        :columns="basicColumns"
        :pagination="{ isShow: true, total: demoData.length }"
        border
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </DocExample>

    <DocExample title="操作列" :code="operateCode">
      <template #description>
        <code>prop: 'TABLE_COLUMN_OPTS'</code> 生成操作列。必须配置
        <code>operateList</code>，并使用导出的 <code>TABLE_COLUMN_OPERATE</code> Symbol 作为 key；
        未自定义 <code>action</code> 时会触发 <code>@detail</code> / <code>@edit</code> /
        <code>@delete</code>。
      </template>
      <MasonTable
        :data="demoData.slice(0, 4)"
        :columns="operateColumns"
        :pagination="{ isShow: false }"
        border
        @detail="handleDetail"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </DocExample>

    <DocExample title="索引列" :code="indexCode">
      <template #description>
        设置 <code>prop: '$index'</code> 自动生成从 1 开始的序号列。
      </template>
      <MasonTable
        :data="demoData.slice(0, 5)"
        :columns="indexColumns"
        :pagination="{ isShow: false }"
        border
        stripe
      />
    </DocExample>

    <DocExample title="展开行" :code="expandCode">
      <template #description>
        设置 <code>expand</code> 为 <code>true</code>，通过 <code>#expand</code> 插槽自定义展开内容。
      </template>
      <MasonTable
        :data="demoData.slice(0, 3)"
        :columns="expandColumns"
        :expand="true"
        :pagination="{ isShow: false }"
        border
      >
        <template #expand="{ row }">
          <div class="expand-content">
            <p><strong>姓名：</strong>{{ row.name }}</p>
            <p><strong>角色：</strong>{{ row.role }}</p>
            <p><strong>部门：</strong>{{ row.department }}</p>
            <p><strong>入职日期：</strong>{{ row.joinDate }}</p>
          </div>
        </template>
      </MasonTable>
    </DocExample>

    <DocExample title="自定义空状态" :code="emptyCode">
      <template #description>
        通过 <code>#empty</code> 插槽自定义无数据时的展示。
      </template>
      <MasonTable :data="[]" :columns="basicColumns" :pagination="{ isShow: false }" border>
        <template #empty>
          <div class="empty-state">
            <p>📭</p>
            <p>暂无数据，请稍后再试</p>
          </div>
        </template>
      </MasonTable>
    </DocExample>

    <DocExample title="不同尺寸" :code="sizeCode">
      <template #description>
        透传 <code>el-table</code> 的 <code>size</code>：<code>large</code> /
        <code>default</code> / <code>small</code>。
      </template>
      <div class="size-demos">
        <div>
          <span class="size-label">Large</span>
          <MasonTable
            :data="demoData.slice(0, 2)"
            :columns="basicColumns"
            :pagination="{ isShow: false }"
            size="large"
            border
          />
        </div>
        <div>
          <span class="size-label">Default</span>
          <MasonTable
            :data="demoData.slice(0, 2)"
            :columns="basicColumns"
            :pagination="{ isShow: false }"
            size="default"
            border
          />
        </div>
        <div>
          <span class="size-label">Small</span>
          <MasonTable
            :data="demoData.slice(0, 2)"
            :columns="basicColumns"
            :pagination="{ isShow: false }"
            size="small"
            border
          />
        </div>
      </div>
    </DocExample>

    <DocExample title="透传 el-table 属性" :code="attrsCode">
      <template #description>
        支持 <code>stripe</code>、<code>border</code>、<code>height</code> 等，以及
        <code>table-column-options</code> 批量透传给列。
      </template>
      <MasonTable
        :data="demoData.slice(0, 5)"
        :columns="basicColumns"
        :pagination="{ isShow: false }"
        :table-column-options="{ showOverflowTooltip: true }"
        stripe
        border
        height="200"
      />
    </DocExample>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.expand-content {
  padding: 12px 20px;
}

.expand-content p {
  margin: 4px 0;
  font-size: 13px;
  color: var(--text-secondary);
}

.empty-state {
  padding: 32px;
  text-align: center;
}

.empty-state p:first-child {
  margin: 0;
  font-size: 32px;
}

.empty-state p:last-child {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--text-tertiary);
}

.size-demos {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.size-label {
  display: inline-block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
}
</style>
