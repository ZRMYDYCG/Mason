<template>
  <el-card header="Graph">
    <div class="flex-wrapper">
      <el-button key="arrow1" type="primary" @click="() => setLine('bezier')"
        >连接线-贝塞尔曲线</el-button
      >
      <el-button key="arrow2" type="primary" @click="() => setLine('polyline')"
        >连接线-多段线</el-button
      >
      <el-button key="arrow2" type="primary" @click="() => setLine('line')">连接线-直线</el-button>
      <el-button key="focusOn" type="primary" @click="focusOn">定位到node-1</el-button>
      <el-button key="undo" type="primary" @click="() => lfRef?.undo()">上一步</el-button>
      <el-button key="redo" type="primary" @click="() => lfRef?.redo()">下一步</el-button>
      <el-button key="clearData" type="primary" @click="() => lfRef?.clearData()"
        >清空数据</el-button
      >
      <el-button key="changeType" type="primary" @click="changeNodeType">切换节点为圆形</el-button>
      <el-button key="cancelEdit" type="primary" @click="cancelEdit">禁止编辑</el-button>
      <el-button key="canEdit" type="primary" @click="canEdit">允许编辑</el-button>
      <el-button key="getData" type="primary" @click="() => getGraphData()"
        >获取选中节点数据</el-button
      >
      <el-button key="setZoom" type="primary" @click="() => lfRef?.zoom(0.6, [400, 400])"
        >设置大小</el-button
      >
      <el-button key="selectElement" type="primary" @click="() => checkNode()"
        >选中指定节点</el-button
      >
      <el-button key="translateCenter" type="primary" @click="() => lfRef?.translateCenter()"
        >居中</el-button
      >
      <el-button key="fitView" type="primary" @click="() => lfRef?.fitView()">适应屏幕</el-button>
      <el-button key="deleteNode" type="primary" @click="() => delNode()">删除节点</el-button>
    </div>
    <el-divider content-position="left">节点面板</el-divider>
    <div class="flex-wrapper">
      <div class="dnd-item wrapper" @mousedown="handleDragRect">矩形</div>
      <div class="dnd-item wrapper" @mousedown="handleDragCircle">圆形</div>
      <div class="dnd-item wrapper" @mousedown="handleDragDiamond">菱形</div>
      <div class="dnd-item wrapper" @mousedown="handleDragEllipse">椭圆</div>
      <div class="dnd-item wrapper" @mousedown="handleDragPolygon">多边形</div>
      <div class="dnd-item wrapper" @mousedown="handleDragText">文本</div>
    </div>
    <el-divider />
    <div ref="containerRef" id="graph" class="viewport"></div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/es/index.css'

interface Node {
  id: string
  type: string
  text?: string
  x?: number
  y?: number
  r?: number
  properties?: any
}

interface Edge {
  id: string
  type: string
  properties?: any
}

const data = {
  nodes: [
    {
      id: 'custom-node-1',
      text: 'node-1',
      type: 'polygon',
      x: 90,
      y: 94
    } as Node
  ]
}

const lfRef = ref<LogicFlow | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const flowId = ref<string>('')

onMounted(() => {
  if (containerRef.value) {
    const lf = new LogicFlow({
      container: containerRef.value,
      height: 400,
      multipleSelectKey: 'ctrl',
      disabledTools: ['multipleSelect'],
      autoExpand: true,
      adjustEdgeStartAndEnd: true,
      allowRotate: true,
      edgeTextEdit: true,
      keyboard: {
        enabled: true
      },
      partial: true,
      background: {
        color: '#FFFFFF'
      },
      grid: true,
      edgeTextDraggable: true,
      edgeType: 'bezier',
      style: {
        inputText: {
          background: 'black',
          color: 'white'
        }
      },
      idGenerator: (type: string) => `${type}_${Math.random()}`
    })

    lf.on('graph:rendered', ({ graphModel }) => {
      flowId.value = graphModel?.flowId || ''
    })

    // 渲染数据
    lf.render(data as any)

    lfRef.value = lf as any
  }
})

