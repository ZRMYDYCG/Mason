<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref(null)
const formRules = {
  paymentAccount: [{ required: true, message: '请输入付款账户' }],
  receivingAccount: [{ required: true, message: '请输入收款账户' }],
  payee: [{ required: true, message: '请输入收款人姓名' }],
  amount: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入转账金额'))
        } else if (Number(value) < 0) {
          callback(new Error('请输入合法金额数字'))
        } else {
          const reg = /\.(\d+)$/
          const match = reg.exec(value.toString())
          const decimalDigits = match ? match[1].length : 0
          if (decimalDigits > 2) {
            callback(new Error('请输入合法金额数字'))
          } else if (value < 0) {
            callback(new Error('请输入合法金额数字'))
          } else if (value > 100000) {
            callback(new Error('单笔转账金额不超过100,000'))
          }
        }

        callback()
      }
    }
  ]
}
const formMdl = ref({
  paymentAccount: '',
  receivingAccount: '',
  payee: '',
  amount: ''
})

defineExpose({
  formRef,
  formMdl
})
</script>

<template>
  <div class="step-a">
    <el-form ref="formRef" :rules="formRules" :model="formMdl" label-width="140px">
      <el-form-item prop="paymentAccount" label="付款账户：">
        <el-input v-model="formMdl.paymentAccount" clearable></el-input>
      </el-form-item>
      <el-form-item prop="receivingAccount" label="收款账户：">
        <el-input v-model="formMdl.receivingAccount" clearable></el-input>
      </el-form-item>
      <el-form-item prop="payee" label="收款人姓名：">
        <el-input v-model="formMdl.payee" clearable></el-input>
      </el-form-item>
      <el-form-item prop="amount" label="转账金额：">
        <el-input v-model="formMdl.amount" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
