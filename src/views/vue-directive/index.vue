<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const copyText = ref('我是被复制的文本')

const handleLongpress = () => {
  ElMessage.success('长按事件触发成功')
}

const handleDebounce = () => {
  ElMessage.success('防抖按钮点击')
}

const handleThrottle = () => {
  ElMessage.success('节流按钮点击')
}
</script>

<template>
  <div class="card content-box">
    <el-divider content-position="left">v-copy 复制指令</el-divider>
    <div class="box-item">
      <el-input v-model="copyText" placeholder="请输入内容" style="width: 500px">
        <template #append>
          <el-button v-copy="copyText">点击复制</el-button>
        </template>
      </el-input>
    </div>

    <el-divider content-position="left">v-longpress 长按指令</el-divider>
    <div class="box-item">
      <el-button type="primary" v-longpress="handleLongpress">长按1秒触发事件</el-button>
    </div>

    <el-divider content-position="left">v-debounce 防抖指令 (延迟执行)</el-divider>
    <div class="box-item">
      <el-button type="primary" v-debounce="handleDebounce">防抖按钮 (0.5s)</el-button>
    </div>

    <el-divider content-position="left"
      >v-throttle 节流指令 (立即执行，冷却时间内不执行)</el-divider
    >
    <div class="box-item">
      <el-button type="danger" v-throttle="handleThrottle">节流按钮 (1s)</el-button>
    </div>

    <el-divider content-position="left">v-ripple 水波纹指令</el-divider>
    <div class="box-item">
      <el-button v-ripple type="primary">水波纹按钮</el-button>
      <div v-ripple class="ripple-box">自定义元素水波纹</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-box {
  padding: 20px;
}
.box-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.ripple-box {
  width: 150px;
  height: 60px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border: 1px solid var(--el-color-primary-light-5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
}
</style>
