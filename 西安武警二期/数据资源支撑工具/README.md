## 项目概述

当前仓库是前端工程，用于构建后台管理系统界面，并通过 HTTP 接口与后端服务对接。

从依赖和目录结构判断，该项目已经具备登录鉴权、动态菜单、权限路由、工作台标签页、国际化、主题配置、表格表单封装等后台系统常见能力。

## 技术栈

### 前端框架

- Vue 3
- TypeScript
- Vite 7
- Vue Router 4
- Pinia

### UI 与样式

- Element Plus
- Tailwind CSS 4
- Sass
- Iconify

### 常用业务能力

- Axios：统一请求封装
- Vue I18n：国际化
- ECharts：图表
- WangEditor：富文本编辑
- xlsx：Excel 导入导出
- xgplayer：视频播放
- qrcode.vue：二维码

### 工程化

- ESLint
- Prettier
- Stylelint
- Husky
- lint-staged
- Commitizen / cz-git

### 运行环境要求

- Node.js `>= 20.19.0`
- pnpm `>= 8.8.0`

## 构建与运行

### 常用命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm serve
pnpm lint
pnpm fix
```

### 说明

- `pnpm dev`：启动本地开发环境
- `pnpm build`：先执行 `vue-tsc --noEmit`，再构建生产包
- `pnpm serve`：本地预览生产构建结果
- `pnpm lint` / `pnpm fix`：执行代码检查与自动修复

## 环境配置

项目使用 `.env`、`.env.development`、`.env.production` 管理环境变量，开发环境通过 Vite 代理将 `/api` 请求转发到后端服务。

当前可确认的配置特点：

- 通过 `VITE_PORT` 控制开发端口
- 通过 `VITE_BASE_URL` 控制应用部署基础路径
- 通过 `VITE_API_URL` 控制 Axios 基础请求地址
- 通过 `VITE_API_PROXY_URL` 配置本地开发代理目标
- 构建时会注入 `__APP_VERSION__`

## 项目结构

根目录结构：

```text
.
├─ public/                 静态资源
├─ scripts/                开发辅助脚本
├─ src/                    业务源码
├─ .env*                   环境配置
├─ package.json            依赖与脚本
├─ tsconfig.json           TypeScript 配置
└─ vite.config.ts          Vite 配置
```

`src` 目录结构：

```text
src
├─ api/                    接口定义
├─ assets/                 图片、样式、SVG 等静态资源
├─ components/             公共组件与业务组件
├─ config/                 系统配置项
├─ directives/             全局指令
├─ enums/                  枚举定义
├─ hooks/                  组合式逻辑封装
├─ locales/                国际化资源
├─ mock/                   模拟数据
├─ plugins/                插件注册
├─ router/                 路由、守卫、动态菜单注册
├─ store/                  Pinia 状态管理
├─ types/                  全局类型定义
├─ utils/                  工具类与基础能力
├─ views/                  页面视图
├─ App.vue                 根组件
└─ main.ts                 应用入口
```

## 核心模块说明

### 1. 应用入口

`src/main.ts` 负责：

- 创建 Vue 应用实例
- 初始化 Pinia
- 初始化路由
- 注册全局指令
- 注册全局错误处理
- 挂载国际化

这说明项目的基础设施初始化已经比较完整，新增业务通常不需要改入口文件，除非要引入全局插件或全局能力。

### 2. 请求层

`src/utils/http/index.ts` 是统一请求入口，主要能力包括：

- 基于 Axios 的二次封装
- 自动注入 `Authorization`
- 自动处理 JSON 请求体
- 统一解析后端响应结构
- 统一错误提示
- 统一处理 401 未授权
- 保留请求重试能力

当前项目默认后端返回结构接近：

```ts
{
  code: number
  msg: string
  data: T
}
```

后续新增接口时，优先在 `src/api` 下增加业务 API 文件，再通过这里的统一请求层发起调用，不建议页面中直接使用原始 Axios。

### 3. 状态管理

项目使用 Pinia，状态模块位于 `src/store/modules`：

- `user.ts`：用户信息、登录态、Token、语言、锁屏等
- `menu.ts`：菜单与首页路径
- `setting.ts`：系统设置
- `table.ts`：表格状态
- `worktab.ts`：多标签页状态

其中 `user.ts` 已经集成持久化能力，说明登录态和用户信息会保存在本地存储中。

### 4. 路由与权限

项目路由分两部分：

- `src/router/routes/staticRoutes.ts`：静态路由，例如登录、注册、403、404、500
- `src/router/routes/asyncRoutes.ts`：动态路由，依赖菜单和权限加载

全局前置守卫位于 `src/router/guards/beforeEach.ts`，关键流程如下：

1. 检查登录状态
2. 未登录时跳转登录页
3. 登录后拉取用户信息
4. 拉取菜单数据
5. 根据菜单动态注册路由
6. 校验目标路径是否有访问权限
7. 设置页面标题和工作台标签页

这意味着后续二开如果涉及菜单权限，必须同时关注：

- 后端返回的菜单结构
- 前端动态路由注册逻辑
- 页面组件路径是否可被正确匹配

### 5. 页面与业务组织

当前 `src/views` 下包含这些一级模块：

- `auth`
- `system`
- `safeguard`
- `dashboard`
- `article`
- `change`
- `result`
- `exception`
- `outside`
- `template`
- `widgets`
- `examples`
- `index`

从目录判断：

- `auth`、`system`、`safeguard` 更接近真实业务或系统管理模块
- `dashboard` 可能承担首页或统计展示
- `template`、`widgets`、`examples` 更像模板演示页、组件示例页或复用资源页

后续开发时要区分正式业务模块和模板示例模块，避免直接把演示页面当作最终业务代码长期维护。

## 当前可见接口情况

`src/api` 目录下现有接口文件较少：

- `auth.ts`
- `system-manage.ts`

已覆盖的接口类型主要有：

- 登录
- 获取用户信息
- 获取用户列表
- 获取角色列表
- 获取菜单列表

这说明项目基础能力已经接入，但实际业务接口还没有大规模沉淀。后续新增业务时，建议按模块拆分 API 文件，例如：

- `src/api/device.ts`
- `src/api/collect-task.ts`
- `src/api/data-report.ts`

不要继续把所有系统和业务接口堆到同一个文件里。

## 样式与组件体系

项目同时使用了 Element Plus 和 Tailwind CSS，并在 `src/components` 中区分了：

- `core`：通用基础组件
- `business`：业务组件

这类结构适合二次开发：

- 通用表格、表单、卡片、布局类组件优先沉淀到 `core`
- 明显依赖具体业务语义的组件放到 `business`

如果后续新增页面较多，建议继续沿用这个划分，避免组件职责混乱。

## 开发建议

结合当前工程结构，后续需求一般会落在以下几层：

### 1. 新增接口

落点：

- `src/api`
- `src/types/api`

建议：

- 每个业务域独立 API 文件
- 参数类型、响应类型单独定义
- 不在页面中直接拼请求结构

### 2. 新增页面

落点：

- `src/views/<业务模块>`
- `src/components/business/<业务组件>`

建议：

- 列表页、详情页、表单页按模块归档
- 页面复用逻辑抽到 `hooks`
- 表单校验与表格配置复用已有工具类

### 3. 新增菜单与权限

落点：

- 后端菜单接口
- `src/router`
- `src/store/modules/menu.ts`

建议：

- 先确认菜单数据结构
- 再确认组件路径映射规则
- 最后接入页面与权限控制

### 4. 新增全局配置或系统能力

落点：

- `src/config`
- `src/store/modules/setting.ts`
- 相关布局组件

例如：

- 新主题配置
- 新布局开关
- 新全局交互能力
