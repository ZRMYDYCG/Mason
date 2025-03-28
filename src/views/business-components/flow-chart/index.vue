<template>
  <div class="flow-chart-platform">
    <el-card class="toolbar-card" shadow="hover">
      <div class="toolbar">
        <div class="toolbar-section">
          <el-divider content-position="left">连接线样式</el-divider>
          <el-button-group>
            <el-button type="primary" @click="() => setLine('bezier')">贝塞尔曲线</el-button>
            <el-button type="primary" @click="() => setLine('polyline')">多段线</el-button>
            <el-button type="primary" @click="() => setLine('line')">直线</el-button>
          </el-button-group>
        </div>

        <div class="toolbar-section">
          <el-divider content-position="left">视图操作</el-divider>
          <el-button-group>
            <el-button type="primary" @click="focusOn('custom-node-1')">定位节点</el-button>
            <el-button type="primary" @click="() => lfRef?.translateCenter()">居中</el-button>
            <el-button type="primary" @click="() => lfRef?.fitView()">适应屏幕</el-button>
            <el-button type="primary" @click="() => lfRef?.zoom(0.6, [400, 400])">缩放</el-button>
          </el-button-group>
        </div>

        <div class="toolbar-section">
          <el-divider content-position="left">编辑操作 </el-divider>
          <el-button-group>
            <el-button type="primary" @click="() => lfRef?.undo()">撤销</el-button>
            <el-button type="primary" @click="() => lfRef?.redo()">重做</el-button>
            <el-button type="danger" @click="() => lfRef?.clearData()">清空</el-button>
            <el-button type="primary" @click="changeNodeType">切换节点</el-button>
            <el-button type="primary" @click="deleteSelected">删除选中</el-button>
          </el-button-group>
        </div>

        <div class="toolbar-section">
          <el-divider content-position="left">编辑模式</el-divider>
          <el-button-group>
            <el-button :type="editMode ? 'success' : 'primary'" @click="enableEditMode">
              编辑模式
            </el-button>
            <el-button :type="!editMode ? 'success' : 'primary'" @click="disableEditMode">
              只读模式
            </el-button>
          </el-button-group>
        </div>

        <div class="toolbar-section">
          <el-divider content-position="left">数据操作</el-divider>
          <el-button-group>
            <el-button type="primary" @click="getSelectedData">获取选中数据</el-button>
            <el-button type="primary" @click="exportData">导出数据</el-button>
            <el-button type="primary" @click="importData">导入数据</el-button>
          </el-button-group>
        </div>
      </div>
    </el-card>

    <el-card class="node-panel-card" shadow="hover">
      <template #header>
        <div class="node-panel-header">
          <span>节点面板</span>
          <el-tag type="info">拖拽到画布</el-tag>
        </div>
      </template>
      <div class="node-panel">
        <div
          v-for="node in nodeTypes"
          :key="node.type"
          class="node-item"
          @mousedown="startDrag(node)"
          :title="node.label"
        >
          <div :class="['node-shape', node.type]"></div>
          <span class="node-label">{{ node.label }}</span>
        </div>
      </div>
    </el-card>

    <el-card class="flow-chart-card" shadow="never">
      <div ref="containerRef" class="flow-chart-container"></div>
    </el-card>

    <el-dialog v-model="dataDialogVisible" title="流程图数据" width="70%">
      <pre>{{ displayedData }}</pre>
      <template #footer>
        <el-button @click="dataDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="copyData">复制数据</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/es/index.css'
import { ElMessage } from 'element-plus'

interface NodeType {
  type: string
  label: string
  properties?: any
  text?: string
}

interface FlowData {
  nodes: any[]
  edges: any[]
}

const nodeTypes: NodeType[] = [
  { type: 'rect', label: '矩形', text: '矩形' },
  { type: 'circle', label: '圆形', text: '圆形', properties: { r: 25 } },
  { type: 'diamond', label: '菱形', text: '菱形' },
  { type: 'ellipse', label: '椭圆', text: '椭圆', properties: { rx: 40, ry: 80 } },
  {
    type: 'polygon',
    label: '多边形',
    text: '多边形',
    properties: {
      points: [
        [50 - 0.205 * 100, 50 - 0.5 * 100],
        [50 + 0.205 * 100, 50 - 0.5 * 100],
        [50 + 0.5 * 100, 50 - 0.205 * 100],
        [50 + 0.5 * 100, 50 + 0.205 * 100],
        [50 + 0.205 * 100, 50 + 0.5 * 100],
        [50 - 0.205 * 100, 50 + 0.5 * 100],
        [50 - 0.5 * 100, 50 + 0.205 * 100],
        [50 - 0.5 * 100, 50 - 0.205 * 100]
      ]
    }
  },
  { type: 'text', label: '文本', text: '文本' }
]

const initialData: FlowData = {
  nodes: [
    {
      id: 'custom-node-1',
      text: '起始节点',
      type: 'rect',
      x: 100,
      y: 100,
      properties: {
        custom: 'example'
      }
    }
  ],
  edges: []
}

const lfRef = ref<LogicFlow | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const editMode = ref(true)
const dataDialogVisible = ref(false)
const displayedData = ref('')
const flowId = ref('')

onMounted(() => {
  initLogicFlow()
})

