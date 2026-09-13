<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import logoMark from '@/assets/images/logo.png'
import brandBg from '@/assets/images/login-brand-bg.jpg'
import { HOME_URL } from '@/config'
import { Login } from '@/api/interface'
import { loginApi, registerApi } from '@/api/modules/login'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { useTabsStore } from '@/store/modules/tabs'
import { initDynamicRouter } from '@/router/dynamicRouter'
import { useNotify } from '@/components/Toast'
import AppIcon from '@/components/AppIcon/index.vue'
import { Icon, addIcon } from '@iconify/vue'
import iconGithub from '@iconify-icons/logos/github-icon'
import iconGoogle from '@iconify-icons/logos/google-icon'

addIcon('logos:github-icon', iconGithub)
addIcon('logos:google-icon', iconGoogle)
type AuthMode = 'account' | 'phone' | 'register' | 'forgot'

const visible = defineModel<boolean>({ default: false })

const router = useRouter()
const notify = useNotify()
const userStore = useUserStore()
const tabsStore = useTabsStore()
const authStore = useAuthStore()

const mode = ref<AuthMode>('account')
const loading = ref(false)
const codeSending = ref(false)
const countdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null

const accountFormRef = ref<FormInstance>()
const phoneFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()
const forgotFormRef = ref<FormInstance>()

const accountForm = reactive({
  username: '',
  password: '',
  expires7d: false
})

const phoneForm = reactive({
  countryCode: '+86',
  phone: '',
  code: '',
  agreed: false
})

const registerForm = reactive({
  username: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  agreed: false
})

const forgotForm = reactive({
  email: ''
})

const panelMeta = computed(() => {
  switch (mode.value) {
    case 'phone':
      return {
        title: '手机验证码登录',
        subtitle: '输入手机号，快速登录 Mason'
      }
    case 'register':
      return {
        title: '创建你的账号',
        subtitle: '加入 Mason，开启高效的开发之旅'
      }
    case 'forgot':
      return {
        title: '找回密码',
        subtitle: '输入邮箱地址，我们将发送重置密码的链接'
      }
    default:
      return {
        title: '欢迎回来',
        subtitle: '登录 Mason，继续你的创作之旅'
      }
  }
})

watch(visible, (val) => {
  if (!val) {
    loading.value = false
    return
  }
  mode.value = 'account'
  resetForms()
})

const resetForms = () => {
  accountFormRef.value?.resetFields()
  phoneFormRef.value?.resetFields()
  registerFormRef.value?.resetFields()
  forgotFormRef.value?.resetFields()
  accountForm.username = ''
  accountForm.password = ''
  accountForm.expires7d = false
  phoneForm.phone = ''
  phoneForm.code = ''
  phoneForm.agreed = false
  registerForm.username = ''
  registerForm.nickname = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  registerForm.agreed = false
  forgotForm.email = ''
}

const close = () => {
  visible.value = false
}

const switchMode = (next: AuthMode) => {
  mode.value = next
}

const accountRules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 2, max: 32, message: '账号长度为 2-32 个字符', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const phoneRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为 6 位', trigger: 'blur' }
  ]
}

const validatePass = (_rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error('请设置密码'))
    return
  }
  if (value.length < 6) {
    callback(new Error('密码至少 6 位'))
    return
  }
  if (registerForm.confirmPassword) {
    registerFormRef.value?.validateField('confirmPassword')
  }
  callback()
}

const validatePass2 = (_rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error('请确认密码'))
    return
  }
  if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致'))
    return
  }
  callback()
}

const registerRules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 2, max: 32, message: '账号长度为 2-32 个字符', trigger: 'blur' }
  ],
  password: [{ required: true, validator: validatePass, trigger: 'blur' }],
  confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
}

const forgotRules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const finishLogin = async (userId: number) => {
  const flag = await authStore.getAuthMenuList()
  if (!flag) return
  await initDynamicRouter()
  await userStore.getUserInfo(userId)
  await tabsStore.setTabs([])
  await router.push(HOME_URL)
  notify.success(
    `欢迎回来，${userStore.userInfo.username}`,
    {
      duration: 2500,
      position: 'top-right'
    } as any,
    '登录成功'
  )
  close()
}

