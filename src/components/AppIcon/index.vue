<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import {
  Bell,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  CircleHelp,
  Ellipsis,
  Languages,
  LogOut,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Settings,
  Sun,
  Moon,
  Trash2,
  User,
  X,
  XCircle
} from 'lucide-vue-next'

type IconName =
  | 'bell'
  | 'chevron-down'
  | 'chevrons-left'
  | 'chevrons-right'
  | 'ellipsis'
  | 'languages'
  | 'log-out'
  | 'maximize-2'
  | 'minimize-2'
  | 'panel-left-close'
  | 'panel-left-open'
  | 'refresh-cw'
  | 'settings'
  | 'sun'
  | 'moon'
  | 'trash-2'
  | 'user'
  | 'x'
  | 'x-circle'

interface Props {
  name: IconName | (string & {})
  size?: number | string
  strokeWidth?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 18,
  strokeWidth: 2,
  color: 'currentColor'
})

const iconMap: Record<string, Component> = {
  bell: Bell,
  'chevron-down': ChevronDown,
  'chevrons-left': ChevronsLeft,
  'chevrons-right': ChevronsRight,
  ellipsis: Ellipsis,
  languages: Languages,
  'log-out': LogOut,
  'maximize-2': Maximize2,
  'minimize-2': Minimize2,
  'panel-left-close': PanelLeftClose,
  'panel-left-open': PanelLeftOpen,
  'refresh-cw': RefreshCw,
  settings: Settings,
  sun: Sun,
  moon: Moon,
  'trash-2': Trash2,
  user: User,
  x: X,
  'x-circle': XCircle
}

const iconComponent = computed(() => iconMap[props.name] ?? CircleHelp)
</script>

<template>
  <component
    :is="iconComponent"
    :size="props.size"
    :color="props.color"
    :stroke-width="props.strokeWidth"
    aria-hidden="true"
  />
</template>

