<script setup lang="ts">
import { computed, ref } from 'vue'
import Error403 from '@/components/ErrorMessage/403.vue'
import Error404 from '@/components/ErrorMessage/404.vue'
import Error500 from '@/components/ErrorMessage/500.vue'
import DocExample from '../../components/DocExample.vue'

const activeTab = ref<'403' | '404' | '500'>('404')
const errorTabs = ['403', '404', '500'] as const

const previewMap = {
  '403': Error403,
  '404': Error404,
  '500': Error500
}

const activeComponent = computed(() => previewMap[activeTab.value])

const previewCode = computed(
  () => `<!-- 直接挂载真实错误页组件 -->
<script setup>
import Error${activeTab.value} from '@/components/ErrorMessage/${activeTab.value}.vue'
<\/script>

<template>
  <Error${activeTab.value} />
</template>`
)

const routeCode = `// router 配置
{
  path: '/403',
  component: () => import('@/components/ErrorMessage/403.vue')
},
{
  path: '/404',
  component: () => import('@/components/ErrorMessage/404.vue')
},
{
  path: '/500',
  component: () => import('@/components/ErrorMessage/500.vue')
},
// 兜底路由
{
  path: '/:pathMatch(.*)*',
  component: () => import('@/components/ErrorMessage/404.vue')
}`
</script>

<template>
  <div class="demo-stack">
    <DocExample title="真实页面预览" :code="previewCode">
      <template #description>
        下方直接挂载 <code>ErrorMessage/{{ activeTab }}.vue</code> 真实组件（含插画、文案、返回按钮），不是简化 mock。
      </template>
      <div class="demo-tabs">
        <button
          v-for="tab in errorTabs"
          :key="tab"
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="demo-preview-area">
        <component :is="activeComponent" :key="activeTab" />
      </div>
    </DocExample>

    <DocExample title="路由挂载方式" :code="routeCode">
      <template #description>
        推荐在路由中按状态码挂载，并配置兜底路由指向 404。
      </template>
      <ul class="route-list">
        <li><code>/403</code> → 无权限访问</li>
        <li><code>/404</code> → 页面不存在</li>
        <li><code>/500</code> → 服务异常</li>
        <li><code>/:pathMatch(.*)*</code> → 兜底到 404</li>
      </ul>
    </DocExample>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
}

.tab-btn {
  height: 32px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  background: var(--fill-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.tab-btn.active {
  color: #fff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.demo-preview-area {
  min-height: 280px;
  max-height: 360px;
  overflow: auto;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
}

.demo-preview-area :deep(img) {
  width: min(180px, 28%);
  margin-right: 24px;
}

.demo-preview-area :deep(h2) {
  font-size: 42px;
}

.demo-preview-area :deep(h4) {
  margin: 16px 0 14px;
  font-size: 16px;
}

.route-list {
  padding-left: 18px;
  margin: 0;
}

.route-list li {
  margin: 8px 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.route-list code {
  padding: 1px 5px;
  font-size: 12px;
  color: var(--color-primary-text);
  background: var(--color-primary-bg-muted);
  border-radius: 4px;
}
</style>
