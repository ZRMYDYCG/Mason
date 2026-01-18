<template>
  <div class="captcha-item">
    <div class="header">旋转验证码</div>
    <div class="content">
      <div class="rotate-box">
        <div class="img-container">
          <img
            :src="imgUrl"
            class="rotate-img"
            :style="{ transform: `rotate(${rotateValue}deg)` }"
          />
        </div>
        <div class="slider-control">
          <el-slider
            v-model="rotateValue"
            :min="0"
            :max="360"
            :show-tooltip="false"
            @change="onRelease"
          />
          <div class="hint">拖动滑块将图片转正</div>
        </div>
      </div>
      <el-button @click="refresh" size="small" style="margin-top: 10px">刷新</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRotateCaptcha, verifyCaptcha } from '@/api/modules/captcha'
import { ElMessage } from 'element-plus'

const imgUrl = ref('')
const captchaId = ref('')
const rotateValue = ref(0)

const refresh = async () => {
  try {
    const res = await getRotateCaptcha()
    if (res.code === 200) {
      imgUrl.value = res.data.imgUrl
      captchaId.value = res.data.id
      rotateValue.value = 0
    }
  } catch (error) {
    console.error(error)
  }
}

const onRelease = async (val: number | number[]) => {
  const answer = Array.isArray(val) ? val[0] : val
  // Verify
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

<style scoped lang="scss">
.captcha-item {
  border: 1px solid var(--el-border-color-light);
  padding: 20px;
  border-radius: 4px;
  width: 300px;
  background-color: var(--el-bg-color);

  .header {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    color: var(--el-text-color-primary);
  }
}

.rotate-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .img-container {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--el-border-color);

    .rotate-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.1s;
    }
  }

  .slider-control {
    width: 100%;
    text-align: center;

    .hint {
      font-size: 12px;
      color: var(--el-text-color-secondary);
      margin-top: 5px;
    }
  }
}
</style>
