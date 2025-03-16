<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'
import cloneDeep from 'lodash/cloneDeep'
import type Node from 'element-plus/es/components/tree/src/model/node'

interface Tree {
  value: string
  label: string
  children?: Tree[]
}

const generatorStore = useGeneratorStore()

const current = computed(() => generatorStore.currentComponent)
const addVisible = ref<boolean>(false)
const currentItem = ref<any>()
const type = ref(0)

const addModel = ref({
  label: '',
  value: ''
})
const addRules = ref({
  label: [
    {
      required: true,
      message: '选项名不能为空',
      trigger: 'blur'
    }
  ],
  value: [
    {
      required: true,
      message: '选项名不能为空',
      trigger: 'blur'
    }
  ]
})

const renderContent = (
  h,
  {
    node,
    data
  }: {
    node: Node
    data: Tree
  }
) => {
  return h(
    'div',
    {
      class: 'custom-tree-node',
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      }
    },
    h('div', null, node.label),
    h(
      'div',
      {
        style: {
          textAlign: 'right'
        }
      },
      h('i', {
        onClick: () => add(data),
        class: { iconfont: true, 'icon-jiahao': true }
      }),
      h('i', {
        style: 'margin-left: 8px',
        onClick: () => del(node, data),
        class: { iconfont: true, 'icon-error': true }
      })
    )
  )
}

const ok = () => {
  const props = current.value.attrs.props
  if (type.value === 0) {
    currentItem.value.children.push({
      [props.value]: addModel.value.value,
      [props.label]: addModel.value.label
    })
  } else {
    current.value.children.push({
      [props.value]: addModel.value.value,
      [props.label]: addModel.value.label
    })
  }
  addVisible.value = false
  currentItem.value = null
  addModel.value.label = ''
  addModel.value.value = ''
}

const cancel = () => {
  addVisible.value = false
  currentItem.value = null
  addModel.value.label = ''
  addModel.value.value = ''
}

const add = (data: Tree) => {
  type.value = 0
  if (!data.children) {
    data.children = []
  }
  currentItem.value = data
  addVisible.value = true
}

const del = (node: Node, data: Tree) => {
  const props = current.value.attrs.props
  const parent = node.parent
  const level = node.level
  if (level === 1) {
    const index = current.value.children.findIndex((i) => i[props.value] === data[props.value])
    current.value.children.splice(index, 1)
  } else {
    const index = parent.data.children.findIndex((i) => i[props.value] === data[props.value])
    parent.data.children.splice(index, 1)
  }
}

const addParent = () => {
  type.value = 1
  addVisible.value = true
}

const changeMultiple = (val: boolean) => {
  const item = cloneDeep(current.value)
  item.value = val ? [] : ''
  localStorage.setItem('currentComponent', JSON.stringify(item))
  generatorStore.setCurrentComponent(item)
}

watch(
  () => current.value,
  (val) => {
    localStorage.setItem('currentComponent', JSON.stringify(val))
    generatorStore.setCurrentComponent(val)
  },
  { deep: true }
)
</script>

<template>
  <el-form label-width="90px">
    <el-form-item label="字段名">
      <el-input v-model="current.field" placeholder="请输入字段名" clearable></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="current.label" placeholder="请输入标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="current.value" placeholder="请输入默认值" clearable></el-input>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number v-model="current.labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="占位符">
      <el-input clearable v-model="current.attrs.placeholder"></el-input>
    </el-form-item>
    <el-form-item label="尺寸">
      <el-select v-model="current.attrs.size" placeholder="请选择复选框尺寸">
        <el-option value="default" label="默认"></el-option>
        <el-option value="small" label="小型"></el-option>
        <el-option value="large" label="大型"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选项配置">
      <div style="width: 100%">
        <div style="margin-bottom: 12px">
          <el-tree
            :data="current.children"
            :expand-on-click-node="false"
            :render-content="renderContent"
          ></el-tree>
        </div>
        <div style="width: 100px; display: flex; align-items: center">
          <div style="cursor: pointer">
            <i class="iconfont icon-jiahao"></i>
          </div>
          <el-link
            style="position: relative; left: 4px"
            :underline="false"
            type="primary"
            size="small"
            @click.prevent="addParent"
            >添加父级</el-link
          >
        </div>
      </div>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="标签键名">
      <el-input clearable v-model="current.attrs.props.label"></el-input>
    </el-form-item>
    <el-form-item label="值键名">
      <el-input clearable v-model="current.attrs.props.value"></el-input>
    </el-form-item>
    <el-form-item label="子级键名">
      <el-input clearable v-model="current.attrs.props.children"></el-input>
    </el-form-item>
    <el-form-item label="是否多选">
      <el-switch v-model="current.attrs.props.multiple" @change="changeMultiple"></el-switch>
    </el-form-item>
    <el-form-item label="可清空">
      <el-switch v-model="current.attrs.clearable"></el-switch>
    </el-form-item>
    <el-form-item label="可筛选">
      <el-switch v-model="current.attrs.filterable"></el-switch>
    </el-form-item>
    <el-form-item label="全路径">
      <el-switch v-model="current.attrs.showAllLevels"></el-switch>
    </el-form-item>
    <el-form-item label="展开方式">
      <el-select v-model="current.attrs.props.expandTrigger" placeholder="请选择">
        <el-option value="click" label="点击"></el-option>
        <el-option value="hover" label="悬浮"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分隔符">
      <el-input clearable placeholder="请输入分隔符" v-model="current.attrs.separator"></el-input>
    </el-form-item>
  </el-form>
  <el-dialog title="添加数据源" v-model="addVisible" @close="cancel" width="30%">
    <el-form v-if="current" :model="addModel" :rules="addRules" label-width="100px">
      <el-form-item label="选项名" prop="label">
        <el-input v-model="addModel.label" placeholder="请输入选项名" clearable></el-input>
      </el-form-item>
      <el-form-item label="选项值" prop="value">
        <el-input v-model="addModel.value" placeholder="请输入选项值" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="ok">确认</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
