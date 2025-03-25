<script setup lang="ts">
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuListType } from '@/config'
const route = useRoute()
import { ref, onMounted } from 'vue'

defineProps({
  list: {
    type: [Array] as PropType<MenuListType[]>,
    default: () => []
  }
})

const router = useRouter()

const isActive = (item: MenuListType): boolean => {
  const currentPath = route.path

  if (item.children?.length) {
    return item.children.some((child) => {
      if (child.children?.length) {
        return isActive(child)
      }
      return child.path === currentPath
    })
  }

  return item.path === currentPath
}

const scrollbarRef = ref()
const showLeftArrow = ref(false)
const showRightArrow = ref(false)

const handleScroll = () => {
  if (!scrollbarRef.value) return

  const { scrollLeft, scrollWidth, clientWidth } = scrollbarRef.value.wrapRef
  showLeftArrow.value = scrollLeft > 0
  showRightArrow.value = scrollLeft + clientWidth < scrollWidth
}

const scroll = (direction: 'left' | 'right') => {
  if (!scrollbarRef.value) return

  const scrollDistance = 200
  const currentScroll = scrollbarRef.value.wrapRef.scrollLeft
  const targetScroll =
    direction === 'left' ? currentScroll - scrollDistance : currentScroll + scrollDistance

  scrollbarRef.value.wrapRef.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  })
}

const handleMenuJump = (item) => {
  router.push(item.path)
}

onMounted(() => {
  handleScroll()
})
</script>

<template>
  <div class="mixed-top-menu">
    <i @click="scroll('left')" class="iconfont icon-xiangzuo scroll-btn left" />
    <el-scrollbar
      ref="scrollbarRef"
      wrap-class="scrollbar-wrapper"
      :horizontal="true"
      @scroll="handleScroll"
    >
      <div class="scroll-bar">
        <template v-for="item in list" :key="item.meta.title">
          <div
            class="item"
            :class="{ active: isActive(item) }"
            @click="handleMenuJump(item)"
            v-if="!item.meta.isHide"
          >
            <i v-if="item.meta.icon" :class="['iconfont mr-2', item.meta.icon]" />
            <span>{{ item.meta.title }}</span>
          </div>
        </template>
      </div>
    </el-scrollbar>
    <i class="iconfont icon-xiangyou scroll-btn right" @click="scroll('right')" />
  </div>
</template>

<style scoped lang="scss">
.mixed-top-menu {
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  overflow: hidden;
  $primary-color: var(--el-color-primary);

  :deep(.el-scrollbar__bar.is-horizontal) {
    bottom: 5px;
    display: none;
    height: 2px;
  }

  :deep(.scrollbar-wrapper) {
    width: calc(60vw - 100px);
    margin: 0 30px;
  }

  .scroll-bar {
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
    height: 60px;
    white-space: nowrap;

    .item {
      position: relative;
      height: 40px;
      padding: 0 12px;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 4px;

      i {
        margin-right: 5px;
        font-size: 15px;
      }

      &:hover {
        color: $primary-color;
      }

      &.active {
        color: #fff;
        background-color: $primary-color;

        &::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          margin: auto;
          content: '';
          background-color: $primary-color;
        }
      }
    }
  }

  .scroll-btn {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transform: translateY(-50%);

    &:hover {
      color: $primary-color;
    }

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }
}

@media (max-width: 678px) {
  .mixed-top-menu {
    :deep(.scrollbar-wrapper) {
      width: calc(48vw - 100px);
      margin: 0 30px;
    }
  }
}
</style>
