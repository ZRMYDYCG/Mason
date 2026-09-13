<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import mountainImg from '@/assets/images/dashboard/mason-mountain-quote.jpg'

const quotes = [
  { text: 'Good ideas start with a clean space.', author: 'Mason' },
  { text: 'Clarity is the highest form of craft.', author: 'Mason' },
  { text: 'Build less, mean more.', author: 'Mason' }
]

const active = ref(0)
let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    active.value = (active.value + 1) % quotes.length
  }, 5000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <section class="inspiration" :style="{ backgroundImage: `url(${mountainImg})` }">
    <div class="veil" />
    <blockquote class="quote">
      <p>“{{ quotes[active].text }}”</p>
      <footer>— {{ quotes[active].author }}</footer>
    </blockquote>
    <div class="dots" role="tablist" aria-label="Inspiration quotes">
      <button
        v-for="(_, idx) in quotes"
        :key="idx"
        type="button"
        class="dot"
        :class="{ active: idx === active }"
        :aria-selected="idx === active"
        @click="active = idx"
      />
    </div>
  </section>
</template>

<style scoped>
.inspiration {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  background: linear-gradient(180deg, rgb(0 0 0 / 8%) 0%, rgb(0 0 0 / 55%) 100%);
}

.quote {
  position: relative;
  z-index: 1;
  margin: 0;
  color: #ffffff;
}

.quote p {
  margin: 0 0 10px;
  font-size: clamp(20px, 1.8vw, 26px);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.quote footer {
  font-size: 13px;
  color: rgb(255 255 255 / 78%);
}

.dots {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.dot {
  width: 7px;
  height: 7px;
  padding: 0;
  cursor: pointer;
  background: rgb(255 255 255 / 45%);
  border: none;
  border-radius: var(--radius-full);
  transition:
    width 0.2s ease,
    background 0.2s ease;
}

.dot.active {
  width: 18px;
  background: #ffffff;
}
</style>
