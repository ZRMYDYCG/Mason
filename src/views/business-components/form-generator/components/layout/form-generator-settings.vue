<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ComponentItem } from '../../types/index.ts'
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'
import FormAttrs from '../attrs/form-attrs/index.vue'
import ButtonAttrs from '../attrs/components-attrs/button.vue'
import CascaderAttrs from '../attrs/components-attrs/cascader.vue'
import CheckboxAttrs from '../attrs/components-attrs/checkbox.vue'
import ColorPickerAttrs from '../attrs/components-attrs/color-picker.vue'
import DatePickerAttrs from '../attrs/components-attrs/date-picker.vue'
import InputAttrs from '../attrs/components-attrs/input.vue'
import InputNumberAttrs from '../attrs/components-attrs/input-number.vue'
import RadioAttrs from '../attrs/components-attrs/radio.vue'
import RateAttrs from '../attrs/components-attrs/rate.vue'
import SliderAttrs from '../attrs/components-attrs/slider.vue'
import SwitchAttrs from '../attrs/components-attrs/switch.vue'
import TimePickerAttrs from '../attrs/components-attrs/time-picker.vue'
import TimeSelectAttrs from '../attrs/components-attrs/time-select.vue'
import SelectAttrs from '../attrs/components-attrs/select.vue'

const generatorStore = useGeneratorStore()

const currentComponent: ComputedRef<ComponentItem> = computed(() => generatorStore.currentComponent)
</script>

<template>
  <el-scrollbar>
    <el-tabs>
      <el-tab-pane label="组件属性">
        <div v-if="currentComponent">
          <button-attrs v-if="currentComponent.type === 'button'" />
          <cascader-attrs v-if="currentComponent.type === 'cascader'" />
          <checkbox-attrs v-if="currentComponent.type === 'checkbox-group'" />
          <color-picker-attrs v-if="currentComponent.type === 'color-picker'" />
          <date-picker-attrs v-if="currentComponent.type === 'date-picker'" />
          <input-attrs v-if="currentComponent.type === 'input'" />
          <input-number-attrs v-if="currentComponent.type === 'input-number'" />
          <radio-attrs v-if="currentComponent.type === 'radio-group'" />
          <rate-attrs v-if="currentComponent.type === 'rate'" />
          <slider-attrs v-if="currentComponent.type === 'slider'" />
          <switch-attrs v-if="currentComponent.type === 'switch'" />
          <time-picker-attrs v-if="currentComponent.type === 'time-picker'" />
          <time-select-attrs v-if="currentComponent.type === 'time-select'" />
          <select-attrs v-if="currentComponent.type === 'select'" />
        </div>
        <div v-else>
          <el-empty description="当前还未选择组件" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="表单属性">
        <FormAttrs />
      </el-tab-pane>
    </el-tabs>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-scrollbar {
  height: 100%;
  .el-tabs {
    height: 100%;
    :deep(.el-tabs__nav-wrap) {
      padding-left: 10px;
    }
    :deep(.el-tabs__content) {
      padding: 0 10px;
    }
  }
}
</style>
