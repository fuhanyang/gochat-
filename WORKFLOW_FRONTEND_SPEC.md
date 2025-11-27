## 工作流平台前端规范与架构说明

发布日期：2025-11-22
适用范围：将现有 GoChat 新前端演进为“工作流平台”的前端。保留原聊天能力，作为交流模块的子模块。

## 1. 项目定位与目标

- **平台定位**：一个可编排、可调用下游工作流的统一门户，内置交流（支持大模型）、消息通知、数据统计分析、文件上传/处理等能力。
- **总体目标**：
  - 提供清晰的模块边界与路由结构，支持渐进式扩展。
  - 统一接口协议、鉴权、配置与异常处理。
  - 保留并整合原有聊天能力（Chat）为交流模块子模块，最小化迁移成本。

## 2. 技术栈与基础设施

- **框架与构建**：Vue 3 + Vite（沿用现有工程），按需引入 Element Plus。
- **状态管理**：Pinia（模块化 Store）。
- **路由**：Vue Router（路由懒加载、路由守卫、鉴权与权限控制）。
- **网络**：Axios（`src/utils/request.js` 包装，统一 Loading、Token、错误提示）。
- **样式**：TailwindCSS + SCSS（`src/style/index.scss`），遵循统一设计规范。
- **实时能力**：WebSocket（统一封装，覆盖通知、聊天与工作流事件订阅）。
- **配置**：`src/config/index.js`（支持多环境与 `.env` 覆盖）。

## 3. 模块划分与功能边界

### 3.1 工作流编排与调用（Workflow，后端封装 n8n，前端仅调接口）
- **职责**：基于后端已封装的 n8n 能力，前端仅提供“查询/调用/监控”界面；不在前端提供图形化编辑器。若有需要，可提供“跳转至后台 n8n 管理端”或“内嵌 IFrame（仅管理员）”的入口。
- **主要页面/路由**：
  - `/workflow/definitions`：定义列表（只读）。
  - `/workflow/definitions/:id`：定义详情（只读，展示基础元信息、可选的后端生成的拓扑预览图）。
  - `/workflow/runs`：运行列表（可筛选状态/时间/触发源）。
  - `/workflow/runs/:runId`：运行详情、日志、事件流、重试/终止。
  - `/workflow/invoke`：发起调用（支持参数表单/JSON/YAML 上传；表单可基于后端返回的 JSON Schema 动态渲染）。
- **关键组件**：参数表单（基于 Schema 动态生成）、运行日志/事件流组件。
- **接口概览（示例，后端 n8n 封装提供）**：
  - `GET /api/v1/workflows`（定义列表，分页/筛选）
  - `GET /api/v1/workflows/:id`（定义详情、只读）
  - `POST /api/v1/workflows/:id/execute`（发起执行/调用；请求体携带参数）
  - `GET /api/v1/executions`（执行列表）
  - `GET /api/v1/executions/:runId`（执行详情、节点日志/状态）
  - `POST /api/v1/executions/:runId/retry`、`POST /api/v1/executions/:runId/cancel`
- **权限**：`workflow:read`、`workflow:write`、`workflow:operate`。

### 3.2 交流模块（Communication，含 Chat 子模块，支持大模型）
- **职责**：项目/工作流上下文中的协作沟通，支持会话、话题、引用工作流、与大模型交互。
- **主要页面/路由**：
  - `/comm/sessions`：会话列表、检索、置顶/收藏。
  - `/comm/sessions/:sessionId`：会话详情（消息流、话题、附件、引用工作流运行）。
  - `/comm/chat`：原 GoChat 主聊天界面，作为子模块保留与增强。
- **关键组件**：消息气泡、对话输入器（工具调用/文件引用/工作流卡片）、消息富渲染。
- **接口概览**：
  - `GET /api/v1/comm/sessions`、`POST /api/v1/comm/sessions`
  - `GET /api/v1/comm/sessions/:id/messages`、`POST /api/v1/comm/sessions/:id/messages`
  - `POST /api/v1/llm/chat`（统一大模型网关，支持工具/函数调用与流式响应）
