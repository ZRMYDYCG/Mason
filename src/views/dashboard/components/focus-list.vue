<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { TodoItem } from '@/api/interface/dashboard'

const props = defineProps<{
  todos: TodoItem[]
}>()

const localTodos = ref<TodoItem[]>([])

watch(
  () => props.todos,
  (list) => {
    localTodos.value = list.map((item) => ({ ...item }))
  },
  { immediate: true, deep: true }
)

const toggle = (item: TodoItem) => {
  item.status = item.status === 'done' ? 'todo' : 'done'
}

const doneCount = computed(() => localTodos.value.filter((t) => t.status === 'done').length)
</script>

<template>
  <section class="panel focus">
    <header class="panel-head">
      <div>
        <h3>Your Focus Today</h3>
        <p class="sub">{{ doneCount }}/{{ localTodos.length }} completed</p>
      </div>
      <button type="button" class="link">View All</button>
    </header>
    <ul class="list">
      <li v-for="item in localTodos" :key="item.id" :class="{ done: item.status === 'done' }">
        <label>
          <input
            type="checkbox"
            :checked="item.status === 'done'"
            @change="toggle(item)"
          />
          <span>{{ item.title }}</span>
        </label>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.panel {
  height: 100%;
  padding: 22px;
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
}

.panel-head h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 650;
  color: var(--text-primary);
}

.sub {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--text-tertiary);
}

.link {
  padding: 0;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  background: none;
  border: none;
}

.link:hover {
  color: var(--text-primary);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.list label {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.45;
  color: var(--text-primary);
  cursor: pointer;
}

.list input {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.list .done span {
  color: var(--text-tertiary);
  text-decoration: line-through;
}
</style>
