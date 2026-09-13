<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/app-icon/index.vue'
import DocExample from '../../components/doc-example.vue'

const iconSize = ref(28)
const iconColor = ref('#3b82f6')
const strokeWidth = ref(2)
const selectedIcon = ref('home')

const iconList = [
  'home',
  'settings',
  'search',
  'user',
  'bell',
  'moon',
  'sun',
  'shield-check',
  'table-2',
  'github',
  'edit',
  'trash-2'
]

const customIcons = [
  { name: 'sparkles', size: 20, color: '#f59e0b' },
  { name: 'heart', size: 22, color: '#ef4444' },
  { name: 'star', size: 20, color: '#8b5cf6' },
  { name: 'zap', size: 24, color: '#06b6d4' },
  { name: 'flame', size: 22, color: '#f97316' },
  { name: 'gem', size: 20, color: '#10b981' }
]

const basicCode = `<AppIcon name="home" :size="20" />
<AppIcon name="settings" :size="20" />
<AppIcon name="search" :size="20" />
<AppIcon name="user" :size="20" />
<AppIcon name="bell" :size="20" />`

const sizeCode = `<AppIcon name="star" :size="14" />
<AppIcon name="star" :size="18" />
<AppIcon name="star" :size="24" />
<AppIcon name="star" :size="32" />
<AppIcon name="star" :size="40" />`

const colorCode = `<AppIcon name="sparkles" :size="20" color="#f59e0b" />
<AppIcon name="heart" :size="22" color="#ef4444" />
<AppIcon name="star" :size="20" color="#8b5cf6" />
<AppIcon name="zap" :size="24" color="#06b6d4" />
<AppIcon name="flame" :size="22" color="#f97316" />
<AppIcon name="gem" :size="20" color="#10b981" />`

const strokeCode = `<AppIcon name="heart" :size="24" :stroke-width="1" color="#ef4444" />
<AppIcon name="heart" :size="24" :stroke-width="1.5" color="#ef4444" />
<AppIcon name="heart" :size="24" :stroke-width="2" color="#ef4444" />
<AppIcon name="heart" :size="24" :stroke-width="2.5" color="#ef4444" />
<AppIcon name="heart" :size="24" :stroke-width="3" color="#ef4444" />`

const interactiveCode = computed(
  () => `<AppIcon
  name="${selectedIcon.value}"
  :size="${iconSize.value}"
  color="${iconColor.value}"
  :stroke-width="${strokeWidth.value}"
/>`
)

const buttonCode = `<button class="btn btn-primary">
  <AppIcon name="plus" :size="16" color="currentColor" />
  新建
</button>

<button class="btn btn-outline">
  <AppIcon name="edit" :size="16" color="currentColor" />
  编辑
</button>

<button class="btn btn-danger">
  <AppIcon name="trash-2" :size="16" color="currentColor" />
  删除
</button>

<button class="btn btn-ghost">
  <AppIcon name="settings" :size="16" color="currentColor" />
  设置
</button>`

const fallbackCode = `<!-- 无效图标名：自动回退到 CircleHelp -->
<AppIcon name="this-icon-does-not-exist" :size="24" />

<!-- 未传 name：同样回退到 CircleHelp -->
<AppIcon :size="24" />`
</script>

