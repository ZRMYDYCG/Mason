<template>
  <div class="lottie" ref="dom"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import lottie from 'lottie-web'

type Segment = [number, number]

interface LottieEvent {
  play: () => void
  stop: () => void
  setSpeed: (speed: number) => void
  setDirection: (direction: 1 | -1) => void
  goToAndStop: (value: number, isFrame?: boolean) => void
  goToAndPlay: (value: number, isFrame?: boolean) => void
  playSegments: (segments: Segment | Segment[], forceFlag?: boolean) => void
  destroy: () => void
  getDuration: (inFrames: boolean) => void
  [propname: string]: any
}

const props = withDefaults(
  defineProps<{
    renderer?: 'svg' | 'canvas' | 'html'
    loop?: boolean
    autoplay?: boolean
    animationData: any
  }>(),
  {
    renderer: 'svg',
    loop: true,
    autoplay: true
  }
)

// 创建 lottie接收变量 和 获取dom
const animation = ref<LottieEvent>()
const dom = ref<Element>()

// 创建事件返回初始化lottie对象
const emits = defineEmits<{
  (e: 'getAnimation', value: LottieEvent): void
  (e: 'getDom', value: Element): void
}>()

// 初始化渲染 lottie动画，并返回 lottie对象
onMounted(() => {
  animation.value = lottie.loadAnimation({
    container: dom.value as Element, // 绑定dom节点
    renderer: props.renderer, // 渲染方式:svg、canvas、html
    loop: props.loop, // 是否循环播放，默认：false
    autoplay: props.autoplay, // 是否自动播放, 默认true
    animationData: props.animationData // AE动画使用bodymovie导出的json数据
  })
  emits('getAnimation', animation.value)
})
</script>

<style scoped>
.lottie {
  width: 100%;
  height: 100%;
}
</style>
