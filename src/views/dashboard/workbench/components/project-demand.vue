<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Commit {
  commit: {
    author: { date: string }
    message: string
  }
  html_url: string
}

interface Year {
  value: number
  label: string
}

const yearList = ref<Year[]>([])
const adminIterativeRecording = ref<{ label: string; children: string; html_url?: string }[]>([])

const getCommitData = async (project: string) => {
  const res = await fetch(`https://api.github.com/repos/ZRMYDYCG/${project}/commits?per_page=10`)
  const data: Commit[] = await res.json()
  const result = data.map((item) => ({
    label: new Date(item.commit.author.date).toLocaleString(),
    children: item.commit.message,
    html_url: item.html_url
  }))

  sessionStorage.setItem('admin_project_iterative', JSON.stringify(result))
  if (project === 'Mason') {
    adminIterativeRecording.value = result
  }
}

const generateYearList = () => {
  const currentYear = new Date().getFullYear()
  yearList.value = Array.from({ length: 10 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString()
  }))
}

const loadData = () => {
  const blogProjectIterative = JSON.parse(sessionStorage.getItem('admin_project_iterative') || '[]')
  if (blogProjectIterative.length) {
    adminIterativeRecording.value = blogProjectIterative
  } else {
    getCommitData('Mason')
  }
}

onMounted(() => {
  generateYearList()
  loadData()
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <el-text>项目动态</el-text>
        <el-link type="success" href="https://github.com/ZRMYDYCG/Mason" target="_blank"
          >更多动态</el-link
        >
      </div>
    </template>
    <template #default>
      <el-timeline>
        <el-timeline-item
          v-for="item in adminIterativeRecording"
          :timestamp="item.label"
          :key="item.label"
        >
          <el-link :href="item.html_url" target="_blank">{{ item.children }}</el-link>
        </el-timeline-item>
      </el-timeline>
    </template>
  </el-card>
</template>

<style scoped lang="scss"></style>
