<template>
  <div class="workbench">
    <WorkbenchHeader></WorkbenchHeader>
    <StatisticsList></StatisticsList>
    <el-row :gutter="10">
      <el-col :span="12" :xs="24" style="margin-top: 10px">
        <el-card>卡片1</el-card>
      </el-col>

      <el-col :span="12" :xs="24" style="margin-top: 10px">
        <el-card>
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold">项目动态</span>
              <span class="text-sm text-gray-600 cursor-pointer">更多动态</span>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import WorkbenchHeader from './components/workbench-header.vue'
import StatisticsList from './components/statistics-list.vue'
</script>

<style lang="scss" scoped></style>
