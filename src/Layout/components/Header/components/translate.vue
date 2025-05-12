<template>
  <el-dropdown placement="bottom" trigger="click" @command="handleCommand">
    <i class="iconfont icon-fanyi"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh">
          <div class="language-item">
            <svg
              t="1747044947068"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="27177"
              width="200"
              height="200"
            >
              <path
                d="M7.450557 182.312865h1009.098886v659.37427H7.450557z"
                fill="#E60012"
                p-id="27178"
              ></path>
              <path
                d="M409.329071 350.289053l32.285745-11.853158 21.222798 27.20582-1.354646-34.317715 32.398633-11.740272-33.075957-9.482526-1.128872-34.430603-19.190828 28.673354-33.075956-9.595414 21.222798 27.092934zM273.18708 431.454966l-34.656378-107.129974-34.54349 107.129974-112.548561-0.112887 91.212876 65.926138-34.995039 107.017088 90.874214-66.377687 90.987102 66.377687-34.995039-107.017088 91.212876-65.926138zM536.552971 435.857568v34.430603l20.093926-27.883144 32.737294 10.611399-20.206813-27.770257 20.206813-27.770257-32.737294 10.724286-20.093926-27.883144v34.430603l-32.737295 10.498512zM596.383199 566.242311l-34.430603 0.112887-10.498512-32.737295-10.611399 32.737295-34.430603-0.112887 27.883145 20.206813-10.724287 32.737294 27.883144-20.3197 27.770257 66.377687-10.724286-32.737294zM461.37008 673.823834v-34.317716l-20.093925 27.883144-32.737295-10.724286 20.206813 27.770257-20.206813 27.883144 32.737295-10.724286 20.093925 27.883144v-34.430603l32.737295-10.611399z"
                fill="#FFF100"
                p-id="27179"
              ></path>
            </svg>
            <span>中文</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="en">
          <div class="language-item">
            <svg
              t="1747044637126"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="24749"
              width="200"
              height="200"
            >
              <path d="M23.273 141.964h977.454V793.6H23.273z" fill="#083F80" p-id="24750"></path>
              <path d="M23.273 370.036h977.454V563.2H23.273z" fill="#FFFFFF" p-id="24751"></path>
              <path
                d="M605.347 140.428v651.636H412.183V140.428z"
                fill="#FFFFFF"
                p-id="24752"
              ></path>
              <path
                d="M1000.727 721.455V793.6H884.364L23.273 221.09v-79.126h114.036z"
                fill="#FFFFFF"
                p-id="24753"
              ></path>
              <path
                d="M1000.727 214.11v-72.146H884.364L23.273 712.145V793.6h114.036z"
                fill="#FFFFFF"
                p-id="24754"
              ></path>
              <path
                d="M23.273 193.164l262.982 176.872h79.127L23.272 141.964z m977.454 546.909L737.745 563.2h-79.127l342.11 230.4zM605.091 351.418v18.618h51.2l344.436-228.072h-86.109zM418.909 584.145V563.2h-51.2L23.273 793.6h86.109z m34.909-442.181h114.037V793.6H453.818z"
                fill="#B7333C"
                p-id="24755"
              ></path>
              <path d="M20.852 524.59V410.555h979.782v114.037z" fill="#B7333C" p-id="24756"></path>
            </svg>
            <span>English</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/setting'
import { useRouter } from 'vue-router'

const settingStore = useSettingStore()
const router = useRouter()

const handleCommand = (command: 'zh' | 'en') => {
  settingStore.setLanguage(command)
  // settingStore.setRefresh()
  router.go(0)
}
</script>

<style scoped lang="scss">
$mason-grey-300-rgb: rgb(245, 245, 245) !default;

i {
  display: block;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: var(--mason-grey-700);
    background-color: rgb($mason-grey-300-rgb, 0.5);
    font-weight: bold;
  }
}

.language-item {
  display: flex;
  gap: 8px;
  align-items: center;
  svg {
    width: 24px;
    height: 20px;
  }
}
</style>
