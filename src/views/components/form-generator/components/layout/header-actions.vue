<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'
import FormDrawer from '../form-drawer/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { saveAs } from 'file-saver'
import { useClipboard } from '@vueuse/core'
import { vueTemplate } from '../../config/template.ts'

const generatorStore = useGeneratorStore()

interface ListItem {
  icon: string
  name: string
}

const visible = ref(false)
const drawerVisible = ref(false)
const componentList = computed<any[]>(() => generatorStore.componentList)

const form = ref()
const model = ref({
  filename: ''
})
const rules = ref({
  filename: [
    {
      required: true,
      message: '文件名称不能为空',
      trigger: 'blur'
    }
  ]
})

const actionList: ListItem[] = [
  {
    icon: 'icon-bofang',
    name: '运行'
  },
  {
    icon: 'icon-download',
    name: '导出vue文件'
  },
  {
    icon: 'icon-daima',
    name: '复制代码'
  },
  {
    icon: 'icon-shanchu',
    name: '清空'
  }
]

const clickItem = (item: ListItem) => {
  if (!componentList.value || !componentList.value.length) {
    ElMessage.warning('请先生成组件')
    return
  }
  if (item.name === '导出vue文件') {
    visible.value = true
  }
  if (item.name === '复制代码') {
    const str = vueTemplate(componentList.value)
    try {
      const { copy } = useClipboard({
        source: str
      })
      copy()
      ElMessage.success('复制成功')
    } catch (err) {
      ElMessage.error('复制失败')
    }
  }
  if (item.name === '清空') {
    ElMessageBox.confirm('确认要清空所有组件吗?', '', {
      type: 'warning'
    } as any)
      .then(() => {
        generatorStore.setCurrentComponent(null)
        generatorStore.setComponentList(null)
        generatorStore.setActiveIndex(null)
        localStorage.removeItem('currentComponent')
        localStorage.removeItem('componentList')
        localStorage.removeItem('activeIndex')
        ElMessage.success('清空成功')
      })
      .catch(() => {
        ElMessage.info('取消操作')
      })
  }
  if (item.name === '运行') {
    if (!componentList.value) ElMessage.warning('请先生成组件')
    else {
      drawerVisible.value = true
    }
  }
}

const confirm = () => {
  form.value?.validate((valid) => {
    if (valid) {
      const str = vueTemplate(componentList.value)
      const blob = new Blob([str!], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `${model.value.filename}.vue`)
      form.value?.resetFields()
      visible.value = false
    } else {
      ElMessage.error('表单填写有误,请检查')
    }
  })
}

const cancel = () => {
  form.value?.resetFields()
  visible.value = false
}
</script>

<template>
  <el-space>
    <template v-for="item in actionList" :key="item.name">
      <div class="form-generator-select__header-actions-item" @click="clickItem(item)">
        <i :class="['iconfont', item.icon]"></i>
        <span>{{ item.name }}</span>
      </div>
    </template>
  </el-space>
  <el-dialog v-model="visible" title="导出文件">
    <el-form ref="form" :model="model" :rules="rules">
      <el-form-item label="组件名称" prop="filename">
        <el-input placeholder="请输入组件名称" v-model="model.filename" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>
  <div class="form-drawer-editor">
    <form-drawer v-model:visible="drawerVisible"></form-drawer>
  </div>
</template>

<style scoped lang="scss">
.form-generator-select__header-actions-item {
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    cursor: pointer;
  }
}
</style>
