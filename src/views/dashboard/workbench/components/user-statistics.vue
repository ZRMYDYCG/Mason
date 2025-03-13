<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useECharts } from '@/hooks/useEcharts.ts'

const chartRef = ref<HTMLDivElement | null>(null)

const { setOptions, removeResize, echarts } = useECharts(chartRef as any)

const createChart = () => {
  setOptions({
    grid: {
      left: '0',
      right: '4%',
      bottom: '0%',
      top: '5px',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        color: '#999',
        fontSize: 13
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#EFF1F3',
          width: 1,
          type: 'dashed'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#EFF1F3',
          width: 1
        }
      }
    },
    xAxis: {
      type: 'category',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      boundaryGap: [0, 0.01],
      splitLine: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#EFF1F3',
          width: 1
        }
      },
      axisLabel: {
        show: true,
        color: '#999',
        fontSize: 13
      }
    },
    series: [
      {
        data: [160, 100, 150, 80, 190, 100, 175, 120, 160],
        type: 'bar',
        barMaxWidth: 36,
        itemStyle: {
          borderRadius: [6, 6, 6, 6],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#00BFFF'
            },
            {
              offset: 1,
              color: '#00BFFF'
            }
          ])
        }
      }
    ]
  })
}

const list = [
  {
    name: '用户总数',
    value: '32k'
  },
  {
    name: '总访问量',
    value: '128k'
  },
  {
    name: '日访问量',
    value: '10k'
  },
  {
    name: '周同比',
    value: '10%'
  }
]

onMounted(() => {
  createChart()
})

onUnmounted(() => {
  removeResize()
})
</script>

<template>
  <el-card class="user-static">
    <div class="chart" ref="chartRef" :style="{ height: '200px' }"></div>
    <div class="overview">
      <div class="title">用户概述</div>
      <div class="line">
        <span>比上周</span>
        <span class="up">+23%</span>
      </div>
    </div>
    <div class="list">
      <template v-for="item in list" :key="item.name">
        <div class="item">
          <div class="value">{{ item.value }}</div>
          <div class="name">{{ item.name }}</div>
        </div>
      </template>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.user-static {
  height: 370px;
  .overview {
    .title {
      font-size: 28px;
    }
    .line {
      color: #999;
      .up {
        color: #40ffb6;
      }
    }
  }
  .list {
    display: flex;
    justify-content: space-between;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .value {
        font-size: 28px;
      }
      .name {
        color: #999;
      }
    }
  }
}
</style>
