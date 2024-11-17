<script setup lang="ts">
const tableData = [
  {
    key: 'Tom',
    answer: 'No. 189, Grove St, Los Angeles'
  },
  {
    key: 'Tom',
    answer: 'No. 189, Grove St, Los Angeles'
  },
  {
    key: 'Tom',
    answer: 'No. 189, Grove St, Los Angeles'
  },
  {
    key: 'Tom',
    answer: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<template>
  <el-row :gutter="10" class="h-full">
    <el-col :lg="8" :xs="24">
      <el-card
        shadow="never"
        :body-style="
          {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          } as any
        "
      >
        <div class="w-[100px] h-[100px] rounded-full overflow-hidden">
          <img
            src="https://pic.imgdb.cn/item/67385379d29ded1a8c811e00.png"
            class="w-full h-full"
            alt="avatar"
          />
        </div>

        <div class="w-full mt-4">
          <el-table :data="tableData" border :show-header="false" width="100%">
            <el-table-column prop="key" width="100px" />
            <el-table-column prop="answer" />
          </el-table>

          <el-divider content-position="left">个人标签</el-divider>

          <div class="flex gap-2 flex-wrap">
            <template v-for="item in 10" :key="item">
              <el-tag>标签{{ item }}</el-tag>
            </template>
          </div>
        </div>
      </el-card>

      <el-card
        class="my-4"
        shadow="never"
        :body-style="{ padding: '0', paddingBottom: '10px' } as any"
      >
        <template #header>
          <div class="font-bold">已发布的公告信息</div>
        </template>
        <div>
          <template v-for="item in 2" :key="item">
            <div class="flex items-center justify-between gap-2 mb-2 border-b p-2">
              <div class="flex items-center gap-2">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://pic.imgdb.cn/item/67385379d29ded1a8c811e00.png"
                  alt="avatar"
                />
                <span class="text-sm cursor-pointer hover:underline hover:text-gray-600">
                  这是第{{ item }}则公告信息</span
                >
              </div>
              <el-tag>正常</el-tag>
            </div>
          </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="10" class="ml-2" />
      </el-card>
    </el-col>
    <el-col :lg="16" :xs="24" class="h-full">
      <el-card shadow="never" class="h-full"></el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
:deep(.el-divider__text) {
  font-weight: bold;
}
</style>
