<script setup lang="ts">
import { rightBottom } from '@/api/modules/visualization.ts'
import SeamlessScroll from './seamless-scroll'
import { computed, onMounted, reactive } from 'vue'
import { useViewStore } from '@/store/modules/view.ts'
import { storeToRefs } from 'pinia'
import EmptyCom from './empty-com'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const viewStore = useViewStore()
const { defaultOption, indexConfig } = storeToRefs(viewStore)
const { t } = useI18n({ useScope: 'global' })
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 252,
    limitScrollNum: 3
    // step:3
  },
  scroll: true
})

const getData = () => {
  rightBottom({ limitNum: 20 })
    .then((res: any) => {
      console.log('右下', res)
      if (res.success) {
        state.list = res.data.list
      } else {
        ElMessage({
          message: res.msg,
          type: 'warning'
        })
      }
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}

const comName = computed(() => {
  if (indexConfig.value.rightBottomSwiper) {
    return SeamlessScroll
  } else {
    return EmptyCom
  }
})
function montionFilter(val: any) {
  // console.log(val);
  return val ? Number(val).toFixed(2) : '--'
}
const handleAddress = (item: any) => {
  return `${item.provinceName}/${item.cityName}/${item.countyName}`
}
onMounted(() => {
  getData()
})
</script>

<template>
  <div
    class="right_bottom_wrap beautify-scroll-def"
    :class="{ 'overflow-y-auto': !indexConfig.rightBottomSwiper }"
  >
    <component
      :is="comName"
      :list="state.list"
      v-model="state.scroll"
      :single-height="state.defaultOption.singleHeight"
      :step="state.defaultOption.step"
      :limit-scroll-num="state.defaultOption.limitScrollNum"
      :hover="state.defaultOption.hover"
      :single-wait-time="state.defaultOption.singleWaitTime"
      :wheel="state.defaultOption.wheel"
    >
      <ul class="right_bottom">
        <li class="right_center_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">{{ t('visualization.label.nodeId') }}：</span>
                <span class="text-content zhuyao"> {{ item.gatewayno }}</span>
              </div>
              <div class="info">
                <span class="labels">{{ t('visualization.label.model') }}：</span>
                <span class="text-content"> {{ item.terminalno }}</span>
              </div>
              <div class="info">
                <span class="labels">{{ t('visualization.label.metricValue') }}：</span>
                <span class="text-content warning"> {{ montionFilter(item.alertvalue) }}</span>
              </div>
            </div>

            <div class="flex">
              <div class="info">
                <span class="labels shrink-0"> {{ t('visualization.label.address') }}：</span>
                <span
                  class="ciyao truncate"
                  style=" width: 220px;font-size: 12px"
                  :title="handleAddress(item)"
                >
                  {{ handleAddress(item) }}</span
                >
              </div>
              <div class="info time shrink-0">
                <span class="labels">{{ t('visualization.label.time') }}：</span>
                <span class="text-content" style="font-size: 12px"> {{ item.createtime }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="info">
                <span class="labels">{{ t('visualization.label.description') }}：</span>
                <span class="text-content ciyao" :class="{ warning: item.alertdetail }">
                  {{ item.alertdetail || t('visualization.label.empty') }}</span
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
</template>

<style scoped>
.right_bottom {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #ffffff;

    .orderNum {
      margin: 0 20px 0 -20px;
    }

    .inner_right {
      position: relative;
      flex-shrink: 0;
      width: 400px;
      height: 100%;
      line-height: 1.5;

      .dibu {
        position: absolute;
        bottom: -12px;
        left: -2%;
        width: 104%;
        height: 2px;
        background-image: url('@/assets/img/zuo_xuxian.png');
        background-size: cover;
      }
    }

    .info {
      display: flex;
      align-items: center;
      margin-right: 10px;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgb(255 255 255 / 60%);
      }

      .zhuyao {
        font-size: 15px;
        color: var(--primary-color);
      }

      .ciyao {
        color: rgb(255 255 255 / 80%);
      }

      .warning {
        font-size: 15px;
        color: #e6a23c;
      }
    }
  }
}

.right_bottom_wrap {
  width: 100%;
  height: 252px;
  overflow: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
