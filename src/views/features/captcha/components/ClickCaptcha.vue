<template>
  <div class="captcha-item">
    <div class="header">点选验证码</div>
    <div class="content">
      <div class="click-box" ref="clickBox">
        <div class="img-wrapper" @click="addPoint">
          <img :src="imgUrl" class="bg-img" draggable="false" />
          <div
            v-for="(point, index) in points"
            :key="index"
            class="point-marker"
            :style="{ top: `${point.y}px`, left: `${point.x}px` }"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div class="prompt">{{ prompt }}</div>
      </div>
      <div class="actions">
        <el-button @click="resetPoints">重置</el-button>
        <el-button type="primary" @click="verify">确认</el-button>
        <el-button @click="refresh" link>刷新</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getClickCaptcha, verifyCaptcha } from '@/api/modules/captcha'
import { ElMessage } from 'element-plus'

const imgUrl = ref('')
const captchaId = ref('')
const prompt = ref('')
const points = ref<{ x: number; y: number }[]>([])

const refresh = async () => {
  try {
    const res = await getClickCaptcha()
    if (res.code === 200) {
      imgUrl.value = res.data.imgUrl
      captchaId.value = res.data.id
      prompt.value = res.data.prompt
      points.value = []
    }
  } catch (error) {
    console.error(error)
  }
}

const addPoint = (e: MouseEvent) => {
  const x = (e as MouseEvent & { offsetX: number }).offsetX
  const y = (e as MouseEvent & { offsetY: number }).offsetY

  if (points.value.length >= 4) return

  points.value.push({ x, y })
}

const resetPoints = () => {
  points.value = []
}

const verify = async () => {
  if (points.value.length !== 4) return ElMessage.warning('请点击所有目标')

  const answer = points.value

  try {
    const res = await verifyCaptcha({ id: captchaId.value, answer })
    if (res.code === 200) {
      ElMessage.success('验证通过')
    } else {
      ElMessage.error('验证失败')
      refresh()
    }
  } catch (error) {
    refresh()
  }
}

onMounted(() => {
  refresh()
})
</script>

<style scoped>
.captcha-item {
  width: 340px;
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
}

.click-box {
  width: 300px;

  .img-wrapper {
    position: relative;
    width: 300px;
    height: 200px;
    overflow: hidden;
    cursor: crosshair;

    .bg-img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .point-marker {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      font-size: 12px;
      color: #ffffff;
      pointer-events: none;
      background: #409eff;
      border: 2px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 4px rgb(0 0 0 / 50%);
      transform: translate(-50%, -50%);
    }
  }

  .prompt {
    margin-top: 10px;
    font-weight: bold;
    color: var(--el-text-color-secondary);
    text-align: center;
  }
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
