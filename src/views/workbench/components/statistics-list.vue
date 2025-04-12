<script setup lang="ts">
import { reactive } from 'vue'
import { CountTo } from 'vue3-count-to'

const dataList = reactive([
  {
    des: '总消息数',
    icon: '#icon-message',
    startVal: 0,
    duration: 1000,
    num: 9120,
    change: '+20%'
  },
  {
    des: '在线消费者数',
    icon: '#icon-icon_consumer',
    startVal: 0,
    duration: 1000,
    num: 182,
    change: '+10%'
  },
  {
    des: '消息吞吐量',
    icon: '#icon-Throughputcopy',
    startVal: 0,
    duration: 1000,
    num: 9520,
    change: '-12%'
  },
  {
    des: '新生产者',
    icon: '#icon-produce_rate',
    startVal: 0,
    duration: 1000,
    num: 156,
    change: '+30%'
  }
])
</script>

<template>
  <el-row :gutter="10">
    <template v-for="item in dataList" :key="item.des">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-top: 10px">
        <el-card class="card" shadow="never">
          <div class="item-content">
            <div class="content__left">
              <div class="title">{{ item.des }}</div>
              <CountTo class="number" :end-val="item.num" :duration="1000" separator=""></CountTo>
              <div class="change">
                <span>较上周</span>
                <span
                  class="change__trend"
                  :class="{
                    'text-danger': item.change.includes('-'),
                    'text-success': item.change.includes('+')
                  }"
                  >{{ item.change }}</span
                >
              </div>
            </div>
            <div class="content__right">
              <div class="icon-wrapper">
                <svg class="icon" aria-hidden="true">
                  <use :href="item.icon"></use>
                </svg>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<style scoped lang="scss">
.card {
  .item-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .content__left {
      .title {
        color: #78829d;
        font-size: 12px;
      }

      .number {
        font-size: 35px;
        font-weight: 200;
      }

      .change {
        color: #78829d;
        font-size: 12px;
        display: flex;
        gap: 2px;

        .change__trend {
          &.text-danger {
            color: #f56c6c;
          }

          &.text-success {
            color: #67c23a;
          }
        }
      }
    }

    .content__right {
      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #effbff;
        padding: 10px;
        border-radius: 4px;
      }
    }
  }
}
</style>