const submitAccountLogin = async () => {
  const valid = await accountFormRef.value?.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  try {
    const res = await loginApi(accountForm as Login.ReqLoginForm)
    if (res.code === 200) {
      await finishLogin(res.data.id)
    } else {
      ElMessage.error(res.msg)
    }
  } finally {
    loading.value = false
  }
}

const submitPhoneLogin = async () => {
  const valid = await phoneFormRef.value?.validate().catch(() => false)
  if (!valid) return
  if (!phoneForm.agreed) {
    ElMessage.warning('请先阅读并同意用户协议与隐私政策')
    return
  }
  ElMessage.info('手机验证码登录即将开放，请先使用账号登录')
}

const submitRegister = async () => {
  const valid = await registerFormRef.value?.validate().catch(() => false)
  if (!valid) return
  if (!registerForm.agreed) {
    ElMessage.warning('请先阅读并同意用户协议与隐私政策')
    return
  }
  loading.value = true
  try {
    const params: Login.ReqRegisterForm = {
      username: registerForm.username,
      password: registerForm.password
    }
    const res = await registerApi(params)
    if (res.code === 200) {
      ElMessage.success('注册成功，请登录')
      mode.value = 'account'
      accountForm.username = registerForm.username
      accountForm.password = ''
    } else {
      ElMessage.error(res.msg)
    }
  } finally {
    loading.value = false
  }
}

const submitForgot = async () => {
  const valid = await forgotFormRef.value?.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 600))
    ElMessage.success('重置链接已发送，请查收邮箱')
    mode.value = 'account'
  } finally {
    loading.value = false
  }
}

const sendCode = () => {
  if (countdown.value > 0 || codeSending.value) return
  if (!/^1\d{10}$/.test(phoneForm.phone)) {
    ElMessage.warning('请先输入正确的手机号')
    return
  }
  codeSending.value = true
  setTimeout(() => {
    codeSending.value = false
    countdown.value = 60
    ElMessage.success('验证码已发送')
    countdownTimer = setInterval(() => {
      countdown.value -= 1
      if (countdown.value <= 0 && countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }, 1000)
  }, 400)
}

const socialTip = () => {
  ElMessage.info('第三方登录即将开放')
}

onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
})

const onPrimary = () => {
  if (mode.value === 'account') submitAccountLogin()
  else if (mode.value === 'phone') submitPhoneLogin()
  else if (mode.value === 'register') submitRegister()
  else submitForgot()
}

const primaryLabel = computed(() => {
  if (mode.value === 'register') return '注册'
  if (mode.value === 'forgot') return '发送重置链接'
  return '登录'
})
</script>

