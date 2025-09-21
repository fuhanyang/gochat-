# GoChat 后端API接口文档

基于原前端代码分析整理的后端接口规范

## 🌐 基础配置

- **开发环境**: `http://localhost:8080`
- **生产环境**: `http://8.137.19.65:8080`
- **WebSocket端口**: `ws://8.137.19.65:9090`

## 🔐 用户认证相关

### 1. 用户注册
```http
POST /api/v1/user/register
Content-Type: application/json

{
  "username": "string",
  "password": "string", 
  "passwordConfirm": "string",
  "ip": "string",
  "handlerName": "Register"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": "注册成功",
  "msg": "success"
}
```

### 2. 用户登录
```http
POST /api/v1/user/login
Content-Type: application/json

{
  "accountNum": "string",
  "password": "string",
  "ip": "string",
  "handlerName": "Login"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "accountNum": "123456",
    "name": "用户名"
  },
  "msg": "success"
}
```

**响应头**:
```
Authorization: Bearer <JWT_TOKEN>
```

### 3. 用户登出
```http
POST /api/v1/user/logoff
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "accountNum": "string",
  "password": "string",
  "ip": "string",
  "handlerName": "LogOff"
}
```

### 4. 获取用户信息
```http
GET /api/v1/user/info?account_num={accountNum}
Authorization: Bearer <JWT_TOKEN>
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "account_num": "123456",
    "name": "用户名",
    "desc": "个人简介",
    "email": "user@example.com",
    "phone": "13800138000",
    "create_at": "2024-01-01T00:00:00Z",
    "lastLogin": "2024-01-01T00:00:00Z",
    "ip": "127.0.0.1"
  }
}
```

### 5. 上传用户头像
```http
POST /api/v1/user/upload-avatar
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

FormData:
- avatar: File
- account_num: string
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "avatarUrl": "http://example.com/avatar.jpg",
    "url": "http://example.com/avatar.jpg"
  }
}
```

## 👥 好友管理相关

### 1. 获取好友列表
```http
POST /api/v1/friend/list
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "accountNum": "string",
  "handlerName": "GetFriends"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": [
    {
      "accountNum": "123456",
      "name": "好友名称",
      "desc": "好友简介",
      "avatarUrl": "http://example.com/avatar.jpg"
    }
  ]
}
```

### 2. 通过账号添加好友
```http
POST /api/v1/friend/addition/with_account_num
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "accountNum": "string",
  "targetAccountNum": "string",
  "handlerName": "AddFriendWithAccountNum"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "accountNum": "123456",
    "name": "好友名称"
  }
}
```

### 3. 随机匹配好友
```http
POST /api/v1/friend/addition
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "accountNum": "string",
  "handlerName": "AddFriend"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "accountNum": "123456",
    "name": "匹配的好友名称"
  }
}
```

## 💬 聊天消息相关

### 1. 获取聊天记录
```http
POST /api/v1/chat/text/refresh
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "SenderAccountNum": "string",
  "ReceiverAccountNum": "string",
  "handlerName": "RefreshText"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "text": {
      "content": [
        {
          "senderAccountNum": "123456",
          "receiverAccountNum": "789012",
          "content": "消息内容",
          "timestamp": "2024-01-01T00:00:00Z"
        }
      ]
    }
  }
}
```

## 🔌 WebSocket 实时通信

### 连接地址
```
ws://8.137.19.65:9090/api/v1/chat/ws?token={JWT_TOKEN}
```

### 消息格式

#### 发送消息
```json
{
  "data": "消息内容",
  "accountNum": "发送者账号",
  "receiver": "接收者账号",
  "type": "SendText"
}
```

#### 接收消息
```json
{
  "data": "消息内容",
  "accountNum": "发送者账号",
  "receiver": "接收者账号",
  "type": "SendText"
}
```

### 消息类型
- `SendText`: 文本消息
- `RefreshText`: 刷新消息
- `Login`: 登录消息
- `LogOff`: 登出消息
- `Register`: 注册消息
- `kick`: 踢出用户
- `error`: 错误消息

### 特殊消息处理

#### 踢出用户消息
```json
{
  "accountNum": "被踢用户账号",
  "data": "踢出原因",
  "type": "kick"
}
```

#### 错误消息
```json
{
  "data": "错误信息",
  "type": "error"
}
```

## 📁 静态资源配置

### 1. 获取配置
```http
GET /api/static/config.json
```

**响应示例**:
```json
{
  "host": "localhost",
  "port": "8888"
}
```

### 2. 默认头像
```
GET /api/static/images/user-icon.png
```

## 🔧 请求头规范

### 认证请求头
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### 文件上传请求头
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

## 📝 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/Token无效 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 🚀 前端实现要点

### JWT Token管理
- 使用多用户Token存储模式
- 支持多账号同时登录
- Token自动添加到请求头

### WebSocket连接管理
- 支持自动重连机制
- 最大重试次数：10次
- 重连间隔：5秒
- 消息去重处理

### 文件上传限制
- 头像文件大小：最大5MB
- 支持格式：image/*
- 自动预览和确认

### 消息长度限制
- 文本消息最大长度：1000字符
- 自动字符计数和警告
- 超长自动截断

## 📞 注意事项

1. 所有API请求都需要携带JWT Token（除注册和登录外）
2. WebSocket连接需要有效的JWT Token
3. 文件上传使用FormData格式
4. 错误处理需要统一处理响应码和错误信息
5. 多用户环境下需要正确管理用户状态
