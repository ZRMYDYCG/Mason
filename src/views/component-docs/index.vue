<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/AppIcon/index.vue'
import LandingFooter from '@/views/Login/components/landing-footer.vue'
import LandingHeader from '@/views/Login/components/landing-header.vue'
import LandingStage from '@/views/Login/components/landing-stage.vue'

import AppIconDemo from './demos/basic/app-icon-demo.vue'
import LottieDemo from './demos/basic/lottie-demo.vue'
import MasonTableDemo from './demos/data-display/mason-table-demo.vue'
import CustomTableDemo from './demos/data-display/custom-table-demo.vue'
import ToastDemo from './demos/feedback/toast-demo.vue'
import FullLoadingDemo from './demos/feedback/full-loading-demo.vue'
import ErrorMessageDemo from './demos/feedback/error-message-demo.vue'
import WatermarkDemo from './demos/system/watermark-demo.vue'

type ComponentDoc = {
  key: string
  name: string
  group: string
  path: string
  icon: string
  summary: string
  description: string
  api: Array<{
    name: string
    desc: string
    type: string
    defaultValue: string
  }>
}

const GROUP_ORDER = ['基础能力', '数据展示', '反馈与状态', '系统能力'] as const

const GROUP_META: Record<(typeof GROUP_ORDER)[number], { icon: string; desc: string }> = {
  基础能力: { icon: 'shapes', desc: '图标、动效等通用视觉能力' },
  数据展示: { icon: 'table-2', desc: '列表、表格与可配置展示' },
  反馈与状态: { icon: 'message-circle', desc: '消息、加载与异常页面' },
  系统能力: { icon: 'shield', desc: '水印等全局系统级能力' }
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
    group: '基础能力',
    path: '@/components/AppIcon',
    icon: 'sparkles',
    summary: '项目统一的 Lucide 图标入口，按 name 按需异步加载，避免业务侧直接散落引入图标包。',
    description:
      'AppIcon 基于 lucide-vue-next 做了一层轻量封装：传入 kebab-case 的图标名即可渲染，内部用 import.meta.glob 按需异步加载，并做了组件缓存。找不到图标时会回退到 CircleHelp，保证界面不会因 icon 名写错而直接崩掉。颜色默认跟随 currentColor，方便和按钮、菜单、状态文案一起换肤。',
    api: [
      { name: 'name', desc: 'Lucide 图标名（kebab-case），例如 settings、shield-check', type: 'string', defaultValue: '-' },
      { name: 'size', desc: '图标宽高，数字或带单位字符串均可', type: 'number | string', defaultValue: '18' },
      { name: 'color', desc: '描边颜色，默认继承父级文字色', type: 'string', defaultValue: 'currentColor' },
      { name: 'strokeWidth', desc: '线条粗细，影响图标视觉权重', type: 'number', defaultValue: '2' }
    ]
  },
  {
    key: 'lottie',
    name: 'Lottie',
    group: '基础能力',
    path: '@/components/Lottie',
    icon: 'badge-play',
    summary: '封装 lottie-web，把 AE 导出的 JSON 动效挂到 DOM，并通过事件把动画实例交还给业务。',
    description:
      'Lottie 组件在挂载时调用 lottie.loadAnimation，支持 svg / canvas / html 三种渲染方式，以及 loop、autoplay 控制。加载完成后会通过 get-animation 抛出动画实例，业务侧可以自行 play、stop、setSpeed、playSegments 等。适合空状态插画、引导动效、登录页运营图等需要“比 CSS 动画更丰富”的场景。',
    api: [
      { name: 'animationData', desc: 'Lottie / Bodymovin 导出的 JSON 数据', type: 'object', defaultValue: '-' },
      { name: 'renderer', desc: '渲染方式：svg | canvas | html', type: "'svg' | 'canvas' | 'html'", defaultValue: 'svg' },
      { name: 'loop', desc: '是否循环播放', type: 'boolean', defaultValue: 'true' },
      { name: 'autoplay', desc: '是否自动播放', type: 'boolean', defaultValue: 'true' },
      { name: 'get-animation', desc: '动画实例就绪后触发，可拿到 play / stop 等方法', type: 'event', defaultValue: '-' }
    ]
  },
  {
    key: 'table',
    name: 'MasonTable',
    group: '数据展示',
    path: '@/components/Table',
    icon: 'table-2',
    summary: '基于 Element Plus Table 的业务封装：列配置驱动、统一分页，并内置详情 / 编辑 / 删除操作列事件。',
    description:
      'MasonTable 的设计原则是“不破坏原 el-table 能力，只补齐项目通用逻辑”。通过 columns 描述列结构，pagination 控制是否展示分页与总数；操作列可用内置 DETAIL / EDIT / DELETE 符号，既可绑定列级 action，也可监听组件事件。适合绝大多数后台列表页作为默认表格底座。',
    api: [
      { name: 'columns', desc: '列配置集合；操作列需 prop=TABLE_COLUMN_OPTS + operateList', type: 'Array', defaultValue: '[]' },
      { name: 'TABLE_COLUMN_OPERATE', desc: '从 @/components/Table/constants 导出：DETAIL / EDIT / DELETE，用作 operateList key', type: 'export', defaultValue: '-' },
      { name: 'pagination', desc: '分页配置，isShow 控制显隐，total 为总条数', type: 'object', defaultValue: '{ isShow: true, total: 0 }' },
      { name: 'expand', desc: '是否启用展开行', type: 'boolean', defaultValue: 'false' },
      { name: 'tableColumnOptions', desc: '透传给列的额外属性集合', type: 'object', defaultValue: '{}' },
      { name: 'page-change / size-change', desc: '页码或每页条数变化时触发', type: 'event', defaultValue: '-' },
      { name: 'detail / edit / delete', desc: '操作列默认事件，参数为 { data: row }', type: 'event', defaultValue: '-' },
      { name: '#expand / #empty / #otherOperate', desc: '展开行、空状态、额外操作按钮插槽', type: 'slot', defaultValue: '-' }
    ]
  },
  {
    key: 'custom-table',
    name: 'CustomTable',
    group: '数据展示',
    path: '@/components/CustomTable',
    icon: 'columns-3',
    summary: '在 MasonTable 之上叠加列设置与样式设置，适合用户需要自定义展示字段和表格观感的复杂列表。',
    description:
      'CustomTable 内部复用 MasonTable，并额外提供「表格设置」与「表格列设置」两个 Popover：前者调整尺寸、斑马纹、边框等观感；后者控制列显隐。对 attrs 做了透传，业务侧仍可像使用 MasonTable 一样传 data / columns / pagination。适合字段很多、不同角色关注点不同的业务表。',
    api: [
      { name: 'isShowSetting', desc: '是否展示右上角列设置 / 样式设置入口', type: 'boolean', defaultValue: 'true' },
      { name: 'columns / data / ...', desc: '透传给内部 MasonTable 的属性与事件', type: 'attrs', defaultValue: '-' },
      { name: 'ColumnSetting', desc: '子能力：按列控制 isVisible', type: 'sub-component', defaultValue: '-' },
      { name: 'StyleSetting', desc: '子能力：size / stripe / border 等', type: 'sub-component', defaultValue: '-' }
    ]
  },
  {
    key: 'toast',
    name: 'Toast',
    group: '反馈与状态',
    path: '@/components/Toast',
    icon: 'message-circle',
    summary: '统一封装 Element Plus Message、MessageBox、Notification，提供 useMessage / useMessageBox / useNotify 三套调用入口。',
    description:
      'Toast 模块解决的是“项目里到处直接调 ElMessage / ElNotification，风格与调用方式不一致”的问题。useMessage 覆盖 info / warning / success / error；useMessageBox 覆盖 alert / confirm / prompt；useNotify 覆盖通知类提示。业务侧只需引入对应 hook，即可保持反馈交互一致。',
    api: [
      { name: 'useMessage()', desc: '返回 info / warning / success / error 消息方法', type: 'function', defaultValue: '-' },
      { name: 'useMessageBox()', desc: '返回 alert / confirm / prompt 等方法', type: 'function', defaultValue: '-' },
      { name: 'useNotify()', desc: '返回通知类 info / warning / success / error', type: 'function', defaultValue: '-' }
    ]
  },
  {
    key: 'loading',
    name: 'FullLoading',
    group: '反馈与状态',
    path: '@/components/Loading/full-loading.vue',
    icon: 'loader-circle',
    summary: '全屏遮罩加载态，覆盖整页并阻断交互，适合应用冷启动、权限初始化或长任务等待。',
    description:
      'FullLoading 是一个固定定位的全屏容器，带深浅色背景适配，中间是独立 CSS 动画 loader。它不依赖 Element Plus Loading 指令，适合作为路由守卫、鉴权完成前的全局占位，或某个明确阶段的阻塞式等待。页面级短请求更建议用局部 loading，而不是这个全屏组件。',
    api: [
      { name: 'default', desc: '无 props，直接作为全屏加载占位组件使用', type: 'component', defaultValue: '-' }
    ]
  },
  {
    key: 'error-message',
    name: 'ErrorMessage',
    group: '反馈与状态',
    path: '@/components/ErrorMessage',
    icon: 'triangle-alert',
    summary: '统一的 403 / 404 / 500 异常状态页，路由可直接挂载，保证错误场景视觉与返回操作一致。',
    description:
      'ErrorMessage 目录下按状态码拆分页面：403 无权限、404 页面不存在、500 服务异常。它们被静态路由直接引用，也适合在业务里按条件懒加载。目标是错误态不再各自写一版空页面，而是复用同一套文案结构、插画风格和返回动作。',
    api: [
      { name: '403.vue', desc: '无权限访问状态页', type: 'page', defaultValue: '-' },
      { name: '404.vue', desc: '页面不存在状态页', type: 'page', defaultValue: '-' },
      { name: '500.vue', desc: '服务异常状态页', type: 'page', defaultValue: '-' }
    ]
  },
  {
    key: 'watermark',
    name: 'Watermark',
    group: '系统能力',
    path: '@/components/Watermark',
    icon: 'waves',
    summary: '基于 Element Plus Watermark 的全局水印层，可配置文案、字号、颜色、旋转、间距与层级。',
    description:
      'Watermark 以 fixed 全屏容器覆盖视图，pointer-events: none 保证不影响点击。visible 控制显隐，content 控制水印文字，其余参数对应字体、旋转角、gap、offset、zIndex。常挂在布局根节点，配合主题 / 用户信息展示“系统名 + 账号”类水印，满足后台合规与防截图外泄的基础需求。',
    api: [
      { name: 'content', desc: '水印文字内容', type: 'string', defaultValue: 'Mason • Admin' },
      { name: 'visible', desc: '是否显示水印', type: 'boolean', defaultValue: 'false' },
      { name: 'fontSize', desc: '水印字号', type: 'number', defaultValue: '16' },
      { name: 'fontColor', desc: '水印文字颜色', type: 'string', defaultValue: 'rgba(128, 128, 128, 0.2)' },
      { name: 'rotate', desc: '旋转角度（度）', type: 'number', defaultValue: '-22' },
      { name: 'gapX / gapY', desc: '水印水平 / 垂直间距', type: 'number', defaultValue: '100' },
      { name: 'offsetX / offsetY', desc: '水印水平 / 垂直偏移', type: 'number', defaultValue: '50' },
      { name: 'zIndex', desc: '水印层级', type: 'number', defaultValue: '8' }
    ]
  }
]

