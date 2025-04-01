<script setup lang="ts">
import { ref } from 'vue'
import VueOfficeDocx from './components/vue-office-docx.vue' // docs 预览
import VueOfficeExcel from './components/vue-office-excel.vue' // Excel 预览
// import VueOfficePdf from './components/vue-office-pdf.vue' // Pdf 预览

const activeKey = ref('docs')
</script>

<template>
  <div>
    <el-card :bordered="false">
      <el-tabs v-model="activeKey">
        <el-tab-pane name="docs" label="Docs文件预览">
          <VueOfficeDocx v-if="activeKey === 'docs'" />
        </el-tab-pane>
        <el-tab-pane name="excel" label="Excel文件预览">
          <VueOfficeExcel v-if="activeKey === 'excel'" />
        </el-tab-pane>
        <el-tab-pane name="pdf" label="Pdf文件预览">
          <!--          <VueOfficePdf v-if="activeKey === 'pdf'" />-->
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
