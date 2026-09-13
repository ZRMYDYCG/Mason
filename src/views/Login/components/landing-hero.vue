<script setup lang="ts">
import heroBanner from '@/assets/images/landing/hero-banner.jpg'

defineEmits<{
  (e: 'use-now'): void
}>()
</script>

<template>
  <section class="hero" id="top">
    <div class="hero-inner">
      <div class="copy">
        <p class="eyebrow">· MASON ADMIN</p>
        <h1 class="title">
          让开发回归<br />
          纯粹与高效
        </h1>
        <p class="desc">
          为中后台场景打造更舒适的开发体验。沉淀最佳实践与工程约定，减少重复劳动，让你把时间留给真正重要的事。
        </p>
        <div class="btns">
          <button type="button" class="btn-primary" @click="$emit('use-now')">
            立即使用
            <AppIcon name="arrow-right" :size="16" />
          </button>
          <a class="btn-secondary" href="#docs">查看文档</a>
        </div>
        <p class="meta">开源免费 · 持续迭代 · 社区驱动</p>
      </div>

      <div class="visual">
        <div class="visual-frame">
          <img class="visual-banner" :src="heroBanner" alt="Mason Admin 仪表盘预览" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 72px 40px 56px;
  background:
    radial-gradient(
      ellipse 80% 60% at 70% 20%,
      rgba(var(--color-primary-rgb), 0.08),
      transparent 60%
    ),
    var(--bg-surface);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 48px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.copy {
  max-width: 460px;
}

.eyebrow {
  margin: 0 0 18px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--text-tertiary);
}

.title {
  margin: 0;
  font-size: clamp(36px, 4.2vw, 52px);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.desc {
  margin: 22px 0 0;
  font-size: 15px;
  line-height: 1.75;
  color: var(--text-secondary);
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border-radius: var(--radius-lg);
  transition: opacity 0.15s ease, background 0.15s ease;
}

.btn-primary {
  color: var(--text-inverse);
  background: var(--bg-inverse);
  border: none;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  color: var(--text-primary);
  background: var(--fill-secondary);
  border: 1px solid transparent;
}

.btn-secondary:hover {
  background: var(--fill-tertiary);
}

.meta {
  margin: 20px 0 0;
  font-size: 13px;
  color: var(--text-tertiary);
}

.visual {
  display: flex;
  justify-content: center;
  perspective: 1600px;
}

.visual-frame {
  width: min(100%, 580px);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  box-shadow:
    0 32px 64px color-mix(in srgb, var(--shadow-color) 70%, transparent),
    0 10px 24px color-mix(in srgb, var(--shadow-color) 45%, transparent);
  transform: rotateY(-12deg) rotateX(6deg) rotateZ(2deg);
}

.visual-banner {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: left top;
  aspect-ratio: 16 / 11;
}

@media (max-width: 960px) {
  .hero {
    padding: 48px 20px 32px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .copy {
    max-width: none;
    text-align: center;
  }

  .btns {
    justify-content: center;
  }

  .visual-frame {
    transform: none;
  }
}
</style>