- **权限**：`comm:read`、`comm:write`、`comm:llm`。

### 3.3 消息通知（Notifications）
- **职责**：系统内通知（工作流回调结果、运行失败、审批请求、@提及 等），统一收件箱与设置。
- **主要页面/路由**：
  - `/notifications/inbox`：消息列表（未读/已读/筛选/批处理）。
  - `/notifications/settings`：订阅策略（工作流事件、频道：站内、邮件、Webhook）。
- **接口概览**：
  - `GET /api/v1/notifications`、`POST /api/v1/notifications/read`
  - `GET /api/v1/notifications/settings`、`PUT /api/v1/notifications/settings`
- **权限**：`notifications:read`、`notifications:manage`。

### 3.4 数据统计分析（Analytics）
- **职责**：工作流运行/成功率/耗时分布、TOP 错误、调用趋势、用户活跃度等。
- **主要页面/路由**：
  - `/analytics/overview`：全局看板（核心 KPI、趋势）。
  - `/analytics/workflows`：按工作流维度分析（支持多维筛选与导出）。
  - `/analytics/users`：用户/团队维度分析。
- **接口概览**：
  - `GET /api/v1/analytics/metrics`（多指标批量拉取）
  - `GET /api/v1/analytics/workflows/:id/metrics`
- **权限**：`analytics:read`。

### 3.5 文件上传与处理（Files）
- **职责**：上传工作流定义/附件、解析/预览、版本管理、脱敏/病毒扫描、生命周期管理。
- **主要页面/路由**：
  - `/files/uploads`：上传记录与批量操作。
  - `/files/:fileId`：文件详情、预览、关联工作流。
  - `/files/processors`：处理器配置（OCR/转码/解析器）。
- **接口概览**：
  - `POST /api/v1/files/uploads`（表单/分片）
  - `GET /api/v1/files/:fileId`、`DELETE /api/v1/files/:fileId`
- **权限**：`files:read`、`files:write`、`files:admin`。

### 3.6 系统设置与权限（Settings & RBAC）
- **职责**：用户/角色/权限、API Key/集成、审计日志、组织/团队。
- **主要页面/路由**：
  - `/settings/users`、`/settings/roles`、`/settings/permissions`
  - `/settings/integrations`（LLM、Webhook、邮件）
  - `/settings/audit-logs`
- **权限**：`settings:*`。

### 3.7 首页与通用（Dashboard & Common）
- **首页**：`/dashboard`（当前项目状态、常用入口、最近运行、我的通知）。
- **通用组件**：导航栏、面包屑、权限按钮、空状态、异常页、通用对话框等。

## 4. 路由规划与守卫

- **命名空间式路由**：`/workflow/*`、`/comm/*`、`/notifications/*`、`/analytics/*`、`/files/*`、`/settings/*`、`/dashboard`。
- **保留原有**：将当前 `'/main'`/`'/message'`/`'/websocket'` 等相关能力并入 `/comm/*`，在过渡期保留别名与重定向：
  - `'/main' -> '/comm/chat'`（重定向）
  - `'/message' -> '/comm/sessions'`
- **路由 Meta 规范**：
  - `meta.requiresAuth: boolean`
  - `meta.permissions: string[]`（如 `['workflow:read']`）
  - `meta.layout: 'default' | 'empty' | 'fullscreen'`
- **全局守卫**：
  - 未登录（缺少 JWT）跳转 `/login`。
  - 无权限则展示 403 页面或引导申请权限。
  - 统一 Loading 与错误提示由 `src/utils/request.js` 处理。

## 5. 目录结构规范（基于现有 `src/`）

建议逐步演进为：

