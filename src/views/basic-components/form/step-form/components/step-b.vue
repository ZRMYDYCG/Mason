<script setup lang="ts">
import { ref } from 'vue'

interface IProps {
  stepAFormMdl: any
}

defineProps<IProps>()

const formRef = ref(null)
const formMdl = ref({
  password: ''
})

const formRules = {
  password: [{ required: true, message: '请输入支付密码' }]
}

defineExpose({
  formRef,
  formMdl
})
</script>

<template>
  <div class="step-b">
    <el-alert
      title="确认转账后，资金将直接打入对方账户，无法退回。"
      type="error"
      show-icon
      class="mb-[24px]"
    />
    <el-form ref="formRef" :model="formMdl" :rules="formRules" label-width="100px">
      <el-form-item label="付款账户：">
        {{ stepAFormMdl.paymentAccount }}
      </el-form-item>
      <el-form-item label="收款账户：">
        {{ stepAFormMdl.receivingAccount }}
      </el-form-item>
      <el-form-item label="收款人姓名">
        {{ stepAFormMdl.payee }}
      </el-form-item>
      <el-form-item label="转账金额：">
        {{ stepAFormMdl.amount }}
      </el-form-item>
      <el-form-item prop="password" label="支付密码：">
        <el-input type="password" v-model="formMdl.password" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
