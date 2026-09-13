<script setup lang="ts">
import 'vue-waterfall-plugin-next/dist/style.css'
import 'viewerjs/dist/viewer.css'
import { random, times } from 'lodash-es'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import { api as viewerApi } from 'v-viewer'
import { getRandomImg } from '@/utils'
import logo from '@/assets/images/logo.png'

const PAGE_SIZE = 10
const MAX_COUNT = 100
const LOAD_OFFSET = 200

type WaterfallItem = {
  id: string
  url: string
}

const loadMoreRef = ref<HTMLElement>()
const loading = ref(true)
const moreLoading = ref(false)

let loadObserver: IntersectionObserver | null = null
let scrollRoot: HTMLElement | null = null

const generateUniqueID = () => {
  const timestamp = Date.now().toString(36)
  const randomness = random(0, 999999).toString(36)
  return `${timestamp}-${randomness}`
}

const getList = (pageSize = PAGE_SIZE): WaterfallItem[] =>
  times(pageSize, () => ({
    id: generateUniqueID(),
    url: getRandomImg(1, 'waterfall') as string
  }))

const list = ref<WaterfallItem[]>(getList(20))
const hasMore = computed(() => list.value.length < MAX_COUNT)
const previewImages = computed(() => list.value.map((item) => item.url))

const options = reactive({
  rowKey: 'id',
  // 仅作超大屏未命中 breakpoints 时的兜底；正常由 rowPerView 均分容器宽度
  width: 240,
  breakpoints: {
    // 插件规则：wrapperWidth <= key 时生效；需覆盖超宽屏，否则会回退固定 width 并两侧留白
    5000: { rowPerView: 6 },
    1600: { rowPerView: 5 },
    1200: { rowPerView: 4 },
    800: { rowPerView: 3 },
    500: { rowPerView: 2 }
  },
  gutter: 12,
  hasAroundGutter: false,
  posDuration: 600,
  animationPrefix: 'animate__animated',
  animationEffect: 'fadeIn',
  animationDuration: 1000,
  animationDelay: 300,
  animationCancel: false,
  backgroundColor: 'transparent',
  loadProps: {
    loading: logo,
    error: logo,
    ratioCalculator: () => {
      const minRatio = random(3, 4, true)
      const maxRatio = random(3, 4, true)
      return minRatio / maxRatio
    }
  },
  lazyload: true,
  crossOrigin: true,
  delay: 300,
  align: 'left'
})

const getScrollRoot = () =>
  (document.querySelector('.el-main') as HTMLElement | null) ||
  (document.scrollingElement as HTMLElement | null)

const handleLoadMore = async () => {
  if (loading.value || moreLoading.value || !hasMore.value) return

  moreLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 400))
  const remain = MAX_COUNT - list.value.length
  list.value.push(...getList(Math.min(PAGE_SIZE, remain)))
  moreLoading.value = false
  await nextTick()
  checkReachBottom()
}

const checkReachBottom = () => {
  const scroller = scrollRoot || getScrollRoot()
  if (!scroller || loading.value || moreLoading.value || !hasMore.value) return

  const remain = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight
  if (scroller.scrollHeight <= scroller.clientHeight + LOAD_OFFSET || remain <= LOAD_OFFSET) {
    handleLoadMore()
  }
}

const onScroll = () => {
  checkReachBottom()
}

const openPreview = (index: number) => {
  viewerApi({
    images: previewImages.value,
    options: {
      initialViewIndex: index,
      navbar: true,
      toolbar: true,
      title: false,
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: true
    }
  })
}

const setupLoadObserver = async () => {
  await nextTick()
  const sentinel = loadMoreRef.value
  if (!sentinel) return

  scrollRoot = getScrollRoot()
  loadObserver?.disconnect()
  loadObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        handleLoadMore()
      }
    },
    {
      root: scrollRoot,
      rootMargin: `${LOAD_OFFSET}px 0px`,
      threshold: 0
    }
  )
  loadObserver.observe(sentinel)
  checkReachBottom()
}

const afterRender = async () => {
  loading.value = false
  await setupLoadObserver()
}

onMounted(() => {
  scrollRoot = getScrollRoot()
  scrollRoot?.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  scrollRoot?.removeEventListener('scroll', onScroll)
  loadObserver?.disconnect()
  loadObserver = null
  scrollRoot = null
})
</script>

<template>
  <div class="waterfall-page" v-loading="loading">
    <Waterfall :list="list" v-bind="options" @after-render="afterRender">
      <template #default="{ item, index }">
        <button class="waterfall-item" type="button" @click="openPreview(index)">
          <LazyImg :url="item.url" class="waterfall-item__img" />
        </button>
      </template>
    </Waterfall>

    <div ref="loadMoreRef" class="load-more-sentinel">
      <p v-if="moreLoading" class="load-more-text">加载中...</p>
      <p v-else-if="!loading && !hasMore" class="load-more-text">没有更多了</p>
      <p v-else-if="!loading" class="load-more-text">下滑加载更多</p>
    </div>
  </div>
</template>

<style scoped>
.waterfall-page {
  /* 抵消 el-main 默认 padding 后，保留一点内边距 */
  min-height: 100%;
  padding: 10px;
  margin: -10px;
}

.waterfall-item {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  cursor: zoom-in;
  background: transparent;
  border: 0;
  border-radius: var(--radius-sm, 8px);
}

.waterfall-item__img {
  display: block;
  width: 100%;
  transition: transform 0.3s ease;
}

.waterfall-item:hover .waterfall-item__img {
  transform: scale(1.02);
}

.load-more-sentinel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  padding: 20px 0 28px;
}

.load-more-text {
  margin: 0;
  font-size: 13px;
  color: var(--text-tertiary, #9ca3af);
}

.lazy__img[lazy='loading'] {
  opacity: 0;
  transition: opacity 2s;
}

.lazy__img[lazy='loaded'],
.lazy__img[lazy='error'] {
  opacity: 1;
}
</style>
