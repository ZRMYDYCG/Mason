<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useECharts } from '@/hooks/useEcharts.ts'

const chartRef = ref<HTMLDivElement | null>(null)

const { setOptions, echarts } = useECharts(chartRef as any)

const createChart = () => {
  setOptions({
    grid: {
      left: '2.2%',
      right: '3%',
      bottom: '0%',
      top: '10px',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        show: true,
        color: '#999',
        margin: 20,
        interval: 0,
        fontSize: 13
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        color: '#999',
        fontSize: 13
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#E8E8E8',
          width: 1
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#e8e8e8',
          width: 1,
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '访客',
        color: '#409eff',
        type: 'line',
        stack: '总量',
        data: [50, 25, 40, 20, 70, 35, 65, 30, 35, 20, 40, 44],
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2.6
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#409eff'
            },
            {
              offset: 1,
              color: 'rgba(64, 158, 255, 0.2)'
            }
          ])
        }
      }
    ]
  })
}

onMounted(() => {
  createChart()
})
</script>

<template>
  <el-card class="traffic-statistics">
    <div class="traffic-statistics__title">
      <div class="title">访问量</div>
      <div class="subtitle">
        <span>今年增长</span>
        <span class="increase">+12%</span>
      </div>
    </div>
    <div class="traffic-statistics__chart" ref="chartRef" :style="{ height: '200px' }"></div>
  </el-card>
</template>

<style lang="scss" scoped>
.traffic-statistics {
  height: 370px;
  .traffic-statistics__title {
    .title {
      font-size: 28px;
    }
    .subtitle {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #6b7280;
      .increase {
        color: #40ffb6;
      }
    }
  }
  .traffic-statistics__chart {
    padding-top: 20px;
  }
}
</style>
