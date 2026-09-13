<script setup lang="ts">
import { computed, ref } from 'vue'
import Watermark from '@/components/watermark/index.vue'
import DocExample from '../../components/doc-example.vue'

const visible = ref(true)
const content = ref('Mason • Admin')
const fontSize = ref(16)
const fontColor = ref('rgba(128, 128, 128, 0.2)')
const rotate = ref(-22)
const gapX = ref(100)
const gapY = ref(100)
const offsetX = ref(50)
const offsetY = ref(50)
const zIndex = ref(8)

const liveCode = computed(
  () => `<script setup>
import { ref } from 'vue'
import Watermark from '@/components/watermark/index.vue'

const visible = ref(${visible.value})
const content = ref('${content.value.replace(/'/g, "\\'")}')
const fontSize = ref(${fontSize.value})
const fontColor = ref('${fontColor.value}')
const rotate = ref(${rotate.value})
const gapX = ref(${gapX.value})
const gapY = ref(${gapY.value})
const offsetX = ref(${offsetX.value})
const offsetY = ref(${offsetY.value})
const zIndex = ref(${zIndex.value})
<\/script>

<template>
  <Watermark
    :visible="visible"
    :content="content"
    :font-size="fontSize"
    :font-color="fontColor"
    :rotate="rotate"
    :gap-x="gapX"
    :gap-y="gapY"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :z-index="zIndex"
  />
</template>`
)
</script>

<template>
  <div class="demo-stack">
    <Watermark
      :visible="visible"
      :content="content"
      :font-size="fontSize"
      :font-color="fontColor"
      :rotate="rotate"
      :gap-x="gapX"
      :gap-y="gapY"
      :offset-x="offsetX"
      :offset-y="offsetY"
      :z-index="zIndex"
    />

    <DocExample title="基础用法（实时同步）" :code="liveCode">
      <template #description>
        Watermark 以 <code>fixed</code> 全屏覆盖，<code>pointer-events: none</code> 不拦截点击。
        调整下方参数时，页面水印与代码示例会同步变化。
      </template>
      <div class="demo-controls">
        <label>
          显示水印
          <input v-model="visible" type="checkbox" />
        </label>
        <label>
          水印文字
          <input v-model="content" type="text" />
        </label>
        <label>
          字号 {{ fontSize }}px
          <input v-model.number="fontSize" type="range" min="12" max="32" />
        </label>
        <label>
          颜色
          <input v-model="fontColor" type="text" />
        </label>
        <label>
          旋转角度 {{ rotate }}°
          <input v-model.number="rotate" type="range" min="-90" max="90" />
        </label>
        <label>
          水平间距 {{ gapX }}px
          <input v-model.number="gapX" type="range" min="50" max="300" />
        </label>
        <label>
          垂直间距 {{ gapY }}px
          <input v-model.number="gapY" type="range" min="50" max="300" />
        </label>
        <label>
          水平偏移 {{ offsetX }}px
          <input v-model.number="offsetX" type="range" min="0" max="120" />
        </label>
        <label>
          垂直偏移 {{ offsetY }}px
          <input v-model.number="offsetY" type="range" min="0" max="120" />
        </label>
        <label>
          zIndex {{ zIndex }}
          <input v-model.number="zIndex" type="range" min="1" max="50" />
        </label>
      </div>
      <div class="preview-hint">
        当前页面已挂载真实 <code>Watermark</code> 组件。关闭「显示水印」可立即对照效果。
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

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.demo-controls label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.demo-controls input[type='text'] {
  min-width: 160px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}

.demo-controls input[type='range'] {
  min-width: 140px;
}

.preview-hint {
  margin-top: 14px;
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-tertiary);
}

.preview-hint code {
  padding: 1px 5px;
  color: var(--color-primary-text);
  background: var(--color-primary-bg-muted);
  border-radius: 4px;
}
</style>
