<script setup lang="ts">
import ItemWrap from './components/item-wrap.vue'
import LeftTop from './components/left-top.vue'
import LeftCenter from './components/left-center.vue'
import LeftBottom from './components/left-bottom.vue'
import CenterMap from './components/center-map.vue'
import CenterBottom from './components/center-bottom.vue'
import RightTop from './components/right-top.vue'
import RightCenter from './components/right-center.vue'
import RightBottom from './components/right-bottom.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="index-box">
    <div class="contetn_left">
      <!-- <div class="pagetab">
        <div class="item">实时监测</div>
        <div class="item">统计分析</div>
      </div> -->
      <ItemWrap
        class="contetn_left-top contetn_lr-item"
        :title="t('visualization.section.runtimeOverview')"
      >
        <LeftTop />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-center contetn_lr-item"
        :title="t('visualization.section.userProfile')"
      >
        <LeftCenter />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        :title="t('visualization.section.activityFeed')"
        style="padding: 0 10px 16px"
      >
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap class="contetn_center_top" :title="t('visualization.section.regionHeatmap')" />
      <ItemWrap class="contetn_center-bottom" :title="t('visualization.section.releaseProgress')">
        <CenterBottom />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        :title="t('visualization.section.alertTrend')"
      >
        <RightTop />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        :title="t('visualization.section.hotRank')"
        style="padding: 0 10px 16px"
      >
        <RightCenter />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        :title="t('visualization.section.eventList')"
      >
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<style scoped>
.index-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: calc(100% - 64px);
}

.contetn_left,
.contetn_right {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-around;
  width: 540px;
}

.contetn_center {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 54px;

  .contetn_center-bottom {
    height: 315px;
  }
}

.contetn_lr-item {
  height: 310px;
}
</style>
