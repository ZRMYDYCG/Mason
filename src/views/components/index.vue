<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/AppIcon/index.vue'
import MasonTable from '@/components/Table/index.vue'
import { useMessage } from '@/components/Toast'
import LandingFooter from '@/views/Login/components/landing-footer.vue'
import LandingHeader from '@/views/Login/components/landing-header.vue'
import LandingStage from '@/views/Login/components/landing-stage.vue'

type ComponentDoc = {
  key: string
  name: string
  group: string
  path: string
  icon: string
  intro: string
  usage: string
  api: Array<{
    name: string
    desc: string
    type: string
    defaultValue: string
  }>
}

const navLinks = [
  { label: '文档', href: '/docs' },
  { label: '组件', href: '/components' },
  { label: '更新日志', href: '/changelog' },
  { label: '关于', href: '/about' }
]

const componentDocs: ComponentDoc[] = [
  {
    key: 'app-icon',
    name: 'AppIcon',
    group: '基础组件',
    path: 'src/components/AppIcon/index.vue',
    icon: 'sparkles',
    intro: '统一封装 lucide-vue-next 图标，项目内按钮、菜单和状态图标都可以通过 name 直接调用。',
    usage: `<AppIcon name="settings" :size="18" />`,
    api: [
      { name: 'name', desc: 'Lucide 图标名称', type: 'string', defaultValue: '-' },
      { name: 'size', desc: '图标尺寸', type: 'number | string', defaultValue: '18' },
      { name: 'color', desc: '图标颜色', type: 'string', defaultValue: 'currentColor' }
    ]
  },
  {
    key: 'table',
    name: 'MasonTable',
    group: '数据展示',
    path: 'src/components/Table/index.vue',
    icon: 'table-2',
    intro: '基于 Element Plus Table 的业务封装，保留 el-table 能力，同时统一分页、列配置和操作列事件。',
    usage: `<MasonTable :data="rows" :columns="columns" :pagination="{ isShow: false, total: rows.length }" />`,
    api: [
      { name: 'columns', desc: '表格列配置', type: 'Array', defaultValue: '[]' },
      { name: 'pagination', desc: '分页配置', type: 'object', defaultValue: '{ isShow: true }' },
      { name: 'expand', desc: '是否启用展开行', type: 'boolean', defaultValue: 'false' }
    ]
  },
  {
    key: 'custom-table',
    name: 'CustomTable',
    group: '数据展示',
    path: 'src/components/CustomTable/index.vue',
    icon: 'columns-3',
    intro: '面向复杂业务表格，提供列设置和样式设置能力，适合需要用户自定义展示字段的页面。',
    usage: `<CustomTable :columns="columns" :data="tableData" />`,
    api: [
      { name: 'columns', desc: '可配置列集合', type: 'Array', defaultValue: '[]' },
      { name: 'data', desc: '表格数据源', type: 'Array', defaultValue: '[]' },
      { name: 'styleSetting', desc: '样式配置能力', type: 'object', defaultValue: '-' }
    ]
  },
  {
    key: 'toast',
    name: 'Toast',
    group: '反馈状态',
    path: 'src/components/Toast/index.ts',
    icon: 'message-circle',
    intro: '统一封装 Element Plus Message、MessageBox、Notification，解决项目内提示调用分散的问题。',
    usage: `const message = useMessage()\nmessage.success('保存成功')`,
    api: [
      { name: 'useMessage', desc: '消息提示', type: 'function', defaultValue: '-' },
      { name: 'useMessageBox', desc: '弹窗确认', type: 'function', defaultValue: '-' },
      { name: 'useNotify', desc: '通知提示', type: 'function', defaultValue: '-' }
    ]
  },
  {
    key: 'loading',
    name: 'Loading',
    group: '反馈状态',
    path: 'src/components/Loading/full-loading.vue',
    icon: 'loader-circle',
    intro: '全屏加载状态组件，适合应用启动、权限初始化、长任务等待等场景。',
    usage: `<FullLoading />`,
    api: [
      { name: 'default', desc: '全屏加载动画', type: 'component', defaultValue: '-' }
    ]
  },
  {
    key: 'watermark',
    name: 'Watermark',
    group: '系统能力',
    path: 'src/components/Watermark/index.vue',
    icon: 'waves',
    intro: '基于 Element Plus Watermark 的全局水印组件，支持内容、字体、旋转角度、间距和层级配置。',
    usage: `<Watermark content="Mason • Admin" :visible="true" />`,
    api: [
      { name: 'content', desc: '水印文字', type: 'string', defaultValue: 'Mason • Admin' },
      { name: 'visible', desc: '是否显示', type: 'boolean', defaultValue: 'false' },
      { name: 'rotate', desc: '旋转角度', type: 'number', defaultValue: '-22' }
    ]
  },
  {
    key: 'lottie',
    name: 'Lottie',
    group: '基础组件',
    path: 'src/components/Lottie/index.vue',
    icon: 'badge-play',
    intro: '封装 lottie-web 动画加载，向外暴露动画实例，适合复杂动效和运营插画。',
    usage: `<Lottie :animation-data="animationData" @get-animation="handleAnimation" />`,
    api: [
      { name: 'animationData', desc: 'Lottie JSON 数据', type: 'object', defaultValue: '-' },
      { name: 'loop', desc: '是否循环播放', type: 'boolean', defaultValue: 'true' },
      { name: 'autoplay', desc: '是否自动播放', type: 'boolean', defaultValue: 'true' }
    ]
  },
  {
    key: 'error-message',
    name: 'ErrorMessage',
    group: '反馈状态',
    path: 'src/components/ErrorMessage',
    icon: 'triangle-alert',
    intro: '统一承载 403、404、500 等异常状态页面，保证错误场景的视觉和操作一致。',
    usage: `component: () => import('@/components/ErrorMessage/404.vue')`,
    api: [
      { name: '403', desc: '无权限状态', type: 'page', defaultValue: '-' },
      { name: '404', desc: '页面不存在', type: 'page', defaultValue: '-' },
      { name: '500', desc: '服务异常', type: 'page', defaultValue: '-' }
    ]
  }
]