<template>
  <div class="demo-stack">
    <DocExample title="基础用法" :code="basicCode">
      <template #description>
        传入 Lucide 图标名（kebab-case）即可渲染，默认尺寸 <code>18</code>，颜色跟随父级文字色。
      </template>
      <div class="demo-row">
        <span v-for="name in ['home', 'settings', 'search', 'user', 'bell']" :key="name" class="icon-box">
          <AppIcon :name="name" :size="20" />
          <code>{{ name }}</code>
        </span>
      </div>
    </DocExample>

    <DocExample title="自定义尺寸" :code="sizeCode">
      <template #description>
        通过 <code>size</code> 控制图标宽高，支持数字或带单位字符串。
      </template>
      <div class="demo-row items-end">
        <span v-for="s in [14, 18, 24, 32, 40]" :key="s" class="icon-box">
          <AppIcon name="star" :size="s" />
          <code>{{ s }}px</code>
        </span>
      </div>
    </DocExample>

    <DocExample title="自定义颜色" :code="colorCode">
      <template #description>
        通过 <code>color</code> 设置描边色，默认 <code>currentColor</code>。
      </template>
      <div class="demo-row">
        <span v-for="(item, idx) in customIcons" :key="idx" class="icon-box">
          <AppIcon :name="item.name" :size="item.size" :color="item.color" />
          <code>{{ item.color }}</code>
        </span>
      </div>
    </DocExample>

    <DocExample title="线条粗细" :code="strokeCode">
      <template #description>
        通过 <code>strokeWidth</code> 调整描边粗细，数值越大图标越「粗」。
      </template>
      <div class="demo-row">
        <span v-for="sw in [1, 1.5, 2, 2.5, 3]" :key="sw" class="icon-box">
          <AppIcon name="heart" :size="24" :stroke-width="sw" color="#ef4444" />
          <code>{{ sw }}</code>
        </span>
      </div>
    </DocExample>

    <DocExample title="交互式调节" :code="interactiveCode">
      <template #description>下方控件会同步更新预览与代码，保证两者始终一致。</template>
      <div class="demo-controls">
        <label>
          图标
          <select v-model="selectedIcon">
            <option v-for="name in iconList" :key="name" :value="name">{{ name }}</option>
          </select>
        </label>
        <label>
          尺寸 {{ iconSize }}px
          <input v-model.number="iconSize" type="range" min="12" max="64" />
        </label>
        <label>
          颜色
          <input v-model="iconColor" type="color" />
        </label>
        <label>
          线宽 {{ strokeWidth }}
          <input v-model.number="strokeWidth" type="range" min="0.5" max="4" step="0.5" />
        </label>
      </div>
      <div class="demo-preview">
        <AppIcon
          :name="selectedIcon"
          :size="iconSize"
          :color="iconColor"
          :stroke-width="strokeWidth"
        />
      </div>
    </DocExample>

    <DocExample title="在按钮中使用" :code="buttonCode">
      <template #description>
        AppIcon 颜色设为 <code>currentColor</code> 时，会跟随按钮文字色一起换肤。
      </template>
      <div class="demo-row">
        <button type="button" class="demo-btn demo-btn-primary">
          <AppIcon name="plus" :size="16" color="currentColor" />
          新建
        </button>
        <button type="button" class="demo-btn demo-btn-outline">
          <AppIcon name="edit" :size="16" color="currentColor" />
          编辑
        </button>
        <button type="button" class="demo-btn demo-btn-danger">
          <AppIcon name="trash-2" :size="16" color="currentColor" />
          删除
        </button>
        <button type="button" class="demo-btn demo-btn-ghost">
          <AppIcon name="settings" :size="16" color="currentColor" />
          设置
        </button>
      </div>
    </DocExample>

    <DocExample title="图标缺失回退" :code="fallbackCode">
      <template #description>
        传入不存在的图标名或空 <code>name</code> 时，自动回退到 <code>CircleHelp</code>，避免界面崩溃。
      </template>
      <div class="demo-row">
        <span class="icon-box">
          <AppIcon name="this-icon-does-not-exist" :size="24" />
          <code>无效图标</code>
        </span>
        <span class="icon-box">
          <AppIcon :size="24" />
          <code>空 name</code>
        </span>
      </div>
    </DocExample>
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.demo-row.items-end {
  align-items: flex-end;
}

.icon-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  min-width: 56px;
  padding: 12px 8px;
  background: color-mix(in srgb, var(--fill-primary) 70%, transparent);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.icon-box code {
  font-size: 11px;
  color: var(--text-tertiary);
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-controls label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.demo-controls select,
.demo-controls input[type='range'] {
  min-width: 140px;
}

.demo-controls input[type='color'] {
  width: 36px;
  height: 28px;
  padding: 2px;
  cursor: pointer;
}

.demo-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88px;
  border: 1px dashed var(--border-subtle);
  border-radius: var(--radius-lg);
}

.demo-btn {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
}

.demo-btn-primary {
  color: #ffffff;
  background: var(--color-primary);
}

.demo-btn-outline {
  color: var(--color-primary);
  background: transparent;
  border-color: var(--color-primary);
}

.demo-btn-danger {
  color: #ffffff;
  background: #ef4444;
}

.demo-btn-ghost {
  color: var(--text-secondary);
  background: var(--fill-primary);
  border-color: var(--border-subtle);
}
</style>
