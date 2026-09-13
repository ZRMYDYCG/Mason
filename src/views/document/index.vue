<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type { Component } from 'vue'
import { MDXProvider } from '@mdx-js/vue'
import AppIcon from '@/components/AppIcon/index.vue'
import LandingFooter from '@/views/Login/components/landing-footer.vue'
import LandingHeader from '@/views/Login/components/landing-header.vue'
import LandingStage from '@/views/Login/components/landing-stage.vue'
import logoWordmark from '@/assets/images/logo-wordmark.png'
import logoWordmarkOnDark from '@/assets/images/logo-wordmark-on-dark.png'
import { useSettingStore } from '@/store/modules/setting.ts'

type DocMeta = {
  title?: string
  description?: string
  category?: string
  group?: string
  updatedAt?: string
  readingTime?: string
  owner?: string
  order?: number
}

type DocModule = {
  default: Component
  meta?: DocMeta
}

type DocItem = {
  key: string
  title: string
  description: string
  category: string
  group: string
  updatedAt: string
  readingTime: string
  owner: string
  order: number
  component: Component
}

type TocItem = {
  id: string
  title: string
  level: number
}

const settingStore = useSettingStore()
const isDark = computed(() => settingStore.isDark)
const brandSrc = computed(() => (isDark.value ? logoWordmarkOnDark : logoWordmark))
const articleRef = ref<HTMLElement>()
const activeKey = ref('')
const toc = ref<TocItem[]>([])

const modules = import.meta.glob<DocModule>('../../mdx/**/*.mdx', { eager: true })

const navLinks = [
  { label: '文档', href: '/docs' },
  { label: '组件', href: '/components' },
  { label: '更新日志', href: '/changelog' },
  { label: '关于', href: '/about' }
]

const groupIcons: Record<string, string> = {
  开始使用: 'book-open-text',
  前端: 'monitor',
  后端: 'server',
  架构: 'blocks',
  工程约定: 'clipboard-list',
  迭代记录: 'history'
}

const toTitle = (path: string) =>
  path
    .split('/')
    .pop()
    ?.replace(/\.mdx$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Untitled'

const docs = computed<DocItem[]>(() =>
  Object.entries(modules)
    .map(([path, mod]) => ({
      key: path,
      title: mod.meta?.title || toTitle(path),
      description: mod.meta?.description || 'No description yet.',
      category: mod.meta?.category || 'General',
      group: mod.meta?.group || '开始使用',
      updatedAt: mod.meta?.updatedAt || '-',
      readingTime: mod.meta?.readingTime || '3 min read',
      owner: mod.meta?.owner || 'Mason',
      order: mod.meta?.order || 99,
      component: mod.default
    }))
    .sort((a, b) => a.order - b.order)
)

const activeDoc = computed(() => docs.value.find((doc) => doc.key === activeKey.value) || docs.value[0])

const sidebarGroups = computed(() =>
  docs.value.reduce<Array<{ title: string; icon: string; docs: DocItem[] }>>((groups, doc) => {
    const title = doc.group || doc.category
    const matched = groups.find((group) => group.title === title)
    if (matched) {
      matched.docs.push(doc)
      return groups
    }

    groups.push({
      title,
      icon: groupIcons[title] || 'file-text',
      docs: [doc]
    })
    return groups
  }, [])
)

const mdxComponents = {}

const useNow = () => {
  window.location.href = '/login'
}

const buildToc = async () => {
  await nextTick()
  const root = articleRef.value
  if (!root) return

  toc.value = Array.from(root.querySelectorAll('h2, h3')).map((heading, index) => {
    const title = heading.textContent || ''
    const id = heading.id || `doc-heading-${index}`
    heading.id = id
    return {
      id,
      title,
      level: heading.tagName === 'H3' ? 3 : 2
    }
  })
}

const selectSidebarItem = (key: string) => {
  activeKey.value = key
}

const scrollToHeading = (id: string) => {
  articleRef.value?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  activeKey.value = docs.value[0]?.key || ''
  buildToc()
})

watch(activeDoc, buildToc)
</script>