const activeKey = ref(componentDocs[0].key)
const message = useMessage()

const groups = computed(() => {
  const map = new Map<string, ComponentDoc[]>()
  componentDocs.forEach((item) => {
    const list = map.get(item.group) || []
    list.push(item)
    map.set(item.group, list)
  })
  return Array.from(map.entries()).map(([title, items]) => ({ title, items }))
})

const activeDoc = computed(() => componentDocs.find((item) => item.key === activeKey.value) || componentDocs[0])

const tableRows = [
  { name: 'AppIcon', category: '基础组件', scene: '导航 / 按钮 / 状态', status: 'Ready' },
  { name: 'MasonTable', category: '数据展示', scene: '列表 / 配置 / 审核', status: 'Ready' },
  { name: 'Toast', category: '反馈状态', scene: '消息 / 确认 / 通知', status: 'Utility' }
]

const tableColumns = [
  { prop: 'name', label: '组件', minWidth: 120 },
  { prop: 'category', label: '分类', minWidth: 120 },
  { prop: 'scene', label: '使用场景', minWidth: 180 },
  { prop: 'status', label: '状态', minWidth: 100 }
]

const pageToc = ['组件说明', '基础用法', '组件预览', 'API']

const useNow = () => {
  window.location.href = '/login'
}

const showToast = () => {
  message.success('Mason Toast 调用成功')
}
</script>

