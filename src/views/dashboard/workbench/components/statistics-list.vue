<script setup lang="ts">
import { reactive } from 'vue'
import { CountTo } from 'vue3-count-to'
import SvgRender from '@/components/SvgRender/index.vue'

const dataList = reactive([
  {
    des: '总访问次数',
    icon: 'visits',
    startVal: 0,
    duration: 1000,
    num: 9120,
    change: '+20%'
  },
  {
    des: '在线访客数',
    icon: 'user',
    startVal: 0,
    duration: 1000,
    num: 182,
    change: '+10%'
  },
  {
    des: '点击量',
    icon: 'click',
    startVal: 0,
    duration: 1000,
    num: 9520,
    change: '-12%'
  },
  {
    des: '新用户',
    icon: 'new',
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
                <SvgRender :name="item.icon"></SvgRender>
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
        padding: 15px;
        background-color: #effbff;
        border-radius: 15px;
      }
    }
  }
}
</style>
