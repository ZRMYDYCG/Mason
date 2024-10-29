<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
# vue3-admin-client

### 前言

- 管理员账号：admin  密码：admin1234
- 普通用户账号：test   密码：test1234

### 1. 项目功能

- ✅ 用户登录 - 7天免登录
- ✅ 首页示例 - 数据卡片、折线图、饼状图
- ✅ 主题更换 - 自定义主题色
- ✅ 暗黑模式
- ✅ 用户管理 - 增删改查
- ✅ 角色管理 - 增删改查
- ✅ 菜单管理 - 增删改查
- ✅ 部门管理 - 增删改查

### 2. 项目截图

### 3. 技术栈

Vue3 + TypeScript + Vite + Vue-router + Pinia + Axios + Element-Plus + Sass

### 4. 项目规范

- **editorconfig配置**： 编辑器规范
- **prettier工具**：代码格式化
- **eslint工具**：代码格式化

### 5. 后端
koa-admin-server 通用后台管理系统 ym-admin的服务端

#### 5.1 技术栈
Node + Koa + Typescript + Mysql

#### 5.2 项目地址
github地址：[项目地址](https://github.com/Yuimng/koa-admin-server) 

#### 5.3 接口返回规范

```json
{
    "code": 200,
    "data": null,
    "msg": ""
}
```

### 6. 部署

vite工具打包前端项目，在云服务器上安装和使用nginx进行接口请求代理完成部署，后端采用pm2启动服务。
