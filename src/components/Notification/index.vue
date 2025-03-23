<script setup lang="ts">
withDefaults(
  defineProps<{
    /*显示的图标*/
    icon?: string
    /*通知数量*/
    value?: string | number
    /*通知数量最大值*/
    max?: number
    /*是否是小圆点显示*/
    isDot?: boolean
  }>(),
  {
    icon: 'icon-email',
    isDot: false
  }
)
</script>

<template>
  <el-popover placement="bottom" :width="300" trigger="click">
    <template #reference>
      <el-badge :is-dot="isDot" :value="value" :max="max" class="cursor-pointer" :offset="[-7, 14]">
        <!--<component :is="`el-icon-${icon})}`"></component>-->
        <i :class="['iconfont', icon]" />
      </el-badge>
    </template>
    <!-- 继承 Popover 的 slot   -->
    <slot></slot>
  </el-popover>
</template>

<style scoped lang="scss">
$mason-grey-300-rgb: rgb(245, 245, 245) !default;

i {
  display: block;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: var(--mason-grey-700);
    background-color: rgb($mason-grey-300-rgb, 0.5);
    font-weight: bold;
  }
}
</style>