<template>
  <div class="component-docs-site">
    <LandingStage class="component-hero">
      <LandingHeader
        active-href="/components"
        brand-href="/login"
        :nav-links="navLinks"
        @use-now="useNow"
      />
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">- COMPONENTS</p>
          <h1>组件文档</h1>
          <p>以组件库文档的方式展示项目内 `src/components` 目录，左侧选择组件，右侧查看说明、预览、用法和 API。</p>
        </div>
        <div class="search-box">
          <AppIcon name="search" :size="16" />
          <span>搜索组件...</span>
          <kbd>⌘ K</kbd>
        </div>
      </div>
    </LandingStage>

    <main class="component-main">
      <aside class="component-sidebar">
        <section v-for="group in groups" :key="group.title" class="side-group">
          <button type="button" class="side-title">
            <span>
              <AppIcon name="folder" :size="15" />
              {{ group.title }}
            </span>
            <AppIcon name="chevron-down" :size="14" />
          </button>
          <button
            v-for="item in group.items"
            :key="item.key"
            type="button"
            class="side-link"
            :class="{ active: item.key === activeKey }"
            @click="activeKey = item.key"
          >
            <AppIcon :name="item.icon" :size="14" />
            {{ item.name }}
          </button>
        </section>
      </aside>

      <article class="component-article">
        <div class="breadcrumb">
          <span>组件</span>
          <AppIcon name="chevron-right" :size="14" />
          <span>{{ activeDoc.group }}</span>
          <AppIcon name="chevron-right" :size="14" />
          <strong>{{ activeDoc.name }}</strong>
        </div>

        <section class="doc-section">
          <p class="section-kicker">组件说明</p>
          <h2>{{ activeDoc.name }}</h2>
          <p class="lead">{{ activeDoc.intro }}</p>
          <code class="path">{{ activeDoc.path }}</code>
        </section>

        <section class="doc-section">
          <p class="section-kicker">基础用法</p>
          <pre><code>{{ activeDoc.usage }}</code></pre>
        </section>

        <section class="doc-section">
          <p class="section-kicker">组件预览</p>
          <div class="preview-panel">
            <template v-if="activeDoc.key === 'app-icon'">
              <div class="icon-demo">
                <span v-for="name in ['home', 'settings', 'shield-check', 'table-2', 'bell', 'moon']" :key="name">
                  <AppIcon :name="name" :size="24" />
                </span>
              </div>
            </template>

            <template v-else-if="activeDoc.key === 'table' || activeDoc.key === 'custom-table'">
              <MasonTable
                :data="tableRows"
                :columns="tableColumns"
                :pagination="{ isShow: false, total: tableRows.length }"
                border
              />
            </template>

            <template v-else-if="activeDoc.key === 'toast'">
              <button type="button" class="demo-action" @click="showToast">
                <AppIcon name="message-circle" :size="16" />
                触发消息提示
              </button>
            </template>

            <template v-else-if="activeDoc.key === 'loading'">
              <div class="loader-demo"><span /></div>
            </template>

            <template v-else-if="activeDoc.key === 'watermark'">
              <div class="watermark-demo">
                <span>Mason • Admin</span>
                <span>Mason • Admin</span>
                <span>Mason • Admin</span>
              </div>
            </template>

            <template v-else-if="activeDoc.key === 'lottie'">
              <div class="lottie-demo">
                <span />
                <strong>Lottie animation container</strong>
              </div>
            </template>

            <template v-else>
              <div class="error-demo">
                <strong>404</strong>
                <p>抱歉，您访问的页面不存在。</p>
                <button type="button">返回上一页</button>
              </div>
            </template>
          </div>
        </section>

        <section class="doc-section">
          <p class="section-kicker">API</p>
          <div class="api-table">
            <div class="api-row api-head">
              <span>名称</span>
              <span>说明</span>
              <span>类型</span>
              <span>默认值</span>
            </div>
            <div v-for="item in activeDoc.api" :key="item.name" class="api-row">
              <span>{{ item.name }}</span>
              <span>{{ item.desc }}</span>
              <span>{{ item.type }}</span>
              <span>{{ item.defaultValue }}</span>
            </div>
          </div>
        </section>
      </article>

      <aside class="page-toc">
        <h3>本页目录</h3>
        <button v-for="item in pageToc" :key="item" type="button" :class="{ active: item === '组件说明' }">
          {{ item }}
        </button>
      </aside>
    </main>

    <LandingFooter :nav-links="navLinks" />
  </div>
</template>

<style scoped>
.component-docs-site {
  min-height: 100vh;
  color: var(--text-primary);
  background: var(--bg-surface);
  font-family: var(--font-family-sans);
}

