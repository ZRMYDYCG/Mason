<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'
import { ComponentItem } from '../../types'
import { RuleItem } from '../../types/rule.ts'

const generatorStore = useGeneratorStore()

const componentList: ComputedRef<any[]> = computed(() => generatorStore.componentList)
const activeIndex = computed(() => generatorStore.activeIndex)
const formAttrs = computed(() => generatorStore.formAttrs)
const currentComponent = computed(() => generatorStore.currentComponent)

const rules = ref<RuleItem>({})
const model = ref<any>({})

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

const clickItem = (item: ComponentItem, index: number) => {
  localStorage.setItem('currentComponent', JSON.stringify(item))
  generatorStore.setCurrentComponent(item)
  localStorage.setItem('activeIndex', String(index))
  generatorStore.setActiveIndex(index)
}

watch(
  () => currentComponent.value,
  (val) => {
    localStorage.setItem('currentComponent', JSON.stringify(val))
    generatorStore.setCurrentComponent(val)

    if (componentList.value && componentList.value.length) {
      componentList.value[activeIndex.value] = val
      localStorage.setItem('componentList', JSON.stringify(componentList.value))
      generatorStore.setComponentList(componentList.value)
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="preview-main" @drop="handleDrop" @dragover="handleDragover">
    <el-form
      :label-position="formAttrs?.labelPosition"
      :label-width="`${formAttrs?.labelWidth}px`"
      :size="formAttrs?.size"
      :disabled="formAttrs?.disabled"
      :model="model"
      :rules="rules"
      :validate-on-rule-change="false"
      v-if="componentList && componentList.length"
    >
      <template v-for="(item, index) in componentList" :key="index">
        <el-form-item
          class="p-5 relative"
          :prop="item.field"
          :class="{
            active: activeIndex === index,
            'rate-form-item-align-center': item.type === 'rate'
          }"
          :label="item.showLabel ? item.label : ''"
          :label-width="`${item.showLabel ? `${item.labelWidth}px` : '0px'}`"
          @click="clickItem(item, index)"
        >
          <template v-if="item.type === 'button'">
            <el-button v-if="item.attrs.type === 'default'" v-bind="item.attrs">{{
              item.attrs.buttonText
            }}</el-button>
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
          <template v-else-if="item.type === 'color-picker'">
            <el-color-picker
              v-if="item.attrs.colorFormat === 'rgb'"
              v-model="item.value"
              v-bind="item.attrs"
              color-format="rgb"
            ></el-color-picker>
            <el-color-picker
              v-if="item.attrs.colorFormat === 'hex'"
              v-model="item.value"
              v-bind="item.attrs"
              color-format="hex"
            ></el-color-picker>
            <el-color-picker
              v-if="item.attrs.colorFormat === 'hsl'"
              v-model="item.value"
              v-bind="item.attrs"
              color-format="hsl"
            ></el-color-picker>
            <el-color-picker
              v-if="item.attrs.colorFormat === 'hsv'"
              v-model="item.value"
              v-bind="item.attrs"
              color-format="hsv"
            ></el-color-picker>
          </template>
          <template v-else-if="item.type === 'cascader'">
            <el-cascader :options="item.children" v-bind="{ ...item.attrs }"></el-cascader>
          </template>
          <template v-else-if="item.type === 'time-picker'">
            <el-time-picker
              v-if="item.attrs.isRange"
              is-range
              v-bind="{ ...item.attrs }"
            ></el-time-picker>
            <el-time-picker v-else v-bind="{ ...item.attrs }"></el-time-picker>
          </template>
          <!--          <template v-else-if="item.type === 'input'">-->
          <!--            <el-input-->
          <!--              placeholder="请输入内容"-->
          <!--              v-if="item.type === 'input'"-->
          <!--              v-bind="{ ...item.attrs }"-->
          <!--              v-model="item.value"-->
          <!--            ></el-input>-->
          <!--          </template>-->
          <component
            v-else
            :is="`el-${item.type}`"
            v-bind="{
              ...item.attrs,
              height: item.attrs.height + 'px'
            }"
            v-model="item.value"
          >
            <template v-if="item.children && item.children.length">
              <template v-if="item.type === 'select'">
                <component
                  v-for="(child, i) in item.children"
                  :key="i"
                  v-bind="child.attrs"
                  :is="`el-${child.type}`"
                ></component>
              </template>
              <template v-else>
                <component
                  v-for="(child, i) in item.children"
                  :key="i"
                  v-bind="child.attrs"
                  :is="`el-${child.type}`"
                  >{{ child.attrs.text }}</component
                >
              </template>
            </template>
            <template #prefix v-if="item.type === 'input' && item.attrs.prefixIcon">
              <!--              <component :is="`el-icon-${toLine(item.attrs.prefixIcon!)}`"></component>-->
            </template>
            <template #suffix v-if="item.type === 'input' && item.attrs.suffixIcon">
              <!--                            <component :is="`el-icon-${toLine(item.attrs.suffixIcon!)}`"></component>-->
            </template>
            <template #prepend v-if="item.type === 'input' && item.prefix">{{
              item.prefix
            }}</template>
            <template #append v-if="item.type === 'input' && item.suffix">{{
              item.suffix
            }}</template>
          </component>
          <div class="absolute top-[-35px] right-[10px] z-[999]" v-if="activeIndex === index">
            <el-tooltip content="复制">
              <el-button size="small" circle plain type="primary"></el-button>
            </el-tooltip>
            <el-tooltip content="删除">
              <el-button size="small" circle plain type="danger"></el-button>
            </el-tooltip>
          </div>
        </el-form-item>
      </template>
    </el-form>
    <div class="preview-empty" v-else>
      <el-empty description="还没有组件，请先添加组件" :image-size="200" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview-main {
  height: 100%;
  overflow: auto;
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
