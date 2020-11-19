
简体中文 | [English](./README.md)

# 简介

打扮家自定义[Element](http://element.meiwu365.com/#/zh-CN) 组件库 -
[@dbj-fe/element-ui](https://www.npmjs.com/package/@dbj-fe/element-ui) 

## Issue 规范
- issue 仅用于提交 Bug 或 Feature 以及设计相关的内容，其它内容可能会被直接关闭。如果你在使用时产生了疑问，请到 Slack 或 [Gitter](https://gitter.im/ElemeFE/element) 里咨询。

- 在提交 issue 之前，请搜索相关内容是否已被提出。

- 请说明 Element UI 和 Vue 的版本号，并提供操作系统和浏览器信息。推荐使用 [JSFiddle](https://jsfiddle.net/) 生成在线 demo，这能够更直观地重现问题。

## 开发环境搭建
首先你需要 Node.js 4+，yarn 和 npm 3+。注意：我们使用 yarn 进行依赖版本的锁定，所以请不要使用 `npm install` 安装依赖。
```bash
# 克隆项目
git clone https://gitlab.dabanjia.com/backend/element.git
cd  element
npm run dev

# open http://localhost:8085
```

> **提示**：可以运行 `npm run dev:play`，修改 `examples/play/index.vue` 文件，调用你修改后的组件，仍然访问 [http://localhost:8085](http://localhost:8085)，查看修改效果，更快更方便。
## 组件开发规范
- 通过 `make new` 创建组件目录结构，包含测试代码、入口文件、文档
- 如果包含父子组件，需要更改目录结构，参考 `Button`
- 组件内如果依赖了其他组件，需要在当前组件内引入，参考 `Select`

## 代码规范
遵循饿了么前端的 [ESLint](https://github.com/ElemeFE/eslint-config-elemefe) 即可

## 部署至npm
### 1、修改一下四个位置中文件version版本号为最新的版本号
```bash
# 1、根目录下
- package.json

# 2、example目录下
- examples
 - versions.json

# 3、packges/theme-chalk目录下
- packages
 - theme-chalk
  - package.json

# 4、src目录下
- src
 - index.js
```
- 修改根目录 [package.json](./package.json)
- examples中 [eversion](./examples/versions.json)
- packages/theme-chalk中的 [package.json](./packages/theme-chalk/package.json)
- src中的 [version](./src/index.js)
### 2、打包代码：

```shell
npm run dist
```
### 3、发布流程
```bash
# 请切换为npm默认源，cnpm淘宝镜像会提示无权限
# 登录npm
npm login

# 发布 @dbj/element-ui
npm publish --access=public

# 发布theme-chalk
cd ./packages/theme-chalk 
npm publish --access=public
```
### 4、同步更新DOC
```bash
# 生成examples/element-ui
npm run deploy:build
# 将examples/element-ui目录部署服务器即可
```
#### 浏览器访问 http://element.meiwu365.com/#/zh-CN
---
