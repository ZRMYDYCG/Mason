<script setup lang="ts">
import logoWordmark from '@/assets/images/logo-wordmark.png'
import logoWordmarkOnDark from '@/assets/images/logo-wordmark-on-dark.png'
import { themeAnimation } from '@/utils/animation.ts'
import { useSettingStore } from '@/store/modules/setting.ts'
import { computed } from 'vue'

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
  <footer class="footer" id="changelog">
    <div class="footer-inner">
      <div class="top">
        <div class="brand-block">
          <img class="brand-wordmark" :src="brandSrc" alt="Mason — Build A Better Tomorrow" />
        </div>

        <div class="top-right">
          <nav class="nav" aria-label="页脚导航">
            <a v-for="link in navLinks" :key="link.href" class="nav-link" :href="link.href">
              {{ link.label }}
            </a>
          </nav>
          <div class="actions">
            <button type="button" class="icon-btn" aria-label="GitHub" @click="openGithub">
              <AppIcon name="github" :size="18" />
            </button>
            <button type="button" class="icon-btn" aria-label="切换主题" @click="themeAnimation">
              <AppIcon :name="isDark ? 'moon' : 'sun'" :size="18" />
            </button>
          </div>
        </div>
      </div>

      <div class="bottom">
        <p class="copy">© 2024 Mason. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 48px 40px 36px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.top {
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 28px;
}

.brand-block {
  display: flex;
  align-items: center;
}

.brand-wordmark {
  display: block;
  width: auto;
  height: 36px;
  object-fit: contain;
  object-position: left center;
}

.top-right {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  align-items: center;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  align-items: center;
}

.nav-link {
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--text-primary);
}

.actions {
  display: flex;
  gap: 4px;
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
  transition: background 0.15s ease, color 0.15s ease;
}

.icon-btn:hover {
  color: var(--text-primary);
  background: var(--fill-primary);
}

.bottom {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
}

.copy {
  margin: 0;
  font-size: 12px;
  color: var(--text-tertiary);
}

@media (max-width: 900px) {
  .footer {
    padding: 36px 20px 28px;
  }

  .top {
    flex-direction: column;
    align-items: flex-start;
  }

  .top-right {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .bottom {
    justify-content: flex-start;
  }
}
</style>
