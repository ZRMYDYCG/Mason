<template>
  <div class="workbench">
    <WorkbenchHeader></WorkbenchHeader>
    <StatisticsList></StatisticsList>
    <el-row :gutter="10">
      <el-col :span="12" :xs="24" style="margin-top: 10px">
        <UserStatistics></UserStatistics>
      </el-col>
      <el-col :span="12" :xs="24" style="margin-top: 10px">
        <TrafficStatistics></TrafficStatistics>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12" :xs="24" style="margin-top: 10px">
        <ProjectDocs></ProjectDocs>
      </el-col>
      <el-col :span="12" :xs="24" style="margin-top: 10px">
        <ProjectDemand></ProjectDemand>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import WorkbenchHeader from './components/workbench-header.vue'
import StatisticsList from './components/statistics-list.vue'
import UserStatistics from './components/user-statistics.vue'
import TrafficStatistics from './components/traffic-statistics.vue'
import ProjectDemand from './components/project-demand.vue'
import ProjectDocs from './components/project-docs.vue'
</script>

<style lang="scss" scoped></style>
