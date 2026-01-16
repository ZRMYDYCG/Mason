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
  color: var(--app-text-tertiary);
  background-color: var(--app-bg-surface);
  gap: 8px;
  padding: 5px 0;

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
        filter: drop-shadow(0 0 8px rgba(var(--app-color-primary-rgb), 0.75));
        animation: glow 2s ease-in-out infinite alternate;
      }
    }
  }
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 4px rgba(var(--app-color-primary-rgb), 0.25));
  }
  to {
    filter: drop-shadow(0 0 12px rgba(var(--app-color-primary-rgb), 0.75));
  }
}
</style>
