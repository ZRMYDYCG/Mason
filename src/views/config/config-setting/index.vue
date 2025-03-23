<template>
  <el-card class="page-content">
    <div class="header">
      <h3>网站设置</h3>
    </div>

    <el-form label-width="140px" style="margin-top: 20px">
      <!-- 基础设置 -->
      <el-form-item label="网站名称：" prop="name">
        <el-input v-model="sys.name" :disabled="!isEdit" placeholder="请输入网站名称" />
      </el-form-item>
      <el-form-item label="网站域名：" prop="website">
        <el-input
          v-model="sys.website"
          :disabled="!isEdit"
          placeholder="请输入完整域名（包含协议）"
        />
      </el-form-item>

      <!-- 性能设置 -->
      <el-form-item label="缓存时间（分钟）：">
        <el-input-number
          v-model="sys.keepAliveTime"
          :disabled="!isEdit"
          :min="5"
          :max="120"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="图片大小限制：">
        <el-input-number
          v-model="sys.pictureSize"
          :disabled="!isEdit"
          :min="1"
          :max="50"
          controls-position="right"
        />
      </el-form-item>

      <!-- 备案信息 -->
      <el-form-item label="ICP备案号：">
        <el-input
          v-model="sys.recordNumber"
          :disabled="!isEdit"
          placeholder="请输入ICP备案号"
          style="width: 300px"
        />
      </el-form-item>

      <!-- 功能开关 -->
      <el-form-item label="网站功能：">
        <el-checkbox-group v-model="sys.features" :disabled="!isEdit">
          <el-checkbox label="showRecord">显示备案信息</el-checkbox>
          <el-checkbox label="commentEnabled">开启评论功能</el-checkbox>
          <el-checkbox label="maintenanceMode">维护模式</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 安全设置 -->
      <el-form-item label="安全设置：">
        <el-checkbox-group v-model="sys.security" :disabled="!isEdit">
          <el-checkbox label="https">强制HTTPS</el-checkbox>
          <el-checkbox label="twoFactorAuth">管理员双因素认证</el-checkbox>
          <el-checkbox label="bruteForceProtection">登录保护</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 高级设置 -->
      <el-form-item label="高级选项：">
        <el-checkbox-group v-model="sys.advanced" :disabled="!isEdit">
          <el-checkbox label="apiAccess">开放API访问</el-checkbox>
          <el-checkbox label="logging">详细日志记录</el-checkbox>
          <el-checkbox label="autoBackup">自动备份</el-checkbox>
          <el-checkbox label="thirdPartyIntegration">第三方服务集成</el-checkbox>
          <el-checkbox label="performanceMonitor">性能监控</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 90px" @click="handleEdit">
          {{ isEdit ? '保存配置' : '进入编辑' }}
        </el-button>
        <el-button v-if="isEdit" @click="cancelEdit">取消修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const sys = reactive({
  name: 'Mason • 石匠',
  website: 'https://mason.ink',
  keepAliveTime: 10,
  pictureSize: 10,
  recordNumber: '沪ICP备12345678号',
  features: ['showRecord', 'commentEnabled'],
  security: ['https', 'bruteForceProtection'],
  advanced: ['logging', 'autoBackup']
})

const isEdit = ref(false)
const originalData = JSON.stringify(sys)

const handleEdit = () => {
  if (isEdit.value) {
    ElMessageBox.confirm('确认保存当前配置吗？', '保存确认', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    } as any).then(() => {
      // 这里添加保存到服务器的逻辑
      ElMessage.success('配置保存成功')
      isEdit.value = false
    })
  } else {
    isEdit.value = true
  }
}

const cancelEdit = () => {
  Object.assign(sys, JSON.parse(originalData))
  isEdit.value = false
  ElMessage.info('已取消修改')
}
</script>

<style lang="scss" scoped>
.page-content {
  width: 100%;
  height: 100%;
  padding: 20px;

  .header {
    padding-bottom: 15px;
    border-bottom: 1px solid var(--el-border-color);

    h3 {
      font-size: 18px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }
  }

  :deep(.el-form) {
    margin-top: 20px;
    .el-form-item {
      margin-bottom: 22px;
      max-width: 900px;

      &__label {
        font-weight: 500;
        color: var(--el-text-color-regular);
      }
    }

    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
    }
  }
}
</style>