- `src/view/dashboard/*`
- `src/view/workflow/*`
- `src/view/comm/*`（内含 `chat/*` 子模块，对接现有聊天 UI）
- `src/view/notifications/*`
- `src/view/analytics/*`
- `src/view/files/*`
- `src/view/settings/*`
- `src/api/workflow.js`、`src/api/comm.js`、`src/api/notifications.js`、`src/api/analytics.js`、`src/api/files.js`、`src/api/settings.js`
- `src/pinia/modules/workflow.js`、`.../comm.js`、`.../notifications.js`、`.../analytics.js`、`.../files.js`、`.../settings.js`
- `src/components/common/*`（通用）与 `src/components/domain/*`（领域组件）
- `src/utils/websocket.js`（统一订阅/心跳/重连策略）

说明：`src/utils/request.js` 与 `src/config/index.js` 保持不变，统一网关。

## 6. 状态管理（Pinia）

- **切分原则**：按业务域划分 Store，Store 内部再细分子状态与动作。
- **示例 Store**：
  - `useWorkflowStore`：definitions、runs、selectedDefinition、selectedRun。
  - `useCommStore`：sessions、currentSession、messageMap、drafts。
  - `useNotificationStore`：inbox、unreadCount、filters。
  - `useAnalyticsStore`：metrics、timeRange、dimensions。
  - `useFilesStore`：uploads、processors、preview。
  - `useUserStore`：profile、roles、permissions、token（与登录生命周期统一）。

## 7. 接口协议与约定

- **统一响应**（建议后端遵循）：
  - 成功：`{ code: 0, message: 'OK', data: T }`
  - 失败：`{ code: 非0, message: string, data?: any }`
  - 前端当前实现会在 HTTP 200 时直接返回 `response.data`，并由 `ElMessage` 处理错误提示（见 `src/utils/request.js`）。
- **分页**：`{ list: T[], total: number, page: number, pageSize: number }`
- **WebSocket 消息包**（统一信封）：
  ```json
  { "type": "chat_message|workflow_event|notification", "ts": 1732243200000, "data": { /* 载荷 */ } }
  ```
- **核心数据模型（示意）**：
  - WorkflowDefinition：`{ id, name, version, graph, createdAt, updatedAt }`
  - WorkflowRun：`{ runId, definitionId, status, durationMs, startedAt, endedAt, logs[] }`
  - CommSession：`{ id, title, members[], createdAt, lastMessageAt }`
  - ChatMessage：`{ id, sessionId, role: 'user'|'assistant'|'system', content, files[], references[] }`
  - Notification：`{ id, category, title, content, read, createdAt, relatedRunId? }`
  - FileAsset：`{ id, name, type, size, status, previewUrl?, hash?, createdAt }`

## 8. 鉴权与权限（RBAC）

- **登录态**：JWT 存储于 `localStorage/sessionStorage`，请求头 `Authorization: Bearer <token>`（已在 `src/utils/request.js` 注入）。
- **角色建议**：`admin`、`operator`、`viewer`。
- **权限粒度**：`workflow:read|write|operate`、`comm:read|write|llm`、`notifications:read|manage`、`analytics:read`、`files:read|write|admin`、`settings:*`。
- **路由权限**：路由 `meta.permissions` 与用户权限求交集校验。

## 9. 配置与环境

- **统一配置**：使用 `src/config/index.js`，并支持下列 `.env` 覆盖：
  - `VITE_API_BASE_URL`、`VITE_API_TIMEOUT`
  - `VITE_WS_BASE_URL`
  - `VITE_APP_TITLE`
  - `VITE_ENABLE_LLM`（true/false）、`VITE_LLM_PROVIDER`、`VITE_LLM_BASE_URL`
- **环境**：development / test / production（见现有环境映射）。

## 10. UI/UX 规范（简要）

- **布局**：左侧主导航 + 顶部工具条；内容区支持页内二级导航与 Tab。
- **设计系统**：Element Plus + 自定义主题；统一按钮/表格/表单/空状态。
- **可用性**：键盘可达、即时验证、渐进反馈；移动端基础兼容。
- **可访问性**：语义化与 ARIA（重点在表单与复杂组件）。

## 11. 可观测性与异常处理

- **日志与指标**：前端关键交互/错误埋点（可选接入 Sentry/自建端点）。
- **错误处理**：
  - HTTP：统一在 `src/utils/request.js` 处理常见状态码（401/403/404/500）。
  - WS：重连策略、抖动与限速，异常消息容错。工作流执行状态建议通过 WS 推送事件（type=`workflow_event`），前端仅展示。

