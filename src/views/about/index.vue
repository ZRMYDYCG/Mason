<script setup lang="ts">
import AppIcon from '@/components/AppIcon/index.vue'
import LandingFooter from '@/views/Login/components/landing-footer.vue'
import LandingHeader from '@/views/Login/components/landing-header.vue'
import LandingStage from '@/views/Login/components/landing-stage.vue'

const navLinks = [
  { label: '文档', href: '/docs' },
  { label: '组件', href: '/components' },
  { label: '更新日志', href: '/changelog' },
  { label: '关于', href: '/about' }
]

const sidebarItems = [
  { id: 'intro', label: '简介', icon: 'user-round' },
  { id: 'origin', label: '为什么做', icon: 'folder-kanban' },
  { id: 'belief', label: '工程原则', icon: 'list-checks' },
  { id: 'future', label: '后续规划', icon: 'map' }
]

const principles = [
  {
    title: '通用能力下沉',
    desc: '权限、菜单、表格、表单、主题、布局等高频能力沉淀到底层，业务页专注业务本身。'
  },
  {
    title: '保持可迭代',
    desc: '按真实业务反馈持续调整结构与组件，避免一次性堆功能。'
  },
  {
    title: '约定先于技巧',
    desc: '目录、接口、样式与权限有明确边界，降低协作与维护成本。'
  }
]

const timeline = [
  { label: '起点', text: '整理一套可复用的中后台基础方案。' },
  { label: '沉淀', text: '把高频能力固化为组件、约定与文档。' },
  { label: '现在', text: '完善前后端体系、文档中心与组件示例。' }
]

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const useNow = () => {
  window.location.href = '/login'
}
</script>

<template>
  <div class="about-site">
    <LandingStage class="about-hero">
      <LandingHeader
        active-href="/about"
        brand-href="/login"
        :nav-links="navLinks"
        @use-now="useNow"
      />
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">- ABOUT MASON</p>
          <h1>关于 Mason</h1>
          <p>
            Mason 是面向中后台场景的开源基础工程，目标是把登录、权限、菜单、表格、主题等通用能力整理清楚，
            让业务开发可以直接复用。
          </p>
        </div>
        <div class="hero-note">
          <AppIcon name="info" :size="20" />
          <p>立项于 2024-10-01。按实际使用反馈持续迭代结构、组件与文档。</p>
        </div>
      </div>
    </LandingStage>

    <main class="about-main">
      <aside class="about-sidebar">
        <section class="side-group">
          <button type="button" class="side-title">
            <span>
              <AppIcon name="compass" :size="15" />
              关于目录
            </span>
            <AppIcon name="chevron-down" :size="14" />
          </button>
          <button
            v-for="item in sidebarItems"
            :key="item.id"
            type="button"
            class="side-link"
            @click="scrollToSection(item.id)"
          >
            <AppIcon :name="item.icon" :size="13" />
            {{ item.label }}
          </button>
        </section>
      </aside>

      <article class="about-article">
        <div class="breadcrumb">
          <span>Mason</span>
          <AppIcon name="chevron-right" :size="14" />
          <strong>关于</strong>
        </div>

        <section id="intro" class="content-section">
          <p class="section-kicker">Overview</p>
          <h2>简介</h2>
          <p>
            Mason 面向中后台开发中的高频重复工作：登录、菜单、权限、表格、表单、主题、布局与接口规范。
            项目基于 Vue 3 + TypeScript，并配套 NestJS 后端能力。
          </p>
          <p>
            设计重点是结构清晰、边界明确、便于扩展，而不是堆砌演示功能。
          </p>
        </section>

        <section id="origin" class="content-section">
          <p class="section-kicker">Motivation</p>
          <h2>为什么做</h2>
          <p>
            管理端项目几乎都会重复搭建同一套基础设施。每次从零开始成本高，也容易导致目录、权限与样式约定不一致。
          </p>
          <p>
            Mason 想提供一套可直接落地的基础方案：前端工程结构稳定，后端认证权限可用，文档能跟着功能更新。
          </p>
        </section>

        <section id="belief" class="content-section">
          <p class="section-kicker">Principles</p>
          <h2>工程原则</h2>
          <div class="principle-grid">
            <div v-for="item in principles" :key="item.title" class="principle-card">
              <AppIcon name="circle-check" :size="20" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </section>

        <section id="future" class="content-section">
          <p class="section-kicker">Roadmap</p>
          <h2>后续规划</h2>
          <div class="timeline">
            <div v-for="item in timeline" :key="item.label" class="timeline-item">
              <span>{{ item.label }}</span>
              <p>{{ item.text }}</p>
            </div>
          </div>
        </section>
      </article>

      <aside class="page-toc">
        <h3>本页目录</h3>
        <button
          v-for="item in sidebarItems"
          :key="item.id"
          type="button"
          @click="scrollToSection(item.id)"
        >
          {{ item.label }}
        </button>
      </aside>
    </main>

    <LandingFooter :nav-links="navLinks" />
  </div>
