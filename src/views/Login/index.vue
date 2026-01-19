<template>
  <div class="landing-page">
    <header class="header">
      <div class="logo-container">
        <img class="logo" src="@/assets/images/logo.svg" alt="logo" />
        <span class="app-name">Mason Admin</span>
      </div>
      <div class="header-actions">
        <el-button text class="nav-btn" @click="openLogin">登录</el-button>
        <el-button text class="nav-btn" @click="openRegister">注册</el-button>
        <el-switch
          v-model="isDark"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          style="margin-left: 10px"
        />
      </div>
    </header>

    <main class="main-content">
      <div class="hero-section">
        <h1 class="hero-title">让开发回归纯粹与高效</h1>
        <p class="hero-subtitle">
          Mason Admin 致力于为开发者打造极致舒适的开发体验，消除优质后台构建的复杂壁垒。
          通过开箱即用的最佳实践与优雅的架构设计，让每一位开发者都能轻松驾驭复杂业务，专注于创造价值。
        </p>
        <el-button type="primary" color="#000" class="cta-button" round @click="openLogin">
          开启开发之旅
        </el-button>
      </div>

      <div class="feature-card">
        <div class="card-content">
          <h3 class="card-title">Mason Admin Template</h3>
          <p class="card-desc">在这个项目里，一切全是纯粹的。</p>
          <div
            class="card-image-placeholder"
            :style="{ backgroundImage: `url(${isDark ? LoginImageDark : LoginImageLight})` }"
          >
            <div class="placeholder-overlay">
              <span>Modern • Efficient • Elegant</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <el-dialog
      v-model="loginVisible"
      title="登录"
      width="400px"
      align-center
      append-to-body
      destroy-on-close
      class="auth-dialog"
    >
      <LoginForm ref="loginRef" />
      <template #footer>
        <div class="dialog-footer">
          <div class="dialog-links">
            <el-link type="primary" :underline="false" @click="switchToRegister"
              >没有账号？去注册</el-link
            >
          </div>
          <div class="dialog-buttons">
            <el-button @click="loginVisible = false">取消</el-button>
            <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="registerVisible"
      title="注册"
      width="400px"
      align-center
      append-to-body
      destroy-on-close
      class="auth-dialog"
    >
      <RegisterForm ref="registerRef" @register-success="handleRegisterSuccess" />
      <template #footer>
        <div class="dialog-footer">
          <div class="dialog-links">
            <el-link type="primary" :underline="false" @click="switchToLogin"
              >已有账号？去登录</el-link
            >
          </div>
          <div class="dialog-buttons">
            <el-button @click="registerVisible = false">取消</el-button>
            <el-button type="primary" @click="handleRegisterSubmit">注册</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LoginForm from './components/login-form.vue'
import RegisterForm from './components/register-form.vue'
import { useSettingStore } from '@/store/modules/setting'
import { SystemThemeEnum } from '@/config'
import { Moon, Sunny } from '@element-plus/icons-vue'
import LoginImageDark from '@/assets/images/login/image-dark.png'
import LoginImageLight from '@/assets/images/login/image-light.png'

const loginVisible = ref(false)
const registerVisible = ref(false)
const loginRef = ref<InstanceType<typeof LoginForm>>()
const registerRef = ref<InstanceType<typeof RegisterForm>>()

const settingStore = useSettingStore()

const isDark = computed({
  get: () => settingStore.isDark,
  set: (val) => {
    settingStore.setThemeMode(val ? SystemThemeEnum.DARK : SystemThemeEnum.LIGHT)
  }
})

const openLogin = () => {
  loginVisible.value = true
  registerVisible.value = false
}

const openRegister = () => {
  registerVisible.value = true
  loginVisible.value = false
}

const switchToRegister = () => {
  loginVisible.value = false
  setTimeout(() => {
    registerVisible.value = true
  }, 200)
}

const switchToLogin = () => {
  registerVisible.value = false
  setTimeout(() => {
    loginVisible.value = true
  }, 200)
}

const handleLoginSubmit = () => {
  loginRef.value?.loginAction()
}

const handleRegisterSubmit = () => {
  registerRef.value?.registerAction()
}

const handleRegisterSuccess = () => {
  registerVisible.value = false
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--el-text-color-primary);
  background-color: var(--el-bg-color);
  transition:
    background-color 0.3s,
    color 0.3s;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: transparent;

  .logo-container {
    display: flex;
    gap: 10px;
    align-items: center;

    .logo {
      width: 32px;
      height: 32px;
    }

    .app-name {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--el-text-color-primary);
    }
  }

  .header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;

    .nav-btn {
      font-size: 1rem;
      color: var(--el-text-color-regular);

      &:hover {
        color: var(--el-text-color-primary);
      }
    }
  }
}

.main-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  text-align: center;
}

.hero-section {
  max-width: 800px;
  padding: 0 1rem;
  margin-bottom: 4rem;

  .hero-title {
    margin-bottom: 1.5rem;
    font-family: 'Songti SC', SimSun, 'Times New Roman', serif;
    font-size: 3.5rem;
    font-weight: 400;
    color: var(--el-text-color-primary);
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    max-width: 600px;
    margin-right: auto;
    margin-bottom: 2.5rem;
    margin-left: auto;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--el-text-color-secondary);
  }

  .cta-button {
    height: auto;
    padding: 12px 30px;
    font-size: 1rem;
    font-weight: 600;
  }
}

.feature-card {
  width: 100%;
  max-width: 900px;
  padding: 0 1rem;
  margin-bottom: 4rem;

  .card-content {
    padding: 3rem;
    text-align: left;
    background: var(--el-fill-color-light);
    border-radius: 12px;
    box-shadow: var(--el-box-shadow-light);

    .card-title {
      margin-bottom: 1.5rem;
      font-family: 'Songti SC', SimSun, 'Times New Roman', serif;
      font-size: 1.8rem;
      font-weight: 400;
      color: var(--el-text-color-primary);
    }

    .card-desc {
      margin-bottom: 2rem;
      font-size: 1rem;
      line-height: 1.8;
      color: var(--el-text-color-regular);
    }

    .card-image-placeholder {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 300px;
      overflow: hidden;
      background: linear-gradient(135deg, var(--el-fill-color) 0%, var(--el-fill-color-dark) 100%);
      background-position: center;
      background-size: cover;
      border-radius: 8px;

      .placeholder-overlay {
        padding: 1rem 2rem;
        font-size: 1.2rem;
        color: white;
        letter-spacing: 2px;
        background: rgb(0 0 0 / 30%);
        backdrop-filter: blur(4px);
        border-radius: 4px;
      }
    }
  }
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
