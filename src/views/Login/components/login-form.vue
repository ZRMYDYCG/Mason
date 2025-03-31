<template>
  <el-form ref="loginFormRef" :model="account" :rules="rules">
    <el-form-item prop="username">
      <el-input v-model="account.username" placeholder="用户名">
        <template #prefix> <i class="iconfont icon-user"></i> </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="account.password" type="password" show-password placeholder="密码">
        <template #prefix> <i class="iconfont icon-lock"></i> </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="expires7d">
      <el-checkbox v-model="account.expires7d" class="expires7d"> 7天免登录 </el-checkbox>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { HOME_URL } from '@/config'
import { Login } from '@/api/interface'
import { loginApi } from '@/api/modules/login'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { useTabsStore } from '@/store/modules/tabs'
import { initDynamicRouter } from '@/router/dynamicRouter'
import { useNotify } from '@/components/Toast'

const notify = useNotify()

const router = useRouter()

const userStore = useUserStore()
const tabsStore = useTabsStore()
const authStore = useAuthStore()

const account: Login.ReqLoginForm = reactive({
  username: '',
  password: '',
  expires7d: false // 后端代码控制token过期时间 默认24h
})

const rules = {
  name: [
    { required: true, message: '请输入账号名称', trigger: 'blur' },
    { min: 2, max: 10, message: '账号名称长度为2-10个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码必须是6位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}

const loginFormRef = ref<FormInstance>()

const loginAction = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      // 登录验证
      let res = await loginApi(account)
      // 登录成功后 保存用户数据 跳转主页
      if (res.code == 200) {
        // 设置用户信息 包括token
        userStore.setTokenWithExpires(res.data.token, res.data.expires)
        // 根据token获取菜单列表 成功则加载路由
        const flag = await authStore.getAuthMenuList()
        if (flag) {
          // 动态加载路由
          await initDynamicRouter()
          await userStore.getUserInfo(res.data.id)
          // 清空 tabs
          await tabsStore.setTabs([])
          // 跳转主页
          await router.push(HOME_URL)
          notify.success(
            `欢迎回来，${userStore.userInfo.username}`,
            {
              duration: 2500,
              position: 'top-right'
            } as any,
            '登录成功 🎉'
          )
        }
      } else {
        ElMessage.error(res.msg)
      }
    }
  })
}

const resetAction = () => {
  loginFormRef.value?.resetFields()
}

defineExpose({
  loginAction,
  resetAction
})
</script>

<style lang="scss" scoped></style>
