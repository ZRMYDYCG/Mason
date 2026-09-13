<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { Icon, addIcon } from '@iconify/vue'
import iconVue from '@iconify-icons/logos/vue'
import iconTypescript from '@iconify-icons/logos/typescript-icon'
import iconVite from '@iconify-icons/logos/vitejs'
import iconPinia from '@iconify-icons/logos/pinia'
import iconElement from '@iconify-icons/logos/element'
import iconUno from '@iconify-icons/logos/unocss'
import iconEslint from '@iconify-icons/logos/eslint'
import iconPrettier from '@iconify-icons/logos/prettier'
import iconNestjs from '@iconify-icons/logos/nestjs'
import iconNodejs from '@iconify-icons/logos/nodejs'
import iconPrisma from '@iconify-icons/logos/prisma'
import iconRedis from '@iconify-icons/logos/redis'
import iconZod from '@iconify-icons/logos/zod'
import iconTailwind from '@iconify-icons/logos/tailwindcss-icon'
import iconAxios from '@iconify-icons/logos/axios'
import iconSocketio from '@iconify-icons/logos/socket-io'
import iconLodash from '@iconify-icons/logos/lodash'
import iconVitest from '@iconify-icons/logos/vitest'
import iconStorybook from '@iconify-icons/logos/storybook'
import iconPostcss from '@iconify-icons/logos/postcss'
import iconVueuse from '@iconify-icons/logos/vueuse'
import iconSass from '@iconify-icons/logos/sass'

addIcon('logos:vue', iconVue)
addIcon('logos:typescript-icon', iconTypescript)
addIcon('logos:vitejs', iconVite)
addIcon('logos:pinia', iconPinia)
addIcon('logos:element', iconElement)
addIcon('logos:unocss', iconUno)
addIcon('logos:eslint', iconEslint)
addIcon('logos:prettier', iconPrettier)
addIcon('logos:nestjs', iconNestjs)
addIcon('logos:nodejs', iconNodejs)
addIcon('logos:prisma', iconPrisma)
addIcon('logos:redis', iconRedis)
addIcon('logos:zod', iconZod)
addIcon('logos:tailwindcss-icon', iconTailwind)
addIcon('logos:axios', iconAxios)
addIcon('logos:socket-io', iconSocketio)
addIcon('logos:lodash', iconLodash)
addIcon('logos:vitest', iconVitest)
addIcon('logos:storybook', iconStorybook)
addIcon('logos:postcss', iconPostcss)
addIcon('logos:vueuse', iconVueuse)
addIcon('logos:sass', iconSass)

