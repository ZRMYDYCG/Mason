<script setup lang="ts">
const logout = () => {}
</script>

<template>
  <div class="flex items-center px-4 flex-wrap h-12 leading-12">
    <!-- 切换侧边栏折叠状态按钮 -->
    <el-icon :size="25">
      <component is="Fold"></component>
    </el-icon>
    <!-- 面包屑导航 -->
    <div class="px-4">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">页面</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">子页面</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <div class="flex items-center flex-row-reverse px-4 min-width-32">
    <el-dropdown>
      <span class="el-dropdown-link flex items-center px-2">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="ml-2">一勺</span>
        <el-icon><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-link
              href="https://github.com"
              target="_blank"
              :underline="false"
            >
              个人中心
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link
              href="https://github.com"
              target="_blank"
              :underline="false"
            >
              项目地址
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
:deep(.el-icon) {
  cursor: pointer;
}
</style>
