# Mason CLI

Mason CLI 是一个用于快速创建和管理Mason项目的命令行工具。

## 🚀 功能特性

- 快速初始化Mason项目
- 生成标准化的Vue组件
- 创建项目页面模板
- 管理项目依赖
- 提供Git操作辅助工具
- 生成项目统计报告

## 📦 安装

由于当前未发布到npm，请使用以下方式进行本地安装：

```bash
npm link
```

## 🛠 基础功能使用说明

### 初始化项目

```bash
mason-admin init <project-name>
```

### 创建组件

```bash
mason-admin gen <component-name>
```

选项：

- `-d, --dirname <dirname>` 指定组件目录
- `-o, --overwrite` 覆盖已存在的组件文件

### 创建页面

```bash
mason-admin create:page <page-name>
```

### 安装依赖

```bash
mason-admin install
```

### 卸载依赖
```bash
mason-admin uninstall
```

### 生成项目统计

```bash
mason-admin stats
```

## 📂 CLI 结构

```
cli/
├── bin/            # 命令行入口
├── src/            # 源代码
│   ├── commands/   # 命令实现
│   ├── templates/  # 模板文件
│   └── utils/      # 工具函数
└── package.json    # 项目配置
```

## 🤝 贡献指南

欢迎提交Pull Request来改进Mason CLI。在提交前请确保：

1. 通过所有测试
2. 遵循代码风格指南
3. 更新相关文档
        