<template>
  <Teleport to="body">
    <Transition name="auth-fade">
      <div v-if="visible" class="auth-overlay" @click.self="close">
        <div class="auth-modal" role="dialog" aria-modal="true" :aria-label="panelMeta.title">
          <aside class="brand-pane" aria-label="Mason — Build A Better Tomorrow">
            <img class="brand-bg" :src="brandBg" alt="" aria-hidden="true" />

            <div class="brand-top">
              <img class="brand-mark" :src="logoMark" alt="Mason" />
              <p class="brand-slogan">Build A Better<br />Tomorrow.</p>
            </div>

            <div class="brand-foot">
              <span class="brand-rule" aria-hidden="true" />
              <p class="brand-caption">更好的开发体验<br />从这里开始</p>
            </div>
          </aside>

          <section class="form-pane">
            <button type="button" class="close-btn" aria-label="关闭" @click="close">
              <AppIcon name="x" :size="18" />
            </button>

            <div class="form-head">
              <h2>{{ panelMeta.title }}</h2>
              <p>{{ panelMeta.subtitle }}</p>
            </div>

            <div v-if="mode === 'account' || mode === 'phone'" class="auth-tabs">
              <button
                type="button"
                class="tab"
                :class="{ active: mode === 'account' }"
                @click="switchMode('account')"
              >
                账号登录
              </button>
              <button
                type="button"
                class="tab"
                :class="{ active: mode === 'phone' }"
                @click="switchMode('phone')"
              >
                手机号登录
              </button>
            </div>

            <!-- 账号登录 -->
            <el-form
              v-show="mode === 'account'"
              ref="accountFormRef"
              class="auth-form"
              :model="accountForm"
              :rules="accountRules"
              @keyup.enter="submitAccountLogin"
            >
              <el-form-item prop="username">
                <el-input v-model="accountForm.username" placeholder="请输入账号" clearable>
                  <template #prefix><AppIcon name="mail" :size="16" /></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="accountForm.password"
                  type="password"
                  show-password
                  placeholder="请输入密码"
                >
                  <template #prefix><AppIcon name="lock-keyhole" :size="16" /></template>
                </el-input>
              </el-form-item>
              <div class="form-row">
                <el-checkbox v-model="accountForm.expires7d">记住我</el-checkbox>
                <button type="button" class="text-link" @click="switchMode('forgot')">
                  忘记密码？
                </button>
              </div>
            </el-form>

            <!-- 手机号登录 -->
            <el-form
              v-show="mode === 'phone'"
              ref="phoneFormRef"
              class="auth-form"
              :model="phoneForm"
              :rules="phoneRules"
              @keyup.enter="submitPhoneLogin"
            >
              <el-form-item prop="phone">
                <div class="phone-field">
                  <el-select v-model="phoneForm.countryCode" class="code-select">
                    <el-option label="+86" value="+86" />
                    <el-option label="+852" value="+852" />
                    <el-option label="+1" value="+1" />
                  </el-select>
                  <el-input v-model="phoneForm.phone" placeholder="请输入手机号码" clearable />
                </div>
              </el-form-item>
              <el-form-item prop="code">
                <el-input v-model="phoneForm.code" placeholder="请输入验证码" maxlength="6">
                  <template #prefix><AppIcon name="shield-check" :size="16" /></template>
                  <template #suffix>
                    <button
                      type="button"
                      class="code-btn"
                      :disabled="countdown > 0 || codeSending"
                      @click="sendCode"
                    >
                      {{ countdown > 0 ? `${countdown}s` : codeSending ? '发送中…' : '获取验证码' }}
                    </button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="phoneForm.agreed">
                  我已阅读并同意
                  <a href="javascript:void(0)">《用户协议》</a>
                  和
                  <a href="javascript:void(0)">《隐私政策》</a>
                </el-checkbox>
              </el-form-item>
            </el-form>

            <!-- 注册 -->
            <el-form
              v-show="mode === 'register'"
              ref="registerFormRef"
              class="auth-form"
              :model="registerForm"
              :rules="registerRules"
              @keyup.enter="submitRegister"
            >
              <el-form-item prop="username">
                <el-input v-model="registerForm.username" placeholder="请输入账号" clearable>
                  <template #prefix><AppIcon name="mail" :size="16" /></template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="registerForm.nickname" placeholder="请输入昵称（可选）" clearable>
                  <template #prefix><AppIcon name="user" :size="16" /></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="registerForm.password"
                  type="password"
                  show-password
                  placeholder="设置密码（至少 6 位）"
                >
                  <template #prefix><AppIcon name="lock-keyhole" :size="16" /></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input
                  v-model="registerForm.confirmPassword"
                  type="password"
                  show-password
                  placeholder="确认密码"
                >
                  <template #prefix><AppIcon name="lock-keyhole" :size="16" /></template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="registerForm.agreed">
                  我已阅读并同意
                  <a href="javascript:void(0)">《用户协议》</a>
                  和
                  <a href="javascript:void(0)">《隐私政策》</a>
                </el-checkbox>
              </el-form-item>
            </el-form>

            <!-- 找回密码 -->
            <el-form
              v-show="mode === 'forgot'"
              ref="forgotFormRef"
              class="auth-form"
              :model="forgotForm"
              :rules="forgotRules"
              @keyup.enter="submitForgot"
            >
              <el-form-item prop="email">
                <el-input v-model="forgotForm.email" placeholder="请输入你的邮箱地址" clearable>
                  <template #prefix><AppIcon name="mail" :size="16" /></template>
                </el-input>
              </el-form-item>
            </el-form>

            <button type="button" class="primary-btn" :disabled="loading" @click="onPrimary">
              <span v-if="loading" class="spinner" />
              {{ primaryLabel }}
            </button>

            <template v-if="mode === 'account' || mode === 'phone'">
              <div class="divider"><span>或使用以下方式登录</span></div>
              <div class="social-row">
                <button type="button" class="social-btn" aria-label="GitHub" @click="socialTip">
                  <Icon icon="logos:github-icon" width="18" height="18" />
                </button>
                <button type="button" class="social-btn" aria-label="Google" @click="socialTip">
                  <Icon icon="logos:google-icon" width="18" height="18" />
                </button>
                <button type="button" class="social-btn" aria-label="微信" @click="socialTip">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      fill="#07C160"
                      d="M9.5 4C5.91 4 3 6.69 3 10c0 1.89.96 3.57 2.46 4.7l-.62 2.28 2.42-1.24c.93.3 1.93.46 2.99.46.25 0 .5-.01.74-.03A5.6 5.6 0 0 1 10.5 15c0-3.31 2.91-6 6.5-6 .2 0 .4.01.59.02C16.57 5.74 13.32 4 9.5 4Zm-2.25 3.5a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75Zm4.5 0a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75ZM17 10.5c-2.9 0-5.25 2.13-5.25 4.75S14.1 20 17 20c.78 0 1.52-.15 2.19-.41l1.86.95-.48-1.75C21.5 17.85 22.25 16.64 22.25 15.25 22.25 12.63 19.9 10.5 17 10.5Zm-1.6 3.1a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Zm3.2 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z"
                    />
                  </svg>
                </button>
              </div>
            </template>

            <div class="form-foot">
              <template v-if="mode === 'register'">
                已有账号？
                <button type="button" class="text-link" @click="switchMode('account')">立即登录</button>
              </template>
              <template v-else-if="mode === 'forgot'">
                <button type="button" class="text-link back-link" @click="switchMode('account')">
                  <AppIcon name="arrow-left" :size="14" />
                  返回登录
                </button>
              </template>
              <template v-else>
                还没有账号？
                <button type="button" class="text-link" @click="switchMode('register')">立即注册</button>
              </template>
            </div>
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.auth-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: color-mix(in srgb, var(--bg-page) 35%, rgba(0, 0, 0, 0.62));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.auth-modal {
  display: grid;
  grid-template-columns: 0.92fr 1.18fr;
  width: min(880px, 100%);
  max-height: min(640px, calc(100vh - 48px));
  overflow: hidden;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  box-shadow:
    0 24px 80px color-mix(in srgb, var(--shadow-color-strong) 55%, transparent),
    0 0 0 1px var(--border-subtle);
}

