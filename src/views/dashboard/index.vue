<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getDashboardActivities,
  getDashboardSummary,
  getDashboardSystemHealth,
  getDashboardTodos,
  getDashboardTrend
} from '@/api/modules/dashboard'
import type {
  ActivityItem,
  DashboardSummary,
  SystemHealth,
  TodoItem,
  TrendPoint
} from '@/api/interface/dashboard'
import HeroWelcome from './components/hero-welcome.vue'
import InspirationCard from './components/inspiration-card.vue'
import StatCards from './components/stat-cards.vue'
import GrowthChart from './components/growth-chart.vue'
import FocusList from './components/focus-list.vue'
import QuickActions from './components/quick-actions.vue'
import StoryCard from './components/story-card.vue'
import LatestUpdates from './components/latest-updates.vue'
import QuoteCard from './components/quote-card.vue'

const summary = ref<DashboardSummary | null>(null)
const health = ref<SystemHealth | null>(null)
const trend = ref<TrendPoint[]>([])
const todos = ref<TodoItem[]>([])
const activities = ref<ActivityItem[]>([])

const yearRange = () => {
  const year = new Date().getFullYear()
  return {
    startDate: `${year}-01-01`,
    endDate: `${year}-12-31`
  }
}

const load = async () => {
  const range = yearRange()
  const [summaryRes, healthRes, trendRes, todosRes, activitiesRes] = await Promise.all([
    getDashboardSummary(range),
    getDashboardSystemHealth(),
    getDashboardTrend(range),
    getDashboardTodos(),
    getDashboardActivities()
  ])
  summary.value = summaryRes.data
  health.value = healthRes.data
  trend.value = trendRes.data
  todos.value = todosRes.data
  activities.value = activitiesRes.data
}

onMounted(load)
</script>

<template>
  <div class="dashboard">
    <div class="row hero-row">
      <HeroWelcome class="hero" />
      <InspirationCard class="inspiration" />
    </div>

    <StatCards :summary="summary" :health="health" />

    <div class="row mid-row">
      <GrowthChart class="growth" :data="trend" />
      <FocusList class="focus" :todos="todos" />
      <QuickActions class="actions" />
    </div>

    <div class="row bottom-row">
      <StoryCard class="story" />
      <LatestUpdates class="updates" :activities="activities" />
      <QuoteCard class="quote" />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 4px 0 20px;
}

.row {
  display: grid;
  gap: 16px;
}

.hero-row {
  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 0.9fr);
}

.mid-row {
  grid-template-columns: minmax(0, 1.5fr) minmax(240px, 0.85fr) minmax(220px, 0.75fr);
  align-items: stretch;
}

.bottom-row {
  grid-template-columns: minmax(0, 1.15fr) minmax(240px, 1fr) minmax(220px, 0.85fr);
  align-items: stretch;
}

@media (width <= 1280px) {
  .mid-row {
    grid-template-columns: 1fr 1fr;
  }

  .mid-row .growth {
    grid-column: 1 / -1;
  }

  .bottom-row {
    grid-template-columns: 1fr 1fr;
  }

  .bottom-row .quote {
    grid-column: 1 / -1;
  }
}

@media (width <= 960px) {
  .hero-row,
  .mid-row,
  .bottom-row {
    grid-template-columns: 1fr;
  }

  .mid-row .growth,
  .bottom-row .quote {
    grid-column: auto;
  }
}
</style>
