<script setup lang="ts">
import { HeaderChromeEnum } from '@/config'

defineProps<{
  headerChrome: HeaderChromeEnum
}>()

const emit = defineEmits<{
  (e: 'select', chrome: HeaderChromeEnum): void
}>()

const options = [
  {
    type: HeaderChromeEnum.ATMOSPHERE,
    name: '氛围顶栏',
    tag: '推荐',
    tagTone: 'recommend',
    desc: '氛围图仅用于经典侧栏；顶部/混合保持清晰可读顶栏。',
    preview: 'atmosphere'
  },
  {
    type: HeaderChromeEnum.SOFT,
    name: '现代柔和',
    tag: '紧凑',
    tagTone: 'modern',
    desc: '更密的顶栏节奏，柔和 pill 材质，适合高效操作。',
    preview: 'soft'
  }
] as const
</script>

<template>
  <div class="chrome-picker">
    <p class="title">顶栏气质</p>
    <p class="subtitle">Atmosphere or soft focus.</p>

    <button
      v-for="item in options"
      :key="item.type"
      type="button"
      class="chrome-card"
      :class="{ 'is-active': headerChrome === item.type }"
      @click="emit('select', item.type)"
    >
      <div class="preview" :data-preview="item.preview" aria-hidden="true">
        <template v-if="item.preview === 'atmosphere'">
          <div class="pv-bar">
            <span class="pv-search" />
            <i /><i /><i />
            <b />
          </div>
          <div class="pv-tabs">
            <em class="is-on" /><em /><em />
          </div>
          <div class="pv-photo" />
        </template>
        <template v-else>
          <div class="pv-bar soft">
            <em class="is-on" /><em /><em />
            <span class="pv-search soft" />
            <i /><i /><b />
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
.chrome-picker {
  margin-top: 28px;
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
    width: 50px;
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
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: center;
  opacity: 0.85;
}

.chrome-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  text-align: left;
  cursor: pointer;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.chrome-card:hover {
  border-color: rgba(var(--color-primary-rgb), 0.35);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.chrome-card.is-active {
  border-color: rgba(var(--color-primary-rgb), 0.55);
  box-shadow: 0 0 0 1px rgba(var(--color-primary-rgb), 0.2), var(--shadow-sm);
}

.preview {
  position: relative;
  height: 72px;
  overflow: hidden;
  background: #f7f5f1;
  border-radius: 10px;
}

.pv-bar {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 6px;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  margin: 10px 10px 0;
  background: rgb(255 255 255 / 72%);
  border-radius: 8px;
}

.pv-bar.soft {
  margin-top: 22px;
  background: rgb(255 255 255 / 88%);
}

.pv-search {
  flex: 1;
  height: 12px;
  background: rgb(255 255 255 / 95%);
  border: 1px solid rgb(28 25 23 / 6%);
  border-radius: 999px;
}

.pv-search.soft {
  flex: 0 0 54px;
  background: rgb(28 25 23 / 5%);
  border: none;
}

.pv-bar i,
.pv-bar b {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  background: rgb(28 25 23 / 18%);
  border-radius: 50%;
}

.pv-bar b {
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, #d6c3a5, #b89a72);
}

.pv-tabs {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 6px;
  padding: 8px 12px 0;
}

.pv-tabs em,
.pv-bar em {
  display: block;
  width: 28px;
  height: 10px;
  background: rgb(28 25 23 / 10%);
  border-radius: 999px;
}

.pv-tabs em.is-on,
.pv-bar em.is-on {
  width: 36px;
  background: rgba(var(--color-primary-rgb), 0.35);
}

.pv-photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 42%;
  background:
    linear-gradient(135deg, transparent 30%, rgb(255 255 255 / 35%)),
    linear-gradient(180deg, #e8e2d8 0%, #cfc5b6 55%, #9aa38a 100%);
  mask-image: linear-gradient(90deg, transparent, #000000 40%);
}

.meta-row {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}

.meta strong {
  font-size: 14px;
  color: var(--text-primary);
}

.meta p {
  margin: 6px 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-secondary);
}

.tag {
  padding: 2px 8px;
  font-size: 11px;
  border-radius: 999px;
}

.tag[data-tone='recommend'] {
  color: #8a5a16;
  background: #f4e6cf;
}

.tag[data-tone='modern'] {
  color: #355a45;
  background: #dfece4;
}

html.dark .preview {
  background: #161616;
}

html.dark .pv-bar {
  background: rgb(255 255 255 / 8%);
}

html.dark .pv-search {
  background: rgb(255 255 255 / 10%);
  border-color: rgb(255 255 255 / 8%);
}
</style>
