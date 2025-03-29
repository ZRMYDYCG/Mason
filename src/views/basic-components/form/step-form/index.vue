<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from '@/components/Toast/index.ts'
import StepA from './components/step-a.vue'
import StepB from './components/step-b.vue'
import { debounce } from 'lodash-es'

const message = useMessage()
const currentStepIndex = ref(1)

const StepARef = ref<any>(null)
const StepBRef = ref<any>(null)

// 下一步
const handleNextStep = async () => {
  // 表单校验
  const validate = await new Promise((resolve) => {
    StepARef.value.formRef.validate(resolve)
  })
  if (validate) {
    currentStepIndex.value = 2
  }
}

// 上一步
const handlePrevStep = () => {
  currentStepIndex.value = 1
}

// 转账
const loadding = ref(false)
const handlePayment = debounce(async () => {
  if (loadding.value) {
    return
  }
  // 表单校验
  const validate = await new Promise(async (resolve) => {
    StepBRef.value.formRef.validate(resolve)
  })
  if (!validate) {
    return
  }
  await payment()
}, 500)

const payment = async () => {
  const params = {
    ...StepARef?.value?.formMdl,
    ...StepBRef?.value?.formMdl
  }

  const api = new Promise((resolve) => {
    return setTimeout(() => {
      resolve({
        code: 200,
        data: {
          msg: '转账成功'
        }
      })
    }, 1000)
  })

  await api.then((res) => {
    if (res.code === 200) {
      message.success(res.data.msg)
      currentStepIndex.value = 3
    } else {
      message.error(res.data.msg)
    }
  })

  setTimeout(() => {
    // 解决loadding闪烁
    loadding.value = false
  }, 150)
}
</script>

<template>
  <div>
    <el-card shadow="never">
      <el-row class="justify-center">
        <el-col :xs="24" :sm="22" :md="12" :lg="10" :xl="10">
          <el-steps :active="currentStepIndex" align-center finish-status="finish">
            <el-step title="填写转账信息"></el-step>
            <el-step title="确认转账信息" />
            <el-step title="完成" />
          </el-steps>
        </el-col>
      </el-row>
      <el-row class="justify-center mt-[36px]">
        <el-form label-width="100px">
          <StepA ref="StepARef" :class="{ hidden: currentStepIndex !== 1 }" />
          <StepB
            ref="StepBRef"
            :step-a-form-mdl="StepARef?.formMdl || {}"
            :class="{ hidden: currentStepIndex !== 2 }"
          />
        </el-form>
      </el-row>
      <el-row class="justify-center mt-[36px]">
        <el-button-group>
          <el-button v-if="currentStepIndex === 1" @click="handleNextStep" type="primary"
            >下一步</el-button
          >
          <el-button
            v-if="currentStepIndex === 2"
            type="primary"
            @click="handlePayment"
            :disabled="loadding"
            >立即转账</el-button
          >
          <el-button v-if="currentStepIndex === 2" @click="handlePrevStep">上一步</el-button>
        </el-button-group>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
