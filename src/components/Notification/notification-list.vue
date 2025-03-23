<script setup lang="ts">
interface ListItem {
  /*头像*/
  avatar?: string
  /*标题*/
  title?: string
  /*描述*/
  desc?: string
  /*时间*/
  time?: string
  /*标签*/
  tag?: string
  /*标签类型*/
  tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
}

interface ListOptions {
  title: string
  content: ListItem[]
}

export interface ActionOptions {
  text: string
  icon?: string
}

defineProps<{
  list: ListOptions[]
  actions: ActionOptions[]
}>()

const emits = defineEmits(['clickItem', 'clickAction'])

const clickItem = (item: ListItem, index: number) => {
  emits('clickItem', item, index)
}

const clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', item, index)
}
</script>

<template>
  <el-tabs>
    <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
      <el-scrollbar max-height="300px">
        <div
          class="flex items-center py-[12px] px-[20px] cursor-pointer hover:bg-blue-500/5"
          v-for="(item1, index1) in item.content"
          :key="index1"
        >
          <div class="flex-1" v-if="item1.avatar" @click="clickItem(item1, index1)">
            <el-avatar :src="item1.avatar"></el-avatar>
          </div>
          <div class="flex-[3]">
            <div class="flex items-center justify-between text-sm text-gray-700" v-if="item1.title">
              <div>{{ item1.title }}</div>
              <el-tag size="small" v-if="item1.tagType" :type="item1.tagType">{{
                item1.tag
              }}</el-tag>
            </div>
            <div>{{ item1.desc }}</div>
            <div v-if="item1.time">{{ item1.time }}</div>
          </div>
        </div>
      </el-scrollbar>
      <div class="h-[50px] flex items-center border-t-[1px] border-gray-200" @click="clickAction">
        <div
          v-for="(item, index) in actions"
          :key="index"
          class="flex-1 flex gap-2 items-center justify-center h-full"
          :class="{
            'border-r-[1px] border-gray-200': index < actions.length - 1
          }"
        >
          <div v-if="item.icon">
            <!-- <component :is="`el-icon-${item.icon}`"></component>-->
            <i :class="['iconfont', item.icon]"></i>
          </div>
          <div>{{ item.text }}</div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
:deep(.el-tabs__nav) {
  width: 100%;
  display: flex;
}
:deep(.el-tabs__item) {
  flex: 1;
  text-align: center;
}
</style>
