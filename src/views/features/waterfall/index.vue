<script setup lang="ts">
import 'vue-waterfall-plugin-next/dist/style.css'
import { random, times } from 'lodash-es'
import { reactive, ref, onMounted } from 'vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import { getRandomImg } from '@/utils'
import logo from '@/assets/images/logo.svg'

const waterFallRef = ref<HTMLElement>()
const isMounted = ref(false)
const loading = ref(true)
const moreLoading = ref(false)

onMounted(() => {
  isMounted.value = true
})

const generateUniqueID = () => {
  const timestamp = Date.now().toString(36)
  const randomness = random(0, 999999).toString(36)
  return `${timestamp}-${randomness}`
}

const getList = (pageSize = 10) =>
  times(pageSize, () => ({
    id: generateUniqueID(),
    url: getRandomImg(1, 'waterfall') as string
  }))

const list = ref(getList(20))

const options = reactive({
  rowKey: 'id',
  width: 310,
  breakpoints: {
    1200: {
      rowPerView: 4
    },
    800: {
      rowPerView: 3
    },
    500: {
      rowPerView: 2
    }
  },
  gutter: 15,
  hasAroundGutter: true,
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
    ratioCalculator: (width: number, height: number) => {
      const minRatio = random(3, 4, true)
      const maxRatio = random(3, 4, true)
      return minRatio / maxRatio
    }
  },
  lazyload: true,
  crossOrigin: true,
  delay: 300,
  align: 'center'
})

const afterRender = () => {
  loading.value = false
}

const handleLoadMore = () => {
  moreLoading.value = true
  setTimeout(() => {
    list.value.push(...getList())
    moreLoading.value = false
  }, 1000)
}
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden p-4">
    <div
      ref="waterFallRef"
      class="waterfall-scroller flex-auto overflow-y-auto"
      v-loading="loading"
    >
      <Waterfall :list="list" v-bind="options" @after-render="afterRender">
        <template #default="{ item }">
          <LazyImg :url="item.url" class="w-full block" />
        </template>
      </Waterfall>

      <div v-if="!loading" class="flex justify-center mt-4 pb-4">
        <el-button
          v-if="list.length < 100"
          type="primary"
          :loading="moreLoading"
          @click="handleLoadMore"
        >
          加载更多
        </el-button>
        <p v-else class="text-gray-400">没有更多了</p>
      </div>
      <el-backtop v-if="isMounted" target=".waterfall-scroller" :right="40" :bottom="40" />
    </div>
  </div>
</template>

<style scoped>
.card-container {
  .lazy__img[lazy='loading'] {
    opacity: 0;
    transition: opacity 2s;
  }

  .lazy__img[lazy='loaded'] {
    opacity: 1;
  }

  .lazy__img[lazy='error'] {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
