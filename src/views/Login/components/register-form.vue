<template>
  <el-form ref="registerFormRef" :model="account" :rules="rules">
    <el-form-item prop="username">
      <el-input v-model="account.username" placeholder="请输入用户名">
        <template #prefix> <i class="iconfont icon-user"></i> </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="account.password" type="password" show-password placeholder="请输入密码">
        <template #prefix> <i class="iconfont icon-lock"></i> </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
        v-model="account.confirmPassword"
        type="password"
        show-password
        placeholder="请确认密码"
      >
        <template #prefix> <i class="iconfont icon-lock"></i> </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { registerApi } from '@/api/modules/login'
import { Login } from '@/api/interface'

const emit = defineEmits(['register-success'])

const account = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (account.confirmPassword !== '') {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField('confirmPassword')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== account.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入账号名称', trigger: 'blur' },
    { min: 2, max: 10, message: '账号名称长度为2-10个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePass, trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码必须是6位以上的字母或数字',
      trigger: 'blur'
    }
  ],
  confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
}

const registerFormRef = ref<FormInstance>()

const registerAction = () => {
  registerFormRef.value?.validate(async (valid) => {
    if (valid) {
      const params: Login.ReqRegisterForm = {
        username: account.username,
        password: account.password
      }
      const res = await registerApi(params)
      if (res.code === 200) {
        ElMessage.success('注册成功，请登录')
        emit('register-success')
      } else {
        ElMessage.error(res.msg)
      }
    }
  })
}

const resetAction = () => {
  registerFormRef.value?.resetFields()
}

defineExpose({
  registerAction,
  resetAction
})
</script>