<template>
  <div class="docs-site">
    <LandingStage class="docs-hero">
      <LandingHeader
        active-href="/docs"
        brand-href="/login"
        :nav-links="navLinks"
        @use-now="useNow"
      />
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">- DOCUMENTATION</p>
          <h1>开发文档</h1>
          <p>从入门到进阶，全面了解 Mason 的设计理念、功能特性和使用方法，帮助你快速构建高效、优雅的现代化应用。</p>
        </div>
        <div class="search-box">
          <AppIcon name="search" :size="16" />
          <span>搜索文档...</span>
          <kbd>⌘ K</kbd>
        </div>
      </div>
    </LandingStage>

    <main class="docs-main">
      <aside class="docs-sidebar">
        <section v-for="group in sidebarGroups" :key="group.title" class="side-group">
          <button type="button" class="side-title">
            <span>
              <AppIcon :name="group.icon" :size="15" />
              {{ group.title }}
            </span>
            <AppIcon name="chevron-down" :size="14" />
          </button>
          <button
            v-for="item in group.docs"
            :key="item.key"
            type="button"
            class="side-link"
            :class="{ active: item.key === activeDoc?.key }"
            @click="selectSidebarItem(item.key)"
          >
            <AppIcon name="circle-dot" :size="12" />
            {{ item.title }}
          </button>
        </section>

        <div class="side-brand">
          <img :src="brandSrc" alt="Mason" />
          <p>Build A Better Tomorrow.</p>
        </div>
      </aside>

      <article class="docs-article">
        <div class="breadcrumb">
          <span>{{ activeDoc?.group || '开始使用' }}</span>
          <AppIcon name="chevron-right" :size="14" />
          <strong>{{ activeDoc?.title || '介绍' }}</strong>
        </div>
        <div v-if="activeDoc" ref="articleRef" class="mdx-body">
          <MDXProvider :components="mdxComponents">
            <component :is="activeDoc.component" />
          </MDXProvider>
        </div>
      </article>

      <aside class="page-toc">
        <h3>本页目录</h3>
        <button
          v-for="item in toc"
          :key="item.id"
          type="button"
          :class="{ active: item.id === toc[0]?.id }"
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
.docs-site {
  min-height: 100vh;
  color: var(--text-primary);
  background: var(--bg-surface);
  font-family: var(--font-family-sans);
}

.docs-hero {
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  border-bottom: 1px solid var(--border-subtle);
}

.hero-inner {
  position: relative;
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
  max-width: 680px;
}

.eyebrow {
  margin: 0 0 16px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
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
  max-width: 700px;
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
  color: var(--text-tertiary);
  font-size: 13px;
  background: color-mix(in srgb, var(--bg-surface) 82%, transparent);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--shadow-color) 60%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
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

.docs-main {
  display: grid;
  grid-template-columns: 232px minmax(0, 1fr) 192px;
  gap: 38px;
  align-items: start;
  max-width: 1200px;
  padding: 0 40px 42px;
  margin: 0 auto;
}

.docs-sidebar {
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
  color: var(--text-primary);
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

.side-link.active {
  font-weight: 650;
}

.side-brand {
  margin-top: 30px;
  padding: 0 14px;
}

.side-brand img {
  width: auto;
  height: 26px;
  object-fit: contain;
}

.side-brand p {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--text-tertiary);
}

.docs-article {
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

.mdx-body {
  min-width: 0;
}

.mdx-body :deep(h1) {
  display: none;
}

.mdx-body :deep(h2) {
  margin: 36px 0 12px;
  font-size: 30px;
  font-weight: 750;
  line-height: 1.25;
  color: var(--text-primary);
  letter-spacing: 0;
}

.mdx-body :deep(h2:first-child) {
  margin-top: 0;
}

.mdx-body :deep(p) {
  margin: 0 0 20px;
  font-size: 16px;
  line-height: 1.9;
  color: var(--text-secondary);
}

.mdx-body :deep(ul) {
  display: grid;
  gap: 8px;
  padding-left: 18px;
  margin: 0 0 22px;
}

.mdx-body :deep(li) {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.mdx-body :deep(code:not(pre code)) {
  padding: 2px 6px;
  font-size: 13px;
  color: var(--color-primary-text);
  background: var(--color-primary-bg-muted);
  border-radius: var(--radius-sm);
}

.mdx-body :deep(pre) {
  padding: 18px;
  margin: 0 0 24px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.75;
  color: #dce6ee;
  background: #0f1317;
  border-radius: var(--radius-lg);
}

.mdx-body :deep(img) {
  display: block;
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  margin: 22px 0 30px;
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
  .docs-main {
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

  .docs-main {
    grid-template-columns: 1fr;
    padding: 0 20px 36px;
  }

  .docs-sidebar {
    position: static;
    min-height: auto;
    padding: 18px 0;
    border-right: 0;
    border-bottom: 1px solid var(--border-subtle);
  }

}
</style>
