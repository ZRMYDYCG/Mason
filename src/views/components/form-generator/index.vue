<script setup lang="ts">
import SvgRender from '@/components/SvgRender/index.vue'
import FormGeneratorSettings from './components/form-generator-settings.vue'
import SelectContainer from './components/select-container.vue'
import PreviewMain from './components/preview-main.vue'
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
          <el-space>
            <div class="form-generator-select__header-actions-item">
              <i class="iconfont icon-bofang" />
              <span>运行</span>
            </div>
            <div class="form-generator-select__header-actions-item">
              <i class="iconfont icon-download" />
              <span>导出vue文件</span>
            </div>
            <div class="form-generator-select__header-actions-item">
              <i class="iconfont icon-daima" />
              <span>复制代码</span>
            </div>
            <div class="form-generator-select__header-actions-item">
              <i class="iconfont icon-shanchu" />
              <span>清空</span>
            </div>
          </el-space>
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
  .form-generator-select {
    height: 100%;
    flex: 1;
    .form-generator-select__header {
      height: 50px;
      width: 100%;
      background-color: pink;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      .form-generator-select__header-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .form-generator-select__header-actions {
        .form-generator-select__header-actions-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
    .form-generator-select__body {
      display: flex;
      height: 100%;
      width: 100%;
      .form-generator-select__left {
        width: 300px;
        height: 100%;
        background-color: rebeccapurple;
      }
      .form-generator-select__main {
        flex: 1;
        height: 100%;
        background-color: yellow;
      }
    }
  }
  .form-generator-settings {
    width: 280px;
    background-color: blue;
  }
}
</style>
