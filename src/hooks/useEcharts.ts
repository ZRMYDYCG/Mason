import { unref, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { EChartOption } from 'echarts'
import * as echarts from 'echarts' // 全部导入

const defaultOptions = {
  grid: {
    left: '0',
    right: '0%',
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
  let resizeHandler: () => void
  let resizeObserver: ResizeObserver | null = null

  function initCharts() {
    const el = unref(elRef)
    if (!el) {
      return
    }
    chartInstance = echarts.init(el, theme)
    addResize()
  }

  function setOptions(options: EChartOption | any) {
    // 默认配置
    if (!options.grid) {
      options.grid = defaultOptions.grid
    }

    if (!options.tooltip) {
      options.tooltip = defaultOptions.tooltip
    }

    if (options.yAxis) {
      const { axisLine, axisTick } = defaultOptions.yAxis

      if (!options.yAxis.axisLine) {
        options.yAxis.axisLine = axisLine
      }
      if (!options.yAxis.axisTick) {
        options.yAxis.axisTick = axisTick
      }
    }

    if (options.xAxis) {
      const { axisLine, splitLine, axisTick } = defaultOptions.xAxis

      if (!options.xAxis.axisLine) {
        options.xAxis.axisLine = axisLine
      }
      if (!options.xAxis.splitLine) {
        options.xAxis.splitLine = splitLine
      }
      if (!options.xAxis.axisTick) {
        options.xAxis.axisTick = axisTick
      }
    }

    if (unref(elRef).offsetHeight === 0) {
      setTimeout(() => {
        setOptions(options)
      }, 30)
      return
    }

    nextTick(() => {
      setTimeout(() => {
        if (!chartInstance) {
          initCharts()
          if (!chartInstance) return
        }
        chartInstance.setOption(options)
      }, 30)
    })
  }

  function addResize() {
    const el = unref(elRef)
    if (!el) return

    // 窗口resize监听
    resizeHandler = () => {
      resize()
    }
    window.addEventListener('resize', resizeHandler)

    // 监听容器本身尺寸变化（更精准）
    resizeObserver = new ResizeObserver(resizeHandler)
    resizeObserver.observe(el)
  }

  function removeResize() {
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
    }
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  }

  function resize() {
    chartInstance?.resize()
  }

  initCharts()

  return {
    setOptions,
    addResize,
    removeResize,
    resize,
    echarts
  }
}
