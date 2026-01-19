<script setup lang="ts">
import { leftBottom } from '@/api/modules/visualization.ts'
import SeamlessScroll from './seamless-scroll.vue'
import { computed, onMounted, reactive } from 'vue'
import { useViewStore } from '@/store/modules/view.ts'
import { storeToRefs } from 'pinia'
import EmptyCom from './empty-com.vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const viewStore = useViewStore()
const { defaultOption, indexConfig } = storeToRefs(viewStore)
const { t } = useI18n({ useScope: 'global' })
const state = reactive<any>({
  list: [] as any[],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 256,
    limitScrollNum: 4
  },
  scroll: true
})

const getData = () => {
  leftBottom({ limitNum: 20 })
    .then((res: any) => {
      console.log('左下--设备提醒', res)
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
const addressHandle = (item: any) => {
  let name = item.provinceName
  if (item.cityName) {
    name += '/' + item.cityName
    if (item.countyName) {
      name += '/' + item.countyName
    }
  }
  return name
}
const comName = computed(() => {
  if (indexConfig.value.leftBottomSwiper) {
    return SeamlessScroll
  } else {
    return EmptyCom
  }
})
onMounted(() => {
  getData()
})
</script>

<template>
  <div
    class="left_boottom_wrap beautify-scroll-def"
    :class="{ 'overflow-y-auto': !indexConfig.leftBottomSwiper }"
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
      <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum doudong">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">{{ t('visualization.label.nodeId') }}：</span>
                <span class="text-content zhuyao doudong wangguan"> {{ item.gatewayno }}</span>
              </div>
              <div class="info">
                <span class="labels">{{ t('visualization.label.time') }}：</span>
                <span class="text-content" style="font-size: 12px"> {{ item.createTime }}</span>
              </div>
            </div>

            <span
              class="types doudong"
              :class="{
                typeRed: item.onlineState == 0,
                typeGreen: item.onlineState == 1
              }"
              >{{
                item.onlineState == 1
                  ? t('visualization.status.online')
                  : t('visualization.status.offline')
              }}</span
            >

            <div class="info addresswrap">
              <span class="labels">{{ t('visualization.label.region') }}：</span>
              <span class="text-content ciyao" style="font-size: 12px">
                {{ addressHandle(item) }}</span
              >
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
</template>

<style scoped>
.left_boottom_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.doudong {
  overflow: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;

  .left_boottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin: 10px 0;
    font-size: 14px;

    .orderNum {
      margin: 0 16px 0 -20px;
    }

    .info {
      display: flex;
      align-items: center;
      margin-right: 10px;
      color: #ffffff;

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

    .inner_right {
      position: relative;
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      width: 380px;
      height: 100%;
      line-height: 1;

      .dibu {
        position: absolute;
        bottom: -10px;
        left: -2%;
        width: 104%;
        height: 2px;
        background-image: url('@/assets/img/zuo_xuxian.png');
        background-size: cover;
      }

      .addresswrap {
        display: flex;
        width: 100%;
        margin-top: 8px;
      }
    }

    .wangguan {
      flex-shrink: 0;
      width: 80px;
      font-size: 15px;
      font-weight: 900;
      color: #1890ff;
    }

    .time {
      font-size: 12px;
      color: #ffffff;
    }

    .address {
      font-size: 12px;
      cursor: pointer;
    }

    .types {
      flex-shrink: 0;
      width: 30px;
    }

    .typeRed {
      color: #fc1a1a;
    }

    .typeGreen {
      color: #29fc29;
    }
  }
}
</style>
