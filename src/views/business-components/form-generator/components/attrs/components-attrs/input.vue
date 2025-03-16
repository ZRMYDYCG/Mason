<script lang="ts" setup>
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'
import { computed, ComputedRef, watch } from 'vue'

const generatorStore = useGeneratorStore()

const current: ComputedRef<any> = computed(() => generatorStore.currentComponent)

watch(
  () => current.value,
  (val) => {
    localStorage.setItem('currentComponent', JSON.stringify(val))
    generatorStore.setCurrentComponent(val)
  },
  { deep: true }
)
</script>

<template>
  <el-form label-width="90px">
    <el-form-item label="字段名">
      <el-input v-model="current.field" placeholder="请输入字段名" clearable></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="current.label" placeholder="请输入标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="current.value" placeholder="请输入默认值" clearable></el-input>
    </el-form-item>
    <el-form-item label="占位提示">
      <el-input
        v-model="current.attrs.placeholder"
        clearable
        placeholder="请输入占位提示"
      ></el-input>
    </el-form-item>
    <el-form-item label="输入框类型">
      <el-select v-model="current.attrs.type" placeholder="请选择输入框类型">
        <el-option value="text" label="普通输入框"></el-option>
        <el-option value="password" label="密码框"></el-option>
        <el-option value="textarea" label="文本域"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="输入框尺寸" v-if="current.attrs.type !== 'textarea'">
      <el-select v-model="current.attrs.size" placeholder="请选择输入框尺寸">
        <el-option value="" label="默认尺寸"></el-option>
        <el-option value="medium" label="中号"></el-option>
        <el-option value="small" label="小号"></el-option>
        <el-option value="large" label="大号"></el-option>
      </el-select>
    </el-form-item>
    <template v-if="current.attrs.type === 'textarea'">
      <el-form-item label="输入框行数">
        <el-input-number v-model="current.attrs.rows"></el-input-number>
      </el-form-item>
      <el-form-item label="是否自适应">
        <el-switch v-model="current.attrs.autosize"></el-switch>
      </el-form-item>
      <el-form-item label="缩放模式">
        <el-select v-model="current.attrs.resize" placeholder="请选择缩放模式">
          <el-option value="none" label="不可缩放"></el-option>
          <el-option value="horizontal" label="横向缩放"></el-option>
          <el-option value="vertical" label="纵向缩放"></el-option>
          <el-option value="both" label="都可缩放"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <el-form-item label="标签宽度">
      <el-input-number v-model="current.labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="前缀">
      <el-input v-model="current.prefix" clearable placeholder="请输入前缀"></el-input>
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="current.suffix" clearable placeholder="请输入后缀"></el-input>
    </el-form-item>
    <el-form-item label="前图标">
      <el-input v-model="current.attrs.prefixIcon" clearable placeholder="请输入前图标">
        <template #append>
          <el-button>选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="后图标">
      <el-input v-model="current.attrs.suffixIcon" clearable placeholder="请输入后图标">
        <template #append>
          <el-button>选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="最多输入">
      <el-input v-model="current.attrs.maxlength" clearable placeholder="请输入最多输入">
        <template #append>
          <el-button>个字符</el-button>
        </template>
      </el-input>
    </el-form-item>
    <template v-if="current.attrs.maxlength">
      <el-form-item
        label="字数统计"
        v-if="current.attrs.type === 'text' || current.attrs.type === 'textarea'"
      >
        <el-switch v-model="current.attrs.showWordLimit"></el-switch>
      </el-form-item>
    </template>
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="能否清空">
      <el-switch v-model="current.attrs.clearable"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="current.attrs.readonly"></el-switch>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
