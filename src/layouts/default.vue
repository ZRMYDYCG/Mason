<template>
  <div>
    <header>
      <router-link to="/" class="item">home</router-link>
      <router-link to="/demo" class="item">demo</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.item {
  @apply line-height-loose mr-3 text-gray-400 mb-5;
}
</style>
