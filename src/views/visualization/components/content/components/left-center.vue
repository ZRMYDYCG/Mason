<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { graphic } from 'echarts/core'
import { countUserNum } from '@/api/modules/visualization.ts'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

let colors = ['#0BFC7F', '#A0A0A0', '#F48C02', '#F4023C']
const option = ref({})
const state = reactive({
  lockNum: 0,
  offlineNum: 0,
  onlineNum: 0,
  alarmNum: 0,
  totalNum: 0
})
const { t, locale } = useI18n({ useScope: 'global' })
const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] }
  ])
}
const getData = () => {
  countUserNum()
    .then((res: any) => {
      console.log('左中--用户总览', res)
      if (res.success) {
        state.lockNum = res.data.lockNum
        state.offlineNum = res.data.offlineNum
        state.onlineNum = res.data.onlineNum
        state.totalNum = res.data.totalNum
        state.alarmNum = res.data.alarmNum
        setOption()
      } else {
        ElMessage.error(res.msg)
      }
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}
getData()
const setOption = () => {
  option.value = {
    title: {
      top: 'center',
      left: 'center',
      text: [`{value|${state.totalNum}}`, `{name|${t('visualization.label.total')}}`].join('\n'),
      textStyle: {
        rich: {
          value: {
            color: '#ffffff',
            fontSize: 24,
            fontWeight: 'bold',
            lineHeight: 20,
            padding: [4, 0, 4, 0]
          },
          name: {
            color: '#ffffff',
            lineHeight: 20
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,.6)',
      borderColor: 'rgba(147, 235, 248, .8)',
      textStyle: {
        color: '#FFF'
      }
    },
    series: [
      {
        name: t('visualization.section.userProfile'),
        type: 'pie',
        radius: ['40%', '70%'],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: 'rgba(255,255,255,0)',
          borderWidth: 2
        },
        color: colors,
        label: {
          show: true,
          formatter: '   {b|{b}}   \n   {c|{c}}   {per|{d}%}  ',
          //   position: "outside",
          rich: {
            b: {
              color: '#fff',
              fontSize: 12,
              lineHeight: 26
            },
            c: {
              color: '#31ABE3',
              fontSize: 14
            },
            per: {
              color: '#31ABE3',
              fontSize: 14
            }
          }
        },
        emphasis: {
          show: false
        },
        legend: {
          show: false
        },
        tooltip: { show: true },

        labelLine: {
          show: true,
          length: 20, // 第一段线 长度
          length2: 36, // 第二段线 长度
          smooth: 0.2,
          lineStyle: {}
        },
        data: [
          {
            value: state.onlineNum,
            name: t('visualization.label.online'),
            itemStyle: {
              color: echartsGraphic(['#0BFC7F', '#A3FDE0'])
            }
          },
          {
            value: state.offlineNum,
            name: t('visualization.label.offline'),
            itemStyle: {
              color: echartsGraphic(['#A0A0A0', '#DBDFDD'])
            }
          },
          {
            value: state.lockNum,
            name: t('visualization.label.locked'),
            itemStyle: {
              color: echartsGraphic(['#F48C02', '#FDDB7D'])
            }
          },
          {
            value: state.alarmNum,
            name: t('visualization.label.abnormal'),
            itemStyle: {
              color: echartsGraphic(['#F4023C', '#FB6CB7'])
            }
          }
        ]
      }
    ]
  }
}

watch(locale, () => {
  setOption()
})
</script>

<template>
  <v-chart class="chart" :option="option" />
</template>

<style scoped></style>
