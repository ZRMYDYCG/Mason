<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { Loading, CircleClose } from '@element-plus/icons-vue'

interface IChatInputProps {
  modelValue: string
  loading: boolean
  placeholder: string
}

const props = withDefaults(defineProps<IChatInputProps>(), {
  modelValue: '',
  loading: false,
  placeholder: '请输入内容...'
})

const emit = defineEmits(['update:modelValue', 'send', 'clear'])

const textareaRef = ref<HTMLTextAreaElement>()
const inputValue = ref(props.modelValue)

// 自适应高度
const adjustHeight = () => {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      const height = textareaRef.value.scrollHeight
      textareaRef.value.style.height = `${Math.min(height, 250)}px`
    }
  })
}

const handleInput = (e: Event) => {
  inputValue.value = (e.target as HTMLTextAreaElement).value
  adjustHeight()
  emit('update:modelValue', inputValue.value)
}

const handleSend = () => {
  if (!inputValue.value.trim() || props.loading) return
  emit('send', inputValue.value.trim())
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey && !props.loading) {
    e.preventDefault()
    handleSend()
  }
}

const handleClear = () => {
  inputValue.value = ''
  emit('clear')
  adjustHeight()
}

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val
    adjustHeight()
  }
)
</script>

<template>
  <div class="aigc-input-container">
    <div class="input-wrapper">
      <textarea
        ref="textareaRef"
        v-model="inputValue"
        class="input-area"
        :placeholder="placeholder"
        :disabled="loading"
        @input="handleInput"
        @keydown="handleKeydown"
      />
      <div v-if="inputValue" class="clear-btn" @click="handleClear">
        <el-icon :size="16"><CircleClose /></el-icon>
      </div>
    </div>
    <button
      class="send-btn"
      :class="{ loading }"
      :disabled="!inputValue.trim() || loading"
      @click="handleSend"
    >
      <el-icon v-if="!loading" class="send-icon">
        <i class="iconfont icon-zhuanfa" />
      </el-icon>
      <el-icon v-else class="loading-icon"><Loading /></el-icon>
    </button>
  </div>
</template>

<style scoped lang="scss">
.aigc-input-container {
  position: relative;
  width: 100%;
  display: flex;
  gap: 8px;
  padding: 12px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  transition: border-color 0.2s;
  &:focus-within {
    border-color: var(--el-color-primary);
    box-shadow: 0 0 4px rgba(var(--el-color-primary-rgb), 0.2);
  }
}

.input-wrapper {
  position: relative;
  flex: 1;
  min-height: 40px;
}

.input-area {
  width: 100%;
  min-height: inherit;
  max-height: 200px;
  padding: 8px 28px 8px 0;
  line-height: 1.5;
  border: none;
  outline: none;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  color: var(--el-text-color-regular);
  &::placeholder {
    color: var(--el-text-color-placeholder);
  }
  &:disabled {
    background: transparent;
    cursor: not-allowed;
  }
}

.clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--el-text-color-secondary);
  cursor: pointer;
  &:hover {
    color: var(--el-text-color-regular);
  }
}

.send-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background: var(--el-color-primary);
  cursor: pointer;
  transition: all 0.2s;
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  &:disabled {
    background: var(--el-disabled-bg-color);
    cursor: not-allowed;
    &.loading {
      background: var(--el-color-primary-light-5);
    }
  }
}

.loading-icon {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
