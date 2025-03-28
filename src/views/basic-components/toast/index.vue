<template>
  <div class="message-demo-container">
    <h2>Message 示例</h2>
    <div class="button-group">
      <el-button @click="showInfoMessage">普通消息</el-button>
      <el-button @click="showSuccessMessage" type="success">成功消息</el-button>
      <el-button @click="showWarningMessage" type="warning">警告消息</el-button>
      <el-button @click="showErrorMessage" type="danger">错误消息</el-button>
    </div>

    <h2>MessageBox 示例</h2>
    <div class="button-group">
      <el-button @click="showInfoMessageBox">普通提示框</el-button>
      <el-button @click="showSuccessMessageBox" type="success">成功提示框</el-button>
      <el-button @click="showWarningMessageBox" type="warning">警告提示框</el-button>
      <el-button @click="showErrorMessageBox" type="danger">错误提示框</el-button>
      <el-button @click="showConfirmMessageBox" type="primary">确认对话框</el-button>
      <el-button @click="showPromptMessageBox">输入对话框</el-button>
    </div>

    <h2>Notification 示例</h2>
    <div class="button-group">
      <el-button @click="showInfoNotification">普通通知</el-button>
      <el-button @click="showSuccessNotification" type="success">成功通知</el-button>
      <el-button @click="showWarningNotification" type="warning">警告通知</el-button>
      <el-button @click="showErrorNotification" type="danger">错误通知</el-button>
      <el-button @click="showCustomNotification">自定义通知</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage, useMessageBox, useNotify } from '@/components/Toast/index.ts'

// 初始化消息组件
const message = useMessage()
const messageBox = useMessageBox()
const notify = useNotify()

// Message 示例方法
const showInfoMessage = () => {
  message.info('这是一条普通消息提示')
}

const showSuccessMessage = () => {
  message.success({
    message: '操作成功',
    duration: 2000,
    showClose: true
  })
}

const showWarningMessage = () => {
  message.warning('这是一条警告消息')
}

const showErrorMessage = () => {
  message.error({
    message: '操作失败',
    duration: 3000
  })
}

// MessageBox 示例方法
const showInfoMessageBox = () => {
  messageBox.info('这是一条普通提示信息', {
    confirmButtonText: '知道了'
  })
}

const showSuccessMessageBox = () => {
  messageBox.success(
    '操作成功完成!',
    {
      confirmButtonText: '好的',
      center: true
    },
    '成功提示'
  )
}

const showWarningMessageBox = () => {
  messageBox.warning(
    '请注意当前操作可能带来风险!',
    {
      confirmButtonText: '继续',
      cancelButtonText: '取消'
    },
    '风险警告'
  )
}

const showErrorMessageBox = () => {
  messageBox.error(
    '系统发生错误，请联系管理员!',
    {
      confirmButtonText: '确定'
    },
    '错误提示'
  )
}

const showConfirmMessageBox = async () => {
  try {
    await messageBox.confirm('确定要删除这条数据吗?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    message.success('删除成功')
  } catch (error) {
    message.info('已取消删除')
  }
}

const showPromptMessageBox = async () => {
  try {
    const { value } = await messageBox.prompt('请输入您的邮箱', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: '邮箱格式不正确'
    })
    message.success(`您输入的邮箱是: ${value}`)
  } catch (error) {
    message.info('取消输入')
  }
}

// Notification 示例方法
const showInfoNotification = () => {
  notify.info('这是一条普通通知消息')
}

const showSuccessNotification = () => {
  notify.success(
    '数据保存成功',
    {
      duration: 2500,
      position: 'bottom-right'
    },
    '操作成功'
  )
}

const showWarningNotification = () => {
  notify.warning(
    '系统即将进行维护',
    {
      duration: 0, // 不会自动关闭
      showClose: true
    },
    '系统通知'
  )
}

const showErrorNotification = () => {
  notify.error(
    '网络连接失败，请检查您的网络设置',
    {
      duration: 3000,
      offset: 100
    },
    '错误提示'
  )
}

const showCustomNotification = () => {
  notify.success('', {
    title: '自定义通知',
    message: '这是一条自定义样式的通知消息',
    duration: 2000,
    customClass: 'custom-notification',
    offset: 80,
    onClick: () => {
      message.info('您点击了通知')
    }
  })
}
</script>

<style scoped>
.message-demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.button-group {
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

h2 {
  margin: 20px 0 15px;
  color: #333;
  font-size: 18px;
}
</style>

<style scoped lang="scss">
/*用于自定义通知 */
.custom-notification {
  background: #f0f9eb;
  border: 1px solid #e1f3d8;
  color: #67c23a;
}
</style>
