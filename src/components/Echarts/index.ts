import * as echarts from 'echarts/core' // echarts 核心模块, 包含接口
// 引入所需的图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts'
// 引入高级功能，如标签自动布局和动画过渡
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入所需的组件，组件后缀都为 Component
import {} from 'echarts/components'
// 引入 Canvas 渲染器, 是必须的一步
import { SVGRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([SVGRenderer, LabelLayout, UniversalTransition, LineChart])

export { echarts }