// 设置箭头
const setLine = (arrowName: string) => {
  const lf = lfRef.value
  if (lf) {
    const { edges } = lf.getSelectElements()
    edges.forEach(({ id, properties }: Edge) => {
      lf.changeEdgeType(id, arrowName)
    })
  }
}

// 定位到指定节点
const focusOn = () => {
  lfRef.value?.focusOn({
    id: 'custom-node-1'
  })
}

// 切换节点类型
const changeNodeType = () => {
  const lf = lfRef.value
  if (lf) {
    const { nodes } = lf.getSelectElements()
    nodes.forEach(({ id, type }: any) => {
      lf.changeNodeType(id, type === 'rect' ? 'circle' : 'rect')
    })
  }
}

// 取消编辑
const cancelEdit = () => {
  const lf = lfRef.value
  if (lf) {
    const { editConfigModel } = lf.graphModel
    editConfigModel.updateEditConfig({
      isSilentMode: true, // 是否为静默模式
      stopZoomGraph: true, // 禁止缩放画布
      stopScrollGraph: true, // 禁止鼠标滚动移动画布
      stopMoveGraph: true // 禁止拖动画布
    })
  }
}

const canEdit = () => {
  const lf = lfRef.value
  if (lf) {
    const { editConfigModel } = lf.graphModel
    editConfigModel.updateEditConfig({
      isSilentMode: false,
      stopZoomGraph: false,
      stopScrollGraph: false,
      stopMoveGraph: false
    })
  }
}

// 获取选中节点数据
const getGraphData = () => {
  const lf = lfRef.value
  if (lf) {
    const { nodes } = lf.getSelectElements()
    console.log(nodes)
  }
}

// 选中指定节点
const checkNode = () => {
  const lf = lfRef.value
  if (lf) {
    lf.selectElementById('custom-node-1')
  }
}

// 删除节点
const delNode = () => {
  const lf = lfRef.value
  if (lf) {
    const { nodes } = lf.getSelectElements()
    nodes.forEach(({ id }: any) => {
      lf.deleteNode(id)
    })
  }
}

const handleDragRect = () => {
  lfRef.value?.dnd.startDrag({
    type: 'rect',
    text: '矩形'
  })
}

const handleDragCircle = () => {
  lfRef.value?.dnd.startDrag({
    type: 'circle',
    text: '圆形',
    r: 25
  })
}

const handleDragDiamond = () => {
  lfRef.value?.dnd.startDrag({
    type: 'diamond',
    text: '菱形'
  })
}

const handleDragEllipse = () => {
  lfRef.value?.dnd.startDrag({
    type: 'ellipse',
    text: '椭圆',
    properties: {
      rx: 40,
      ry: 80
    }
  })
}

const handleDragPolygon = () => {
  let x = 50,
    y = 50
  lfRef.value?.dnd.startDrag({
    type: 'polygon',
    text: '多边形',
    properties: {
      points: [
        [x - 0.205 * 100, y - 0.5 * 100],
        [x + 0.205 * 100, y - 0.5 * 100],
        [x + 0.5 * 100, y - 0.205 * 100],
        [x + 0.5 * 100, y + 0.205 * 100],
        [x + 0.205 * 100, y + 0.5 * 100],
        [x - 0.205 * 100, y + 0.5 * 100],
        [x - 0.5 * 100, y + 0.205 * 100],
        [x - 0.5 * 100, y - 0.205 * 100]
      ]
    }
  })
}

const handleDragText = () => {
  lfRef.value?.dnd.startDrag({
    type: 'text',
    text: '文本'
  })
}
</script>

<style scoped lang="scss">
.flex-wrapper {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

*:focus {
  outline: none;
}

.rect {
  width: 50px;
  height: 50px;
  background: #fff;
  border: 2px solid #000;
}

.circle {
  width: 50px;
  height: 50px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 50%;
}

.dnd-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
}

.wrapper {
  width: 80px;
  height: 50px;
  background: #fff;
  border: 2px solid #000;
}
</style>
