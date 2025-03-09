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
      }
    }
  }
}
</style>
