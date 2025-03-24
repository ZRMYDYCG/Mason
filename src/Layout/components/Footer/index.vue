<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-text">
        <span>一个好的设计产品</span>
        <img class="logo" src="@/assets/images/logo.svg" alt="github" />
        <span>是不断迭代出来的</span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
  gap: 8px;
  padding: 5px 0;
  border-top: 1px solid #e5e7eb;

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    text-align: center;

    .footer-text {
      display: flex;
      align-items: center;
      gap: 8px;

      .logo {
        width: 24px;
        height: 24px;
        /* 添加光晕效果 */
        filter: drop-shadow(0 0 8px rgba(123, 231, 115, 0.93));
        animation: glow 2s ease-in-out infinite alternate;
      }
    }
  }
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 4px rgba(99, 241, 241, 0.3));
  }
  to {
    filter: drop-shadow(0 0 12px rgba(99, 241, 123, 0.6));
  }
}
</style>
