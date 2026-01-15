export type DashboardRangePreset = '7d' | '30d' | 'month' | 'custom'

export interface DashboardRangeParams {
  startDate: string
  endDate: string
}

export interface DashboardSummary {
  visits: number
  visitsDelta: number
  activeUsers: number
  activeUsersDelta: number
  pendingTodos: number
  pendingTodosDelta: number
  errorRate: number
  errorRateDelta: number
}

export interface TrendPoint {
  date: string
  visits: number
  activeUsers: number
}

export type TodoPriority = 'high' | 'medium' | 'low'
export type TodoStatus = 'todo' | 'doing' | 'done'

export interface TodoItem {
  id: string
  title: string
  priority: TodoPriority
  dueAt: string
  status: TodoStatus
}

export type ActivityLevel = 'info' | 'success' | 'warning' | 'danger'

export interface ActivityItem {
  id: string
  actor: string
  action: string
  target: string
  at: string
  level: ActivityLevel
}

export type ServiceStatus = 'healthy' | 'warning' | 'down'

export interface SystemHealth {
  cpu: number
  memory: number
  disk: number
  status: ServiceStatus
  version: string
  buildTime: string
}

