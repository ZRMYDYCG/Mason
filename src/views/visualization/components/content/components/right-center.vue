<script setup lang="ts">
import { ref, reactive } from 'vue'
import CapsuleChart from './capsule-chart'
import { ranking } from '@/api/modules/visualization.ts'
import { ElMessage } from 'element-plus'

const config = ref({
  showValue: true,
  unit: '次'
})
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
