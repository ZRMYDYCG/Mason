<script lang="ts" setup>
import MenuDialog from './components/menuDialog.vue'
import CustomTable from '@/components/CustomTable/index.vue'
import { h, onMounted, ref, reactive, toRaw, resolveComponent } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { deleteMenu, getMenuList } from '@/api/modules/system'
import { Menu } from '@/api/interface/system'
import AppIcon from '@/components/AppIcon/index.vue'

const isMockMode = import.meta.env.VITE_MOCK === 'true'

onMounted(() => {
  onSearch()
})

const tableData = ref<Menu[]>([])

const searchFormRef = ref<FormInstance>()
const searchForm = reactive({
  title: '',
  isEnable: 2
})

const enableOptions = [
  {
    value: 2,
    label: '全部'
  },
  {
    value: 1,
    label: '开启'
  },
  {
    value: 0,
    label: '关闭'
  }
]

const renderBoolTag = (value: boolean, trueText = '开启', falseText = '关闭') => ({
  setup() {
    const ElTag = resolveComponent('ElTag')
    return () =>
      h(ElTag, { type: value ? 'success' : 'danger' }, () => (value ? trueText : falseText))
  }
})

const columns = ref([
  {
    prop: 'meta.title',
    label: '菜单名称',
    width: 150,
    isVisible: true,
    showOverflowTooltip: true,
    dataFormatConf: {
      withScopeRow: true,
      formatFunction: ({ row }: { row: Menu }) => row.meta?.title
    }
  },
  {
    prop: 'name',
    label: '菜单name',
    width: 150,
    isVisible: true,
    showOverflowTooltip: true
  },
  { prop: 'sort', label: '顺序', width: 80, isVisible: true },
  {
    prop: 'meta.icon',
    label: '菜单图标',
    width: 100,
    isVisible: true,
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ row }: { row: Menu }) => ({
        setup() {
          return () =>
            h(
              'div',
              { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              row.meta?.icon ? [h(AppIcon, { name: row.meta.icon })] : []
            )
        }
      })
    }
  },
  {
    prop: 'path',
    label: '菜单路径',
    width: 300,
    isVisible: true,
    showOverflowTooltip: true
  },
  {
    prop: 'meta.isEnable',
    label: '是否启用',
    width: 100,
    isVisible: true,
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ row }: { row: Menu }) => renderBoolTag(!!row.meta?.isEnable)
    }
  },
  {
    prop: 'meta.isAffix',
    label: '是否固定',
    width: 100,
    isVisible: true,
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ row }: { row: Menu }) => renderBoolTag(!!row.meta?.isAffix)
    }
  },
  {
    prop: 'meta.isKeepAlive',
    label: '是否缓存',
    width: 100,
    isVisible: true,
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ row }: { row: Menu }) => renderBoolTag(!!row.meta?.isKeepAlive)
    }
  },
  {
    prop: 'meta.isLink',
    label: '是否链接',
    width: 100,
    isVisible: true,
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ row }: { row: Menu }) => renderBoolTag(!!row.meta?.isLink, '是', '否')
    }
  },
  {
    prop: 'TABLE_COLUMN_OPTS',
    label: '操作',
    fixed: 'right',
    isVisible: true
  }
])

async function onSearch() {
  const { data } = await getMenuList(toRaw(searchForm))
  tableData.value = data
}

const handleDelete = async (id: number) => {
  const res = await deleteMenu(id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
  } else {
    await onSearch()
    ElMessage.success(res.msg)
  }
}

const menuDialogRef = ref<InstanceType<typeof MenuDialog>>()
const handleNew = () => {
  if (isMockMode) return
  menuDialogRef.value?.handleNew()
}
const handleEdit = (row: Menu) => {
  if (isMockMode) return
  menuDialogRef.value?.handleEdit(row)
}
</script>

<template>
  <div class="menu-manage">
    <div class="card search-container mb10">
      <el-form ref="searchFormRef" :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="菜单名称：">
          <el-input v-model="searchForm.title" placeholder="输入菜单名称" clearable />
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnable">
          <el-select v-model="searchForm.isEnable" placeholder="请选择">
            <el-option
              v-for="item in enableOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" v-ripple>
            <AppIcon name="search" class="btn-icon mr4" /><span>搜索</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card table-container">
      <div class="table-btns mb18">
        <el-button
          type="primary"
          class="table-button"
          :disabled="isMockMode"
          @click="handleNew"
          v-ripple
        >
          <AppIcon name="plus" class="btn-icon mr4" /><span>新增菜单</span>
        </el-button>
      </div>
      <CustomTable
        class="table-content"
        :columns="columns"
        :data="tableData"
        :is-show-setting="true"
        :pagination="{ isShow: false }"
        row-key="id"
        border
      >
        <template #otherOperate="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            :disabled="isMockMode"
            @click="handleEdit(row)"
          >
            <AppIcon name="square-pen" class="btn-icon mr4" /> <span>编辑</span>
          </el-button>
          <el-popconfirm
            @confirm="handleDelete(row.id)"
            confirm-button-text="确认"
            cancel-button-text="否"
            title="确认删除该菜单?"
          >
            <template #reference>
              <el-button link type="primary" size="small" :disabled="isMockMode">
                <AppIcon name="trash-2" class="btn-icon mr4" /><span>删除</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </CustomTable>
    </div>
    <MenuDialog ref="menuDialogRef" @refresh="onSearch" />
  </div>
</template>

<style scoped>
.el-select {
  width: 100px;
}
</style>
