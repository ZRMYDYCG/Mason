<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ],
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
        name: '销售额',
        color: '#ff6347',
        type: 'line',
        stack: '总量',
        data: [1000, 1500, 1200, 1800, 1400, 1600, 2100, 1900, 1700, 1300, 2000, 1850],
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2.6
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#ff6347'
            },
            {
              offset: 1,
              color: 'rgba(255, 99, 71, 0.2)'
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
  <el-card class="sales-statistics">
    <div class="sales-statistics__title">
      <div class="title">销售额</div>
      <div class="subtitle">
        <span>今年增长</span>
        <span class="increase">+15%</span>
      </div>
    </div>
    <div class="sales-statistics__chart" ref="chartRef" :style="{ height: '200px' }"></div>
  </el-card>
</template>

<style lang="scss" scoped>
.sales-statistics {
  height: 370px;
  .sales-statistics__title {
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
  .sales-statistics__chart {
    padding-top: 20px;
  }
}
</style>
