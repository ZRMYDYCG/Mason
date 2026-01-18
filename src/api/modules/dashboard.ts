import http from '@/api'
import type {
  DashboardRangeParams,
  DashboardSummary,
  TrendPoint,
  TodoItem,
  ActivityItem,
  SystemHealth
} from '@/api/interface/dashboard'

export const getDashboardSummary = (params: DashboardRangeParams) => {
  return http.get<DashboardSummary>('/dashboard/summary', params)
}

export const getDashboardTrend = (params: DashboardRangeParams) => {
  return http.get<TrendPoint[]>('/dashboard/trend', params)
}

export const getDashboardTodos = () => {
  return http.get<TodoItem[]>('/dashboard/todos')
}

export const getDashboardActivities = () => {
  return http.get<ActivityItem[]>('/dashboard/activities')
}

export const getDashboardSystemHealth = () => {
  return http.get<SystemHealth>('/dashboard/systemHealth')
}