## 12. 测试与质量

- **单元测试**：组件与 Store（Vitest/Jest 皆可）。
- **端到端**：关键流程（Playwright/Cypress）。
- **质量门禁**：ESLint + Prettier + 提交钩子（Husky）与 CI 构建校验。

## 13. 构建与部署

- **开发**：`pnpm|npm run dev`，`.env.*` 区分环境。
- **构建**：`pnpm|npm run build`，产物位于 `dist/`，可通过 Nginx/静态服务部署。
- **反向代理**：建议在网关/Nginx 侧配置 `/api` 与 `/ws` 转发，保持前端 `baseURL`/`wsURL` 简洁稳定。

## 14. 迁移与兼容策略

- **保留 GoChat**：将现有聊天能力迁入 `/comm/chat`，共享用户/会话/消息数据结构。
- **过渡路由**：保留 `'/main'` 与 `'/message'` 的兼容重定向，逐步引导至新路由。
- **API 收敛**：现有 `src/api/login.js` / `src/api/user.js` 等存在接口重复与风格差异，建议合并到按域划分的新 API 模块并统一返回结构。新增工作流相关 API 仅做“调用与查询”，不涉及前端编排；以后端 n8n 封装接口为准。
- **WebSocket 收敛**：将聊天、通知、工作流事件订阅统一到一个封装（通道区分），其中工作流事件用于执行状态/节点日志的实时更新（只读）。

## 15. 路线图（建议）

1. 完成路由与导航重构（新增 `/dashboard` 与六大命名空间路由，加入守卫）。
2. 将 Chat 并入 `/comm`，补齐会话/消息归档、搜索与文件引用。
3. 上线“n8n 封装接口”的工作流调用与运行监控（列表/详情/日志/重试/终止），不包含前端编辑器。
4. 打通通知（WS + Inbox + 设置），并与工作流回调联动。
5. 搭建 Analytics 看板（核心 KPI + 可下钻）。
6. 文件上传/解析/预览流程与处理器配置页。
7. 权限中心与审计日志。
8. 大模型网关对接（统一接口，支持多 Provider）。

——
本文档用于指导前端架构与实现落地，具体页面与组件清单可在迭代设计阶段进一步细化（提供线框/原型后输出详细任务与验收标准）。

## 附录：与 n8n 封装后端的接口契约（示例）

说明：以下为前端期望的最小接口集合，具体以后端实际定义为准。建议后端提供 OpenAPI 文档，便于前端代码生成与校验。

- 获取工作流定义列表：
  - `GET /api/v1/workflows?keyword=&page=1&pageSize=20`
  - 响应：`{ code, data: { list: WorkflowDefinition[], total, page, pageSize }, msg }`
- 获取工作流定义详情：
  - `GET /api/v1/workflows/:id`
  - 响应：`{ code, data: { id, name, version, description, inputsSchema?, previewImageUrl? }, msg }`
- 执行工作流：
  - `POST /api/v1/workflows/:id/execute`
  - 请求体：`{ params: Record<string, any> }`（或后端定义）
  - 响应：`{ code, data: { runId }, msg }`
- 执行列表：
  - `GET /api/v1/executions?status=&from=&to=&page=1&pageSize=20`
  - 响应：`{ code, data: { list: WorkflowRun[], total, page, pageSize }, msg }`
- 执行详情：
  - `GET /api/v1/executions/:runId`
  - 响应：`{ code, data: { runId, workflowId, status, startedAt, endedAt, durationMs, nodeLogs[] }, msg }`
- 重试/终止执行：
  - `POST /api/v1/executions/:runId/retry`、`POST /api/v1/executions/:runId/cancel`
  - 响应：`{ code, data: any, msg }`
- 实时事件（可选）：
  - `WS /ws?token=...`
  - 推送包：`{ type: "workflow_event", ts, data: { runId, nodeId?, status, log? } }`




