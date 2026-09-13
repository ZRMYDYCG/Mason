<script setup lang="ts">
import heroImg from '@/assets/images/dashboard/mason-hero.jpg'

const explore = () => {
  window.open('https://mason.versakit.online', '_blank')
}
</script>

<template>
  <section class="hero-welcome">
    <div class="hero-copy">
      <p class="eyebrow">Welcome to Mason</p>
      <h2 class="title">Create A Brighter Tomorrow.</h2>
      <p class="desc">
        A modern full-stack admin template built for clarity, speed, and thoughtful craft —
        helping teams ship better products every day.
      </p>
      <button type="button" class="cta" @click="explore">Explore Mason →</button>
    </div>
    <div class="hero-visual" :style="{ backgroundImage: `url(${heroImg})` }" aria-hidden="true">
      <span class="overlay-text">Build Belong Be Better.</span>
    </div>
  </section>
</template>

<style scoped>
.hero-welcome {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  min-height: 280px;
  overflow: hidden;
  background: var(--bg-surface);
  border: var(--box-border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--box-shadow);
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 40px;
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.title {
  margin: 0 0 14px;
  font-size: clamp(28px, 2.6vw, 40px);
  font-weight: 700;
  line-height: 1.15;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.desc {
  max-width: 38ch;
  margin: 0 0 28px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-inverse);
  cursor: pointer;
  background: var(--bg-inverse);
  border: none;
  border-radius: var(--radius-full);
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.cta:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.hero-visual {
  position: relative;
  min-height: 220px;
  background-position: center;
  background-size: cover;
}

.overlay-text {
  position: absolute;
  right: 24px;
  bottom: 28px;
  max-width: 8ch;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 28px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.2;
  color: #fff;
  text-shadow: 0 8px 24px rgb(0 0 0 / 35%);
}

@media (width <= 960px) {
  .hero-welcome {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 200px;
  }
}
</style>
