<script setup lang="ts"></script>

<template>
  <el-row>
    <el-col>
      <el-card shadow="never">
        <div class="header-section">
          <div class="avatar">
            <img
              class="avatar-image"
              src="https://pic1.imgdb.cn/item/67d105e6066befcec6e39e31.jpg"
              alt="logo"
            />
          </div>
          <div>
            <h2 class="title">Hello Mason</h2>
            <div class="description">欢迎使用 Mason • 石匠 后台管理集成方案</div>
          </div>
        </div>
        <div class="logo-section">
          <img src="@/assets/images/logo.svg" alt="" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-card {
  :deep(.el-card__body) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.header-section {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 16px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  font-size: 1.125rem;
  font-weight: bold;
}

.description {
  font-size: 0.875rem;
  color: #6b7280;
}

.logo-section {
  width: 50px;
  height: 50px;
}
</style>
