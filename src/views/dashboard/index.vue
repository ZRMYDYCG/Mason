<template>
  <div class="dashboard">
    <el-row>
      <el-col>
        <el-card class="flex justify-between items-center">
          <div>
            <div class="flex items-center">
              <div class="w-[80px] h-[80px] overflow-hidden rounded-full mr-4">
                <img src="https://pic.imgdb.cn/item/67385379d29ded1a8c811e00.png" alt="logo" />
              </div>
              <div>
                <h2 class="text-lg font-bold">Hello 一勺！</h2>
                <div class="text-sm text-gray-600">欢迎使用现代化项目调度管理系统</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-top: 10px">
        <el-card class="card"> </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-top: 10px">
        <el-card class="card"> </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-top: 10px">
        <el-card class="card"> </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-top: 10px">
        <el-card class="card"> </el-card>
      </el-col>
    </el-row>

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

<script></script>

<style lang="scss" scoped></style>
