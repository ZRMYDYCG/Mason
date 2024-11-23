<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="switch-dark" />
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login-left.svg" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="logo" />
          <h2 class="logo-text">YQ-Admin</h2>
        </div>
        <LoginForm ref="loginRef"></LoginForm>
        <div class="login-btns">
          <el-button class="login-btn" size="large" @click="handleResetClick"> 重置 </el-button>
          <el-button type="primary" size="large" class="login-btn" @click="handleSubmitClick">
            立即登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SwitchDark from '@/components/SwitchDark/index.vue'
import LoginForm from './components/LoginForm.vue'
const loginRef = ref<InstanceType<typeof LoginForm>>()

const handleSubmitClick = () => {
  loginRef.value?.loginAction()
}

const handleResetClick = () => {
  loginRef.value?.resetAction()
}
</script>

<style scoped lang="scss">
.login-container {
  height: 100%;
  background: #eeeeee;
  background-image: url('@/assets/images/login_bg.svg');
  background-size: 100% 100%;
  background-size: cover;

  .login-box {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96.5%;
    height: 94%;
    padding: 0 50px;
    background-color: rgb(255 255 255 / 80%);
    border-radius: 10px;

    .switch-dark {
      position: absolute;
      top: 5%;
      right: 4%;
    }

    .login-left {
      width: 800px;
      margin-right: 20px;

      .login-left-img {
        width: 90%;
        height: 100%;
      }
    }

    .login-form {
      width: 420px;
      padding: 50px 40px 45px;
      border-radius: 10px;
      box-shadow: rgb(0 0 0 / 10%) 0 2px 10px 2px;

      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 32px;

        .login-icon {
          position: relative;
          left: -20000px; /* 移动到窗口外很远的地方，也可以用transform: translateY(-20000px); */
          width: 60px;
          height: 60px;
          filter: drop-shadow(var(--el-color-primary) 20000px 0);
        }

        .logo-text {
          padding: 0 0 0 25px;
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          color: #34495e;
          white-space: nowrap;
        }
      }

      .login-btns {
        display: flex;
        justify-content: space-between;

        .login-btn {
          width: 48%;
        }
      }
    }
  }
}

@media screen and (width <= 1250px) {
  .login-left {
    display: none;
  }
}

@media screen and (width <= 600px) {
  .login-form {
    width: 97% !important;
  }
}
</style>
