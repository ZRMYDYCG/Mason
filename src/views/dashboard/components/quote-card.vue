<script setup lang="ts">
import rockImg from '@/assets/images/dashboard/mason-rock-quote.jpg'
</script>

<template>
  <section class="quote-card" :style="{ backgroundImage: `url(${rockImg})` }">
    <div class="veil" />
    <blockquote>
      <p>Small Steps Build Great Things.</p>
      <footer>— Mason</footer>
    </blockquote>
  </section>
</template>

<style scoped>
.quote-card {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 280px;
  padding: 28px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  border: var(--box-border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--box-shadow);
}

.veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(0 0 0 / 10%) 0%, rgb(0 0 0 / 58%) 100%);
}

blockquote {
  position: relative;
  z-index: 1;
  margin: 0;
  color: #ffffff;
}

blockquote p {
  max-width: 10ch;
  margin: 0 0 10px;
  font-size: clamp(22px, 1.8vw, 28px);
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

blockquote footer {
  font-size: 13px;
  color: rgb(255 255 255 / 78%);
}
</style>
