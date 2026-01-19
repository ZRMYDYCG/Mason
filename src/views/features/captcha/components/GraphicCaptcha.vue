<template>
  <div class="captcha-item">
    <div class="header">图形验证码</div>
    <div class="content">
      <div class="img-box" v-html="svgContent" @click="refresh" title="点击刷新"></div>
      <div class="form-box">
        <el-input v-model="inputValue" placeholder="请输入验证码" />
        <el-button type="primary" @click="verify">验证</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getGraphicCaptcha, verifyCaptcha } from '@/api/modules/captcha'
import { ElMessage } from 'element-plus'

const svgContent = ref('')
const captchaId = ref('')
const inputValue = ref('')

const refresh = async () => {
  try {
    const res = await getGraphicCaptcha()
    if (res.code === 200) {
      svgContent.value = res.data.svg
      captchaId.value = res.data.id
      inputValue.value = ''
    }
  } catch (error) {
    console.error(error)
  }
}

const verify = async () => {
  if (!inputValue.value) return ElMessage.warning('请输入验证码')
  try {
    const res = await verifyCaptcha({ id: captchaId.value, answer: inputValue.value })
    if (res.code === 200) {
      ElMessage.success('验证通过')
    } else {
      ElMessage.error('验证失败')
      refresh()
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  refresh()
})
</script>

<style scoped>
.captcha-item {
  width: 300px;
  padding: 20px;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;

  .header {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .img-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      overflow: hidden;
      cursor: pointer;
      background: var(--el-fill-color-light);
      border: 1px solid var(--el-border-color);
      border-radius: 4px;
    }

    .form-box {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
