<script setup lang="ts">
import Header from './components/header.vue'
import Content from './components/content/index.vue'
import Setting from './components/setting.vue'
import ScaleScreen from './components/scale-screen.vue'
import { useViewStore } from '@/store/modules/view.ts'
import { storeToRefs } from 'pinia'

const viewStore = useViewStore()
const { isScale } = storeToRefs(viewStore)
const wrapperStyle = {}
</script>

<template>
  <scale-screen
    width="1920"
    height="1080"
    :delay="500"
    :full-screen="false"
    :box-style="{
      background: '#03050C',
      overflow: isScale ? 'hidden' : 'auto'
    }"
    :wrapper-style="wrapperStyle"
    :auto-scale="isScale"
  >
    <div class="content_wrap">
      <Header />
      <Content />
    </div>
  </scale-screen>
  <Setting />
</template>

<style scoped lang="scss">
.content_wrap {
  width: 100%;
  height: 100%;
  padding: 16px 16px 16px 16px;
  box-sizing: border-box;
  background-image: url('../../assets/img/pageBg.png');
  background-size: cover;
  background-position: center center;
}
</style>