.brand-pane {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 36px 40px;
  overflow: hidden;
  color: #4a5568;
  background: #e8edf6;
  border-right: 1px solid color-mix(in srgb, #c5d0dc 55%, transparent);
}

.brand-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  pointer-events: none;
}

.brand-top {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
  margin-top: 28px;
  text-align: center;
}

.brand-mark {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 16px;
}

.brand-slogan {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.45;
  color: #7a8799;
  letter-spacing: 0.01em;
}

.brand-foot {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
}

.brand-rule {
  display: block;
  width: 28px;
  height: 1px;
  background: color-mix(in srgb, #8a97a8 55%, transparent);
}

.brand-caption {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.55;
  color: #5a6778;
  letter-spacing: 0.02em;
}

.form-pane {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 36px 40px 28px;
  overflow: auto;
  color: var(--text-primary);
  background: var(--bg-surface);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  color: var(--text-tertiary);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 8px;
}

.close-btn:hover {
  color: var(--text-primary);
  background: var(--fill-primary);
}

.form-head h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 720;
  line-height: 1.25;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.form-head p {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.auth-tabs {
  display: flex;
  gap: 22px;
  margin: 22px 0 18px;
  border-bottom: 1px solid var(--border-subtle);
}

.tab {
  position: relative;
  height: 40px;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-tertiary);
  cursor: pointer;
  background: transparent;
  border: 0;
}

.tab.active {
  color: var(--color-primary);
}

.tab.active::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 2px;
  content: '';
  background: var(--color-primary);
  border-radius: 2px 2px 0 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-form :deep(.el-form-item) {
  margin-bottom: 14px;
}

.auth-form :deep(.el-input__wrapper) {
  min-height: 44px;
  padding: 0 14px;
  background: var(--bg-surface-elevated);
  border-radius: 10px;
  box-shadow: 0 0 0 1px var(--border-light) inset;
}

.auth-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--border-light) 70%, var(--text-tertiary)) inset;
}

