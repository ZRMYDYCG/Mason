<script setup lang="ts">
import logoWordmark from '@/assets/images/logo-wordmark.png'
import logoWordmarkOnDark from '@/assets/images/logo-wordmark-on-dark.png'
import { themeAnimation } from '@/utils/animation.ts'
import { useSettingStore } from '@/store/modules/setting.ts'
import { computed } from 'vue'

defineEmits<{
  (e: 'use-now'): void
}>()

const settingStore = useSettingStore()
const isDark = computed(() => settingStore.isDark)
const brandSrc = computed(() => (isDark.value ? logoWordmarkOnDark : logoWordmark))

const navLinks = [
  { label: '文档', href: '#docs' },
  { label: '组件', href: '#components' },
  { label: '更新日志', href: '#changelog' },
  { label: '关于', href: '#about' }
]

const openGithub = () => {
  window.open('https://github.com', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <div class="left">
        <a class="brand" href="#top" aria-label="Mason">
          <img class="brand-wordmark" :src="brandSrc" alt="Mason — Build A Better Tomorrow" />
        </a>

        <nav class="nav" aria-label="主导航">
          <a v-for="link in navLinks" :key="link.href" class="nav-link" :href="link.href">
            {{ link.label }}
          </a>
        </nav>
      </div>

      <div class="actions">
        <button type="button" class="icon-btn" aria-label="GitHub" @click="openGithub">
          <AppIcon name="github" :size="18" />
        </button>
        <button type="button" class="icon-btn" aria-label="切换主题" @click="themeAnimation">
          <AppIcon :name="isDark ? 'moon' : 'sun'" :size="18" />
        </button>
        <button type="button" class="cta" @click="$emit('use-now')">立即使用</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 64px;
  padding: 0 40px;
  margin: 0 auto;
}

.left {
  display: flex;
  gap: 40px;
  align-items: center;
  min-width: 0;
}

.brand {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  text-decoration: none;
}

.brand-wordmark {
  display: block;
  width: auto;
  height: 28px;
  object-fit: contain;
  object-position: left center;
}

.nav {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: var(--text-secondary);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--text-primary);
}

.actions {
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  align-items: center;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: var(--text-secondary);
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  transition: color 0.15s ease, background 0.15s ease;
}

.icon-btn:hover {
  color: var(--text-primary);
  background: var(--fill-primary);
}

.cta {
  height: 34px;
  padding: 0 14px;
  margin-left: 10px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  color: var(--text-inverse);
  cursor: pointer;
  background: var(--bg-inverse);
  border: none;
  border-radius: var(--radius-md);
  transition: opacity 0.15s ease;
}

.cta:hover {
  opacity: 0.88;
}

@media (max-width: 900px) {
  .header-inner {
    padding: 0 20px;
  }

  .nav {
    display: none;
  }

  .left {
    gap: 0;
  }
}
</style>
