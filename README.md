# react-boilerplate
## 包含功能

- mobx
- react-router
- typescript
- http-proxy-middleware
- sass
- css-module

### 浏览器支持

IE 9+

### 运行

dev

```sh
yarn start
```

### 开发设置

- `setupProxy.js` 修改后端代理
- 运行时修改后端 `apiServer` http://localhost:3000//settings?apiServer=https://api.bdfint.cn

### 项目结构

```
Project
|   .editorconfig
|   .env // 项目环境变量
|   .gitignore
|   .prettierrc
|   package.json
|   README.md
|   tsconfig.extends.json
|   tsconfig.json
|   yarn.lock
|
+---public
|       favicon.ico
|       index.html
|       manifest.json
|
+---scripts // node.js 工具/方法
|       iconfont.js // 从 iconfont.cn 抓取图标 SVG
|
\---src
    |   App.css
    |   App.tsx
    |   index.ts
    |   serviceWorker.js
    |   setupProxy.js  // 开发环境代理配置
    |   startup.tsx
    |
    +---api // 所有用到的服务端接口都在这里按照模块声明
    |       index.ts
    |       user.ts
    |
    +---components // 通用组件
    |   |   Iconfont.tsx
    |   |   Image.tsx
    |   |
    |   \---Container
    |           index.tsx
    |
    +---language // 多语言支持（备用）
    |       index.ts
    |       zh-CN.json
    |
    +---modules // 通用模块
    |   \---Header
    |           index.jsx
    |
    +---pages // 页面
    |   +---Demo
    |   |   |   index.module.scss // 带 .module 后缀的自动识别为 css-module
    |   |   |   index.tsx
    |   |   |
    |   |   \---images
    |   |           logo.png
    |   |           logo.webp
    |   |
    |   \---Settings
    |           index.tsx
    |
    +---stores // 全局数据
    |       Settings.ts
    |       User.ts
    |
    \---utils // 通用工具/方法
            localStorage.js
            request.ts
```

### 已知问题

- `ESLint` 对 `TypeScript` 语法支持不完善 `keyof` 会报错

```js
Exclude<keyof FormProps, 'onReset' | 'onSubmit'>
```

- 一些库和功能在使用 `TypeScript` 时出现类型冲突，如 `@withRouter`

- node-sass 依赖环境

<https://github.com/sass/node-sass/releases>

| NodeJS  | Minimum node-sass version | Node Module |
| ------- | ------------------------- | ----------- |
| Node 12 | 4.12+                     | 72          |
| Node 11 | 4.10+                     | 67          |
| Node 10 | 4.9+                      | 64          |
| Node 8  | 4.5.3+                    | 57          |
