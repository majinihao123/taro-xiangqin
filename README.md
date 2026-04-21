# 相亲手账小程序

基于 [Taro](https://taro-docs.jd.com/) + React + TypeScript 开发的微信小程序，用于记录和管理相亲信息。

## 技术栈

- **框架**：Taro 4.2.0
- **UI 层**：React 18
- **语言**：TypeScript
- **样式**：Sass
- **包管理**：pnpm

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 微信小程序
pnpm dev:weapp

# H5
pnpm dev:h5
```

### 生产构建

```bash
# 微信小程序
pnpm build:weapp

# H5
pnpm build:h5
```

## 目录结构

```
├── config/          # Taro 构建配置
├── src/
│   ├── assets/      # 静态资源
│   ├── data/        # 本地数据
│   ├── pages/       # 页面
│   ├── app.tsx      # 应用入口
│   ├── app.scss     # 全局样式
│   └── app.config.ts# 小程序配置
├── .gitignore
├── babel.config.js
├── tsconfig.json
└── package.json
```

## 开发说明

构建产物输出至 `dist/` 目录，使用微信开发者工具打开该目录进行预览和调试。
