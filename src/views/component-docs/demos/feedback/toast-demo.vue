<script setup lang="ts">
import AppIcon from '@/components/AppIcon/index.vue'
import { useMessage, useMessageBox, useNotify } from '@/components/Toast'
import DocExample from '../../components/doc-example.vue'

const message = useMessage()
const box = useMessageBox()
const notify = useNotify()

const showMessage = (type: 'info' | 'success' | 'warning' | 'error') => {
  const msgs = {
    info: '这是一条 info 消息',
    success: '操作成功！数据已保存',
    warning: '请注意，该操作不可逆',
    error: '请求失败，请检查网络连接'
  }
  message[type](msgs[type])
}

const showMessageBox = (type: 'info' | 'success') => {
  box[type]('这是一条 MessageBox 消息', {}, '提示')
}

const showConfirm = async () => {
  try {
    await box.confirm('确定要删除这条记录吗？此操作不可恢复。', { type: 'warning' }, '删除确认')
    message.success('已确认删除')
  } catch {
    message.info('已取消删除')
  }
}

const showPrompt = async () => {
  try {
    const result = await box.prompt('请输入新的用户名', {}, '修改用户名')
    message.success(`用户名已修改为：${result.value}`)
  } catch {
    message.info('已取消修改')
  }
}

const showNotify = (type: 'info' | 'success' | 'warning' | 'error') => {
  const msgs = {
    info: '你有一条新的系统通知',
    success: '文件上传成功',
    warning: '磁盘空间不足',
    error: '服务连接超时'
  }
  notify[type](msgs[type])
}

const messageCode = `import { useMessage } from '@/components/Toast'

const message = useMessage()

message.info('这是一条 info 消息')
message.success('操作成功！数据已保存')
message.warning('请注意，该操作不可逆')
message.error('请求失败，请检查网络连接')`

const boxCode = `import { useMessage, useMessageBox } from '@/components/Toast'

const message = useMessage()
const box = useMessageBox()

box.info('这是一条 MessageBox 消息', {}, '提示')
box.success('这是一条 MessageBox 消息', {}, '提示')

try {
  await box.confirm('确定要删除这条记录吗？此操作不可恢复。', { type: 'warning' }, '删除确认')
  message.success('已确认删除')
} catch {
  message.info('已取消删除')
}

try {
  const result = await box.prompt('请输入新的用户名', {}, '修改用户名')
  message.success(\`用户名已修改为：\${result.value}\`)
} catch {
  message.info('已取消修改')
}`

const notifyCode = `import { useNotify } from '@/components/Toast'

const notify = useNotify()

notify.info('你有一条新的系统通知')
notify.success('文件上传成功')
notify.warning('磁盘空间不足')
notify.error('服务连接超时')`
</script>

<template>
  <div class="demo-stack">
    <DocExample title="useMessage - 轻量消息" :code="messageCode">
      <template #description>顶部轻量提示，适合简短操作反馈。下方按钮触发的文案与代码示例完全一致。</template>
      <div class="demo-row">
        <button type="button" class="demo-btn info" @click="showMessage('info')">
          <AppIcon name="info" :size="15" />
          Info
        </button>
        <button type="button" class="demo-btn success" @click="showMessage('success')">
          <AppIcon name="check-circle" :size="15" />
          Success
        </button>
        <button type="button" class="demo-btn warning" @click="showMessage('warning')">
          <AppIcon name="alert-triangle" :size="15" />
          Warning
        </button>
        <button type="button" class="demo-btn error" @click="showMessage('error')">
          <AppIcon name="x-circle" :size="15" />
          Error
        </button>
      </div>
    </DocExample>

    <DocExample title="useMessageBox - 确认 / 输入" :code="boxCode">
      <template #description>
        模态对话框：<code>info</code> / <code>success</code> 告警、<code>confirm</code> 确认、
        <code>prompt</code> 输入。
      </template>
      <div class="demo-row">
        <button type="button" class="demo-btn info" @click="showMessageBox('info')">
          <AppIcon name="info" :size="15" />
          Info Alert
        </button>
        <button type="button" class="demo-btn success" @click="showMessageBox('success')">
          <AppIcon name="check-circle" :size="15" />
          Success Alert
        </button>
        <button type="button" class="demo-btn warning" @click="showConfirm">
          <AppIcon name="alert-triangle" :size="15" />
          Confirm
        </button>
        <button type="button" class="demo-btn" @click="showPrompt">
          <AppIcon name="pen-line" :size="15" />
          Prompt
        </button>
      </div>
    </DocExample>

    <DocExample title="useNotify - 通知条" :code="notifyCode">
      <template #description>右上角通知条，不阻断操作；内部有短延迟，减少连续弹出重叠。</template>
      <div class="demo-row">
        <button type="button" class="demo-btn info" @click="showNotify('info')">
          <AppIcon name="bell" :size="15" />
          Info
        </button>
        <button type="button" class="demo-btn success" @click="showNotify('success')">
          <AppIcon name="check-circle" :size="15" />
          Success
        </button>
        <button type="button" class="demo-btn warning" @click="showNotify('warning')">
          <AppIcon name="alert-triangle" :size="15" />
          Warning
        </button>
        <button type="button" class="demo-btn error" @click="showNotify('error')">
          <AppIcon name="x-circle" :size="15" />
          Error
        </button>
      </div>
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
  flex-wrap: wrap;
  gap: 8px;
}

.demo-btn {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  background: var(--fill-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.demo-btn.info {
  color: #3b82f6;
  background: rgb(59 130 246 / 8%);
  border-color: #3b82f6;
}

.demo-btn.success {
  color: #10b981;
  background: rgb(16 185 129 / 8%);
  border-color: #10b981;
}

.demo-btn.warning {
  color: #f59e0b;
  background: rgb(245 158 11 / 8%);
  border-color: #f59e0b;
}

.demo-btn.error {
  color: #ef4444;
  background: rgb(239 68 68 / 8%);
  border-color: #ef4444;
}
</style>
