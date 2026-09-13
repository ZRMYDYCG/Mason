<script setup lang="ts">
import { computed, ref } from 'vue'
import Lottie from '@/components/Lottie/index.vue'
import DocExample from '../../components/doc-example.vue'

const animRef = ref<any>(null)
const isPlaying = ref(true)
const speed = ref(1)
const renderer = ref<'svg' | 'canvas' | 'html'>('svg')

const demoAnimationData = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  layers: [
    {
      ty: 4,
      nm: 'circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: 'el',
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [80, 80] }
        },
        {
          ty: 'st',
          c: { a: 0, k: [0.4, 0.6, 0.9, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 4 }
        }
      ]
    }
  ]
}

const handleAnimation = (anim: any) => {
  animRef.value = anim
  anim.setSpeed(speed.value)
  if (!isPlaying.value) anim.stop()
}

const togglePlay = () => {
  if (!animRef.value) return
  if (isPlaying.value) {
    animRef.value.stop()
  } else {
    animRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const setSpeed = (val: number) => {
  speed.value = val
  animRef.value?.setSpeed(val)
}

const setRenderer = (val: 'svg' | 'canvas' | 'html') => {
  renderer.value = val
  isPlaying.value = true
}

const rendererModes = ['svg', 'canvas', 'html'] as const

const basicCode = computed(
  () => `<script setup>
import { ref } from 'vue'
import Lottie from '@/components/Lottie/index.vue'
import animationData from './loading.json'

const anim = ref(null)

const onReady = (instance) => {
  anim.value = instance
}
<\/script>

<template>
  <Lottie
    :animation-data="animationData"
    renderer="${renderer.value}"
    :loop="true"
    :autoplay="true"
    @get-animation="onReady"
  />
</template>`
)

const controlCode = computed(
  () => `const anim = ref(null)
const isPlaying = ref(${isPlaying.value})
const speed = ref(${speed.value})

const onReady = (instance) => {
  anim.value = instance
}

const togglePlay = () => {
  if (isPlaying.value) anim.value.stop()
  else anim.value.play()
  isPlaying.value = !isPlaying.value
}

const setSpeed = (val) => {
  speed.value = val
  anim.value?.setSpeed(val)
}`
)
</script>

<template>
  <div class="demo-stack">
    <DocExample title="基础用法" :code="basicCode">
      <template #description>
        传入 Lottie / Bodymovin JSON（<code>animationData</code>），挂载后自动播放。
        通过 <code>@get-animation</code> 拿到完整动画实例。下方可切换渲染器，预览与代码会同步。
      </template>
      <div class="renderer-tabs">
        <button
          v-for="mode in rendererModes"
          :key="mode"
          type="button"
          class="tab-btn"
          :class="{ active: renderer === mode }"
          @click="setRenderer(mode)"
        >
          {{ mode }}
        </button>
      </div>
      <div class="demo-animation-box">
        <Lottie
          :key="renderer"
          :animation-data="demoAnimationData"
          :loop="true"
          :autoplay="true"
          :renderer="renderer"
          @get-animation="handleAnimation"
        />
      </div>
    </DocExample>

    <DocExample title="播放控制" :code="controlCode">
      <template #description>
        拿到实例后可调用 <code>play()</code> / <code>stop()</code> / <code>setSpeed()</code> 等方法。
        当前速度：<code>{{ speed }}x</code>，状态：<code>{{ isPlaying ? 'playing' : 'stopped' }}</code>。
      </template>
      <div class="demo-controls">
        <button type="button" class="demo-btn" @click="togglePlay">
          {{ isPlaying ? '暂停' : '播放' }}
        </button>
        <button
          type="button"
          class="demo-btn"
          :class="{ active: speed === 0.5 }"
          @click="setSpeed(0.5)"
        >
          0.5x
        </button>
        <button
          type="button"
          class="demo-btn"
          :class="{ active: speed === 1 }"
          @click="setSpeed(1)"
        >
          1x
        </button>
        <button
          type="button"
          class="demo-btn"
          :class="{ active: speed === 2 }"
          @click="setSpeed(2)"
        >
          2x
        </button>
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

.renderer-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
}

.tab-btn {
  height: 30px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  background: var(--fill-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.tab-btn.active {
  color: #ffffff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.demo-animation-box {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.demo-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  background: var(--fill-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.demo-btn:hover,
.demo-btn.active {
  color: #ffffff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
