<h2 align="center" style="font-size: 40px; font-weight: bold; background: linear-gradient(45deg, #ff1c68, #f3a8ff, #ffffff, #89ff94, #ff1c68, #f3a8ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Mason • Admin</h2>

<div align="center">
  <a href="https://github.com/ZRMYDYCG/Mason">
    <img src="/public/favicon.svg" alt="Mason Admin" width="90" class="logo" />
  </a>
</div>

<p align="center">🚀 基于Vue3、TypeScript、Element-Plus的中后台管理系统组件解决方案 | 开箱即用的设计体系</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.4.21-green.svg?style=flat-square&logo=vue.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.4.5-3178C6.svg?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Sass-1.75.0-CC6699.svg?style=flat-square&logo=sass" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0.15-06B6D4.svg?style=flat-square&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Vite-6.2.3-646CFF.svg?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-3.0.9-FCC72B.svg?style=flat-square&logo=vitest" />
</p>

![image](http://mason.versakit.online/assets/58e3ab0766b0de0dceef36538324953a.HHSZJMqc.png)

![image](http://mason.versakit.online/assets/9de1355482ab4fa61bb7cfcc219d1d7d.CIK0cxKs.png)

![image](http://mason.versakit.online/assets/8e908860ca2b4fd8f3e8e3b3f44fe608.DNrMdkgj.png)

## 🎇 设计

RBAC 权限设计部分以及系统设置部分、日志管理、个人中心, 进行前后端分离, 系统设置部分如下：

- 账号设置
- 角色设置
- 菜单设置
- 部门设置

其余部分不进行前后端分离设计

## 🚀 Mason CLI

**Mason CLI** 是专为 **Mason Admin** 打造的工程化脚手架，旨在解决市面上后台管理模板封装过深、业务Hook过度抽象导致的开发痛点。

### 业务背景

1.  **拒绝过度封装**：市面上的后台管理模板往往封装太深，导致二次开发困难。Mason CLI 致力于提供一个轻量、灵活的初始化模板，避免过度抽象，让开发者能够更专注于业务逻辑。在 AI 辅助编程普及的今天，清晰直观的代码结构比复杂的黑盒封装更重要。
2.  **最佳实践集成**：Vite 官方模板虽然简洁，但缺乏中后台业务所需的架构实践。Mason CLI 集成了经过验证的工程化配置和业务架构，填补了这一空白。

### 核心亮点

- **标准化工具链**：基于 **Lefthook**、**ESLint v9**、**Prettier**、**Stylelint**、**Commitlint**、**Commitizen**、**lint-staged**、**Plop** 构建，确保代码风格统一和提交规范。
- **一键初始化**：快速生成标准化的 Vue 3 + TypeScript 项目结构。
- **模块化生成**：支持快速创建组件、视图和 Store 模块，减少样板代码。

👉 [查看 Mason CLI 文档]()

## 国际化版本

项目底层业务架构正在迁移中到新的业务模板，迁移完成后会推出国际化版本。

新业务模板分支：[Mason-Admin-Template](https://github.com/ZRMYDYCG/Mason/tree/template)

## 关于服务端

目前正在重构为 nest, Koa2 版本在当前 next 分支仓库中。

## ✨ 特性

- 🏗 **模块化架构**：按需加载，灵活组合
- 🎨 **主题定制**：支持动态切换主题与自定义样式变量
- 📦 **开箱即用**：集成常用中后台业务组件与布局方案
- 📱 **响应式设计**：适配桌面/平板/手机端
- 🔐 **权限集成**：内置RBAC权限控制组件
- 📊 **数据可视化**：集成Echarts图表解决方案
- 🌍 **国际化**：支持多语言切换（简体中文/English）（该仓库并不支持，后续会单开一个仓库来提供一个国际化版本）
- 🛠 **TypeScript**：完整的类型定义支持
- ⚡ **全栈开发**：前端 Vue 3 + Vite + PostCSS，后端 Koa 2 + MySQL + Sequelize

## 🦄 功能

- 内置后台管理系统常用模块
- 主题定制
- 权限控制
- 图表组件
- 灵动布局
- 响应式设计
- 登录加密
- 七天登录
- 多标签页
- 数据大屏（基于 vue-echarts 插件方案）
- 直接使用 echarts（抽取了 useEcharts 钩子）
- 全局面包屑
- 国际化
- 异常处理
- Utils工具类
- 亮色 / 暗色 侧边栏
- 浅色主题 / 暗黑主题
- 可折叠侧边栏
- 支持内嵌页面
- 重载当前页面
- 动态路由支持自动重载
- 支持多级路由嵌套及菜单栏嵌套
- 分离路由与菜单设置
- 富文本编辑器
- 持久化存储方案
- 自定义登录重定向
- 基于plop的代码模板生成器

## 🌿 组合函数

- useTheme: 设置主题切换
- useDialog: 函数式弹窗
- useMessage: 函数式消息提示
- useLoading: 函数式加载中
- usePermission: 权限控制
- useEcharts: Echarts 的较为完善的封装
- useCurrentInstance: 获取当前实例, 统一调用方式
- useClipboard: 复制到粘贴板
- usePageTitle: 设置页面标题
- useResizable: 可拖动调整大小
  - 拖动过程中可以禁止页面文字选中
- useTable
  - 自动数据加载：通过 autoLoad 参数控制是否自动加载数据
  - 防抖控制：通过 debounce 参数设置请求防抖时间
  - 分页管理：自动处理分页参数变化
  - 排序支持
  - 查询管理
  - 所有参数都是响应式的，可以轻松组合使用
  - 内置错误处理机制
  - 支持自定义初始参数和分页布局
- useForm
  - 提供formProps对象可直接v-bind绑定到el-form
  - 内置提交防抖功能，防止重复提交
  - 集成加载状态和错误信息管理
  - 封装验证逻辑，统一错误处理
  - 提供validate、resetFields等常用方法
  - 支持动态规则、自定义防抖时间等

## 📚 组件清单

- 表格
- 表单
- 分栏
- 搜索组件
- Loadding
- Lottie
- ErrorMessage
- Notification
- 树状图
- 提示框
- 基础表单二次封装
- 图标预览
- 流程图
- 图标选择器
- 图片裁剪
- 摄像头
- 视频聊天
- 表单生成器
- 富文本编辑器
- 单例模式Toast提示框
- Dialog解决方案
- ...

## 🤝 贡献指南

我们欢迎所有类型的贡献：

Fork项目并创建分支

安装依赖：pnpm install

启动开发服务器：pnpm run dev

创建Pull Request

## 🌿 联系方式

二维码若识别不了可以 [在线访问](https://weixin-profile.mason-coder.online) 🚀

![image](https://github.com/user-attachments/assets/67f8cfeb-953c-4e1e-ae5a-8a2d7906bffb)
