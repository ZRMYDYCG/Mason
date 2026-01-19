<template>
  <div class="captcha-item">
    <div class="header">滑块验证码</div>
    <div class="content">
      <div class="slider-box" ref="sliderBox">
        <div class="bg-img" :style="{ backgroundImage: `url('${bgUrl}')` }"></div>
        <div
          class="puzzle-img"
          :style="{
            backgroundImage: `url('${puzzleUrl}')`,
            top: `${puzzleY}px`,
            left: `${sliderValue}px`
          }"
        ></div>
        <div class="slider-track">
          <div class="slider-bar" :style="{ width: `${sliderValue}px` }"></div>
          <div class="slider-handle" :style="{ left: `${sliderValue}px` }" @mousedown="startDrag">
            <el-icon><ArrowRight /></el-icon>
          </div>
          <div class="slider-text" v-if="!isDragging && sliderValue === 0">向右滑动填充拼图</div>
        </div>
      </div>
      <el-button @click="refresh" size="small" style="margin-top: 10px">刷新</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getSliderCaptcha, verifyCaptcha } from '@/api/modules/captcha'
import { ElMessage } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'

const bgUrl = ref('')
const puzzleUrl = ref('')
const puzzleY = ref(0)
const captchaId = ref('')

const sliderValue = ref(0)
const isDragging = ref(false)
const startX = ref(0)

const sliderBox = ref<HTMLElement | null>(null)
const MAX_WIDTH = 260 // 300 - 40 (handle width)

const refresh = async () => {
  try {
    const res = await getSliderCaptcha()
    if (res.code === 200) {
      bgUrl.value = res.data.bgUrl
      puzzleUrl.value = res.data.puzzleUrl
      puzzleY.value = res.data.y
      captchaId.value = res.data.id
      sliderValue.value = 0
    }
  } catch (error) {
    console.error(error)
  }
}

const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  startX.value = e.clientX
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return
  const moveX = e.clientX - startX.value
  let newValue = moveX
  if (newValue < 0) newValue = 0
  if (newValue > MAX_WIDTH) newValue = MAX_WIDTH
  sliderValue.value = newValue
}

const stopDrag = async () => {
  if (!isDragging.value) return
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)

  // Verify
  try {
    const res = await verifyCaptcha({ id: captchaId.value, answer: sliderValue.value })
    if (res.code === 200) {
      ElMessage.success('验证通过')
    } else {
      ElMessage.error('验证失败')
      sliderValue.value = 0
      refresh()
    }
  } catch (error) {
    sliderValue.value = 0
    refresh()
  }
}

onMounted(() => {
  refresh()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
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

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.slider-box {
  position: relative;
  width: 300px;

  .bg-img {
    width: 300px;
    height: 150px;
    background-color: var(--el-fill-color-light);
    background-size: cover;
    border-radius: 4px 4px 0 0;
  }

  .puzzle-img {
    position: absolute;
    z-index: 2;
    width: 50px; /* puzzleSize + tab + padding, roughly */
    height: 44px;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .slider-track {
    position: relative;
    width: 300px;
    height: 40px;
    background: var(--el-fill-color);
    border: 1px solid var(--el-border-color);
    border-radius: 0 0 4px 4px;

    .slider-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--el-color-primary-light-9);
      border-radius: 0 0 0 4px;
    }

    .slider-text {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 14px;
      color: var(--el-text-color-secondary);
      user-select: none;
    }

    .slider-handle {
      position: absolute;
      top: -1px;
      left: 0;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      color: var(--el-text-color-secondary);
      cursor: grab;
      background: var(--el-bg-color);
      border: 1px solid var(--el-border-color);
      box-shadow: 0 0 3px rgb(0 0 0 / 10%);

      &:active {
        color: #ffffff;
        cursor: grabbing;
        background: #409eff;
        border-color: #409eff;
      }
    }
  }
}
</style>
