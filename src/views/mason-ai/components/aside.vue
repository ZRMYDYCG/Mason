<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

const foldStatus = ref(true)

const chatHistory = ref([
  {
    timeTitle: '昨天',
    chats: [
      { title: 'Vue实现侧边栏展开动画', id: 'chat-1' },
      { title: 'Vue侧边栏滑入过渡动画实现', id: 'chat-2' },
      { title: 'Vue生成二维码插件推荐', id: 'chat-3' }
    ]
  },
  {
    timeTitle: '7 天内',
    chats: [
      { title: 'Vue3复刻Ant Design Welcome组件', id: 'chat-4' },
      { title: 'Vue3+TS+SCSS复刻Welcome组件', id: 'chat-5' },
      { title: 'Vue3+TS+ElementPlus首屏加载优化方案', id: 'chat-6' }
    ]
  },
  {
    timeTitle: '30 天内',
    chats: [
      { title: 'Vue3+TS项目配置Vitest测试', id: 'chat-7' },
      { title: 'Vue3项目集成Vitest指南', id: 'chat-8' },
      { title: 'Element Plus消息组件封装使用示例', id: 'chat-9' }
    ]
  }
])
const searchText = ref('')
</script>

<template>
  <div class="aside-container">
    <div class="fold-sidebar" v-if="foldStatus">
      <div class="sidebar-header">
        <div class="logo">
          <img src="/ai.svg" alt="logo" />
        </div>
        <el-tooltip content="展开/收起侧边栏" placement="right">
          <i class="iconfont icon-unfold" @click="foldStatus = !foldStatus"></i>
        </el-tooltip>
        <el-tooltip content="创建新会话" placement="right">
          <i class="iconfont icon-kaiqixinhuihua"></i>
        </el-tooltip>
      </div>
      <div class="sidebar-footer">
        <el-popover trigger="hover" placement="right" width="auto">
          <template #reference>
            <i class="iconfont icon-shouji1"></i>
          </template>
          <qrcode-vue
            value="https://pic1.imgdb.cn/item/67d105e6066befcec6e39e31.jpg"
            :size="180"
            level="H"
            foreground="#000"
          />
        </el-popover>
        <el-avatar
          src="https://pic1.imgdb.cn/item/67d105e6066befcec6e39e31.jpg"
          size="small"
        ></el-avatar>
      </div>
    </div>
    <transition name="slide">
      <div class="unfold-sidebar" v-if="!foldStatus">
        <div class="sidebar-header">
          <div class="title">Mason AI</div>
          <i class="iconfont icon-a-liebiaozhankai" @click="foldStatus = !foldStatus" />
        </div>

        <div class="new-chat-btn">
          <div class="btn-content">
            <i class="iconfont icon-kaiqixinhuihua"></i>
            <span>开启新对话</span>
          </div>
        </div>

        <div class="chat-history">
          <div class="time-group" v-for="(timeGroup, index) in chatHistory" :key="index">
            <div class="time-title">{{ timeGroup.timeTitle }}</div>
            <div class="chat-item" v-for="chat in timeGroup.chats" :key="chat.id">
              <div class="chat-title">{{ chat.title }}</div>
              <div class="action-icon">
                <i class="iconfont icon-gengduo" />
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-footer">
          <div class="search-box">
            <i class="iconfont icon-sousuo" />
            <input type="text" placeholder="搜索历史记录" v-model="searchText" />
          </div>
          <div class="user-profile">
            <div class="avatar-wrapper">
              <el-avatar
                :size="32"
                src="https://pic1.imgdb.cn/item/67d105e6066befcec6e39e31.jpg"
              ></el-avatar>
            </div>
            <div class="username">一勺</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.aside-container {
  height: 100%;
  overflow: hidden;

  .fold-sidebar {
    width: 80px;
    height: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #f9fbff;

    .sidebar-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      .logo {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .sidebar-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;

      .el-avatar {
        cursor: pointer;
      }
    }

    .iconfont {
      font-size: 24px;
      cursor: pointer;
      color: #666;
      transition: color 0.3s;

      &:hover {
        color: #4d6bfe;
      }
    }
  }

  .unfold-sidebar {
    width: 260px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f9fbff;

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 20px;
      border-bottom: 1px solid #eee;

      .title {
        font-size: 20px;
        font-weight: 600;
        color: #333;
      }

      .iconfont {
        font-size: 22px;
        color: #666;
        cursor: pointer;

        &:hover {
          color: #4d6bfe;
        }
      }
    }

    .new-chat-btn {
      padding: 0 16px;
      margin: 15px 0;

      .btn-content {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        background-color: rgba(77, 107, 254, 0.1);
        border-radius: 12px;
        color: #4d6bfe;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: rgba(77, 107, 254, 0.2);
        }

        .iconfont {
          margin-right: 8px;
          font-size: 18px;
        }

        span {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }

    .chat-history {
      flex: 1;
      overflow: auto;
      padding: 0 10px;

      .time-group {
        margin: 15px 0;

        .time-title {
          color: #666;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 12px;
          background-color: rgba(245, 245, 245, 0.8);
          backdrop-filter: blur(4px);
          position: sticky;
          top: 0;
          z-index: 1;
        }

        .chat-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          margin: 4px 0;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: rgba(245, 245, 245, 0.8);

            .action-icon {
              opacity: 1;
            }
          }

          .chat-title {
            flex: 1;
            font-size: 14px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .action-icon {
            opacity: 0;
            transition: opacity 0.3s;
            color: #999;
            padding: 4px;

            &:hover {
              color: #4d6bfe;
            }
          }
        }
      }
    }

    .sidebar-footer {
      border-top: 1px solid #eee;
      padding: 8px;

      .search-box {
        position: relative;
        margin: 12px 16px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

        .iconfont {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          font-size: 16px;
          z-index: 1;
        }

        input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border: 1px solid #eee;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s;
          background: transparent;

          &:focus {
            border-color: #4d6bfe;
            box-shadow: 0 0 0 3px rgba(77, 107, 254, 0.1);
            outline: none;
          }

          &::placeholder {
            color: #999;
          }
        }
      }

      .user-profile {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: rgba(245, 245, 245, 0.8);
        }

        .avatar-wrapper {
          width: 32px;
          height: 32px;
        }

        .username {
          margin-left: 12px;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
  }
}
</style>
