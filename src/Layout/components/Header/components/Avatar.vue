<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<template>
  <el-dropdown trigger="click">
    <span class="avatar">
      <img
        :src="avatar ? avatar : 'https://pic.imgdb.cn/item/67385379d29ded1a8c811e00.png'"
        alt="avatar"
      />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <span @click="router.push('/user')"><i class="iconfont icon-user"></i>个人中心</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <span><i class="iconfont icon-tuichu"></i>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { LOGIN_URL } from '@/config'
import router from '@/router'
import { useUserStore } from '@/store/modules/user'
import { ElMessageBox, ElMessage } from 'element-plus'
import { computed } from 'vue'

const userStore = useUserStore()
const avatar = computed(() => userStore.userInfo.avatar)

const logout = () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提醒', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  } as any).then(() => {
    userStore.setTokenWithExpires('', 0)
    router.replace(LOGIN_URL)
    ElMessage.success('退出登录成功！')
  })
}
</script>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
