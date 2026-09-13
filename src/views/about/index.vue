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
  { id: 'intro', label: '自我介绍', icon: 'user-round' },
  { id: 'origin', label: '项目初衷', icon: 'flame' },
  { id: 'belief', label: '长期主义', icon: 'sprout' },
  { id: 'future', label: '继续生长', icon: 'sparkles' }
]

const principles = [
  {
    title: '把复杂留在底层',
    desc: '后台业务会反复遇到权限、菜单、表格、表单、主题和布局，Mason 希望把这些通用能力沉下来，让业务开发更专注。'
  },
  {
    title: '让代码保持可迭代',
    desc: '模板不是一次性作品，而是长期维护的工作台。每一次真实业务反馈，都应该能反哺到项目里。'
  },
  {
    title: '和 AI 一起进化',
    desc: 'AI 已经改变开发方式，但好的工程底座依然重要。Mason 会继续把人对业务的理解和 AI 的效率结合起来。'
  }
]

const timeline = [
  { label: '起点', text: '想拥有一个真正属于自己的后台模板。' },
  { label: '沉淀', text: '把日常业务里反复出现的能力整理成稳定组件和方案。' },
  { label: '现在', text: '在 AI 技术的帮助下，继续提升开发效率、文档体验和项目可维护性。' }
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
            我是一名前端开发工程师，也在持续探索 AI 技术。Mason 是我把后台管理开发经验、
            工程审美和长期主义放在一起打磨出来的项目。
          </p>
        </div>
        <div class="hero-note">
          <AppIcon name="quote" :size="20" />
          <p>长期主义，持续生长。把每一次真实开发里的问题，变成下一次更顺手的能力。</p>
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
          <p class="section-kicker">Self Introduction</p>
          <h2>自我介绍</h2>
          <p>
            我是一名前端开发工程师，长期和后台管理、工程化、组件封装、权限体系、可视化页面打交道。
            这些工作看起来琐碎，但越做越会发现，真正提升效率的不是某一个炫技功能，而是一套稳定、清晰、
            可复用的基础设施。
          </p>
          <p>
            现在我也在不断探索 AI 技术。AI 让开发速度变快，也让很多想法更容易被验证，但我依然相信：
            好的产品和工程，需要持续思考、持续整理、持续生长。
          </p>
        </section>

        <section id="origin" class="content-section">
          <p class="section-kicker">Why Mason</p>
          <h2>做这个项目的初衷</h2>
          <p>
            在 AI 还没有真正进入日常开发之前，我想很多做后台管理业务的开发者，应该都想过开发一个自己的后台模板。
            它不用一开始就很庞大，但要足够顺手，足够稳定，也要带着自己的开发习惯和审美判断。
          </p>
          <p>
            后台管理系统里有太多重复的东西：登录、菜单、权限、表格、表单、主题、布局、图标、异常页、接口规范。
            每个项目都重新搭一遍会消耗很多精力，所以 Mason 想做的是一套可以陪着项目不断迭代的中后台基础方案。
          </p>
          <p>
            现在 AI 来了，很多事情可以被更快地生成，但这并不代表工程底座不重要。相反，越是有 AI，越需要一个清楚、
            统一、可扩展的项目结构，让生成出来的东西可以落到正确的位置，成为系统的一部分。
          </p>
        </section>

        <section id="belief" class="content-section">
          <p class="section-kicker">Principles</p>
          <h2>长期主义，持续生长</h2>
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
          <h2>让项目继续往前走</h2>
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
