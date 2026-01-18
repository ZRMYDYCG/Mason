<script setup lang="ts">
import { computed, reactive } from 'vue'
import dayjs from 'dayjs'
import { useViewStore } from '@/store/modules/view.ts'
import { useI18n } from 'vue-i18n'

const dateData = reactive<{
  dateDay: any
  dateYear: any
  dateWeek: any
  timing: any
}>({
  dateDay: '',
  dateYear: '',
  dateWeek: '',
  timing: null
})

const { setSettingShow } = useViewStore()
const { t, locale } = useI18n({ useScope: 'global' })

const weekday = computed(() => {
  return [
    t('visualization.weekday.sun'),
    t('visualization.weekday.mon'),
    t('visualization.weekday.tue'),
    t('visualization.weekday.wed'),
    t('visualization.weekday.thu'),
    t('visualization.weekday.fri'),
    t('visualization.weekday.sat')
  ]
})

const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateYear = dayjs().format('YYYY-MM-DD')
    dateData.dateDay = dayjs().format('HH : mm : ss')
    dateData.dateWeek = weekday.value[dayjs().day()]
  }, 1000)
}
timeFn()
</script>

<template>
  <div class="d-flex jc-center title_wrap">
    <div class="zuojuxing"></div>
    <div class="youjuxing"></div>
    <div class="guang"></div>
    <div class="d-flex jc-center">
      <div class="title">
        <span class="title-text">{{ t('visualization.headerTitle') }}</span>
      </div>
    </div>
    <div class="timers">
      {{ dateData.dateYear }} {{ dateData.dateWeek }} {{ dateData.dateDay }}

      <div class="setting_icon" @click="setSettingShow(true)">
        <img src="@/assets/img/headers/setting.png" :alt="t('visualization.setting.title')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title_wrap {
  height: 60px;
  background-image: url('../../../assets/img/top.png');
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;

  .guang {
    position: absolute;
    bottom: -26px;
    background-image: url('../../../assets/img/guang.png');
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }

  .zuojuxing,
  .youjuxing {
    position: absolute;
    top: -2px;
    width: 140px;
    height: 6px;
    background-image: url('../../../assets/img/headers/juxing1.png');
  }

  .zuojuxing {
    left: 11%;
  }

  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }

  .timers {
    position: absolute;
    right: 0;
    top: 30px;
    font-size: 18px;
    display: flex;
    align-items: center;

    .setting_icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-left: 12px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.title {
  position: relative;
  // width: 500px;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 60px;
  line-height: 46px;

  .title-text {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 6px;
    width: 100%;
    background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
