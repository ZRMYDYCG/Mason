<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
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
  { name: '', class: 'icon-jilianxuanze' }
]

const props = defineProps<{
  /*弹出框标题*/
  title: string
  /*控制弹出框显示与隐藏*/
  visible: boolean
}>()

const emits = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => {
    emits('update:visible', value)
  }
})

const handleClick = () => {
  dialogVisible.value = !dialogVisible.value
}

const handleSelectItem = (iconClass: string) => {
  const formattedClass = `<i class="iconfont ${iconClass}" />`
  navigator.clipboard
    .writeText(formattedClass)
    .then(() => {
      ElMessage.success('复制成功')
    })
    .catch((err) => {
      ElMessage.error('复制失败: ' + err)
    })
  emits('update:visible', false)
}
</script>

<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <el-dialog :title="title" v-model="dialogVisible">
    <el-scrollbar height="400">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <div
          v-for="(item, index) in iconList"
          :key="index"
          class="flex flex-col items-center justify-center cursor-pointer p-4 bg-gray-100 border border-gray-300 rounded"
          @click="handleSelectItem(item.class)"
        >
          <i :class="['text-2xl mb-1', `iconfont ${item.class}`]"></i>
          <div>{{ item.class }}</div>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<style scoped></style>
