<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import AppIcon from '@/components/app-icon/index.vue'
import LandingFooter from '@/views/login/components/landing-footer.vue'
import LandingHeader from '@/views/login/components/landing-header.vue'
import LandingStage from '@/views/login/components/landing-stage.vue'
import changelogSourceModule from '../../../CHANGELOG.md?raw'

type HeadingItem = {
  id: string
  title: string
  level: number
}

const navLinks = [
  { label: '文档', href: '/docs' },
  { label: '组件', href: '/components' },
  { label: '更新日志', href: '/changelog' },
  { label: '关于', href: '/about' }
]

const resolveChangelogSource = () => {
  if (typeof changelogSourceModule === 'string') return changelogSourceModule
  return (changelogSourceModule as { default?: string }).default || ''
}

const changelogSource = ref(resolveChangelogSource())

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')

const headings = computed<HeadingItem[]>(() => {
  const lines = changelogSource.value.split('\n')
  return lines
    .map((line) => {
      const matched = /^(#{1,3})\s+(.+)$/.exec(line)
      if (!matched) return null
      const title = matched[2].trim()
      return {
        id: slugify(title) || 'changelog',
        title,
        level: matched[1].length
      }
    })
    .filter((item): item is HeadingItem => Boolean(item))
})

const versionItems = computed(() => headings.value.filter((item) => item.level <= 2))
const tocItems = computed(() => headings.value.filter((item) => item.level > 1))

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const defaultRender =
  markdown.renderer.rules.heading_open ||
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

markdown.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const nextToken = tokens[idx + 1]
  const title = nextToken?.content || ''
  token.attrSet('id', slugify(title) || `heading-${idx}`)
  return defaultRender(tokens, idx, options, env, self)
}

const html = computed(() => markdown.render(changelogSource.value))

const scrollToHeading = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const useNow = () => {
  window.location.href = '/login'
}

onMounted(async () => {
  if (changelogSource.value) return

  const response = await fetch('/CHANGELOG.md?raw')
  if (!response.ok) return
  changelogSource.value = await response.text()
})
</script>

<template>
  <div class="changelog-site">
    <LandingStage class="changelog-hero">
      <LandingHeader
        active-href="/changelog"
        brand-href="/login"
        :nav-links="navLinks"
        @use-now="useNow"
      />
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">- CHANGELOG</p>
          <h1>更新日志</h1>
          <p>
            同步渲染项目根目录的 `CHANGELOG.md`，用于记录版本变化、功能新增、问题修复和后续迭代。
          </p>
        </div>
        <div class="search-box">
          <AppIcon name="search" :size="16" />
          <span>搜索更新...</span>
          <kbd>⌘ K</kbd>
        </div>
      </div>
    </LandingStage>

    <main class="changelog-main">
      <aside class="changelog-sidebar">
        <section class="side-group">
          <button type="button" class="side-title">
            <span>
              <AppIcon name="history" :size="15" />
              版本记录
            </span>
            <AppIcon name="chevron-down" :size="14" />
          </button>
          <button
            v-for="item in versionItems"
            :key="item.id"
            type="button"
            class="side-link"
            :class="{ active: item.level === 1 }"
            @click="scrollToHeading(item.id)"
          >
            <AppIcon name="circle-dot" :size="12" />
            {{ item.title }}
          </button>
        </section>

        <section class="side-group">
          <button type="button" class="side-title">
            <span>
              <AppIcon name="file-text" :size="15" />
              文件来源
            </span>
          </button>
          <p class="source-path">CHANGELOG.md</p>
        </section>
      </aside>

      <article class="changelog-article">
        <div class="breadcrumb">
          <span>Mason</span>
          <AppIcon name="chevron-right" :size="14" />
          <strong>更新日志</strong>
        </div>
        <div class="markdown-body" v-html="html" />
      </article>

      <aside class="page-toc">
        <h3>本页目录</h3>
        <button
          v-for="item in tocItems"
          :key="item.id"
          type="button"
          :class="{ active: item === tocItems[0] }"
          @click="scrollToHeading(item.id)"
        >
          {{ item.title }}
        </button>
      </aside>
    </main>

    <LandingFooter :nav-links="navLinks" />
  </div>
