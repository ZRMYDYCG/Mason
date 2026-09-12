<template>
  <el-dropdown trigger="click">
    <div class="user-trigger">
      <el-avatar
        :src="avatar || 'https://pic1.imgdb.cn/item/67d105e6066befcec6e39e31.jpgg'"
        size="small"
      ></el-avatar>
      <div v-if="username" class="user-meta">
        <span class="hello">Hello,</span>
        <span class="name">{{ username }}</span>
      </div>
      <AppIcon name="chevron-down" :size="14" class="user-chevron" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <span class="flex items-center gap-2" @click="openDialog">
            <AppIcon name="user" :size="16" />
            修改资料
          </span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <span class="flex items-center gap-2">
            <AppIcon name="log-out" :size="16" />
            退出登录
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <UpdateProfileDialog ref="dialogRef" />
</template>

<script setup lang="ts">
import { LOGIN_URL } from '@/config'
import router, { resetRouter } from '@/router'
import { logoutApi } from '@/api/modules/login'
import { useAuthStore } from '@/store/modules/auth'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'
import { ElMessageBox, ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import UpdateProfileDialog from './UpdateProfileDialog.vue'

const userStore = useUserStore()
const authStore = useAuthStore()
const tabsStore = useTabsStore()
const keepAliveStore = useKeepAliveStore()
const username = computed(() => userStore.userInfo.username)
const avatar = computed(() => userStore.userInfo.avatar)
const dialogRef = ref<InstanceType<typeof UpdateProfileDialog>>()

const openDialog = () => {
  dialogRef.value?.open()
}

const logout = () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提醒', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  } as any).then(async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.log(error)
    }
    authStore.authMenuList = []
    await keepAliveStore.setKeepAliveNames([])
    await tabsStore.setTabs([])
    userStore.clearSession()
    resetRouter()
    router.replace(LOGIN_URL)
    ElMessage.success('退出登录成功！')
  })
}
</script>

<style scoped>
.user-trigger {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 4px 8px 4px 4px;
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: background-color 0.15s ease;
}

.user-trigger:hover {
  background-color: var(--fill-primary);
}

.user-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.hello {
  font-size: 11px;
  color: var(--layout-topbar-text-secondary, var(--text-tertiary));
}

.name {
  font-size: 13px;
  font-weight: 600;
  color: var(--layout-topbar-text, var(--text-primary));
}

.user-chevron {
  flex-shrink: 0;
  color: var(--layout-topbar-text-secondary, var(--text-tertiary));
  opacity: 0.75;
}

@media screen and (width <= 768px) {
  .user-meta,
  .user-chevron {
    display: none;
  }
}
</style>