const techs = [
  { name: 'Vue.js', icon: 'logos:vue', tone: '#42b883' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', tone: '#3178c6' },
  { name: 'Vite', icon: 'logos:vitejs', tone: '#646cff' },
  { name: 'Pinia', icon: 'logos:pinia', tone: '#ffd859' },
  { name: 'Element Plus', icon: 'logos:element', tone: '#409eff' },
  { name: 'UnoCSS', icon: 'logos:unocss', tone: '#4ade80' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', tone: '#06b6d4' },
  { name: 'Axios', icon: 'logos:axios', tone: '#5a29e4' },
  { name: 'Socket.io', icon: 'logos:socket-io', tone: '#010101' },
  { name: 'VueUse', icon: 'logos:vueuse', tone: '#41b883' },
  { name: 'Lodash', icon: 'logos:lodash', tone: '#3492ff' },
  { name: 'Sass', icon: 'logos:sass', tone: '#cc6699' },
  { name: 'PostCSS', icon: 'logos:postcss', tone: '#dd3a0a' },
  { name: 'Vitest', icon: 'logos:vitest', tone: '#729b1b' },
  { name: 'Storybook', icon: 'logos:storybook', tone: '#ff4785' },
  { name: 'ESLint', icon: 'logos:eslint', tone: '#4b32c3' },
  { name: 'Prettier', icon: 'logos:prettier', tone: '#f7b93e' },
  { name: 'NestJS', icon: 'logos:nestjs', tone: '#e0234e' },
  { name: 'Node.js', icon: 'logos:nodejs', tone: '#339933' },
  { name: 'Prisma', icon: 'logos:prisma', tone: '#2d3748' },
  { name: 'Redis', icon: 'logos:redis', tone: '#dc382d' },
  { name: 'Zod', icon: 'logos:zod', tone: '#3068b7' }
]

const ITEM_STEP = 80
const trackWrapRef = ref<HTMLElement | null>(null)
const offset = ref(0)
const visibleCount = ref(8)

const maxOffset = computed(() => Math.max(0, techs.length - visibleCount.value))
const canPrev = computed(() => offset.value > 0)
const canNext = computed(() => offset.value < maxOffset.value)

const measure = () => {
  const width = trackWrapRef.value?.clientWidth ?? 0
  visibleCount.value = Math.max(1, Math.floor((width + 16) / ITEM_STEP))
  offset.value = Math.min(offset.value, maxOffset.value)
}

const prev = () => {
  offset.value = Math.max(0, offset.value - 1)
}

const next = () => {
  offset.value = Math.min(maxOffset.value, offset.value + 1)
}

let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  measure()
  if (trackWrapRef.value) {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(trackWrapRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <section class="tech" id="components">
    <div class="tech-inner">
      <div class="copy">
        <p class="eyebrow">TECH STACK</p>
        <h2 class="title">基于主流技术栈构建</h2>
        <p class="desc">采用成熟、稳定的前后端技术栈，持续跟进生态发展，为你提供可靠的基础。</p>
      </div>

      <div class="rail">
        <button
          type="button"
          class="arrow"
          aria-label="上一项"
          :disabled="!canPrev"
          @click="prev"
        >
          <AppIcon name="chevron-left" :size="14" />
        </button>

        <div ref="trackWrapRef" class="track-wrap">
          <ul
            class="track"
            :style="{ transform: `translateX(-${offset * ITEM_STEP}px)` }"
          >
            <li v-for="(item, index) in techs" :key="item.name" class="item">
              <div class="icon-box" :class="{ active: index === 0 }" :style="{ '--tone': item.tone }">
                <span class="icon-glow" aria-hidden="true" />
                <Icon class="tech-icon" :icon="item.icon" width="30" height="30" />
              </div>
              <span class="name" :title="item.name">{{ item.name }}</span>
            </li>
          </ul>
        </div>

        <button
          type="button"
          class="arrow"
          aria-label="下一项"
          :disabled="!canNext"
          @click="next"
        >
          <AppIcon name="chevron-right" :size="14" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech {
  padding: 88px 40px;
  background: var(--bg-page);
}

.tech-inner {
  display: grid;
  grid-template-columns: minmax(240px, 300px) minmax(0, 1fr);
  gap: 48px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.copy {
  min-width: 0;
}

.eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-tertiary);
  letter-spacing: 0.16em;
}

.title {
  margin: 12px 0 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.desc {
  margin: 14px 0 0;
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-tertiary);
}

.rail {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  min-width: 0;
}

.arrow {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-top: 18px;
  color: var(--text-tertiary);
  cursor: pointer;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;
}

.arrow:hover:not(:disabled) {
  color: var(--text-primary);
  background: var(--bg-surface-hover);
  border-color: var(--border-default-hover);
}

.arrow:disabled {
  cursor: default;
  opacity: 0.35;
}

.track-wrap {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}

.track {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;
  transition: transform 0.35s ease;
}

.item {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 64px;
}

.icon-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 2px color-mix(in srgb, var(--shadow-color) 35%, transparent);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.icon-box:hover {
  border-color: color-mix(in srgb, var(--tone) 35%, var(--border-subtle));
  box-shadow:
    0 4px 12px color-mix(in srgb, var(--tone) 12%, transparent),
    0 1px 2px color-mix(in srgb, var(--shadow-color) 35%, transparent);
}

.icon-box:hover .icon-glow {
  opacity: 0;
}

.icon-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 45%,
    color-mix(in srgb, var(--tone) 28%, transparent),
    transparent 62%
  );
  opacity: 0;
  transition: opacity 0.2s ease;
}

.icon-box.active .icon-glow {
  opacity: 1;
}

.tech-icon {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.name {
  max-width: 72px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--text-secondary);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (width <= 960px) {
  .tech {
    padding: 64px 20px;
  }

  .tech-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .copy {
    text-align: center;
  }

  .rail {
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .track,
  .icon-box {
    transition: none;
  }
}
</style>