const initLogicFlow = async () => {
  await nextTick()

  if (!containerRef.value) return

  const lf = new LogicFlow({
    container: containerRef.value,
    width: containerRef.value.clientWidth,
    height: 600,
    grid: {
      size: 10,
      visible: true,
      type: 'dot'
    },
    keyboard: {
      enabled: true
    },
    background: {
      color: '#f7f9ff'
    },
    edgeType: 'bezier',
    adjustEdgeStartAndEnd: true,
    hoverOutline: false,
    nodeTextEdit: true,
    edgeTextEdit: true,
    multipleSelectKey: 'ctrl',
    plugins: [],
    style: {
      rect: {
        rx: 4,
        ry: 4,
        strokeWidth: 2
      },
      circle: {
        strokeWidth: 2
      },
      polygon: {
        strokeWidth: 2
      },
      ellipse: {
        strokeWidth: 2
      },
      diamond: {
        strokeWidth: 2
      },
      text: {
        color: '#333',
        fontSize: 12
      },
      edgeText: {
        fontSize: 12,
        background: {
          fill: 'white',
          stroke: 'white',
          radius: 3
        }
      }
    }
  })

  lf.on('history:change', () => {
    // 可以在这里添加历史记录变化的处理
  })

  lf.on('element:click', ({ data }) => {
    console.log('Element clicked:', data)
  })

  lf.on('connection:not-allowed', ({ msg }) => {
    ElMessage.warning(msg)
  })

  lf.on('graph:rendered', ({ graphModel }) => {
    flowId.value = graphModel?.flowId || ''
  })

  lf.render(initialData)
  lfRef.value = lf
}

const setLine = (type: string) => {
  const lf = lfRef.value
  if (!lf) return

  const { edges } = lf.getSelectElements()
  edges.forEach(({ id }) => {
    lf.changeEdgeType(id, type)
  })
}

const focusOn = (nodeId: string) => {
  lfRef.value?.focusOn({ id: nodeId })
}

const changeNodeType = () => {
  const lf = lfRef.value
  if (!lf) return

  const { nodes } = lf.getSelectElements()
  nodes.forEach(({ id, type }) => {
    lf.changeNodeType(id, type === 'rect' ? 'circle' : 'rect')
  })
}

const enableEditMode = () => {
  const lf = lfRef.value
  if (!lf) return

  lf.updateEditConfig({
    isSilentMode: false,
    stopZoomGraph: false,
    stopScrollGraph: false,
    stopMoveGraph: false
  })
  editMode.value = true
  ElMessage.success('已启用编辑模式')
}

const disableEditMode = () => {
  const lf = lfRef.value
  if (!lf) return

  lf.updateEditConfig({
    isSilentMode: true,
    stopZoomGraph: true,
    stopScrollGraph: true,
    stopMoveGraph: true
  })
  editMode.value = false
  ElMessage.warning('已切换为只读模式')
}

const getSelectedData = () => {
  const lf = lfRef.value
  if (!lf) return

  const elements = lf.getSelectElements()
  if (elements.nodes.length === 0 && elements.edges.length === 0) {
    ElMessage.warning('请先选中元素')
    return
  }

  displayedData.value = JSON.stringify(elements, null, 2)
  dataDialogVisible.value = true
}

const deleteSelected = () => {
  const lf = lfRef.value
  if (!lf) return

  const { nodes, edges } = lf.getSelectElements()

  nodes.forEach(({ id }) => lf.deleteNode(id))
  edges.forEach(({ id }) => lf.deleteEdge(id))

  if (nodes.length > 0 || edges.length > 0) {
    ElMessage.success(`已删除 ${nodes.length} 个节点和 ${edges.length} 条边`)
  } else {
    ElMessage.warning('请先选中要删除的元素')
  }
}

const exportData = () => {
  const lf = lfRef.value
  if (!lf) return

  const data = lf.getGraphData()
  displayedData.value = JSON.stringify(data, null, 2)
  dataDialogVisible.value = true
}

const importData = () => {
  ElMessage.info('导入功能需要实现文件上传逻辑')
  // 实际项目中可以实现文件上传并解析
}

const copyData = async () => {
  try {
    await navigator.clipboard.writeText(displayedData.value)
    ElMessage.success('已复制到剪贴板')
  } catch (err) {
    ElMessage.error('复制失败，请手动复制')
  }
}

const startDrag = (node: NodeType) => {
  if (!editMode.value) {
    ElMessage.warning('当前为只读模式，请先启用编辑模式')
    return
  }

  lfRef.value?.dnd.startDrag({
    type: node.type,
    text: node.text || node.label,
    properties: node.properties || {}
  })
}
</script>

<style scoped lang="scss">
.flow-chart-platform {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  gap: 16px;
  height: calc(100vh - 40px);
  padding: 20px;
  background-color: #f5f7fa;
}

.toolbar-card {
  grid-column: 1 / 3;
}

.flow-chart-card {
  grid-column: 2;
  grid-row: 2;
  padding: 0;
}

.node-panel-card {
  grid-row: 2;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.toolbar-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.node-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.node-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background-color: #f9f9f9;
  cursor: grab;
  transition: all 0.2s;

  &:hover {
    background-color: #eef5ff;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.node-shape {
  width: 40px;
  height: 40px;
  margin-bottom: 6px;
  border: 2px solid #409eff;
  background-color: white;

  &.rect {
    border-radius: 4px;
  }

  &.circle {
    border-radius: 50%;
  }

  &.diamond {
    transform: rotate(45deg);
    margin: 10px 0;
  }

  &.ellipse {
    border-radius: 50%;
    width: 30px;
    height: 50px;
  }

  &.polygon {
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
  }

  &.text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #409eff;
    border: none;
    background: none;
  }
}

.node-label {
  font-size: 12px;
  color: #666;
}

.flow-chart-container {
  width: 100%;
  height: 600px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.node-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

pre {
  max-height: 500px;
  overflow: auto;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
