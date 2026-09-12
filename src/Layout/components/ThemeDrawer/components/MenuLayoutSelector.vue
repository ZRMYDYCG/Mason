<script setup lang="ts">
import { MenuTypeEnum } from '@/config'

defineProps<{
  menuType: MenuTypeEnum
}>()

const emit = defineEmits<{
  (e: 'select', type: MenuTypeEnum): void
}>()

const layouts = [
  {
    type: MenuTypeEnum.LEFT,
    name: '经典侧栏',
    tag: '推荐方案',
    tagTone: 'recommend',
    desc: '完整侧栏 + 品牌卡，适合复杂中后台。',
    preview: 'classic'
  },
  {
    type: MenuTypeEnum.TOP,
    name: '顶部导航',
    tag: '简洁现代',
    tagTone: 'modern',
    desc: '全宽顶栏导航，内容视野更开阔。',
    preview: 'top'
  },
  {
    type: MenuTypeEnum.TOP_LEFT,
    name: '混合布局',
    tag: '灵活高效',
    tagTone: 'hybrid',
    desc: '图标侧轨 + 顶栏，平衡功能与空间。',
    preview: 'hybrid'
  }
] as const
</script>

<template>
  <div class="layout-picker">
    <p class="title">灵动布局</p>
    <p class="subtitle">One product. Multiple experiences.</p>

    <button
      v-for="item in layouts"
      :key="item.type"
      type="button"
      class="layout-card"
      :class="{ 'is-active': menuType === item.type }"
      @click="emit('select', item.type)"
    >
      <div class="preview" :data-preview="item.preview" aria-hidden="true">
        <!-- classic: sidebar + header + content -->
        <template v-if="item.preview === 'classic'">
          <div class="pv-side">
            <i /><i /><i /><i />
            <span class="pv-card" />
          </div>
          <div class="pv-main">
            <div class="pv-head" />
            <div class="pv-grid">
              <span /><span /><span /><span />
            </div>
            <div class="pv-block" />
          </div>
        </template>

        <!-- top: header menu + full content -->
        <template v-else-if="item.preview === 'top'">
          <div class="pv-topbar">
            <b /><i /><i /><i /><i />
          </div>
          <div class="pv-main full">
            <div class="pv-hero" />
            <div class="pv-grid">
              <span /><span /><span /><span />
            </div>
          </div>
        </template>

        <!-- hybrid: slim icon rail + header -->
        <template v-else>
          <div class="pv-rail">
            <i /><i /><i /><i /><i />
          </div>
          <div class="pv-main">
            <div class="pv-head wide" />
            <div class="pv-grid">
              <span /><span /><span />
            </div>
            <div class="pv-block" />
          </div>
        </template>
      </div>

      <div class="meta">
        <div class="meta-row">
          <strong>{{ item.name }}</strong>
          <span class="tag" :data-tone="item.tagTone">{{ item.tag }}</span>
        </div>
        <p>{{ item.desc }}</p>
      </div>
    </button>
  </div>
</template>

<style scoped>
.layout-picker {
  padding-bottom: 8px;
  margin-top: 24px;
}

.title {
  position: relative;
  margin: 0;
  font-size: 14px;
  color: var(--text-tertiary);
  text-align: center;

  &::before,
  &::after {
    position: absolute;
    top: 10px;
    width: 40px;
    content: '';
    border-bottom: 1px solid var(--border-default);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}

.subtitle {
  margin: 8px 0 16px;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--text-placeholder);
  text-align: center;
  text-transform: uppercase;
}

.layout-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  text-align: left;
  cursor: pointer;
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xs);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;
}

.layout-card:hover {
  border-color: var(--border-default);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.layout-card.is-active {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-primary) 35%, transparent);
}

.preview {
  display: flex;
  height: 72px;
  overflow: hidden;
  background: var(--fill-primary-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.pv-side {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 28px;
  padding: 6px 5px;
  background: var(--border-default);

  i {
    display: block;
    height: 3px;
    background: var(--bg-surface);
    border-radius: 1px;
    opacity: 0.85;
  }

  .pv-card {
    flex: 1;
    margin-top: 4px;
    background: color-mix(in srgb, var(--bg-surface) 70%, transparent);
    border-radius: 3px;
  }
}

.pv-rail {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  width: 14px;
  padding: 8px 0;
  background: #1f2430;

  i {
    display: block;
    width: 6px;
    height: 6px;
    background: rgb(255 255 255 / 55%);
    border-radius: 50%;
  }
}

.pv-topbar {
  display: flex;
  gap: 4px;
  align-items: center;
  width: 100%;
  height: 14px;
  padding: 0 6px;
  background: var(--border-default);

  b {
    width: 10px;
    height: 6px;
    background: var(--bg-surface);
    border-radius: 1px;
  }

  i {
    width: 8px;
    height: 3px;
    background: rgb(255 255 255 / 55%);
    border-radius: 1px;
  }
}

.preview[data-preview='top'] {
  flex-direction: column;
}

.pv-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
}

.pv-main.full {
  min-height: 0;
}

.pv-head {
  height: 8px;
  background: var(--fill-secondary);
  border-radius: 2px;
}

.pv-head.wide {
  height: 10px;
}

.pv-hero {
  height: 18px;
  background: color-mix(in srgb, var(--color-primary) 18%, var(--fill-secondary));
  border-radius: 3px;
}

.pv-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;

  span {
    height: 12px;
    background: var(--fill-secondary);
    border-radius: 2px;
  }
}

.preview[data-preview='hybrid'] .pv-grid {
  grid-template-columns: repeat(3, 1fr);
}

.pv-block {
  flex: 1;
  background: var(--fill-secondary);
  border-radius: 2px;
}

.meta-row {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}

.meta strong {
  font-size: 13px;
  font-weight: 650;
  color: var(--text-primary);
}

.meta p {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--text-tertiary);
}

.tag {
  flex-shrink: 0;
  padding: 2px 7px;
  font-size: 10px;
  font-weight: 600;
  border-radius: var(--radius-full);
}

.tag[data-tone='recommend'] {
  color: #2f7a3e;
  background: color-mix(in srgb, #7ac943 20%, transparent);
}

.tag[data-tone='modern'] {
  color: #3d6fd8;
  background: color-mix(in srgb, #5b8def 18%, transparent);
}

.tag[data-tone='hybrid'] {
  color: #6b5bd6;
  background: color-mix(in srgb, #8b7cf6 18%, transparent);
}

html.dark .tag[data-tone='recommend'] {
  color: #9be0a5;
}

html.dark .tag[data-tone='modern'] {
  color: #9bb6f5;
}

html.dark .tag[data-tone='hybrid'] {
  color: #c4b8ff;
}
</style>
