<script setup lang="ts">
import { ref, computed } from 'vue'

const mockData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `使用 GPT 自动生成文章的AI摘要（${i + 1}）`,
  tags: ['前端', 'DeepSeek', 'AI'],
  date: '2025-03-' + (12 + i).toString().padStart(2, '0'),
  content:
    '本文介绍了如何利用GPT强大的自然语言处理能力来自动生成文章摘要。通过前端技术实现与DeepSeek平台的集成，用户可以快速获取文章的核心内容，提升阅读效率。探索AI在内容处理中的应用，打开新的视角。'
}))

const currentPage = ref(1)
const pageSize = ref(5)

const currentPageData = computed(() => {
  return mockData.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})
</script>

<template>
  <el-card>
    <template #header>
      <el-text>项目文档</el-text>
    </template>
    <template #default>
      <div class="list" v-for="item in currentPageData" :key="item.id">
        <div class="list-item__header">
          <div class="header-left">
            <el-avatar src="https://pic1.imgdb.cn/item/67d105e6066befcec6e39e31.jpg" />
          </div>
          <div class="header-right">
            <div class="title-and-tags">
              <el-text class="title">{{ item.title }}</el-text>
              <el-space class="tags">
                <el-tag v-for="(tag, index) in item.tags" :key="index">{{ tag }}</el-tag>
              </el-space>
            </div>
            <div>
              <el-text>{{ item.date }}</el-text>
            </div>
          </div>
        </div>
        <el-text class="list-item__desc" line-clamp="2">
          {{ item.content }}
        </el-text>
      </div>
    </template>
    <template #footer>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="mockData.length"
        layout="prev, pager, next"
        style="display: flex; justify-content: flex-start"
      />
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.list {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  .list-item__header {
    display: flex;
    gap: 10px;
    .header-right {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .title-and-tags {
        display: flex;
        gap: 5px;
        flex-direction: column;
      }
    }
  }
  .list-item__desc {
    margin-top: 10px;
    display: block;
    color: #666;
  }
}

.el-pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>
