<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import CapsuleChart from './capsule-chart'
import { ranking } from '@/api/modules/visualization.ts'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const config = ref({
  showValue: true,
  unit: ''
})
const { t, locale } = useI18n({ useScope: 'global' })
const data = ref([])
const getData = () => {
  ranking()
    .then((res: any) => {
      console.log('右中--报警排名', res)
      if (res.success) {
        data.value = res.data
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
getData()

const syncUnit = () => {
  config.value = {
    ...config.value,
    unit: t('visualization.unit.times')
  }
}
syncUnit()
watch(locale, () => {
  syncUnit()
})
</script>

<template>
  <div class="right_bottom">
    <CapsuleChart :config="config" style="width: 100%; height: 260px" :data="data" />
  </div>
</template>

<style scoped lang="scss">
.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;
}
</style>
