<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ComponentItem } from '../../types/index.ts'
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'
import FormAttrs from '../attrs/form-attrs/index.vue'
import ButtonAttrs from '../attrs/components-attrs/button.vue'
import CascaderAttrs from '../attrs/components-attrs/cascader.vue'
import CheckboxAttrs from '../attrs/components-attrs/checkbox.vue'

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
