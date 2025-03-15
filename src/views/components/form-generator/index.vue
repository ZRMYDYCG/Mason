<script setup lang="ts">
import { onMounted } from 'vue'
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'
import SvgRender from '@/components/SvgRender/index.vue'
import FormGeneratorSettings from './components/layout/form-generator-settings.vue'
import SelectContainer from './components/layout/select-container.vue'
import PreviewMain from './components/layout/preview-main.vue'
import HeaderActions from './components/layout/header-actions.vue'

const generatorStore = useGeneratorStore()

onMounted(() => {
  const attrs = {
    formName: 'elForm',
    model: 'model',
    rules: 'rules',
    size: 'default',
    labelPosition: 'left',
    labelWidth: 90,
    disabled: false
  }
  generatorStore.setFormAttrs(attrs)
  localStorage.setItem('formAttrs', JSON.stringify(attrs))
})
</script>

<template>
  <div class="form-generator">
    <div class="form-generator-select">
      <div class="form-generator-select__header">
        <div class="form-generator-select__header-title">
          <SvgRender name="logo" size="large"></SvgRender>
          <h1>Form Generator</h1>
        </div>
        <div class="form-generator-select__header-actions">
          <HeaderActions />
        </div>
      </div>
      <div class="form-generator-select__body">
        <div class="form-generator-select__left">
          <SelectContainer />
        </div>
        <div class="form-generator-select__main">
          <PreviewMain />
        </div>
      </div>
    </div>
    <div class="form-generator-settings">
      <FormGeneratorSettings />
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-generator {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid #ccc;
  .form-generator-select {
    height: 100%;
    flex: 1;
    .form-generator-select__header {
      height: 50px;
      width: 100%;
      //background-color: pink;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      .form-generator-select__header-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    .form-generator-select__body {
      display: flex;
      height: 100%;
      width: 100%;
      .form-generator-select__left {
        width: 300px;
        height: 100%;
        //background-color: rebeccapurple;
      }
      .form-generator-select__main {
        flex: 1;
        height: 100%;
        //background-color: yellow;
        border-right: 1px solid #ccc;
      }
    }
  }
  .form-generator-settings {
    width: 280px;
    //background-color: blue;
  }
}
</style>
