<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon/index.vue'

defineProps<{
  title: string
  code: string
}>()

const showCode = ref(true)
const copied = ref(false)

const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    // ignore clipboard failures in unsupported contexts
  }
}
</script>

<template>
  <section class="doc-example">
    <header class="doc-example__head">
      <h4>{{ title }}</h4>
      <div v-if="$slots.description" class="doc-example__desc">
        <slot name="description" />
      </div>
    </header>

    <div class="doc-example__preview">
      <slot />
    </div>

    <div class="doc-example__code-wrap">
      <div class="doc-example__toolbar">
        <button type="button" class="tool-btn" @click="showCode = !showCode">
          <AppIcon :name="showCode ? 'eye-off' : 'code-xml'" :size="14" />
          {{ showCode ? '隐藏代码' : '显示代码' }}
        </button>
        <button type="button" class="tool-btn" @click="copyCode(code)">
          <AppIcon :name="copied ? 'check' : 'copy'" :size="14" />
          {{ copied ? '已复制' : '复制' }}
        </button>
      </div>
      <pre v-show="showCode"><code>{{ code }}</code></pre>
    </div>
  </section>
</template>

<style scoped>
.doc-example {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
}

.doc-example__head {
  padding: 22px 22px 0;
}

.doc-example__head h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 650;
  color: var(--text-primary);
}

.doc-example__desc {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.75;
  color: var(--text-secondary);
}

.doc-example__desc :deep(code) {
  padding: 1px 5px;
  font-size: 12px;
  color: var(--color-primary-text);
  background: var(--color-primary-bg-muted);
  border-radius: 4px;
}

.doc-example__preview {
  padding: 20px 22px 22px;
}

.doc-example__code-wrap {
  background: #0f1317;
  border-top: 1px solid var(--border-subtle);
}

.doc-example__toolbar {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  padding: 8px 12px 0;
}

.tool-btn {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  font-size: 12px;
  color: #9aa7b5;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 6px;
}

.tool-btn:hover {
  color: #e8eef4;
  background: rgb(255 255 255 / 6%);
}

pre {
  padding: 8px 18px 18px;
  margin: 0;
  overflow-x: auto;
  font-size: 12.5px;
  line-height: 1.7;
  color: #dce6ee;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  white-space: pre;
}
</style>
