# 后端接口文档规范 (Backend API Specification)

**版本**: 1.1.0  
**日期**: 2025-11-23  
**说明**: 本文档基于前端实际代码 (`src/view/*`) 及设计规范整理，涵盖当前已实现页面的所有后端需求。

---

## 1. 接口协议与通用规范

### 1.1 基础约定
- **URL 前缀**: `/api/v1`
- **字符编码**: UTF-8
- **请求格式**: `application/json` (文件上传除外)
- **鉴权方式**: Header `Authorization: Bearer <token>`

### 1.2 统一响应结构
```json
{
  "code": 0,          // 0: 成功, 非0: 错误码
  "message": "success", // 提示信息
  "data": { ... }     // 业务数据
}
```

### 1.3 分页结构
```json
{
  "list": [ ... ],
  "total": 100,
  "page": 1,
  "pageSize": 20
}
```

---

## 2. 核心模块接口

### 2.1 用户与认证 (User & Auth)
*对应前端 `src/view/login` 及 `src/view/userinfo`*

| 接口名称 | Method | URL | 前端调用位置 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **用户登录** | POST | `/user/login` | `login/index.vue` | 需返回 `token` |
| **用户注册** | POST | `/user/register` | `login/index.vue` | |
| **用户注销** | POST | `/user/logoff` | `api/login.js` | |
| **获取当前用户信息** | GET | `/user/info` | `userinfo/index.vue` | 返回头像、昵称、等级、简介等 |
| **更新用户信息** | PUT | `/user/info` | `userinfo/components/EditProfileModal.vue` | |
| **修改密码** | PUT | `/user/password` | `dashboard/index.vue` | 安全设置区域 |
| **获取用户统计** | GET | `/user/stats` | `dashboard/components/LeftPanel.vue` | 返回好友数、消息数、活跃天数 |
| **获取用户标签** | GET | `/user/tags` | `dashboard/components/LeftPanel.vue` | 返回用户兴趣标签 list |

### 2.2 社交与好友 (Social & Friends)
*对应前端 `src/view/dashboard/components/RightPanel.vue` (Friend Tab)*

| 接口名称 | Method | URL | 前端调用位置 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **获取好友列表** | GET | `/social/friends` | `RightPanel.vue` | 包含在线状态、最新消息摘要、未读数 |
| **搜索用户** | GET | `/social/users/search` | `RightPanel.vue` | 全网搜索，返回是否好友状态 |
| **发送好友申请** | POST | `/social/friend-requests` | `RightPanel.vue` | |
| **删除好友** | DELETE | `/social/friends/:id` | `RightPanel.vue` | 右键菜单 |
| **静音好友** | POST | `/social/friends/:id/mute` | `RightPanel.vue` | 右键菜单 |
| **点赞用户** | POST | `/social/users/:id/like` | `UserProfileModal.vue` | |
| **获取用户详细资料** | GET | `/social/users/:id` | `UserProfileModal.vue` | 查看好友或陌生人资料 |

### 2.3 资讯与热点 (News & Hotspot)
*对应前端 `src/view/dashboard/components/RightPanel.vue` (Hotspot Tab)*

| 接口名称 | Method | URL | 前端调用位置 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **获取热点新闻** | GET | `/news/hot` | `RightPanel.vue` | 参数: `tag` (如"AI科技"), `limit` |

**响应示例 (NewsItem)**:
```json
{
  "id": 101,
  "title": "AI突破...",
  "summary": "摘要...",
  "source": "科技前沿",
  "time": "10分钟前",
  "category": "AI科技",
  "image": "url..."
}
```

### 2.4 工作流 (Workflow)
*对应前端 `src/view/workflow` 及 Dashboard 统计*

| 接口名称 | Method | URL | 前端调用位置 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **获取工作流列表** | GET | `/workflows` | `InvokeForm.vue` | 下拉选择用 |
| **执行工作流** | POST | `/workflows/:id/execute` | `InvokeForm.vue` | Body: `{ params: {} }` |
| **获取执行记录** | GET | `/executions` | `RightPanel.vue` | 获取"最近执行记录" |
| **获取工作流统计** | GET | `/analytics/user-summary` | `RightPanel.vue` | 返回总执行数、成功率、节省时间 |

### 2.5 系统基础 (System)
*对应前端 `src/view/dashboard` 面板信息*

| 接口名称 | Method | URL | 前端调用位置 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **获取最新公告** | GET | `/system/announcement` | `LeftPanel.vue` | 文本内容 |
| **获取每日祝福** | GET | `/system/daily-quote` | `LeftPanel.vue` | 文本 + 图标 |

---

## 3. WebSocket 实时推送

**连接**: `/ws?token=...`

**事件类型 (Type)**:
1.  **`friend_status`**: 好友上线/下线 `{ userId, status: 'online'|'offline' }`
2.  **`chat_message`**: 新聊天消息 `{ senderId, content, time }`
3.  **`friend_request`**: 新的好友申请 `{ requesterId, requesterName }`
4.  **`workflow_event`**: 工作流执行状态更新 `{ runId, status: 'success'|'failed' }`

---

## 4. 开发建议

1.  **优先实现 Auth 模块**：`login/index.vue` 是入口，必须优先打通。
2.  **Mock 数据支持**：`RightPanel` 中的新闻和好友列表目前是硬编码 Mock，后端需尽快提供 API 以替换前端 Mock。
3.  **工作流代理**：前端 `InvokeForm` 依赖后端转发请求给 n8n 或其他引擎，后端需实现此代理层。
