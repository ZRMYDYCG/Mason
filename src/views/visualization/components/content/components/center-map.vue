<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { centerMap } from '@/api/modules/visualization.ts'
import { GETNOBASE } from '@/api'
import { registerMap, getMap } from 'echarts/core'
import { optionHandle, regionCodes } from './center.map'
import BorderBox from './border-box.vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import type { MapdataType } from './center.map'

const option = ref({})
const code = ref('china') //china 代表中国 其他地市是行政编码
const { t } = useI18n({ useScope: 'global' })

withDefaults(
  defineProps<{
    // 结束数值
    title: number | string
  }>(),
  {
    title: '地图'
  }
)

const dataSetHandle = async (regionCode: string, list: object[]) => {
  const geojson: any = await getGeojson(regionCode)
  let cityCenter: any = {}
  let mapData: MapdataType[] = []
  //获取当前地图每块行政区中心点
  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] = element.properties.centroid || element.properties.center
  })
  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码
  list.forEach((item: any) => {
    if (cityCenter[item.name]) {
      mapData.push({
        name: item.name,
        value: cityCenter[item.name].concat(item.value)
      })
    }
  })
  await nextTick()

  option.value = optionHandle(regionCode, list, mapData)
}

const getData = async (regionCode: string) => {
  centerMap({ regionCode: regionCode })
    .then((res) => {
      console.log('中上--设备分布', res)
      if (res.success) {
        dataSetHandle(res.data.regionCode, res.data.dataList)
      } else {
        ElMessage.error(res.msg)
      }
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}
const getGeojson = (regionCode: string) => {
  return new Promise<boolean>(async (resolve) => {
    let mapjson = getMap(regionCode)
    if (mapjson) {
      mapjson = mapjson.geoJSON
      resolve(mapjson)
    } else {
      mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then((data) => data)
      code.value = regionCode
      registerMap(regionCode, {
        geoJSON: mapjson as any,
        specialAreas: {}
      })
      resolve(mapjson)
    }
  })
}
getData(code.value)

const mapClick = (params: any) => {
  // console.log(params);
  let xzqData = regionCodes[params.name]
  if (xzqData) {
    getData(xzqData.adcode)
  } else {
    window['$message'].warning(t('visualization.map.noNextLevel'))
  }
}
</script>

<template>
  <div class="centermap">
    <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ title }}</span>
      <div class="you"></div>
    </div>
    <div class="mapwrap">
      <BorderBox>
        <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">
          {{ t('visualization.map.national') }}
        </div>
        <v-chart
          class="chart"
          :option="option"
          ref="centerMapRef"
          @click="mapClick"
          v-if="JSON.stringify(option) != '{}'"
        />
      </BorderBox>
    </div>
  </div>
</template>

<style scoped>
.centermap {
  margin-bottom: 30px;

  .maptitle {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    height: 60px;
    padding-top: 10px;

    .titletext {
      margin: 0 10px;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #0072ff 0%, #00eaff 48%, #01aaff 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .zuo,
    .you {
      width: 29px;
      height: 20px;
      margin-top: 8px;
      background-size: 100% 100%;
    }

    .zuo {
      background: url('@/assets/img/xiezuo.png') no-repeat;
    }

    .you {
      background: url('@/assets/img/xieyou.png') no-repeat;
    }
  }

  .mapwrap {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 580px;

    .quanguo {
      position: absolute;
      top: -46px;
      right: 20px;
      z-index: 10;
      width: 80px;
      height: 28px;
      line-height: 26px;
      color: #00f7f6;
      text-align: center;
      letter-spacing: 6px;
      cursor: pointer;
      border: 1px solid #00eded;
      border-radius: 10px;
      box-shadow:
        0 2px 4px rgb(0 237 237 / 50%),
        0 0 6px rgb(0 237 237 / 40%);
    }
  }
}
</style>
