<template>
  <div class="dashboard">
    <el-row :gutter="12">
      <el-col :xs="24" :sm="12" :md="8">
        <div class="gather-card mb12 bg-1">
          <div class="card-info">
            <span class="card-title">人员出入</span>
            <h2 class="card-text">20</h2>
          </div>
          <div class="card-icon">
            <i class="iconfont icon-fangke"></i>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <div class="gather-card mb12 bg-2">
          <div class="card-info">
            <span class="card-title">外来人员</span>
            <h2 class="card-text">2</h2>
          </div>
          <div class="card-icon">
            <i class="iconfont icon-fangke"></i>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <div class="gather-card mb12 bg-3">
          <div class="card-info">
            <span class="card-title">本周人员</span>
            <h2 class="card-text">77</h2>
          </div>
          <div class="card-icon">
            <i class="iconfont icon-fangke"></i>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <div class="gather-card mb12 bg-4">
          <div class="card-info">
            <span class="card-title">车辆出入</span>
            <h2 class="card-text">10</h2>
          </div>
          <div class="card-icon">
            <i class="iconfont icon-fangche"></i>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <div class="gather-card mb12 bg-5">
          <div class="card-info">
            <span class="card-title">外来车辆</span>
            <h2 class="card-text">1</h2>
          </div>
          <div class="card-icon">
            <i class="iconfont icon-fangche"></i>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <div class="gather-card mb12 bg-6">
          <div class="card-info">
            <span class="card-title">本周车辆</span>
            <h2 class="card-text">66</h2>
          </div>
          <div class="card-icon">
            <i class="iconfont icon-fangche"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :xs="24" :sm="24" :md="12">
        <div class="chart-card mb12">
          <div class="chart-title mb10">访问人数</div>
          <VistorChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <div class="chart-card mb12">
          <div class="chart-title mb10">访车数据</div>
          <CarChart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import VistorChart from './components/vistorChart.vue'
import CarChart from './components/carChart.vue'
</script>

<style scoped lang="scss">
.gather-card {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
  border-radius: 8px;

  .card-info {
    .card-title {
      font-size: 14px;
    }

    .card-text {
      margin: 0;
      margin-top: 10px;
      font-size: 32px;
    }
  }

  .card-icon {
    i {
      font-size: 40px;
      color: rgb(30 32 37 / 18%);
    }
  }
}

.bg-1 {
  background: linear-gradient(rgb(43 90 237 / 80%) 0%, rgb(43 90 237) 100%);
}

.bg-2 {
  background: linear-gradient(rgb(251 164 10 / 80%) 0%, rgb(251 164 10) 100%);
}

.bg-3 {
  background: linear-gradient(rgb(43 174 133 / 80%) 0%, rgb(43 174 133) 100%);
}

.bg-4 {
  background: linear-gradient(rgb(241 144 140 / 80%) 0%, rgb(241 144 140) 100%);
}

.bg-5 {
  background: linear-gradient(rgb(0 201 245 / 80%) 0%, rgb(0 201 245) 100%);
}

.bg-6 {
  background: linear-gradient(rgb(36 134 185 / 80%) 0%, rgb(36 134 185) 100%);
}

.chart-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 360px;
  padding: 24px;
  background-color: var(--el-bg-color-overlay);
  border-radius: 8px;

  .chart-title {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
