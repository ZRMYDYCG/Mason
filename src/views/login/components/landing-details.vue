<script setup lang="ts">
import heroBanner from '@/assets/images/landing/hero-banner.jpg'

const themeModes = [
  { key: 'light', label: '浅色', active: true },
  { key: 'dark', label: '深色', active: false },
  { key: 'system', label: '跟随系统', active: false }
]

const colors = ['#3b82f6', '#06b6d4', '#22c55e', '#eab308', '#f97316', '#a855f7']

const layouts = [
  { key: 'side', label: '侧边栏', active: true },
  { key: 'top', label: '顶部栏', active: false },
  { key: 'mixed', label: '混合布局', active: false }
]

const menuStyles = [
  { key: 'design', tone: 'design', active: true },
  { key: 'dark', tone: 'dark', active: false },
  { key: 'light', tone: 'light', active: false }
]
</script>

<template>
  <section class="details" id="docs">
    <div class="details-inner">
      <div class="copy">
        <p class="eyebrow">FOCUS ON DETAILS</p>
        <h2 class="title">优雅的设计，源于对细节的坚持</h2>
        <p class="desc">
          统一的视觉语言与克制的交互反馈，让界面在多场景下保持一致、简洁、易用。细节不喧哗，却决定了长期使用的舒适度。
        </p>
        <a class="more" href="#components">
          探索更多细节
          <AppIcon name="arrow-right" :size="15" />
        </a>
      </div>

      <div class="panel" aria-hidden="true">
        <div class="panel-depth" />
        <div class="panel-backdrop">
          <div class="backdrop-preview">
            <img class="backdrop-shot" :src="heroBanner" alt="" />
            <div class="backdrop-veil" />
          </div>
          <div class="backdrop-drawer">
            <p class="drawer-label">菜单风格</p>
            <div class="menu-style-row">
              <div
                v-for="style in menuStyles"
                :key="style.key"
                class="menu-style"
                :class="{ active: style.active }"
                :data-tone="style.tone"
              >
                <span class="ms-bar" />
                <span class="ms-side" />
                <span class="ms-main">
                  <i /><i /><i />
                </span>
              </div>
            </div>
            <p class="drawer-label">盒子样式</p>
            <div class="box-style-row">
              <span class="box-chip active">边框</span>
              <span class="box-chip">阴影</span>
            </div>
          </div>
        </div>
        <div class="panel-card">
          <p class="panel-label">主题模式</p>
          <div class="mode-row">
            <div
              v-for="mode in themeModes"
              :key="mode.key"
              class="mode-item"
              :class="{ active: mode.active }"
            >
              <div class="mode-preview" :data-mode="mode.key">
                <span class="pv-side" />
                <span class="pv-main">
                  <i /><i /><i />
                </span>
              </div>
              <span class="mode-name">{{ mode.label }}</span>
            </div>
          </div>

          <p class="panel-label">主题色</p>
          <div class="color-row">
            <span
              v-for="(color, index) in colors"
              :key="color"
              class="swatch"
              :class="{ active: index === 0 }"
              :style="{ background: color }"
            >
              <AppIcon v-if="index === 0" name="check" :size="12" color="var(--text-inverse)" />
            </span>
          </div>

          <p class="panel-label">布局模式</p>
          <div class="layout-row">
            <div
              v-for="layout in layouts"
              :key="layout.key"
              class="layout-item"
              :class="{ active: layout.active }"
            >
              <div class="layout-preview" :data-layout="layout.key">
                <template v-if="layout.key === 'side'">
                  <span class="lp-side" />
                  <span class="lp-body" />
                </template>
                <template v-else-if="layout.key === 'top'">
                  <span class="lp-top" />
                  <span class="lp-body full" />
                </template>
                <template v-else>
                  <span class="lp-rail" />
                  <span class="lp-body" />
                </template>
              </div>
              <span class="layout-name">{{ layout.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.details {
  padding: 100px 40px;
  background: var(--bg-surface);
}

.details-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 64px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.copy {
  max-width: 420px;
}

.eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-tertiary);
  letter-spacing: 0.16em;
}

.title {
  margin: 14px 0 0;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.desc {
  margin: 18px 0 0;
  font-size: 15px;
  line-height: 1.75;
  color: var(--text-secondary);
}

.more {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  margin-top: 28px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.more:hover {
  color: var(--color-primary);
}

.panel {
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 420px;
  padding: 28px 0 20px;
  perspective: 1200px;
}

.panel-depth {
  position: absolute;
  top: 24px;
  right: 2%;
  width: 60%;
  height: 84%;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--bg-surface) 40%, transparent),
    color-mix(in srgb, var(--bg-surface) 20%, transparent)
  );
  backdrop-filter: blur(8px);
  border: 1px solid color-mix(in srgb, var(--border-subtle) 40%, transparent);
  border-radius: var(--radius-xl);
  box-shadow:
    0 8px 32px color-mix(in srgb, var(--shadow-color) 20%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--bg-surface) 60%, transparent);
  opacity: 0.5;
  transform: translateZ(-20px) scale(0.96);
  animation: panel-depth-float 7s ease-in-out infinite;
}

