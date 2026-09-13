<script setup lang="ts">
import { ref } from 'vue'
import FullLoading from '@/components/loading/full-loading.vue'
import DocExample from '../../components/doc-example.vue'

const showLoading = ref(false)

const toggleLoading = () => {
  showLoading.value = true
  setTimeout(() => {
    showLoading.value = false
  }, 3000)
}

const basicCode = `<script setup>
import { ref } from 'vue'
import FullLoading from '@/components/loading/full-loading.vue'

const showLoading = ref(false)

const toggleLoading = () => {
  showLoading.value = true
  setTimeout(() => {
    showLoading.value = false
  }, 3000)
}
<\/script>

<template>
  <FullLoading v-if="showLoading" />
  <button type="button" @click="toggleLoading">
    显示全屏 Loading（3秒后自动关闭）
  </button>
</template>`
</script>

<template>
  <div class="demo-stack">
    <FullLoading v-if="showLoading" />

    <DocExample title="基础用法" :code="basicCode">
      <template #description>
        FullLoading 无 props，用 <code>v-if</code> 控制显隐。全屏遮罩会阻断底层交互，适合冷启动、鉴权初始化等整页等待。
        点击下方按钮会真实挂载组件，3 秒后自动关闭——与代码示例一致。
      </template>
      <div class="demo-row">
        <button type="button" class="demo-btn" @click="toggleLoading">
          显示全屏 Loading（3秒后自动关闭）
        </button>
      </div>
      <p class="demo-tip">点击后会看到全屏加载动画，3 秒后自动消失。</p>
    </DocExample>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-row {
  display: flex;
  gap: 8px;
}

.demo-btn {
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  background: var(--color-primary);
  border: 0;
  border-radius: var(--radius-md);
}

.demo-tip {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
