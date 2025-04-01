<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useECharts } from '@/hooks/useEcharts.ts'

const chartRef = ref<HTMLDivElement | null>(null)

const { setOptions, echarts } = useECharts(chartRef as any)

const createChart = () => {
  setOptions({
    grid: {
      left: '0',
      right: '4%',
      bottom: '0%',
      top: '30px',
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
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月'],
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
              color: '#FF6347'
            },
            {
              offset: 1,
              color: '#FFD700'
            }
          ])
        }
      }
    ]
  })
}

const list = [
  {
    name: '总销售额',
    value: '320万'
  },
  {
    name: '总订单数',
    value: '12800'
  },
  {
    name: '月销售额',
    value: '100万'
  },
  {
    name: '月同比增长',
    value: '10%'
  }
]

onMounted(() => {
  createChart()
})
</script>

<template>
  <el-card class="sales-static">
    <div class="chart" ref="chartRef" :style="{ height: '200px' }"></div>
    <div class="overview">
      <div class="title">销售概述</div>
      <div class="line">
        <span>比上月</span>
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
.sales-static {
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
