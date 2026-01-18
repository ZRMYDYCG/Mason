<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import mittBus from '@/utils/mittBus'
import { SettingThemeList, ThemeList, SystemMainColor } from '@/config'
import { MenuTypeEnum, ContainerWidthEnum, MenuThemeEnum } from '@/config'
import type { MenuThemeType, SystemThemeEnum } from '@/config'
import { useSettingStore } from '@/store/modules/setting.ts'
import { ElMessage } from 'element-plus'
import ThemeModeSelector from './components/ThemeModeSelector.vue'
import MenuLayoutSelector from './components/MenuLayoutSelector.vue'
import MenuThemeSelector from './components/MenuThemeSelector.vue'
import MainColorSelector from './components/MainColorSelector.vue'
import BoxStyleSelector from './components/BoxStyleSelector.vue'
import ContainerWidthSelector from './components/ContainerWidthSelector.vue'
import BasicConfigPanel from './components/BasicConfigPanel.vue'
import DrawerShell from './components/DrawerShell.vue'

const store = useSettingStore()

const drawerVisible = ref(false)

const menuThemeList = ThemeList
const mainColor = SystemMainColor
const isDark = computed(() => store.isDark)
const systemThemeMode = computed(() => store.systemThemeMode)
const currentMenuTheme = computed(() => store.menuThemeType)
const systemThemeColor = computed(() => store.systemThemeColor)
const boxBorderMode = computed(() => store.boxBorderMode)
const menuType = computed(() => store.menuType)
const containerWidth = computed(() => store.containerWidth)
const isMenuThemeDisabled = computed(
  () =>
    menuType.value === MenuTypeEnum.DUAL_MENU || menuType.value === MenuTypeEnum.TOP || isDark.value
)
const pageTransitionOps = [
  {
    value: '',
    label: '无动画'
  },
  {
    value: 'fade',
    label: 'fade'
  },
  {
    value: 'fade-transform',
    label: 'fade-transform'
  },
  {
    value: 'slide-right',
    label: 'slide-right'
  },
  {
    value: 'slide-top',
    label: 'slide-top'
  },
  {
    value: 'slide-bottom',
    label: 'slide-bottom'
  }
]
const customRadiusOps = [
  {
    value: '0',
    label: '0'
  },
  {
    value: '0.25',
    label: '0.25'
  },
  {
    value: '0.5',
    label: '0.5'
  },
  {
    value: '0.75',
    label: '0.75'
  },
  {
    value: '1',
    label: '1'
  }
]
const containerWidthList = [
  {
    value: ContainerWidthEnum.FULL,
    label: '铺满',
    icon: 'icon-dengbigaodupumankegundong--xianxing'
  },
  {
    value: ContainerWidthEnum.BOXED,
    label: '定宽',
    icon: 'icon-gudingkuandu'
  }
]

const {
  colorWeak,
  watermarkVisible,
  showWorkTab,
  uniqueOpened,
  showCrumbs,
  menuOpenWidth,
  showLanguage,
  showNprogress,
  pageTransition,
  showRefreshButton,
  showMenuButton,
  isFooter,
  customRadius
} = storeToRefs(store)

const basicModels = {
  showWorkTab,
  uniqueOpened,
  showMenuButton,
  showRefreshButton,
  showCrumbs,
  showLanguage,
  showNprogress,
  colorWeak,
  watermarkVisible,
  isFooter,
  menuOpenWidth,
  pageTransition,
  customRadius
}

// 设置菜单布局
const setMenuType = (type: MenuTypeEnum) => {
  if (type === MenuTypeEnum.LEFT || type === MenuTypeEnum.TOP_LEFT) store.setMenuOpen(true)
  store.setMenuType(type)
  if (type === MenuTypeEnum.DUAL_MENU) {
    store.setMenuTheme(MenuThemeEnum.DESIGN)
    store.setMenuOpen(true)
  }
}

// 设置菜单主图
const setMenuTheme = (item: MenuThemeType) => {
  if (isMenuThemeDisabled.value) {
    return
  }
  store.setMenuTheme(item.theme)
}

// 设置（白天/黑夜/随系统）模式
const setTheme = (item: { theme: SystemThemeEnum }) => {
  store.setThemeMode(item.theme)
}

// 设置项目主题颜色
const setSystemThemeColor = (color: string) => {
  store.setElementTheme(color)
}

// 设置容器宽度
const setContainerWidth = (item: { value: ContainerWidthEnum }) => {
  store.setContainerWidth(item.value)
}

// 复制配置
const copyConfig = () => {
  const config = localStorage.getItem('setting')
  if (config) {
    navigator.clipboard
      .writeText(config)
      .then(() => {
        ElMessage.success('配置已复制到剪贴板')
      })
      .catch((err) => {
        ElMessage.error('复制失败：' + err)
      })
  } else {
    ElMessage.error('未找到配置')
  }
}

mittBus.on('openThemeDrawer', () => (drawerVisible.value = true))
</script>

<template>
  <div class="setting">
    <el-drawer
      size="300px"
      v-model="drawerVisible"
      :lock-scroll="false"
      :with-header="false"
      modal-class="setting-modal"
    >
      <DrawerShell @close="drawerVisible = false">
        <ThemeModeSelector :list="SettingThemeList" :active="systemThemeMode" @select="setTheme" />

        <MenuLayoutSelector :menu-type="menuType" @select="setMenuType" />

        <MenuThemeSelector
          :list="menuThemeList"
          :active="currentMenuTheme"
          :disabled="isMenuThemeDisabled"
          @select="setMenuTheme"
        />

        <MainColorSelector
          :list="mainColor"
          :active="systemThemeColor"
          @select="setSystemThemeColor"
        />

        <BoxStyleSelector :box-border-mode="boxBorderMode" />

        <ContainerWidthSelector
          :list="containerWidthList"
          :active="containerWidth"
          @select="setContainerWidth"
        />

        <BasicConfigPanel
          :models="basicModels"
          :page-transition-ops="pageTransitionOps"
          :custom-radius-ops="customRadiusOps"
          :copy-config="copyConfig"
        />
      </DrawerShell>
    </el-drawer>
  </div>
</template>