.panel-backdrop {
  position: absolute;
  top: 12px;
  right: 4%;
  display: grid;
  grid-template-rows: 1fr auto;
  width: min(66%, 330px);
  height: calc(100% - 24px);
  overflow: hidden;
  background: linear-gradient(
    160deg,
    color-mix(in srgb, var(--bg-surface) 55%, transparent),
    color-mix(in srgb, var(--bg-surface) 30%, transparent)
  );
  backdrop-filter: blur(14px);
  border: 1px solid color-mix(in srgb, var(--border-subtle) 50%, transparent);
  border-radius: var(--radius-xl);
  box-shadow:
    0 12px 40px color-mix(in srgb, var(--shadow-color) 25%, transparent),
    0 2px 8px color-mix(in srgb, var(--shadow-color) 15%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--bg-surface) 50%, transparent);
  opacity: 0.7;
  transform: translateZ(-10px) scale(0.98);
  animation: panel-backdrop-float 7s ease-in-out infinite 0.4s;
}

.backdrop-preview {
  position: relative;
  min-height: 0;
  overflow: hidden;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.backdrop-shot {
  display: block;
  width: 160%;
  max-width: none;
  height: 100%;
  object-fit: cover;
  object-position: left top;
  transform: scale(1.02);
}

.backdrop-veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 25%,
    color-mix(in srgb, var(--bg-surface) 60%, transparent) 65%,
    color-mix(in srgb, var(--bg-surface) 85%, transparent) 100%
  );
}

.backdrop-drawer {
  position: relative;
  z-index: 1;
  padding: 4px 18px 18px;
  margin-top: -36px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    color-mix(in srgb, var(--bg-surface) 70%, transparent) 18%,
    color-mix(in srgb, var(--bg-surface) 55%, transparent) 100%
  );
  backdrop-filter: blur(8px);
}

.drawer-label {
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-tertiary);
}

.menu-style-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}

.menu-style {
  position: relative;
  display: flex;
  height: 40px;
  overflow: hidden;
  background: color-mix(in srgb, var(--bg-surface) 50%, transparent);
  backdrop-filter: blur(6px);
  border: 1px solid color-mix(in srgb, var(--border-subtle) 50%, transparent);
  border-radius: var(--radius-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.menu-style:hover {
  border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.menu-style.active {
  border-color: var(--color-primary);
  box-shadow: 0 2px 12px color-mix(in srgb, var(--color-primary) 15%, transparent);
}

.ms-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 28%;
  height: 8px;
  background: var(--bg-page);
}

.ms-side {
  width: 28%;
  background: var(--bg-surface-active);
}

.ms-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3px;
  justify-content: center;
  padding: 14px 6px 6px;
  background: var(--bg-surface);
}

.ms-main i {
  display: block;
  height: 3px;
  background: var(--border-strong);
  border-radius: var(--radius-xs);
}

.menu-style[data-tone='dark'] .ms-side {
  background: var(--layout-chrome-dark-bg);
}

.menu-style[data-tone='dark'] .ms-main {
  background: var(--bg-page);
}

.menu-style[data-tone='light'] .ms-side,
.menu-style[data-tone='light'] .ms-bar {
  background: var(--bg-surface);
}

.box-style-row {
  display: flex;
  gap: 4px;
  padding: 3px;
  background: color-mix(in srgb, var(--fill-secondary) 50%, transparent);
  backdrop-filter: blur(6px);
  border-radius: var(--radius-md);
}

.box-chip {
  flex: 1;
  padding: 6px 0;
  font-size: 11px;
  color: var(--text-secondary);
  text-align: center;
  border-radius: calc(var(--radius-md) - 2px);
  transition: all 0.2s ease;
}

.box-chip:hover {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-surface) 40%, transparent);
}

.box-chip.active {
  font-weight: 600;
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-surface) 60%, transparent);
  backdrop-filter: blur(8px);
  box-shadow:
    0 1px 3px color-mix(in srgb, var(--shadow-color) 30%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--bg-surface) 50%, transparent);
}

.panel-card {
  position: relative;
  z-index: 2;
  width: min(100%, 380px);
  padding: 28px 28px 24px;
  margin-right: 18%;
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--bg-surface) 75%, transparent),
    color-mix(in srgb, var(--bg-surface) 50%, transparent)
  );
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--border-subtle) 60%, transparent);
  border-radius: var(--radius-xl);
  box-shadow:
    0 20px 48px color-mix(in srgb, var(--shadow-color) 30%, transparent),
    0 4px 12px color-mix(in srgb, var(--shadow-color) 20%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--bg-surface) 70%, transparent),
    inset 0 -1px 0 color-mix(in srgb, var(--border-subtle) 30%, transparent);
  animation: panel-card-float 7s ease-in-out infinite 0.2s;
}

@keyframes panel-depth-float {
  0%,
  100% {
    transform: translateZ(-20px) scale(0.96) translateY(0);
  }

  50% {
    transform: translateZ(-20px) scale(0.96) translateY(-4px);
  }
}

