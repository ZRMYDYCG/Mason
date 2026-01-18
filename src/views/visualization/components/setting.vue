<script setup lang="ts">
import { useViewStore } from '@/store/modules/view.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const isScaleRadio = ref(false)
const leftBottomRadio = ref(true)
const rightBottomRadio = ref(true)
const viewStore = useViewStore()
const { indexConfig } = storeToRefs(viewStore)

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })

const init = () => {
  viewStore.initSetting()
  isScaleRadio.value = viewStore.isScale

  leftBottomRadio.value = indexConfig.value.leftBottomSwiper
  rightBottomRadio.value = indexConfig.value.rightBottomSwiper
}
init()

const handleClose = () => {
  router.push('/')
  viewStore.setSettingShow(false)
}

const cancelClick = () => {
  viewStore.setSettingShow(false)
}

const confirmClick = () => {
  viewStore.setSettingShow(false)
}
const isScaleChange = (flag: boolean) => {
  viewStore.setIsScale(flag)
}
const radiochange = (blag: boolean) => {
  viewStore.setIsScale(blag)
  // this.$store.commit('setting/updateSwiper', { val, type })
}
const indexRadioChange = (flag: boolean) => {
  viewStore.setIndexConfig({
    leftBottomSwiper: leftBottomRadio.value, //左轮播
    rightBottomSwiper: rightBottomRadio.value //右下轮播
  })
}
</script>

<template>
  <el-drawer v-model="viewStore.settingShow" direction="rtl" size="360px">
    <template #header>
      <h2 class="setting-title">{{ t('visualization.setting.title') }}</h2>
    </template>
    <template #default>
      <div class="left_shu">{{ t('visualization.setting.global') }}</div>
      <div class="setting_item">
        <span class="setting_label"
          >{{ t('visualization.setting.autoFit')
          }}<span class="setting_label_tip">({{ t('visualization.setting.autoFitTip') }})</span
          >:</span
        >
        <div class="setting_content">
          <el-radio-group v-model="isScaleRadio" @change="(flag) => isScaleChange(flag as boolean)">
            <el-radio :label="true">{{ t('visualization.setting.yes') }}</el-radio>
            <el-radio :label="false">{{ t('visualization.setting.no') }}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="left_shu">{{ t('visualization.setting.realtime') }}</div>
      <div class="setting_item">
        <span class="setting_label">{{ t('visualization.setting.activityAutoScroll') }}:</span>
        <div class="setting_content">
          <el-radio-group
            v-model="leftBottomRadio"
            @change="(flag) => indexRadioChange(flag as boolean)"
          >
            <el-radio :label="true">{{ t('visualization.setting.yes') }}</el-radio>
            <el-radio :label="false">{{ t('visualization.setting.no') }}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="setting_item">
        <span class="setting_label"> {{ t('visualization.setting.eventAutoScroll') }}: </span>
        <div class="setting_content">
          <el-radio-group
            v-model="rightBottomRadio"
            @change="(flag) => indexRadioChange(flag as boolean)"
          >
            <el-radio :label="true">{{ t('visualization.setting.yes') }}</el-radio>
            <el-radio :label="false">{{ t('visualization.setting.no') }}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="left_shu">{{ t('visualization.setting.exit') }}:</div>
      <div class="setting_item">
        <div class="setting_content">
          <el-button type="primary" @click="handleClose">{{
            t('visualization.setting.exitButton')
          }}</el-button>
        </div>
      </div>
    </template>
    <!-- <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template> -->
  </el-drawer>
</template>

<style scoped>
.setting-title {
  font-size: 20px;
  color: #000;
  font-weight: 900;
  text-align: center;
  line-height: 1;
}
.left_shu {
  color: #000;
  font-weight: 900;
  position: relative;
  text-indent: 10px;
  padding: 16px 0 10px 0;
  line-height: 1;
  &::before {
    display: block;
    content: ' ';
    height: 16px;
    width: 4px;
    border-radius: 2px;
    background: #0072ff;
    position: absolute;
    left: 0px;
  }
}
.setting_item {
  font-size: 14px;
  line-height: 1.5;

  // display: flex;
  .setting_label {
    color: #555454;
  }
  .setting_label_tip {
    font-size: 12px;
    color: #838282;
  }
}
</style>
