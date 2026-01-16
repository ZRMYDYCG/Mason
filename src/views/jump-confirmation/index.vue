<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { isEqual, cloneDeep } from 'lodash-es'
import { onUnmounted } from 'vue'

// 定义表单数据类型
interface FormData {
  name: string
  email: string
  type: string
  description: string
}

// 表单引用
const formRef = ref()

// 响应式表单数据
const formData = reactive<FormData>({
  name: '',
  email: '',
  type: '',
  description: ''
})

// 保存初始数据的快照
let initialFormData: FormData | null = null

// 模拟从接口获取数据
const initData = () => {
  setTimeout(() => {
    const dataFromApi = {
      name: '张三',
      email: 'zhangsan@example.com',
      type: 'personal',
      description: '这是一段初始描述'
    }
    
    Object.assign(formData, dataFromApi)
    
    initialFormData = cloneDeep(formData)
  }, 500)
}

onMounted(() => {
  initData()
  
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

// 处理浏览器刷新或关闭
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (isModified()) {
    e.preventDefault()
    e.returnValue = ''
    return ''
  }
}

// 检查数据是否被修改
const isModified = () => {
  if (!initialFormData) return false
  return !isEqual(formData, initialFormData)
}

// 路由守卫
onBeforeRouteLeave((to, from, next) => {
  if (isModified()) {
    ElMessageBox.confirm(
      '当前页面有未保存的修改，离开后数据将丢失，是否确认离开？',
      '提示',
      {
        confirmButtonText: '确定离开',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
      .then(() => {
        next()
      })
      .catch(() => {
        next(false)
      })
  } else {
    next()
  }
})

// 保存操作
const handleSave = () => {
  ElMessage.success('保存成功')
  initialFormData = cloneDeep(formData)
}

// 重置操作
const handleReset = () => {
  if (initialFormData) {
    Object.assign(formData, cloneDeep(initialFormData))
    ElMessage.info('已重置为初始状态')
  }
}
</script>

<template>
  <div class="jump-confirmation-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>表单变更检测示例</span>
          <div>
            <el-tag type="info">修改下方表单内容后尝试切换路由</el-tag>
          </div>
        </div>
      </template>
      
      <el-form 
        ref="formRef" 
        :model="formData" 
        label-width="120px"
        class="demo-form"
      >
        <el-form-item label="用户名">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        
        <el-form-item label="类型">
          <el-select v-model="formData.type" placeholder="请选择类型" style="width: 100%">
            <el-option label="个人" value="personal" />
            <el-option label="企业" value="business" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="描述">
          <el-input 
            v-model="formData.description" 
            type="textarea" 
            :rows="4" 
            placeholder="请输入描述" 
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存 (更新快照)</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      
      <div class="status-bar" v-if="initialFormData">
        <el-alert
          :title="isModified() ? '当前状态：已修改 (尝试切换页面会触发拦截)' : '当前状态：未修改 (可自由切换页面)'"
          :type="isModified() ? 'warning' : 'success'"
          :closable="false"
          show-icon
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.jump-confirmation-container {
  padding: 20px;
  
  .box-card {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .status-bar {
    margin-top: 20px;
  }
}
</style>
