<template>
  <div class="camera-container">
    <div class="camera-header">
      <a href="https://open.ys7.com/cn/s/index" class="website-link">萤石官网</a>
    </div>
    <div id="video-container" ref="video" class="video-player"></div>
    <div class="control-buttons">
      <el-button round @click="directionControl(4)"></el-button>
      <el-button round @click="directionControl(0)"></el-button>
      <el-button round @click="directionControl(6)"></el-button>
      <el-button round @click="directionControl(2)"></el-button>
      <el-button round @click="stopTurn"></el-button>
      <el-button round @click="directionControl(3)"></el-button>
      <el-button round @click="directionControl(5)"></el-button>
      <el-button round @click="directionControl(1)"></el-button>
      <el-button round @click="directionControl(7)"></el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EZUIKit from 'ezuikit-js'
import axios from 'axios'

const eZUIKitPlayer = ref(null)
const accessToken = ref('at.b9gmdwigbm5mflgz31jb3klt6xtkg4o8-969x4vlalu-1y13due-0ysxiezfw')
// docs:https://open.ys7.com/help/2837
const accessUrl = ref('rtmp://live-hdl.ys7.com/live/F6293ADF88')

// 初始化萤石云视频对接
const initEZUIKitPlayer = () => {
  eZUIKitPlayer.value = new EZUIKit.EZUIKitPlayer({
    id: 'video-container',
    accessToken: accessToken.value,
    url: accessUrl.value,
    header: ['capturePicture', 'save', 'zoom'],
    footer: ['fullScreen'],
    width: 375,
    height: 257,
    autoplay: true,
    audio: 1,
    template: 'simple'
  })
}

// 组件挂载后初始化播放器
onMounted(() => {
  initEZUIKitPlayer()
})

// 停止控制云台
const stopTurn = () => {
  axios
    .post('https://open.ys7.com/api/lapp/device/ptz/stop', null, {
      params: {
        accessToken: accessToken.value,
        channelNo: 1, // 通道号
        deviceSerial: 'F6293ADF88' //序列号
      },
      timeout: 2000
    })
    .then((res) => {
      if (res.data.code === '60000') {
        console.log(res.data.msg) // 假设你有全局的消息组件或类似的东西来显示消息
      }
    })
}

// 云平台控制
const directionControl = (num) => {
  axios
    .post('https://open.ys7.com/api/lapp/device/ptz/start', null, {
      params: {
        accessToken: accessToken.value, // accesstoken码，一般一周过期
        speed: 2, // 旋转速度
        direction: num, // 方向，传入数字，对应数字在api文档有
        channelNo: 1, // 通道号
        deviceSerial: 'F6293ADF88' // 序列号
      },
      timeout: 2000
    })
    .then((res) => {
      if (res.data.code === '60000') {
        console.log(res.data.msg) // 同上，需要一个消息提示机制
      }
    })
}
</script>

<style scoped>
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.camera-header {
  margin-bottom: 20px;
}

.website-link {
  color: #409eff;
  text-decoration: none;
}

.website-link:hover {
  text-decoration: underline;
}

.video-player {
  width: 375px;
  height: 257px;
  background-color: #fff;
  margin-bottom: 20px;
}

.control-buttons {
  margin-top: 20px;
}
</style>