.component-hero {
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

.eyebrow,
.section-kicker {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.hero-copy h1 {
  margin: 16px 0 0;
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

.component-main {
  display: grid;
  grid-template-columns: 232px minmax(0, 1fr) 192px;
  gap: 38px;
  align-items: start;
  max-width: 1200px;
  padding: 0 40px 42px;
  margin: 0 auto;
}

.component-sidebar {
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

.side-link.active {
  font-weight: 650;
}

.component-article {
  min-width: 0;
  padding: 26px 0 30px;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
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

.doc-section {
  margin-bottom: 36px;
}

.doc-section h2 {
  margin: 12px 0 12px;
  font-size: 30px;
  font-weight: 750;
  line-height: 1.25;
  color: var(--text-primary);
  letter-spacing: 0;
}

.lead {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.9;
  color: var(--text-secondary);
}

.path {
  display: inline-flex;
  max-width: 100%;
  padding: 7px 10px;
  overflow: hidden;
  font-size: 13px;
  color: var(--color-primary-text);
  text-overflow: ellipsis;
  white-space: nowrap;
  background: var(--color-primary-bg-muted);
  border-radius: var(--radius-sm);
}

pre {
  padding: 18px;
  margin: 0;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.75;
  color: #dce6ee;
  background: #0f1317;
  border-radius: var(--radius-lg);
}

.preview-panel {
  min-height: 180px;
  padding: 22px;
  overflow: hidden;
  background: color-mix(in srgb, var(--bg-surface) 90%, var(--fill-primary));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  box-shadow: 0 18px 38px color-mix(in srgb, var(--shadow-color) 35%, transparent);
}

.icon-demo {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
}

.icon-demo span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.demo-action {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 650;
  color: var(--text-inverse);
  cursor: pointer;
  background: var(--bg-inverse);
  border: 0;
  border-radius: var(--radius-md);
}

.loader-demo {
  display: grid;
  place-items: center;
  min-height: 120px;
}

.loader-demo span {
  width: 38px;
  height: 38px;
  border: 3px solid color-mix(in srgb, var(--color-primary) 18%, transparent);
  border-top-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: spin 0.9s linear infinite;
}

.watermark-demo {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 140px;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.watermark-demo span {
  place-self: center;
  color: color-mix(in srgb, var(--text-tertiary) 32%, transparent);
  font-size: 16px;
  transform: rotate(-22deg);
}

.lottie-demo,
.error-demo {
  display: grid;
  place-items: center;
  min-height: 140px;
  text-align: center;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.lottie-demo span {
  width: 46px;
  height: 46px;
  margin-bottom: 10px;
  background:
    radial-gradient(circle at 30% 30%, #7ac943 0 20%, transparent 21%),
    radial-gradient(circle at 70% 34%, #5b8def 0 20%, transparent 21%),
    radial-gradient(circle at 50% 72%, #f5b942 0 20%, transparent 21%);
  border-radius: var(--radius-full);
}

.lottie-demo strong,
.error-demo strong {
  font-size: 22px;
  color: var(--text-primary);
}

.error-demo p {
  margin: 8px 0 14px;
  color: var(--text-secondary);
}

.error-demo button {
  height: 34px;
  padding: 0 14px;
  color: var(--text-inverse);
  background: var(--color-primary);
  border: 0;
  border-radius: var(--radius-md);
}

.api-table {
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.api-row {
  display: grid;
  grid-template-columns: 1fr 1.8fr 1fr 0.8fr;
  border-bottom: 1px solid var(--border-subtle);
}

.api-row:last-child {
  border-bottom: 0;
}

.api-row span {
  min-width: 0;
  padding: 13px 14px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-secondary);
}

.api-head span {
  font-weight: 700;
  color: var(--text-primary);
  background: var(--fill-primary-subtle);
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (width <= 1100px) {
  .component-main {
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

  .component-main {
    grid-template-columns: 1fr;
    padding: 0 20px 36px;
  }

  .component-sidebar {
    position: static;
    min-height: auto;
    padding: 18px 0;
    border-right: 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .icon-demo,
  .api-row {
    grid-template-columns: 1fr;
  }
}
</style>
