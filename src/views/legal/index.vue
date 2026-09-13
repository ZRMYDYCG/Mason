<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/app-icon/index.vue'
import LandingFooter from '@/views/login/components/landing-footer.vue'
import LandingHeader from '@/views/login/components/landing-header.vue'
import LandingStage from '@/views/login/components/landing-stage.vue'
import { legalDocs, type LegalDocKey } from './content'

const route = useRoute()
const router = useRouter()

const navLinks = [
  { label: '文档', href: '/docs' },
  { label: '组件', href: '/components' },
  { label: '更新日志', href: '/changelog' },
  { label: '关于', href: '/about' }
]

const docKey = computed<LegalDocKey>(() => {
  const key = route.meta.legalKey
  return key === 'privacy' ? 'privacy' : 'terms'
})

const doc = computed(() => legalDocs[docKey.value])

const sibling = computed(() =>
  docKey.value === 'terms'
    ? { label: '隐私政策', path: '/privacy' }
    : { label: '用户协议', path: '/terms' }
)

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const useNow = () => {
  router.push('/login')
}
</script>

<template>
  <div class="legal-site">
    <LandingStage class="legal-hero">
      <LandingHeader brand-href="/login" :nav-links="navLinks" @use-now="useNow" />
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">{{ doc.eyebrow }}</p>
          <h1>{{ doc.title }}</h1>
          <p>{{ doc.description }}</p>
        </div>
        <div class="hero-meta">
          <span>
            <AppIcon name="calendar" :size="15" />
            更新日期 {{ doc.updatedAt }}
          </span>
          <RouterLink class="sibling-link" :to="sibling.path">
            查看{{ sibling.label }}
            <AppIcon name="arrow-right" :size="14" />
          </RouterLink>
        </div>
      </div>
    </LandingStage>

    <main class="legal-main">
      <aside class="legal-sidebar">
        <p class="side-label">本页目录</p>
        <button
          v-for="section in doc.sections"
          :key="section.id"
          type="button"
          class="side-link"
          @click="scrollToSection(section.id)"
        >
          {{ section.title }}
        </button>
      </aside>

      <article class="legal-article">
        <section
          v-for="section in doc.sections"
          :id="section.id"
          :key="section.id"
          class="legal-section"
        >
          <h2>{{ section.title }}</h2>
          <p v-for="(paragraph, index) in section.paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </section>
      </article>
    </main>

    <LandingFooter :nav-links="navLinks" />
  </div>
</template>

<style scoped>
.legal-site {
  min-height: 100vh;
  color: var(--text-primary);
  background: var(--bg-page);
}

.legal-hero {
  padding-bottom: 48px;
}

.hero-inner {
  display: grid;
  gap: 28px;
  max-width: 1120px;
  padding: 0 40px;
  margin: 72px auto 0;
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  letter-spacing: 0.08em;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 720;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.hero-copy p {
  max-width: 640px;
  margin: 16px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  align-items: center;
}

.hero-meta span {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: var(--text-tertiary);
}

.sibling-link {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.sibling-link:hover {
  opacity: 0.85;
}

.legal-main {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 40px;
  max-width: 1120px;
  padding: 40px 40px 96px;
  margin: 0 auto;
}

.legal-sidebar {
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: start;
}

.side-label {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 650;
  color: var(--text-tertiary);
  letter-spacing: 0.04em;
}

.side-link {
  padding: 8px 10px;
  font-size: 13px;
  line-height: 1.45;
  color: var(--text-secondary);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 8px;
}

.side-link:hover {
  color: var(--text-primary);
  background: var(--fill-primary);
}

.legal-article {
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-width: 760px;
}

.legal-section h2 {
  margin: 0 0 14px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.legal-section p {
  margin: 0 0 12px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.legal-section p:last-child {
  margin-bottom: 0;
}

@media (width <= 900px) {
  .hero-inner,
  .legal-main {
    padding-inline: 22px;
  }

  .legal-main {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .legal-sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .side-label {
    grid-column: 1 / -1;
  }
}

@media (width <= 640px) {
  .legal-sidebar {
    grid-template-columns: 1fr;
  }
}
</style>
