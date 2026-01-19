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

<style scoped>
.footer {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  font-size: 14px;
  color: var(--sys-text-3);
  background-color: var(--sys-bg-surface);

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    text-align: center;

    .footer-text {
      display: flex;
      gap: 8px;
      align-items: center;

      .logo {
        width: 24px;
        height: 24px;
        filter: drop-shadow(0 0 8px rgba(var(--sys-brand-rgb), 0.75));
        animation: glow 2s ease-in-out infinite alternate;
      }
    }
  }
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 4px rgba(var(--sys-brand-rgb), 0.25));
  }

  to {
    filter: drop-shadow(0 0 12px rgba(var(--sys-brand-rgb), 0.75));
  }
}
</style>
