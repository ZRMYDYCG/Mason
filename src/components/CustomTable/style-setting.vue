<script setup lang="ts">
import { computed } from 'vue'

interface IConfig {
  size: string
  stripe: boolean
  border: boolean
}

interface IStyleSettingProps {
  config: IConfig
}

const props = withDefaults(defineProps<IStyleSettingProps>(), {
  config: () => {
    return {
      size: 'default',
      stripe: true,
      border: false
    }
  }
})
const emits = defineEmits(['update:config'])

const tableConfig = computed({
  get() {
    return props.config
  },
  set(value) {
    emits('update:config', value)
  }
})
</script>

<template>
  <el-form label-width="80px" label-position="left">
    <el-form-item label="显示尺寸">
      <el-radio-group v-model="tableConfig.size" size="small">
        <el-radio-button label="large">大</el-radio-button>
        <el-radio-button label="default">正常</el-radio-button>
        <el-radio-button label="small">小</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="风格">
      <el-checkbox v-model="tableConfig.border" label="纵向边框"></el-checkbox>
      <el-checkbox v-model="tableConfig.stripe" label="斑马纹"></el-checkbox>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
