<script setup lang="ts">
import ChatInput from './chat-input.vue'
</script>

<template>
  <div class="layout-container">
    <div class="header-bar">
      <div class="header-content">
        <div class="title-container">
          <h1 class="page-title">全局覆盖Dialog动画与质感增强SCSS</h1>
        </div>
        <div class="header-shadow"></div>
      </div>
    </div>

    <div class="messages-container">
      <div class="messages-list">
        <div v-for="n in 50" :key="n">消息内容 {{ n }}</div>
      </div>
    </div>

    <div class="input-container">
      <chat-input></chat-input>
      <div class="input-notice">内容由 AI 生成，请仔细甄别</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.header-bar {
  background: white;
  flex-shrink: 0;
  height: 56px;
  padding-top: 10px;
  position: relative;

  .header-content {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 32px;
    position: relative;
  }

  .title-container {
    display: flex;
    justify-content: center;
  }

  .page-title {
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-shadow {
    position: absolute;
    bottom: -32px;
    left: 0;
    right: 0;
    height: 32px;
    background: linear-gradient(rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
    z-index: 10;
  }
}

.messages-container {
  flex: 1;
  overflow: auto;
  padding: 0 32px;

  .messages-list {
    margin: 0 auto;
    padding: 38px 0 100px;
    min-height: calc(100% - 56px);

    div {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
  }
}

.input-container {
  padding: 16px 0;
  position: sticky;
  bottom: 0;
  z-index: 20;
  width: 100%;

  .input-notice {
    text-align: center;
    font-size: 12px;
    color: #a3a3a3;
    margin-top: 6px;
  }
}
</style>
