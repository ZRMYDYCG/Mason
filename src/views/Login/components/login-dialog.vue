<script setup lang="ts">
import { ref, watch } from 'vue'
import LoginForm from './login-form.vue'

const visible = defineModel<boolean>({ default: false })
const loginFormRef = ref<InstanceType<typeof LoginForm>>()
const loading = ref(false)

watch(visible, (val) => {
  if (!val) loading.value = false
})

const handleLogin = async () => {
  loading.value = true
  try {
    await loginFormRef.value?.loginAction()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-dialog
    v-model="visible"
    title="登录 Mason"
    width="400px"
    align-center
    :close-on-click-modal="false"
    destroy-on-close
  >
    <LoginForm ref="loginFormRef" />
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleLogin">登录</el-button>
    </template>
  </el-dialog>
</template>
