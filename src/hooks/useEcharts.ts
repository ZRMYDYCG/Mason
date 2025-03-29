import { unref, nextTick, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import type { EChartOption } from 'echarts'
import * as echarts from 'echarts'
import { debounce } from 'lodash-es'

const defaultOptions = {
  grid: {
    left: '0',
    right: '4%',
    bottom: '0%',
    top: '0',
    containLabel: true
  },
  tooltip: {},
  yAxis: {
    axisLabel: {
      show: true,
      color: '#8c8c8c'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e8e8e8',
        width: 1,
        type: 'solid'
      }
    }
  },
  xAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e8e8e8',
        width: 1,
        type: 'solid'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#e8e8e8',
        width: 0,
        type: 'solid'
      }
    },
    axisLabel: {
      show: true,
      color: 'rgba(255,255,255, 0.6)'
    },
    axisTick: {
      show: false
    }
  }
}

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light'
) {
  let chartInstance: echarts.ECharts | null = null
  let resizeObserver: ResizeObserver | null = null
  let debouncedResize: ReturnType<typeof debounce> | null = null

  // 初始化echarts
  function initCharts() {
    const el = unref(elRef)
    if (!el || chartInstance?.getDom()) return

    chartInstance = echarts.init(el, theme)
    initResizeObserver()
  }

  // 配置选项
  function setOptions(options: EChartOption | any) {
    if (!options.grid) options.grid = defaultOptions.grid
    if (!options.tooltip) options.tooltip = defaultOptions.tooltip

    // 合并yAxis配置
    if (options.yAxis) {
      options.yAxis = {
        ...defaultOptions.yAxis,
        ...options.yAxis
      }
    }

    // 合并xAxis配置
    if (options.xAxis) {
      options.xAxis = {
        ...defaultOptions.xAxis,
        ...options.xAxis
      }
    }

    nextTick(() => {
      if (!chartInstance) {
        initCharts()
        if (!chartInstance) return
      }

      // 使用动画帧保持流畅
      requestAnimationFrame(() => {
        chartInstance!.setOption(options, true)
      })
    })
  }

  // 初始化尺寸监听
  function initResizeObserver() {
    const el = unref(elRef)
    if (!el || resizeObserver) return

    // 使用lodash的防抖函数
    debouncedResize = debounce(resize, 100, {
      leading: false, // 不立即执行
      trailing: true // 在结束后触发
    })

    resizeObserver = new ResizeObserver(() => {
      debouncedResize?.()
    })

    resizeObserver.observe(el)
  }

  // 清理资源
  function dispose() {
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
    if (debouncedResize) {
      debouncedResize.cancel()
      debouncedResize = null
    }
  }

  // 响应式调整
  function resize() {
    if (chartInstance?.getDom()) {
      // 保留动画配置的resize
      chartInstance.resize({
        animation: {
          duration: 300
        }
      } as any)
    }
  }

  // 自动清理
  onUnmounted(dispose)

  // 延迟初始化确保容器已渲染
  nextTick(initCharts)

  return {
    setOptions,
    resize,
    dispose,
    echarts
  }
}
