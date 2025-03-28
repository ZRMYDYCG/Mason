<script setup lang="ts">
import { ref } from 'vue'
import SearchFormFilterItem from './components/search-form-filter-item.vue'

defineOptions({
  name: 'MasonSearchFormFilter'
})

interface IMasonSearchFormFilterProps {
  /*是否显示折叠展开按钮*/
  isShowFoldUnfoldBtn: boolean
  /*是否显示查询按钮*/
  isShowSearchBtn: boolean
  /*父组件传递来的搜索执行函数*/
  searchHandle?: () => void
  /*父组件传递来的重置执行函数*/
  resetHandle?: () => void
  /*搜索时外部loading状态*/
  loading: boolean
}

const props = withDefaults(defineProps<IMasonSearchFormFilterProps>(), {
  isShowFoldUnfoldBtn: true,
  isShowSearchBtn: true,
  loading: false
})

// 是否折叠多余搜索条件项
const isFoldFormFilter = ref(true)

// Form表单ref
const searchFormFilterRef = ref(null)

const handleSearch = () => {
  if (props.loading) return
  if (props.searchHandle) {
    props.searchHandle()
  }
}

const handleReset = () => {
  if (props.loading) return
  if (props.resetHandle) {
    props.resetHandle()
  }
}

defineExpose({
  searchFormFilterRef
})
</script>

<template>
  <div class="search-form-filter">
    <el-form v-bind="$attrs" ref="searchFormFilterRef">
      <el-row>
        <slot :is-fold-form-filter="isFoldFormFilter"></slot>
        <SearchFormFilterItem :col="$attrs?.btnsCol" class="mason-search-form-filter__btns">
          <el-form-item v-if="props.isShowSearchBtn">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button plain @click="handleReset">重置</el-button>
            <el-button
              link
              v-if="isShowFoldUnfoldBtn"
              @click="isFoldFormFilter = !isFoldFormFilter"
            >
              {{ isFoldFormFilter ? '展开' : '收起' }}
              <i class="iconfont icon-xiangxia" v-show="isFoldFormFilter" />
              <i class="iconfont icon-xiangshang" v-show="!isFoldFormFilter" />
            </el-button>
          </el-form-item>
        </SearchFormFilterItem>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.search-form-filter {
  padding: 24px 12px 12px;
}
</style>
