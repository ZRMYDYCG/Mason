<template>
  <div class="index">index</div>
  <div>msg: {{ msg }}</div>
  <div>isDark: {{ isDark }}</div>
  <button @click="toggleDark()">Toggle</button>
</template>

<script setup lang="ts">
const msg = ref('Hello world')

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDark = useToggle(isDark)
</script>
