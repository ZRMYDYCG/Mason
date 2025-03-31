<template>
  <el-form ref="formRefA" v-bind="formPropsA" label-width="120px" @submit.prevent="handleSubmitA">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formModelA.username" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="formModelA.password" type="password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loadingA" @click="handleSubmitA"> 提交 </el-button>
      <el-button @click="resetFieldsA">重置</el-button>
    </el-form-item>

    <div v-if="errorMessageA" class="error-message">
      {{ errorMessageA }}
    </div>
  </el-form>
  <el-form ref="formRefB" v-bind="formPropsB" label-width="120px" @submit.prevent="handleSubmitB">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formModelB.username" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="formModelB.password" type="password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loadingB" @click="handleSubmitB"> 提交 </el-button>
      <el-button @click="resetFieldsB">重置</el-button>
    </el-form-item>

    <div v-if="errorMessageB" class="error-message">
      {{ errorMessageB }}
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { useForm } from '@/hooks/useForm.ts'
import { useMessage } from '@/components/Toast/index.ts'

interface FormValues {
  username: string
  password: string
}

const message = useMessage()

const {
  formRef: formRefA,
  formModel: formModelA,
  formProps: formPropsA,
  loading: loadingA,
  errorMessage: errorMessageA,
  handleSubmit: handleSubmitA,
  resetFields: resetFieldsA
} = useForm<FormValues>({
  initialValues: {
    username: '',
    password: ''
  },
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 12, message: '长度在3到12个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9]{6,18}$/, message: '6-18位字母数字组合' }
    ]
  },
  async onSubmit(values) {
    console.log('提交数据:', values)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    message.success('提交成功')
  }
})

const {
  formRef: formRefB,
  formModel: formModelB,
  formProps: formPropsB,
  loading: loadingB,
  errorMessage: errorMessageB,
  handleSubmit: handleSubmitB,
  resetFields: resetFieldsB
} = useForm<FormValues>({
  initialValues: {
    username: '',
    password: ''
  },
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 12, message: '长度在3到12个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9]{6,18}$/, message: '6-18位字母数字组合' }
    ]
  },
  async onSubmit(values) {
    console.log('提交数据:', values)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    message.success('提交成功')
  }
})
</script>
