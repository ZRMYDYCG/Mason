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
    <el-col :lg="8" :xs="24" class="h-full">
      <div class="bg-amber-200 h-full">
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
      </div>
    </el-col>
    <el-col :lg="16" :xs="24" class="h-full">
      <div class="bg-pink-200 h-full"></div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
:deep(.el-divider__text) {
  font-weight: bold;
}
</style>
