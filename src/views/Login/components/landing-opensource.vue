<script setup lang="ts">
import logoMark from '@/assets/images/logo.png'
import logoOnDark from '@/assets/images/logo-on-dark.png'
import { useSettingStore } from '@/store/modules/setting.ts'
import { computed } from 'vue'

const settingStore = useSettingStore()
const isDark = computed(() => settingStore.isDark)
const markSrc = computed(() => (isDark.value ? logoOnDark : logoMark))

const openGithub = () => {
  window.open('https://github.com', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section class="opensource" id="about">
    <div class="opensource-inner">
      <div class="copy">
        <p class="eyebrow">· OPEN SOURCE</p>
        <h2 class="title">开源构建，共同变好</h2>
        <p class="desc">
          欢迎通过 Issue、Pull Request 参与共建。开源不是终点，而是一起把体验做得更好的起点。
        </p>
        <div class="btns">
          <button type="button" class="btn-primary" @click="openGithub">
            GitHub
            <AppIcon name="arrow-right" :size="16" />
          </button>
          <a class="btn-secondary" href="#docs">查看文档</a>
        </div>
      </div>

      <div class="visual" aria-hidden="true">
        <img class="mark" :src="markSrc" alt="" />
        <p class="slogan">BUILD A BETTER TOMORROW.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.opensource {
  position: relative;
  padding: 120px 40px;
  overflow: hidden;
  background: var(--bg-page);
}

.opensource-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 48px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.copy {
  position: relative;
  z-index: 1;
  max-width: 440px;
}

.eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--text-tertiary);
}

.title {
  margin: 14px 0 0;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.desc {
  margin: 18px 0 0;
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

.visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-height: 240px;
}

.mark {
  position: absolute;
  right: -12px;
  bottom: -28px;
  width: clamp(160px, 22vw, 260px);
  height: auto;
  opacity: 0.08;
  pointer-events: none;
  user-select: none;
}

.slogan {
  position: relative;
  z-index: 1;
  max-width: 260px;
  margin: 0;
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.06em;
  color: var(--text-placeholder);
  text-align: right;
  text-transform: uppercase;
}

@media (max-width: 960px) {
  .opensource {
    padding: 72px 20px;
  }

  .opensource-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .copy {
    max-width: none;
    text-align: center;
  }

  .btns {
    justify-content: center;
  }

  .visual {
    align-items: center;
    min-height: 160px;
  }

  .slogan {
    text-align: center;
  }

  .mark {
    right: 50%;
    bottom: -12px;
    transform: translateX(50%);
  }
}
</style>