</template>

<style scoped>
.changelog-site {
  min-height: 100vh;
  font-family: var(--font-family-sans);
  color: var(--text-primary);
  background: var(--bg-surface);
}

.changelog-hero {
  border-bottom: 1px solid var(--border-subtle);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 40px;
  align-items: start;
  max-width: 1200px;
  min-height: 270px;
  padding: 70px 40px 46px;
  margin: 0 auto;
}

.hero-copy {
  max-width: 700px;
}

.eyebrow {
  margin: 0 0 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-tertiary);
  letter-spacing: 0.02em;
}

.hero-copy h1 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(38px, 4.3vw, 56px);
  font-weight: 500;
  line-height: 1.16;
  color: var(--text-primary);
  letter-spacing: 0;
}

.hero-copy p:not(.eyebrow) {
  max-width: 720px;
  margin: 18px 0 0;
  font-size: 16px;
  line-height: 1.9;
  color: var(--text-secondary);
}

.search-box {
  display: flex;
  gap: 9px;
  align-items: center;
  height: 40px;
  padding: 0 10px 0 14px;
  margin-top: 4px;
  font-size: 13px;
  color: var(--text-tertiary);
  background: color-mix(in srgb, var(--bg-surface) 82%, transparent);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--shadow-color) 60%, transparent);
}

.search-box kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  height: 22px;
  padding: 0 7px;
  margin-left: auto;
  font-family: inherit;
  font-size: 12px;
  color: var(--text-tertiary);
  background: var(--fill-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}

.changelog-main {
  display: grid;
  grid-template-columns: 232px minmax(0, 1fr) 192px;
  gap: 38px;
  align-items: start;
  max-width: 1200px;
  padding: 0 40px 42px;
  margin: 0 auto;
}

.changelog-sidebar {
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

.side-link:hover,
.side-link.active {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 9%, transparent);
}

.source-path {
  padding: 8px 14px;
  margin: 0;
  font-size: 13px;
  color: var(--color-primary-text);
  background: var(--color-primary-bg-muted);
  border-radius: var(--radius-md);
}

.changelog-article {
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
  font-weight: 650;
  color: var(--color-primary);
}

.markdown-body {
  min-width: 0;
}

.markdown-body :deep(h1) {
  margin: 0 0 26px;
  font-size: 36px;
  font-weight: 760;
  line-height: 1.2;
  color: var(--text-primary);
}

.markdown-body :deep(h2) {
  margin: 36px 0 12px;
  font-size: 26px;
  font-weight: 740;
  line-height: 1.25;
  color: var(--text-primary);
}

.markdown-body :deep(h3) {
  margin: 24px 0 10px;
  font-size: 19px;
  font-weight: 700;
  color: var(--text-primary);
}

.markdown-body :deep(p),
.markdown-body :deep(li) {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-secondary);
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  display: grid;
  gap: 8px;
  padding-left: 20px;
  margin: 0 0 22px;
}

.markdown-body :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
}

.markdown-body :deep(code:not(pre code)) {
  padding: 2px 6px;
  font-size: 13px;
  color: var(--color-primary-text);
  background: var(--color-primary-bg-muted);
  border-radius: var(--radius-sm);
}

.markdown-body :deep(pre) {
  padding: 18px;
  margin: 0 0 24px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.75;
  color: #dce6ee;
  background: #0f1317;
  border-radius: var(--radius-lg);
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

.page-toc button:hover,
.page-toc button.active {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
}

@media (width <= 1100px) {
  .changelog-main {
    grid-template-columns: 220px minmax(0, 1fr);
  }

  .page-toc {
    display: none;
  }
}

@media (width <= 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
    padding: 52px 20px 36px;
  }

  .search-box {
    max-width: 360px;
  }

  .changelog-main {
    grid-template-columns: 1fr;
    padding: 0 20px 36px;
  }

  .changelog-sidebar {
    position: static;
    min-height: auto;
    padding: 18px 0;
    border-right: 0;
    border-bottom: 1px solid var(--border-subtle);
  }
}
</style>
