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
  position: relative;
  height: 60px;
  margin-bottom: 4px;
  background-image: url('../../../assets/img/top.png');
  background-position: center center;
  background-size: cover;

  .guang {
    position: absolute;
    bottom: -26px;
    width: 100%;
    height: 56px;
    background-image: url('../../../assets/img/guang.png');
    background-position: 80px center;
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
    top: 30px;
    right: 0;
    display: flex;
    align-items: center;
    font-size: 18px;

    .setting_icon {
      width: 20px;
      height: 20px;
      margin-left: 12px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.title {
  position: relative;
  height: 60px;
  line-height: 46px;
  color: transparent;
  text-align: center;
  background-size: cover;

  .title-text {
    width: 100%;
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 6px;
    background: linear-gradient(92deg, #0072ff 0%, #00eaff 48%, #01aaff 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
