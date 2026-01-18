<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { installationPlan } from '@/api/modules/visualization.ts'
import { graphic } from 'echarts/core'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const option = ref({})
const { t, locale } = useI18n({ useScope: 'global' })
const getData = () => {
  installationPlan()
    .then((res) => {
      console.log('中下--安装计划', res)
      if (res.success) {
        setOption(res.data)
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
const cacheData = ref<any>(null)

const setOption = async (newData: any) => {
  cacheData.value = newData
  const completedLabel = t('visualization.chart.completed')
  const plannedLabel = t('visualization.chart.planned')
  const rateLabel = t('visualization.chart.completionRate')
  const itemUnit = t('visualization.unit.items')
  option.value = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,.6)',
      borderColor: 'rgba(147, 235, 248, .8)',
      textStyle: {
        color: '#FFF'
      },
      formatter: function (params: any) {
        // 添加单位
        let result = params[0].name + '<br>'
        params.forEach(function (item: any) {
          if (item.value) {
            if (item.seriesName == rateLabel) {
              result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '%</br>'
            } else {
              result +=
                item.marker + ' ' + item.seriesName + ' : ' + item.value + ` ${itemUnit}</br>`
            }
          } else {
            result += item.marker + ' ' + item.seriesName + ' :  - </br>'
          }
        })
        return result
      }
    },
    legend: {
      data: [completedLabel, plannedLabel, rateLabel],
      textStyle: {
        color: '#B4B4B4'
      },
      top: '0'
    },
    grid: {
      left: '50px',
      right: '40px',
      bottom: '30px',
      top: '20px'
    },
    xAxis: {
      data: newData.category,
      axisLine: {
        lineStyle: {
          color: '#B4B4B4'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },

        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },
        axisLabel: {
          formatter: '{value}% '
        }
      }
    ],
    series: [
      {
        name: completedLabel,
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#956FD4' },
            { offset: 1, color: '#3EACE5' }
          ])
        },
        data: newData.barData
      },
      {
        name: plannedLabel,
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(156,107,211,0.8)' },
            { offset: 0.2, color: 'rgba(156,107,211,0.5)' },
            { offset: 1, color: 'rgba(156,107,211,0.2)' }
          ])
        },
        z: -12,
        data: newData.lineData
      },
      {
        name: rateLabel,
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: {
          color: '#F02FC2'
        },
        data: newData.rateData
      }
    ]
  }
}
onMounted(() => {
  getData()
})

watch(locale, () => {
  if (cacheData.value) setOption(cacheData.value)
})
</script>

<template>
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss"></style>