.auth-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--color-primary) inset;
}

.auth-form :deep(.el-input__inner) {
  color: var(--text-primary);
}

.auth-form :deep(.el-input__inner::placeholder) {
  color: var(--text-placeholder);
}

.auth-form :deep(.el-input__prefix),
.auth-form :deep(.el-input__suffix) {
  color: var(--text-tertiary);
}

.auth-form :deep(.el-checkbox) {
  height: auto;
  color: var(--text-secondary);
}

.auth-form :deep(.el-checkbox__label) {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
  white-space: normal;
}

.auth-form :deep(.el-checkbox__label a) {
  color: var(--color-primary);
  text-decoration: none;
}

.auth-form :deep(.el-checkbox__inner) {
  background: var(--bg-surface-elevated);
  border-color: var(--border-light);
}

.phone-field {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 8px;
  width: 100%;
}

.code-select :deep(.el-select__wrapper) {
  min-height: 44px;
  background: var(--bg-surface-elevated);
  border-radius: 10px;
  box-shadow: 0 0 0 1px var(--border-light) inset;
}

.code-select :deep(.el-select__placeholder),
.code-select :deep(.el-select__selected-item) {
  color: var(--text-primary);
}

.code-btn {
  padding: 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  white-space: nowrap;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.code-btn:disabled {
  color: var(--text-disabled);
  cursor: not-allowed;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 0 6px;
}

.text-link {
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  background: transparent;
  border: 0;
}

.text-link:hover {
  color: var(--color-primary-hover);
}

.primary-btn {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 46px;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 650;
  color: var(--text-inverse);
  cursor: pointer;
  background: var(--bg-inverse);
  border: 0;
  border-radius: 10px;
  transition:
    background 0.18s ease,
    transform 0.18s ease,
    opacity 0.18s ease;
}

.primary-btn:hover:not(:disabled) {
  opacity: 0.92;
}

.primary-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.primary-btn:disabled {
  cursor: wait;
  opacity: 0.72;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid color-mix(in srgb, var(--text-inverse) 35%, transparent);
  border-top-color: var(--text-inverse);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: center;
  margin: 22px 0 16px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.divider::before,
.divider::after {
  height: 1px;
  content: '';
  background: var(--border-subtle);
}

.social-row {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.social-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--text-secondary);
  cursor: pointer;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-light);
  border-radius: 12px;
}

.social-btn:hover {
  background: var(--bg-surface-hover);
  border-color: color-mix(in srgb, var(--border-light) 60%, var(--text-tertiary));
}

.form-foot {
  margin-top: auto;
  padding-top: 22px;
  font-size: 13px;
  color: var(--text-secondary);
  text-align: center;
}

.back-link {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}

.auth-fade-enter-active,
.auth-fade-leave-active {
  transition: opacity 0.22s ease;
}

.auth-fade-enter-active .auth-modal,
.auth-fade-leave-active .auth-modal {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.auth-fade-enter-from,
.auth-fade-leave-to {
  opacity: 0;
}

.auth-fade-enter-from .auth-modal,
.auth-fade-leave-to .auth-modal {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (width <= 820px) {
  .auth-modal {
    grid-template-columns: 1fr;
    max-height: calc(100vh - 32px);
  }

  .brand-pane {
    display: none;
  }

  .form-pane {
    padding: 28px 22px 22px;
  }
}
</style>
