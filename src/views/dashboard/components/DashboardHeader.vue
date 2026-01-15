<template>
  <div class="card mb10 dashboard-header-card">
    <div class="page-header">
      <div class="header-left">
        <el-avatar
          :size="48"
          :src="avatar"
          class="user-avatar"
          shape="circle"
          role="img"
          aria-label="用户头像"
        >
          {{ displayName.charAt(0).toUpperCase() }}
        </el-avatar>
        <div class="header-info">
          <h1 class="welcome-title text-ellipsis">
            {{ greetingText }}，{{ displayName }}
          </h1>
          <div class="header-meta muted">
            <span class="date-text">{{ dateText }}</span>
          </div>
        </div>
      </div>

      <div class="header-right">
        <div class="control-group date-controls">
          <!-- 桌面端：单选按钮组 -->
          <el-radio-group
            v-if="!isMobile"
            :model-value="rangePreset"
            size="default"
            class="preset-radio"
            aria-label="选择日期范围"
            @update:model-value="handlePresetChange"
          >
            <el-radio-button label="7d">近7天</el-radio-button>
            <el-radio-button label="30d">近30天</el-radio-button>
            <el-radio-button label="month">本月</el-radio-button>
            <el-radio-button label="custom">自定义</el-radio-button>
          </el-radio-group>

          <!-- 移动端：下拉选择框 -->
          <el-select
            v-else
            :model-value="rangePreset"
            size="default"
            class="preset-select"
            aria-label="选择日期范围"
            @update:model-value="handlePresetChange"
          >
            <el-option label="近7天" value="7d" />
            <el-option label="近30天" value="30d" />
            <el-option label="本月" value="month" />
            <el-option label="自定义" value="custom" />
          </el-select>

          <div v-if="rangePreset === 'custom'" class="custom-range-wrapper">
            <el-date-picker
              :model-value="customRangeForPicker"
              type="daterange"
              size="default"
              unlink-panels
              range-separator="-"
              start-placeholder="开始"
              end-placeholder="结束"
              value-format="YYYY-MM-DD"
              :clearable="false"
              class="custom-date-picker"
              aria-label="自定义日期范围"
              :disabled="loading"
              @update:model-value="handleCustomRangeChange"
            />
          </div>
        </div>

        <div class="divider hidden-xs-only"></div>

        <div class="control-group action-controls">
          <el-tooltip
            :content="lastUpdated ? `上次更新: ${lastUpdated}` : '点击刷新数据'"
            placement="bottom"
            :show-after="500"
          >
            <el-button
              type="default"
              size="default"
              :loading="loading"
              class="refresh-btn"
              aria-label="刷新数据"
              @click="handleRefresh"
            >
              <template #icon>
                <i class="iconfont icon-shuaxin" :class="{ spinning: loading }" />
              </template>
              <span class="hidden-sm-and-down">刷新</span>
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useUserStore } from '@/store/modules/user'
import { useDebounceFn } from '@vueuse/core'
import type { DashboardRangePreset } from '@/api/interface/dashboard'

dayjs.locale('zh-cn')

const props = defineProps<{
  rangePreset: DashboardRangePreset
  customRange: [string, string] | null
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:rangePreset', val: DashboardRangePreset): void
  (e: 'update:customRange', val: [string, string] | null): void
  (e: 'refresh'): void
  (e: 'change'): void
}>()

const userStore = useUserStore()
const isMobile = ref(false)
const lastUpdated = ref('')

const displayName = computed(() => {
  return userStore.userInfo.name || userStore.userInfo.username || '亲爱的用户'
})

const avatar = computed(() => {
  return userStore.userInfo.avatar || ''
})

const greetingText = computed(() => {
  const hour = dayjs().hour()
  if (hour < 5) return '夜深了'
  if (hour < 11) return '早上好'
  if (hour < 13) return '中午好'
  if (hour < 18) return '下午好'
  return '晚上好'
})

const dateText = computed(() => dayjs().format('YYYY年MM月DD日 dddd'))
const customRangeForPicker = computed(() => props.customRange ?? undefined)

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  updateLastTime()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

function updateLastTime() {
  lastUpdated.value = dayjs().format('HH:mm:ss')
}

function handlePresetChange(val: string | number | boolean | undefined) {
  if (typeof val !== 'string') return
  const preset = val as DashboardRangePreset
  emit('update:rangePreset', preset)
  
  if (preset === 'custom') {
    // 如果切换到自定义且没有范围，默认为最近7天
    if (!props.customRange) {
      const end = dayjs().format('YYYY-MM-DD')
      const start = dayjs().subtract(6, 'day').format('YYYY-MM-DD')
      emit('update:customRange', [start, end])
      // 策略：触发 change 以便用户立即看到内容
      emit('change')
    } else {
      // 回显之前的范围，触发获取
      emit('change')
    }
  } else {
    // 标准预设切换，触发获取
    emit('change')
  }
}

const emitChangeDebounced = useDebounceFn(() => {
  emit('change')
}, 600)

function handleCustomRangeChange(val: [string, string] | null) {
  emit('update:customRange', val)
  if (val) {
    emitChangeDebounced()
  }
}

function handleRefresh() {
  updateLastTime()
  emit('refresh')
}
</script>

<style scoped lang="scss">
.dashboard-header-card {
  border: none;
  --gap-xs: 8px;
  --gap-sm: 16px;
  --gap-md: 24px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--gap-md);
  padding: 4px 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  min-width: 0; // Prevent flex item overflow

  .user-avatar {
    flex-shrink: 0;
    border: 2px solid var(--el-bg-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 600;
    font-size: 18px;
  }

  .header-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;

    .welcome-title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.4;
      color: var(--el-text-color-primary);
    }

    .header-meta {
      margin-top: 4px;
      font-size: 13px;
      line-height: 1.4;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  flex-wrap: wrap;

  .control-group {
    display: flex;
    align-items: center;
    gap: var(--gap-xs);
  }

  .divider {
    width: 1px;
    height: 24px;
    background-color: var(--el-border-color-lighter);
    margin: 0 4px;
  }

  .custom-range-wrapper {
    width: 240px;
    transition: all 0.3s ease;
  }
  
  .preset-select {
    width: 120px;
  }
}

.muted {
  color: var(--el-text-color-secondary);
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spinning {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Responsive Breakpoints
@media screen and (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-sm);
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
    
    .control-group.date-controls {
      flex: 1;
      flex-wrap: wrap;
      
      .preset-select {
        width: 110px; // Compact
      }
      
      .custom-range-wrapper {
        width: 100%;
        order: 3;
        margin-top: 8px;
      }
    }

    .control-group.action-controls {
      margin-left: auto;
    }
    
    .divider {
      display: none;
    }
  }
}

@media screen and (max-width: 390px) {
  .welcome-title {
    font-size: 18px !important;
  }
}
</style>
