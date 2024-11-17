<script setup lang="ts">
const userInfoData = [
  {
    key: '所属角色',
    icon: 'permissions',
    value: '超级管理员'
  },
  {
    key: '所属组织',
    icon: 'organization',
    value: '软件实验室'
  },
  {
    key: '所属岗位',
    icon: 'posts',
    value: '前端开发工程师'
  },
  {
    key: '详细地址',
    icon: 'address',
    value: '江苏省苏州市橡树街道'
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
          <el-table :data="userInfoData" border :show-header="false" width="100%">
            <el-table-column prop="key" width="100px" class-name="bg-gray-100">
              <template #default="scope">
                <div class="flex items-center gap-2">
                  <iconpark-icon :name="scope.row.icon" size="16px"></iconpark-icon>
                  <span class="text-nowrap">{{ scope.row.key }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <span class="px-3 py-1 bg-gray-100 rounded-md text-gray-600 text-nowrap">
                  {{ scope.row.value }}
                </span>
              </template>
            </el-table-column>
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
    <el-col :lg="16" :xs="24">
      <el-card shadow="never">
        <el-tabs tab-position="left">
          <el-tab-pane label="基本设置">基本设置</el-tab-pane>
          <el-tab-pane label="安全设置">安全设置</el-tab-pane>
          <el-tab-pane label="修改密码">修改密码</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
:deep(.el-divider__text) {
  font-weight: bold;
}
</style>
