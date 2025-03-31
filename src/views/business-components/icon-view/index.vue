<script setup lang="ts">
import { ElMessage } from 'element-plus'
import MasonSearchFormFilter from '@/components/SearchFormFilter/index.vue'
import MasonSearchFormFilterItem from '@/components/SearchFormFilter/components/search-form-filter-item.vue'

const iconList = [
  { name: '', class: 'icon-cloud', unicode: '' },
  { name: '', class: 'icon-expand', unicode: '' },
  { name: '', class: 'icon-linegraph', unicode: '' },
  { name: '', class: 'icon-mappin', unicode: '' },
  { name: '', class: 'icon-global', unicode: '' },
  { name: '', class: 'icon-grid', unicode: '' },
  { name: '', class: 'icon-happy', unicode: '' },
  { name: '', class: 'icon-lightbulb', unicode: '' },
  { name: '', class: 'icon-pricetags', unicode: '' },
  { name: '', class: 'icon-refresh', unicode: '' },
  { name: '', class: 'icon-target', unicode: '' },
  { name: '', class: 'icon-jilu', unicode: '' },
  { name: '', class: 'icon-rili', unicode: '' },
  { name: '', class: 'icon-dianzan', unicode: '' },
  { name: '', class: 'icon-jigou', unicode: '' },
  { name: '', class: 'icon-paizhao', unicode: '' },
  { name: '', class: 'icon-yinhangka', unicode: '' },
  { name: '', class: 'icon-wenjianjia', unicode: '' },
  { name: '', class: 'icon-dizhi', unicode: '' },
  { name: '', class: 'icon-yonghu', unicode: '' },
  { name: '', class: 'icon-jifen', unicode: '' },
  { name: '', class: 'icon-tongji', unicode: '' },
  { name: '', class: 'icon-shezhi1', unicode: '' },
  { name: '', class: 'icon-shoucang1', unicode: '' },
  { name: '', class: 'icon-shangcheng', unicode: '' },
  { name: '', class: 'icon-a-8Gxiancun', unicode: '' },
  { name: '', class: 'icon-wifi', unicode: '' },
  { name: '', class: 'icon-a-Ultra7', unicode: '' },
  { name: '', class: 'icon-jianpan', unicode: '' },
  { name: '', class: 'icon-bianji1', unicode: '' },
  { name: '', class: 'icon-guanbi', unicode: '' },
  { name: '', class: 'icon-jubao', unicode: '' },
  { name: '', class: 'icon-lianjie', unicode: '' },
  { name: '', class: 'icon-guanli', unicode: '' },
  { name: '', class: 'icon-duihua', unicode: '' },
  { name: '', class: 'icon-pengyouquan', unicode: '' },
  { name: '', class: 'icon-pinglun', unicode: '' },
  { name: '', class: 'icon-shezhi', unicode: '' },
  { name: '', class: 'icon-shangchuan', unicode: '' },
  { name: '', class: 'icon-shuaxin', unicode: '' },
  { name: '', class: 'icon-shanchu', unicode: '' },
  { name: '', class: 'icon-tupian', unicode: '' },
  { name: '', class: 'icon-QQ', unicode: '' },
  { name: '', class: 'icon-xiazai1', unicode: '' },
  { name: '', class: 'icon-weibo', unicode: '' },
  { name: '', class: 'icon-shoucang', unicode: '' },
  { name: '', class: 'icon-QQkongjian', unicode: '' },
  { name: '', class: 'icon-weixin', unicode: '' },
  { name: '', class: 'icon-zhuanfa', unicode: '' },
  { name: '', class: 'icon-image-text', unicode: '' },
  { name: '', class: 'icon-layers', unicode: '' },
  { name: '', class: 'icon-lock', unicode: '' },
  { name: '', class: 'icon-modular', unicode: '' },
  { name: '', class: 'icon-mobile-phone', unicode: '' },
  { name: '', class: 'icon-picture', unicode: '' },
  { name: '', class: 'icon-pin', unicode: '' },
  { name: '', class: 'icon-save', unicode: '' },
  { name: '', class: 'icon-toggle-left', unicode: '' },
  { name: '', class: 'icon-toggle-right', unicode: '' },
  { name: '', class: 'icon-3column', unicode: '' },
  { name: '', class: 'icon-column-4', unicode: '' },
  { name: '', class: 'icon-add', unicode: '' },
  { name: '', class: 'icon-add-circle', unicode: '' },
  { name: '', class: 'icon-arrow-up-circle', unicode: '' },
  { name: '', class: 'icon-arrow-right-circle', unicode: '' },
  { name: '', class: 'icon-arrow-right', unicode: '' },
  { name: '', class: 'icon-arrow-double-left', unicode: '' },
  { name: '', class: 'icon-arrow-left-circle', unicode: '' },
  { name: '', class: 'icon-arrow-double-right', unicode: '' },
  { name: '', class: 'icon-camera', unicode: '' },
  { name: '', class: 'icon-chart-bar', unicode: '' },
  { name: '', class: 'icon-attachment', unicode: '' },
  { name: '', class: 'icon-code', unicode: '' },
  { name: '', class: 'icon-cut', unicode: '' },
  { name: '', class: 'icon-data-view', unicode: '' },
  { name: '', class: 'icon-direction-right', unicode: '' },
  { name: '', class: 'icon-direction-up', unicode: '' },
  { name: '', class: 'icon-discount', unicode: '' },
  { name: '', class: 'icon-direction-left', unicode: '' },
  { name: '', class: 'icon-download', unicode: '' },
  { name: '', class: 'icon-drag', unicode: '' },
  { name: '', class: 'icon-elipsis', unicode: '' },
  { name: '', class: 'icon-edit', unicode: '' },
  { name: '', class: 'icon-email', unicode: '' },
  { name: '', class: 'icon-error', unicode: '' },
  { name: '', class: 'icon-film', unicode: '' },
  { name: '', class: 'icon-fabulous', unicode: '' },
  { name: '', class: 'icon-biaoqing', unicode: '' },
  { name: '', class: 'icon-fanhui', unicode: '' },
  { name: '', class: 'icon-dingwei', unicode: '' },
  { name: '', class: 'icon-cha', unicode: '' },
  { name: '', class: 'icon-gengduo', unicode: '' },
  { name: '', class: 'icon-bofang1', unicode: '' },
  { name: '', class: 'icon-gou1', unicode: '' },
  { name: '', class: 'icon-jiahao', unicode: '' },
  { name: '', class: 'icon-gou2', unicode: '' },
  { name: '', class: 'icon-guanji', unicode: '' },
  { name: '', class: 'icon-biyan', unicode: '' },
  { name: '', class: 'icon-quanxiangyou', unicode: '' },
  { name: '', class: 'icon-quanxiangzuo', unicode: '' },
  { name: '', class: 'icon-quangou', unicode: '' },
  { name: '', class: 'icon-taiyang', unicode: '' },
  { name: '', class: 'icon-tishi', unicode: '' },
  { name: '', class: 'icon-tianxie', unicode: '' },
  { name: '', class: 'icon-wenjian', unicode: '' },
  { name: '', class: 'icon-suoxiao', unicode: '' },
  { name: '', class: 'icon-xiangzuo', unicode: '' },
  { name: '', class: 'icon-xiangxia', unicode: '' },
  { name: '', class: 'icon-xiazai', unicode: '' },
  { name: '', class: 'icon-a-xiangxia2', unicode: '' },
  { name: '', class: 'icon-wujiaoxing', unicode: '' },
  { name: '', class: 'icon-xin', unicode: '' },
  { name: '', class: 'icon-a-xiangshang2', unicode: '' },
  { name: '', class: 'icon-xinxi', unicode: '' },
  { name: '', class: 'icon-xiangyou', unicode: '' },
  { name: '', class: 'icon-yueliang', unicode: '' },
  { name: '', class: 'icon-daima', unicode: '' },
  { name: '', class: 'icon-caidan', unicode: '' },
  { name: '', class: 'icon-zhankai', unicode: '' },
  { name: '', class: 'icon-shouqi', unicode: '' },
  { name: '', class: 'icon-zuoxuanzhuan', unicode: '' },
  { name: '', class: 'icon-suoxiao1', unicode: '' },
  { name: '', class: 'icon-quanjia', unicode: '' },
  { name: '', class: 'icon-jingbao', unicode: '' },
  { name: '', class: 'icon-yifu', unicode: '' },
  { name: '', class: 'icon-wenjianjiajia', unicode: '' },
  { name: '', class: 'icon-bangong', unicode: '' },
  { name: '', class: 'icon-bofang', unicode: '' },
  { name: '', class: 'icon-bianji', unicode: '' },
  { name: '', class: 'icon-anquanrenzheng', unicode: '' },
  { name: '', class: 'icon-baomirenyuan', unicode: '' },
  { name: '', class: 'icon-bangongqu', unicode: '' },
  { name: '', class: 'icon-chucha', unicode: '' },
  { name: '', class: 'icon-gongsi', unicode: '' },
  { name: '', class: 'icon-fenxiang2', unicode: '' },
  { name: '', class: 'icon-zujian', unicode: '' },
  // { name: '', class: 'icon-qingchu', unicode: '' },
  // { name: '', class: 'icon-zoumadeng', unicode: '' },
  // { name: '', class: 'icon-shuxing', unicode: '' },
  { name: '', class: 'icon-tiaojianfenzu', unicode: '' },
  { name: '', class: 'icon-dianlinengyuan', unicode: '' },
  { name: '', class: 'icon-AloT', unicode: '' },
  { name: '', class: 'icon-NAS', unicode: '' },
  { name: '', class: 'icon-a-100xianshi', unicode: '' },
  // { name: '', class: 'icon-quanfutuichu', unicode: '' },
  // { name: '', class: 'icon-quanfuxianshi', unicode: '' },
  // { name: '', class: 'icon-gonggeshitu', unicode: '' },
  // { name: '', class: 'icon-shouji', unicode: '' },
  // { name: '', class: 'icon-a-kapianquanbupuman', unicode: '' },
  { name: '', class: 'icon-quanping', unicode: '' },
  // { name: '', class: 'icon-a-angaodupuman', unicode: '' },
  // { name: '', class: 'icon-a-ankuandupuman', unicode: '' },
  // { name: '', class: 'icon-tuichuquanping', unicode: '' },
  { name: '', class: 'icon-bangzhuwendang', unicode: '' },
  { name: '', class: 'icon-biaoge', unicode: '' },
  // { name: '', class: 'icon-bianliang', unicode: '' },
  // { name: '', class: 'icon-biaoqian', unicode: '' },
  // { name: '', class: 'icon-chuizhibuju', unicode: '' },
  // { name: '', class: 'icon-daima1', unicode: '' },
  { name: '', class: 'icon-buju', unicode: '' },
  // { name: '', class: 'icon-caidan1', unicode: '' },
  { name: '', class: 'icon-canshushezhi', unicode: '' },
  { name: '', class: 'icon-dianji', unicode: '' },
  // { name: '', class: 'icon-dianzan1', unicode: '' },
  // { name: '', class: 'icon-erweima', unicode: '' },
  { name: '', class: 'icon-chuli', unicode: '' },
  { name: '', class: 'icon-fenggeyangshi', unicode: '' },
  // { name: '', class: 'icon-gongxiang', unicode: '' },
  // { name: '', class: 'icon-kongjian', unicode: '' },
  // { name: '', class: 'icon-huizhi', unicode: '' },
  // { name: '', class: 'icon-a-fuwuqiguanli', unicode: '' },
  // { name: '', class: 'icon-a-jiediankongzhi', unicode: '' },
  { name: '', class: 'icon-a-liebiaozhankai', unicode: '' },
  // { name: '', class: 'icon-a-liebiaoshouqi', unicode: '' },
  // { name: '', class: 'icon-renwu', unicode: '' },
  { name: '', class: 'icon-peizhiguanli', unicode: '' },
  // { name: '', class: 'icon-shuipingbuju', unicode: '' },
  // { name: '', class: 'icon-shijianxian', unicode: '' },
  // { name: '', class: 'icon-xingbie', unicode: '' },
  // { name: '', class: 'icon-xuanzhuan', unicode: '' },
  { name: '', class: 'icon-icon-test15', unicode: '' },
  { name: '', class: 'icon-icon-test14', unicode: '' },
  { name: '', class: 'icon-icon-test13', unicode: '' },
  { name: '', class: 'icon-icon-test12', unicode: '' },
  { name: '', class: 'icon-icon-test11', unicode: '' },
  { name: '', class: 'icon-icon-test10', unicode: '' },
  { name: '', class: 'icon-icon-test9', unicode: '' },
  { name: '', class: 'icon-icon-test8', unicode: '' },
  { name: '', class: 'icon-icon-test7', unicode: '' },
  { name: '', class: 'icon-icon-test6', unicode: '' },
  { name: '', class: 'icon-icon-test5', unicode: '' },
  { name: '', class: 'icon-icon-test4', unicode: '' },
  { name: '', class: 'icon-icon-test3', unicode: '' },
  { name: '', class: 'icon-icon-test2', unicode: '' },
  { name: '', class: 'icon-icon-test1', unicode: '' },
  { name: '', class: 'icon-icon-test', unicode: '' },
  { name: '', class: 'icon-a-huabuquseqi2' },
  { name: '', class: 'icon-jishuqi' },
  { name: '', class: 'icon-fuxuankuangduoge' },
  { name: '', class: 'icon-riqixuanzeqi' },
  { name: '', class: 'icon-shijianxuanzeqi1' },
  { name: '', class: 'icon-slider' },
  { name: '', class: 'icon-shurukuang' },
  { name: '', class: 'icon-danxuankuang' },
  { name: '', class: 'icon-shijianxuanzeqi' },
  { name: '', class: 'icon-ananniu' },
  { name: '', class: 'icon-xialakuang' },
  { name: '', class: 'icon-pingfen' },
  { name: '', class: 'icon-kaiguan' },
  { name: '', class: 'icon-jilianxuanze' },
  { name: '', class: 'icon-xiangshangjiantou' },
  { name: '', class: 'icon-gudingkuandu' },
  { name: '', class: 'icon-dengbigaodupumankegundong--xianxing' },
  { name: '', class: 'icon-dagou1' },
  { name: '', class: 'icon-yueliang1' },
  { name: '', class: 'icon-sousuo' }
]

