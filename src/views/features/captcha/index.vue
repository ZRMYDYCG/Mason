<template>
  <div class="captcha-container">
    <div class="captcha-grid">
      <GraphicCaptcha />
      <ArithmeticCaptcha />
      <SliderCaptcha />
      <RotateCaptcha />
      <ClickCaptcha />
    </div>
  </div>
</template>

<script setup lang="ts">
import GraphicCaptcha from './components/GraphicCaptcha.vue'
import ArithmeticCaptcha from './components/ArithmeticCaptcha.vue'
import SliderCaptcha from './components/SliderCaptcha.vue'
import RotateCaptcha from './components/RotateCaptcha.vue'
import ClickCaptcha from './components/ClickCaptcha.vue'
</script>

<style scoped lang="scss">
.captcha-container {
  padding: 20px;
  background-color: var(--el-bg-color);
  border-radius: 6px;
  min-height: 100%;
}

.captcha-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}
</style>
