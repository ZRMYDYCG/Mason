<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'
import { ComponentItem } from '@/views/components/form-generator/types'

const generatorStore = useGeneratorStore()

const componentList: ComputedRef<any[]> = computed(() => generatorStore.componentList)
const activeIndex = computed(() => generatorStore.activeIndex)

const handleDrop = (e: DragEvent) => {
  const item = JSON.parse(e.dataTransfer!.getData('item'))
  item.field += Math.floor(Math.random() * 1000)
  localStorage.setItem('currentComponent', JSON.stringify(item))
  generatorStore.setCurrentComponent(item)
  if (componentList.value && componentList.value.length) {
    componentList.value.push(item)
    localStorage.setItem('componentList', JSON.stringify(componentList.value))
    generatorStore.setComponentList(componentList.value)
    localStorage.setItem('activeIndex', String(componentList.value.length - 1))
    generatorStore.setActiveIndex(componentList.value.length - 1)
  } else {
    const arr = []
    arr.push(item)
    localStorage.setItem('componentList', JSON.stringify(arr))
    generatorStore.setComponentList(arr)
    localStorage.setItem('activeIndex', '0')
    generatorStore.setActiveIndex('0')
  }
}

const handleDragover = (event: DragEvent) => {
  event.preventDefault()
}

const clickComponent = (item: ComponentItem, index: number) => {
  localStorage.setItem('currentComponent', JSON.stringify(item))
  generatorStore.setCurrentComponent(item)
  localStorage.setItem('activeIndex', String(index))
  generatorStore.setActiveIndex(index)
}
</script>

<template>
  <div class="preview-main" @drop="handleDrop" @dragover="handleDragover">
    <div ref="previewRef" class="preview-content" v-if="componentList && componentList.length > 0">
      <el-form>
        <template v-for="(item, index) in componentList" :key="index">
          <el-form-item
            class="p-5"
            :prop="item.field"
            :class="[{ active: index === activeIndex }]"
            :label="item.showLabel ? item.label : ''"
            :label-width="`${item.showLabel ? `${item.labelWidth}px` : '0px'}`"
            @click="clickComponent(item, index)"
          >
            <template v-if="item.type === 'button'">
              <el-button v-if="item.attrs.type === 'default'" v-bind="item.attrs">
                <template #icon>
                  <i :class="item.attrs.icon"></i>
                </template>
                {{ item.attrs.buttonText }}
              </el-button>
              <el-button v-if="item.attrs.type === 'primary'" v-bind="item.attrs">{{
                item.attrs.buttonText
              }}</el-button>
              <el-button v-if="item.attrs.type === 'success'" v-bind="item.attrs">{{
                item.attrs.buttonText
              }}</el-button>
              <el-button v-if="item.attrs.type === 'warning'" v-bind="item.attrs">{{
                item.attrs.buttonText
              }}</el-button>
              <el-button v-if="item.attrs.type === 'info'" v-bind="item.attrs">{{
                item.attrs.buttonText
              }}</el-button>
              <el-button v-if="item.attrs.type === 'danger'" v-bind="item.attrs">{{
                item.attrs.buttonText
              }}</el-button>
            </template>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div class="preview-empty" v-else>
      <el-empty description="还没有组件，请先添加组件" :image-size="200" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview-main {
  height: 100%;
  .preview-content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .preview-empty {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .active {
    background: #f6f7ff;
  }
}
</style>
