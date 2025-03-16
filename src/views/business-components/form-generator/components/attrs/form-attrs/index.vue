<script setup lang="ts">
import { watch, computed } from 'vue'
import { useGeneratorStore } from '@/store/modules/formGenerator.ts'

const generatorStore = useGeneratorStore()

const formAttrs = computed(() => generatorStore.formAttrs)

watch(
  () => formAttrs.value,
  (val) => {
    localStorage.setItem('formAttrs', JSON.stringify(val))
    generatorStore.setFormAttrs(val)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <el-form label-width="100px" v-if="formAttrs">
      <el-form-item label="表单名">
        <el-input clearable placeholder="请输入表单名" v-model="formAttrs.formName"></el-input>
      </el-form-item>
      <el-form-item label="表单模型">
        <el-input clearable placeholder="请输入表单模型" v-model="formAttrs.model"></el-input>
      </el-form-item>
      <el-form-item label="校验模型">
        <el-input clearable placeholder="请输入校验模型" v-model="formAttrs.rules"></el-input>
      </el-form-item>
      <el-form-item label="表单尺寸">
        <el-radio-group v-model="formAttrs.size">
          <el-radio-button label="small">较小</el-radio-button>
          <el-radio-button label="default">默认</el-radio-button>
          <el-radio-button label="large">较大</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签对齐">
        <el-radio-group v-model="formAttrs.labelPosition">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input-number
          v-model="formAttrs.labelWidth"
          :min="1"
          clearable
          placeholder="请输入标签宽度"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="禁用表单">
        <el-switch v-model="formAttrs.disabled"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
