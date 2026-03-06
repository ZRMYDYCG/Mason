<template>
  <div>
    <h1>Demo 详情</h1>

    <select v-model="demoId">
      <option value="1">Demo 1</option>
      <option value="2">Demo 2</option>
      <option value="3">Demo 3</option>
    </select>

    <div v-if="loading">加载中...</div>

    <div v-else-if="error">错误: {{ (error as Error)?.message }}</div>

    <div v-else>
      <h2>{{ data?.title }}</h2>
      <p>{{ data?.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRequest } from '@/hooks/use-request'
import { demoService } from '@/services/demo-service'
import type { Demo } from '@/services/demo-service'

const demoId = ref(1)
const demoIdRef = computed(() => demoId.value)

const { data, loading, error } = useRequest<Demo>(
  () => demoService.getDetail(Number(demoId.value)),
  {
    deps: [demoIdRef],
    auto: true,
  },
)
</script>
