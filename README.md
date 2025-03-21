包含前后端部分：

基于 RBAC 设计：

![image](https://github.com/user-attachments/assets/73a249ce-9da1-496b-96f4-bc45942cb3f9)

![image](https://github.com/user-attachments/assets/daf02a48-8fb0-49f8-887f-4463894e60d4)

![image](https://github.com/user-attachments/assets/f6630d4d-ea39-4360-a131-c6596ae468f0)

![image](https://github.com/user-attachments/assets/5219b67b-2c24-4df0-9fc0-81116e693456)

![image](https://github.com/user-attachments/assets/e7ee0d29-3b47-460d-be21-9ecc14d879bd)

前端+Mock开发剩余组件模板：

....


```html
    <div class="theme-item">
  <span>主题颜色</span>
  <el-color-picker v-model="primary" :predefine="colorList" @change="changePrimary" />
</div>
<div class="theme-item">
  <span>暗黑模式</span>
  <SwitchTheme />
</div>
```
