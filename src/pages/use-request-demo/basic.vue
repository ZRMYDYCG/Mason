<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="item in data?.list" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <button @click="run">刷新</button>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/use-request'
import { demoService } from '@/services/demo-service'
import type { Demo } from '@/services/demo-service'
import type { PageData } from '@/http/core'

const { data, loading, error, run } = useRequest<PageData<Demo>>(() =>
  demoService.getList({
    pageNum: 1,
    pageSize: 10,
  }),
)
</script>
