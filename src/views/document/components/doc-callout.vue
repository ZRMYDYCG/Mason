<script setup lang="ts">
defineProps<{
  title: string
  tone?: 'success' | 'info' | 'warning'
}>()
</script>

<template>
  <div class="doc-callout" :data-tone="tone || 'info'">
    <div class="callout-mark">✦</div>
    <div>
      <strong>{{ title }}</strong>
      <p><slot /></p>
    </div>
  </div>
</template>

<style scoped>
.doc-callout {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  gap: 14px;
  padding: 16px;
  margin: 18px 0 28px;
  background: var(--fill-primary-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.callout-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  color: var(--text-secondary);
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.doc-callout strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--text-primary);
}

.doc-callout p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.doc-callout[data-tone='success'] {
  background: color-mix(in srgb, var(--color-success) 9%, transparent);
  border-color: color-mix(in srgb, var(--color-success) 24%, transparent);
}

.doc-callout[data-tone='success'] .callout-mark {
  color: var(--color-success-text);
}

.doc-callout[data-tone='warning'] {
  background: var(--color-warning-bg-muted);
  border-color: var(--color-warning-border);
}

.doc-callout[data-tone='warning'] .callout-mark {
  color: var(--color-warning-text);
}
</style>