const activeKey = ref(componentDocs[0].key)

const groups = computed(() =>
  GROUP_ORDER.map((title) => ({
    title,
    icon: GROUP_META[title].icon,
    desc: GROUP_META[title].desc,
    items: componentDocs.filter((item) => item.group === title)
  })).filter((group) => group.items.length > 0)
)

const activeDoc = computed(() => componentDocs.find((item) => item.key === activeKey.value) || componentDocs[0])

const pageToc = [
  { id: 'intro', label: '组件说明' },
  { id: 'examples', label: '使用示例' },
  { id: 'api', label: 'API' }
]

const useNow = () => {
  window.location.href = '/login'
}

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
          <p class="eyebrow">- COMPONENT DOCS</p>
          <h1>组件文档</h1>
          <p>
            按「基础能力 / 数据展示 / 反馈与状态 / 系统能力」整理
            <code>src/components</code>
            下的通用组件：左侧按组浏览，右侧查看说明、场景、可交互示例（代码与演示一致）与 API。
          </p>
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
          <div class="side-title">
            <span>
              <AppIcon :name="group.icon" :size="15" />
              {{ group.title }}
            </span>
            <small>{{ group.items.length }}</small>
          </div>
          <p class="side-desc">{{ group.desc }}</p>
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
          <span>组件文档</span>
          <AppIcon name="chevron-right" :size="14" />
          <span>{{ activeDoc.group }}</span>
          <AppIcon name="chevron-right" :size="14" />
          <strong>{{ activeDoc.name }}</strong>
        </div>

        <section id="intro" class="doc-section">
          <p class="section-kicker">组件说明</p>
          <h2>{{ activeDoc.name }}</h2>
          <p class="lead">{{ activeDoc.summary }}</p>
          <p class="detail">{{ activeDoc.description }}</p>
          <code class="path">{{ activeDoc.path }}</code>
        </section>

        <section id="examples" class="doc-section">
          <p class="section-kicker">使用示例</p>
          <div class="examples-panel">
            <AppIconDemo v-if="activeDoc.key === 'app-icon'" />
            <LottieDemo v-else-if="activeDoc.key === 'lottie'" />
            <MasonTableDemo v-else-if="activeDoc.key === 'table'" />
            <CustomTableDemo v-else-if="activeDoc.key === 'custom-table'" />
            <ToastDemo v-else-if="activeDoc.key === 'toast'" />
            <FullLoadingDemo v-else-if="activeDoc.key === 'loading'" />
            <ErrorMessageDemo v-else-if="activeDoc.key === 'error-message'" />
            <WatermarkDemo v-else-if="activeDoc.key === 'watermark'" />
            <div v-else class="empty-demo">
              <AppIcon name="construction" :size="32" color="var(--text-tertiary)" />
              <p>该组件暂无在线预览</p>
            </div>
          </div>
        </section>

        <section id="api" class="doc-section">
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
        <button
          v-for="item in pageToc"
          :key="item.id"
          type="button"
          :class="{ active: item.id === 'intro' }"
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
.component-docs-site {
  min-height: 100vh;
  font-family: var(--font-family-sans);
  color: var(--text-primary);
  background: var(--bg-surface);
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
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.section-kicker {
  margin-bottom: 16px;
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

.hero-copy code {
  padding: 1px 6px;
  font-size: 0.92em;
  color: var(--color-primary-text);
  background: var(--color-primary-bg-muted);
  border-radius: var(--radius-sm);
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

.side-group:last-child {
  margin-bottom: 0;
  border-bottom: 0;
}

.side-title,
.side-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
}

.side-title {
  justify-content: space-between;
  min-height: 36px;
  padding: 0 4px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.side-title span {
  display: inline-flex;
  gap: 9px;
  align-items: center;
}

.side-title small {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
}

.side-desc {
  margin: 0 4px 10px;
  font-size: 12px;
  line-height: 1.55;
  color: var(--text-tertiary);
}

.side-link {
  gap: 10px;
  min-height: 36px;
  padding: 8px 14px;
  margin: 3px 0;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
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
  font-weight: 650;
  color: var(--color-primary);
}

.doc-section {
  margin-bottom: 36px;
  scroll-margin-top: 96px;
}

.doc-section h2 {
  margin: 0 0 12px;
  font-size: 30px;
  font-weight: 750;
  line-height: 1.25;
  color: var(--text-primary);
  letter-spacing: 0;
}

.lead,
.detail {
  margin: 0 0 14px;
  font-size: 16px;
  line-height: 1.9;
  color: var(--text-secondary);
}

.detail {
  font-size: 14px;
  line-height: 1.85;
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

.examples-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.empty-demo {
  display: grid;
  gap: 10px;
  place-items: center;
  min-height: 160px;
  color: var(--text-tertiary);
  border: 1px dashed var(--border-subtle);
  border-radius: var(--radius-xl);
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
  word-break: break-word;
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

  .api-row {
    grid-template-columns: 1fr;
  }
}
</style>