@keyframes panel-backdrop-float {
  0%,
  100% {
    transform: translateZ(-10px) scale(0.98) translateY(0);
  }

  50% {
    transform: translateZ(-10px) scale(0.98) translateY(-5px);
  }
}

@keyframes panel-card-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel-depth,
  .panel-backdrop,
  .panel-card {
    animation: none;
  }
}

.panel-label {
  margin: 0 0 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.panel-label + .mode-row,
.panel-label + .color-row,
.panel-label + .layout-row {
  margin-bottom: 26px;
}

.layout-row {
  margin-bottom: 0 !important;
}

.mode-row,
.layout-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.mode-item,
.layout-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.mode-preview {
  display: flex;
  width: 100%;
  height: 52px;
  overflow: hidden;
  background: color-mix(in srgb, var(--bg-page) 50%, transparent);
  backdrop-filter: blur(4px);
  border: 2px solid color-mix(in srgb, var(--border-subtle) 50%, transparent);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.mode-item:hover .mode-preview,
.layout-item:hover .layout-preview {
  border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
}

.mode-item.active .mode-preview,
.layout-item.active .layout-preview {
  border-color: var(--color-primary);
  box-shadow: 0 2px 10px color-mix(in srgb, var(--color-primary) 12%, transparent);
}

.mode-preview[data-mode='dark'] {
  background: var(--layout-chrome-dark-bg);
}

.mode-preview[data-mode='system'] {
  background: linear-gradient(90deg, var(--bg-page) 50%, var(--layout-chrome-dark-bg) 50%);
}

.pv-side {
  width: 28%;
  background: var(--bg-surface-active);
}

.mode-preview[data-mode='dark'] .pv-side {
  background: var(--bg-inverse);
}

.mode-preview[data-mode='system'] .pv-side {
  background: linear-gradient(90deg, var(--bg-surface-active) 50%, var(--bg-inverse) 50%);
}

.pv-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  padding: 8px;
}

.pv-main i {
  display: block;
  height: 4px;
  background: var(--border-strong);
  border-radius: var(--radius-xs);
}

.mode-preview[data-mode='dark'] .pv-main i {
  background: var(--layout-chrome-dark-border);
}

.mode-preview[data-mode='system'] .pv-main i {
  background: var(--text-placeholder);
}

.mode-name,
.layout-name {
  font-size: 12px;
  color: var(--text-secondary);
}

.mode-item.active .mode-name,
.layout-item.active .layout-name {
  font-weight: 600;
  color: var(--text-primary);
}

.color-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.swatch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: var(--radius-full);
  box-shadow:
    0 2px 8px color-mix(in srgb, var(--shadow-color) 40%, transparent),
    inset 0 1px 0 color-mix(in srgb, rgb(255 255 255 / 30%) 100%, transparent);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.swatch:hover {
  box-shadow:
    0 4px 12px color-mix(in srgb, var(--shadow-color) 50%, transparent),
    inset 0 1px 0 color-mix(in srgb, rgb(255 255 255 / 30%) 100%, transparent);
  transform: scale(1.15);
}

.swatch.active {
  outline: 2px solid var(--bg-surface);
  box-shadow:
    0 0 0 2px var(--color-primary),
    0 4px 12px color-mix(in srgb, var(--shadow-color) 50%, transparent),
    inset 0 1px 0 color-mix(in srgb, rgb(255 255 255 / 30%) 100%, transparent);
}

.layout-preview {
  display: flex;
  width: 100%;
  height: 52px;
  overflow: hidden;
  background: color-mix(in srgb, var(--bg-page) 50%, transparent);
  backdrop-filter: blur(4px);
  border: 2px solid color-mix(in srgb, var(--border-subtle) 50%, transparent);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.lp-side {
  width: 30%;
  background: var(--bg-surface-active);
}

.lp-rail {
  width: 18%;
  background: var(--fill-tertiary);
}

.lp-top {
  position: absolute;
  width: 100%;
  height: 12px;
  background: var(--bg-surface-active);
}

.layout-preview[data-layout='top'] {
  position: relative;
  flex-direction: column;
}

.lp-body {
  flex: 1;
  margin: 6px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xs);
}

.lp-body.full {
  margin-top: 18px;
}

@media (width <= 960px) {
  .details {
    padding: 64px 20px;
  }

  .details-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .copy {
    max-width: none;
    text-align: center;
  }

  .panel {
    min-height: 380px;
    perspective: none;
  }

  .panel-depth {
    opacity: 0.4;
    transform: scale(0.96);
  }

  .panel-backdrop {
    opacity: 0.6;
    transform: scale(0.98);
  }

  .panel-card {
    margin-right: 12%;
  }
}

@media (width <= 560px) {
  .panel-depth,
  .panel-backdrop {
    display: none;
  }

  .panel {
    min-height: 0;
    padding: 0;
    perspective: none;
  }

  .panel-card {
    width: 100%;
    margin-right: 0;
    backdrop-filter: blur(16px);
    animation: none;
  }
}
</style>
