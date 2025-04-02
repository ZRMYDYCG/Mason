<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { formatPhoneNumber } from '@/utils/index.ts'
import VerifyPasswordStrength from './components/verify-password-strength.vue'

const { width: windowWidth } = useWindowSize()

export const userInfoData = [
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

const tabDirection = ref('left')
const oldPassword = ref('')

watchEffect(() => {
  if (windowWidth.value < 768) {
    tabDirection.value = 'top'
  } else {
    tabDirection.value = 'left'
  }
})
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
            <el-table-column prop="key" width="100px">
              <template #default="scope">
                <div class="flex items-center gap-2">
                  <iconpark-icon :name="scope.row.icon" size="16px"></iconpark-icon>
                  <span class="text-nowrap">{{ scope.row.key }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <span class="px-3 text-sm text-gray-600 text-nowrap">
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
        <el-tabs :tab-position="tabDirection">
          <el-tab-pane label="基本设置">
            <el-divider content-position="left">设置头像</el-divider>
            <div class="flex flex-col items-center gap-4">
              <el-avatar
                :size="100"
                src="https://pic.imgdb.cn/item/67385379d29ded1a8c811e00.png"
              ></el-avatar>
              <el-button type="primary" class="w-[80px]">选择图片</el-button>
            </div>
            <el-divider content-position="left">个人基本信息</el-divider>
            <el-form label-position="top">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item label="昵称">
                    <el-input placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group>
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号码">
                    <el-input placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item label="电子邮箱">
                    <el-input placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-radio-group>
                      <el-radio label="正常"></el-radio>
                      <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-divider content-position="left">公司角色信息</el-divider>
            <el-form label-position="top">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="所属角色">
                    <el-select placeholder="请选择角色">
                      <el-option label="超级管理员" value="1"></el-option>
                      <el-option label="普通管理员" value="2"></el-option>
                      <el-option label="普通用户" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属岗位">
                    <el-select placeholder="请选择岗位">
                      <el-option label="前端开发工程师" value="1"></el-option>
                      <el-option label="后端开发工程师" value="2"></el-option>
                      <el-option label="测试工程师" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属组织">
                    <el-select placeholder="请选择组织">
                      <el-option label="软件实验室" value="1"></el-option>
                      <el-option label="网络安全实验室" value="2"></el-option>
                      <el-option label="软件开发中心" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属城市">
                    <el-select placeholder="请选择城市">
                      <el-option label="北京" value="1"></el-option>
                      <el-option label="上海" value="2"></el-option>
                      <el-option label="广州" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="详细地址">
                    <el-input
                      placeholder="请输入详细地址"
                      type="textarea"
                      show-word-limit
                      maxlength="200"
                      resize="none"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <el-form class="flex justify-center">
              <el-button type="primary">提交修改</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="安全设置">
            <div class="flex items-center justify-between border-b py-4">
              <div>
                <div>实名认证</div>
                <div class="text-gray-500 text-sm pt-1">认证信息: 一勺</div>
              </div>
              <div class="flex">
                <iconpark-icon name="protect" :color="1 ? 'green' : 'red'"></iconpark-icon>
                <div class="text-sm pl-1">{{ 1 ? '已' : '未' }}认证</div>
              </div>
            </div>
            <div class="flex items-center justify-between border-b py-4">
              <div>
                <div>账户密码</div>
                <div class="text-gray-500 text-sm pt-1">
                  已设置，密码6-18位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和小写字母。
                </div>
              </div>
              <el-button type="text">编辑</el-button>
            </div>
            <div class="flex items-center justify-between border-b py-4">
              <div>
                <div>密保手机</div>
                <div class="text-gray-500 text-sm pt-1">
                  已绑定手机: {{ formatPhoneNumber('13800138625') }}
                </div>
              </div>
              <el-button type="text">编辑</el-button>
            </div>
            <div class="flex items-center justify-between border-b py-4">
              <div>
                <div>安全邮箱</div>
                <div class="text-gray-500 text-sm pt-1">已绑定邮箱: 547471919@qq.com</div>
              </div>
              <el-button type="text">编辑</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码">
            <el-form label-position="top">
              <el-form-item label="原密码">
                <el-input
                  type="password"
                  placeholder="请输入原密码"
                  v-model="oldPassword"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input type="password" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input type="password" placeholder="请输入确认密码"></el-input>
              </el-form-item>
              <verify-password-strength :password="oldPassword" />
              <el-form class="flex justify-center mt-4">
                <el-button type="primary">提交修改</el-button>
              </el-form>
            </el-form>
          </el-tab-pane>
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