const copyIconClass = (iconClass: string) => {
  const formattedClass = `<i class="iconfont ${iconClass}" />`
  navigator.clipboard
    .writeText(formattedClass)
    .then(() => {
      ElMessage.success('复制成功')
    })
    .catch((err) => {
      ElMessage.error('复制失败: ' + err)
    })
}

const searchIcon = (searchValue: string) => {
  return iconList.filter((icon) => icon.class.includes(searchValue))
}

const iconSize = ref('30px')
const iconColor = ref('#000000')
const iconArrange = ref('grid')
const searchValue = ref('')

const filteredIcons = computed(() => {
  return searchValue.value ? searchIcon(searchValue.value) : iconList
})

const changeArrange = (arrange: string) => {
  iconArrange.value = arrange
}
</script>

<template>
  <el-card style="margin-bottom: 20px">
    <MasonSearchFormFilter
      ref="masonSearchFormFilterRef"
      :label-width="100"
      :is-show-fold-unfold-btn="false"
      :is-show-search-btn="false"
    >
      <template #default>
        <MasonSearchFormFilterItem>
          <el-form-item label="标题:" prop="title">
            <el-input v-model="searchValue" clearable placeholder="请输入搜索关键词" />
          </el-form-item>
        </MasonSearchFormFilterItem>
        <MasonSearchFormFilterItem>
          <el-form-item label="图标大小:" prop="size">
            <el-select v-model="iconSize" placeholder="请选择">
              <el-option label="20px" value="20px" />
              <el-option label="30px" value="30px" />
              <el-option label="40px" value="40px" />
            </el-select>
          </el-form-item>
        </MasonSearchFormFilterItem>
        <MasonSearchFormFilterItem>
          <el-form-item label="图标颜色:" prop="color">
            <el-color-picker v-model="iconColor" />
          </el-form-item>
        </MasonSearchFormFilterItem>
        <MasonSearchFormFilterItem>
          <el-form-item label="排列方式:" prop="arrange">
            <el-radio-group v-model="iconArrange" @change="changeArrange">
              <el-radio label="grid">网格</el-radio>
              <el-radio label="list">列表</el-radio>
            </el-radio-group>
          </el-form-item>
        </MasonSearchFormFilterItem>
      </template>
    </MasonSearchFormFilter>
  </el-card>
  <el-row style="margin-bottom: 20px">
    <el-button type="info" plain @click="copyIconClass('all')">复制所有图标</el-button>
  </el-row>
  <el-card>
    <div
      class="icon-view p-[10px] rounded-[5px]"
      :class="{
        'grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[10px]': iconArrange === 'grid',
        'flex flex-wrap': iconArrange === 'list'
      }"
    >
      <!-- 图标列表 -->
      <template v-for="item in filteredIcons" :key="item.class">
        <div class="icon-wrapper" @click="copyIconClass(item.class)">
          <i
            :class="['iconfont', item.class]"
            :style="{ fontSize: iconSize, color: iconColor }"
          ></i>
          <el-text truncated class="class">{{ item.class }}</el-text>
        </div>
      </template>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.icon-view {
  .icon-wrapper {
    cursor: pointer;
    border: 1px solid #8f8e8e;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5px;
    &:hover {
      background-color: #f5f5f5;
    }
    i {
      font-size: 30px;
    }
    .class {
      font-size: 12px;
    }
  }
}

.dark {
  .icon-view {
    .icon-wrapper {
      background-color: transparent;
      &:hover {
        background-color: #303030;
      }
    }
  }
}
</style>