</template>

<style scoped>
.about-site {
  min-height: 100vh;
  color: var(--text-primary);
  background: var(--bg-surface);
  font-family: var(--font-family-sans);
}

.about-hero {
  border-bottom: 1px solid var(--border-subtle);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 56px;
  align-items: start;
  max-width: 1200px;
  min-height: 300px;
  padding: 72px 40px 52px;
  margin: 0 auto;
}

.hero-copy {
  max-width: 780px;
}

.eyebrow,
.section-kicker {
  margin: 0 0 16px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
}

.hero-copy h1 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(40px, 4.5vw, 60px);
  font-weight: 500;
  line-height: 1.16;
  color: var(--text-primary);
  letter-spacing: 0;
}

.hero-copy p:not(.eyebrow) {
  max-width: 740px;
  margin: 18px 0 0;
  font-size: 16px;
  line-height: 1.9;
  color: var(--text-secondary);
}

.hero-note {
  display: grid;
  gap: 16px;
  padding: 22px;
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--bg-surface) 82%, transparent);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  box-shadow: 0 14px 34px color-mix(in srgb, var(--shadow-color) 54%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.hero-note p {
  margin: 0;
  font-size: 15px;
  line-height: 1.85;
}

.about-main {
  display: grid;
  grid-template-columns: 232px minmax(0, 1fr) 192px;
  gap: 38px;
  align-items: start;
  max-width: 1200px;
  padding: 0 40px 46px;
  margin: 0 auto;
}

.about-sidebar {
  position: sticky;
  top: 86px;
  min-height: calc(100vh - 110px);
  padding: 22px 20px 28px 0;
  border-right: 1px solid var(--border-subtle);
}

.side-group {
  padding-bottom: 20px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--border-subtle);
}

.side-title,
.side-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.side-title {
  justify-content: space-between;
  height: 36px;
  padding: 0 4px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.side-title span {
  display: inline-flex;
  gap: 9px;
  align-items: center;
}

.side-link {
  gap: 10px;
  min-height: 36px;
  padding: 8px 14px;
  margin: 3px 0;
  font-size: 14px;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
}

.side-link:hover {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 9%, transparent);
}

.about-article {
  min-width: 0;
  padding: 26px 0 30px;
}

.breadcrumb {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 22px;
  font-size: 13px;
  color: var(--text-tertiary);
}

.breadcrumb strong {
  color: var(--color-primary);
  font-weight: 650;
}

.content-section {
  scroll-margin-top: 92px;
  padding-bottom: 44px;
}

.content-section h2 {
  margin: 0 0 16px;
  font-size: 30px;
  font-weight: 760;
  line-height: 1.25;
  color: var(--text-primary);
}

.content-section > p:not(.section-kicker) {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.95;
  color: var(--text-secondary);
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.principle-card {
  min-height: 184px;
  padding: 22px;
  background: var(--fill-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.principle-card h3 {
  margin: 18px 0 10px;
  font-size: 17px;
  font-weight: 720;
  color: var(--text-primary);
}

.principle-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.85;
  color: var(--text-secondary);
}

.timeline {
  display: grid;
  gap: 16px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border-subtle);
}

.timeline-item span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 28px;
  font-size: 13px;
  font-weight: 680;
  color: var(--color-primary);
  background: var(--color-primary-bg-muted);
  border-radius: var(--radius-sm);
}

.timeline-item p {
  margin: 0;
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-secondary);
}

.page-toc {
  position: sticky;
  top: 92px;
  min-height: 520px;
  padding: 28px 0 0 26px;
  border-left: 1px solid var(--border-light);
}

.page-toc h3 {
  margin: 0 0 18px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.page-toc button {
  display: block;
  width: 100%;
  padding: 8px 0 8px 14px;
  font-size: 14px;
  color: var(--text-tertiary);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-left: 2px solid transparent;
}

.page-toc button:hover {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
}

@media (width <= 1100px) {
  .about-main {
    grid-template-columns: 220px minmax(0, 1fr);
  }

  .page-toc {
    display: none;
  }

  .principle-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 52px 20px 36px;
  }

  .about-main {
    grid-template-columns: 1fr;
    padding: 0 20px 36px;
  }

  .about-sidebar {
    position: static;
    min-height: auto;
    padding: 18px 0;
    border-right: 0;
    border-bottom: 1px solid var(--border-subtle);
  }
}
</style>
