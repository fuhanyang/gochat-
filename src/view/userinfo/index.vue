<template>
  <div class="user-profile-page">
    <!-- 背景装饰 (复用Dashboard风格) -->
    <div class="background-decoration">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <!-- 1. 顶部导航栏 -->
    <nav class="top-nav glass-card">
      <div class="nav-left">
        <div class="nav-back-btn" @click="goHome" title="返回仪表盘">
          <el-icon><ArrowLeft /></el-icon>
        </div>
        <div class="logo-container" @click="goHome">
          <div class="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#722ED1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#722ED1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#722ED1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="brand-name">FlowPulse</span>
        </div>
      </div>
      <div class="nav-right">
        <div class="icon-btn" title="通知">
          <el-icon><Bell /></el-icon>
        </div>
        <div class="icon-btn" title="设置">
          <el-icon><Setting /></el-icon>
        </div>
        <div class="user-avatar-container" @click="toggleUserMenu">
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="User" class="user-avatar" />
        </div>
      </div>
    </nav>

    <main class="main-content">
      <!-- 2. 个人资料区域 -->
      <section class="section-profile">
        <div class="section-header">
          <div class="header-left">
            <h2 class="section-title">个人资料</h2>
            <p class="section-desc">查看和管理您的个人信息与偏好设置</p>
          </div>
          <button class="edit-btn" @click="openEditModal">编辑资料</button>
        </div>

        <div class="profile-card glass-card">
          <div class="profile-info">
            <div class="avatar-wrapper">
              <img :src="userInfo.avatar" :alt="userInfo.name" class="large-avatar" />
              <div class="verified-badge">
                <el-icon><Select /></el-icon>
              </div>
            </div>
            <div class="info-content">
              <div class="name-row">
                <span class="name">{{ userInfo.name }}</span>
                <span class="job">{{ userInfo.job }}</span>
              </div>
              <div class="contact-row">
                <div class="contact-item">
                  <el-icon><Message /></el-icon>
                  <span>{{ userInfo.email }}</span>
                </div>
                <div class="contact-item">
                  <el-icon><Location /></el-icon>
                  <span>{{ userInfo.location }}</span>
                </div>
              </div>
              <p class="description">
                {{ userInfo.description }}
              </p>
            </div>
          </div>
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-num">42</span>
              <span class="stat-label">活跃工作流</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">85%</span>
              <span class="stat-label">自动化率</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">120h</span>
              <span class="stat-label">节省小时</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. 工作流概览区域 -->
      <section class="section-workflow">
        <div class="section-header">
          <h3 class="section-title-sm">工作流概览</h3>
          <button class="add-btn" title="添加工作流">
            <el-icon><Plus /></el-icon>
          </button>
        </div>

        <div class="workflow-grid">
          <!-- 最近活动 -->
          <div class="card activity-card glass-card">
            <h4 class="card-title">最近活动</h4>
            <ul class="activity-list">
              <li class="activity-item">
                <div class="activity-icon success">
                  <el-icon><Check /></el-icon>
                </div>
                <div class="activity-details">
                  <span class="activity-name">周报自动生成</span>
                  <span class="activity-time">2小时前</span>
                </div>
              </li>
              <li class="activity-item">
                <div class="activity-icon update">
                  <el-icon><Refresh /></el-icon>
                </div>
                <div class="activity-details">
                  <span class="activity-name">客户数据同步</span>
                  <span class="activity-time">5小时前</span>
                </div>
              </li>
              <li class="activity-item">
                <div class="activity-icon warning">
                  <el-icon><Warning /></el-icon>
                </div>
                <div class="activity-details">
                  <span class="activity-name">邮件发送异常</span>
                  <span class="activity-time">昨天</span>
                </div>
              </li>
            </ul>
            <a href="#" class="view-all">查看全部活动</a>
          </div>

          <!-- 效率趋势 -->
          <div class="card efficiency-card glass-card">
            <h4 class="card-title">效率趋势</h4>
            <div class="chart-placeholder">
              <div class="chart-bg">
                 <!-- 模拟折线图 visual -->
                 <svg viewBox="0 0 300 100" class="chart-line">
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#722ED1" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#F9F6FC" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0 80 C 50 80, 50 40, 100 50 S 150 80, 200 40 S 250 20, 300 30 V 100 H 0 Z" fill="url(#purpleGradient)" />
                    <path d="M0 80 C 50 80, 50 40, 100 50 S 150 80, 200 40 S 250 20, 300 30" fill="none" stroke="#722ED1" stroke-width="3" />
                 </svg>
              </div>
              <div class="chart-info">
                <div class="chart-stat">
                   <span class="stat-val">本周平均效率 78%</span>
                   <span class="stat-change">↑12% vs 上周</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. 偏好设置区域 -->
      <section class="section-preferences">
        <div class="card settings-card glass-card">
          <h3 class="card-title">偏好设置</h3>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-name">通知偏好</span>
              <span class="setting-desc">接收工作流状态变更通知</span>
            </div>
            <div class="switch-wrapper">
              <input type="checkbox" id="notif-switch" checked />
              <label for="notif-switch" class="switch-label"></label>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-name">深色模式</span>
              <span class="setting-desc">切换界面为深色主题</span>
            </div>
            <div class="switch-wrapper">
              <input type="checkbox" id="dark-switch" />
              <label for="dark-switch" class="switch-label"></label>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. 安全设置区域 -->
      <section class="section-security">
        <div class="card settings-card glass-card">
          <div class="card-header-row">
             <h3 class="card-title">安全设置</h3>
             <a href="#" class="view-all-top">查看全部</a>
          </div>
          
          <div class="security-list">
            <div class="security-item">
              <div class="sec-left">
                <el-icon class="sec-icon"><Lock /></el-icon>
                <span>修改密码</span>
              </div>
              <el-icon class="arrow-icon"><ArrowRight /></el-icon>
            </div>
            <div class="security-item">
              <div class="sec-left">
                <el-icon class="sec-icon"><Key /></el-icon>
                <span>两步验证</span>
              </div>
              <el-icon class="arrow-icon"><ArrowRight /></el-icon>
            </div>
            <div class="security-item">
              <div class="sec-left">
                <el-icon class="sec-icon"><Connection /></el-icon>
                <span>API 密钥管理</span>
              </div>
              <el-icon class="arrow-icon"><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </section>
    </main>

    <EditProfileModal 
      v-model="showEditModal"
      :user-data="userInfo"
      @save="handleSaveProfile"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import EditProfileModal from './components/EditProfileModal.vue'
import { 
  Bell, 
  Setting, 
  Select, 
  Message, 
  Location, 
  Plus,
  Check,
  Refresh,
  Warning,
  Lock,
  Key,
  Connection,
  ArrowRight,
  Camera,
  ArrowLeft
} from '@element-plus/icons-vue'

const router = useRouter()

// 用户数据状态
const userInfo = reactive({
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  name: '李明哲',
  job: '高级产品经理',
  email: 'mingzhe.li@flowpulse.com',
  location: '上海市浦东新区',
  description: '专注用户体验与自动化流程优化，致力于打造高效能产品。'
})

const showEditModal = ref(false)

const openEditModal = () => {
  showEditModal.value = true
}

const handleSaveProfile = (newData) => {
  Object.assign(userInfo, newData)
}

const goHome = () => {
  router.push({ name: 'home' })
}

const toggleUserMenu = () => {
  console.log('Toggle user menu')
}
</script>

<style lang="scss" scoped>
/* 变量定义 */
$primary-purple: #722ED1;
$primary-purple-hover: #5C27A0;
$text-dark: #4B5563;
$text-black: #111827;
$text-light: #9CA3AF;

/* 通用样式 */
.user-profile-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: $text-dark;
  position: relative;
  overflow-x: hidden;
}

/* 背景装饰 (复制Dashboard动画) */
.background-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 150px;
  height: 150px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 80%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 30%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Glassmorphism Card Style */
.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.8);
}

/* 1. 顶部导航栏 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 64px;
  position: sticky;
  top: 20px;
  z-index: 100;
  margin: 0 20px;
  border-radius: 16px; /* Override rounded corners specifically if needed, but glass-card sets 16px */

  .nav-left {
    display: flex;
    align-items: center;
    gap: 16px;

    .nav-back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      color: $text-dark;
      transition: all 0.2s ease;
      background: rgba(255, 255, 255, 0.5);

      &:hover {
        background: white;
        color: $primary-purple;
        transform: translateX(-2px);
      }
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 8px;
      transition: background 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    .logo-icon {
      display: flex;
      align-items: center;
    }

    .brand-name {
      font-size: 18px;
      font-weight: 700;
      color: $text-black;
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 20px;

    .icon-btn {
      color: $text-light;
      cursor: pointer;
      font-size: 20px;
      transition: color 0.3s ease;

      &:hover {
        color: $primary-purple;
      }
    }

    .user-avatar-container {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color 0.3s ease;

      &:hover {
        border-color: $primary-purple;
      }

      .user-avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  z-index: 1;
}

/* 2. 个人资料区域 */
.section-profile {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    
    /* Header Text on Gradient - Need to ensure readability or keep inside cards? 
       The design has headers outside. On dark gradient, dark text might be hard to read.
       Wait, the dashboard has headers inside cards usually or white text. 
       Let's make the section headers white or light since background is purple gradient. 
    */
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: white; /* Changed to white for contrast */
      margin: 0 0 4px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section-desc {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8); /* Lighter white */
      margin: 0;
    }

    .edit-btn {
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: white;
        color: $primary-purple;
      }
    }
  }

  .profile-card {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .profile-info {
      display: flex;
      gap: 24px;
      align-items: center;

      .avatar-wrapper {
        position: relative;
        width: 80px;
        height: 80px;

        .large-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.5);
        }

        .verified-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #1890FF;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          font-size: 12px;
        }
      }

      .info-content {
        .name-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 8px;

          .name {
            font-size: 18px;
            font-weight: 700;
            color: $text-black;
          }

          .job {
            font-size: 14px;
            color: #6B7280;
          }
        }

        .contact-row {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;

          .contact-item {
            display: flex;
            align-items: center;
            gap: 4px;
            color: $text-light;
            font-size: 13px;

            .el-icon {
              font-size: 14px;
            }
          }
        }

        .description {
          color: $text-light;
          font-size: 14px;
          margin: 0;
        }
      }
    }

    .profile-stats {
      display: flex;
      align-items: center;
      gap: 24px;

      .stat-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .stat-num {
          font-size: 20px;
          font-weight: 700;
          color: $text-black;
        }

        .stat-label {
          font-size: 12px;
          color: $text-light;
        }
      }

      .stat-divider {
        width: 1px;
        height: 32px;
        background-color: #E5E7EB;
      }
    }
  }
}

/* 3. 工作流概览区域 */
.section-workflow {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .section-title-sm {
      font-size: 16px;
      font-weight: 700;
      color: white;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .add-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: white;
        color: $primary-purple;
      }
    }
  }

  .workflow-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .card {
    padding: 16px;

    .card-title {
      font-size: 14px;
      font-weight: 700;
      color: $text-black;
      margin: 0 0 16px 0;
    }
  }

  .activity-list {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;
      border-radius: 8px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(249, 246, 252, 0.8);
      }

      .activity-icon {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;

        &.success { color: #10B981; background: #D1FAE5; }
        &.update { color: #3B82F6; background: #DBEAFE; }
        &.warning { color: #F59E0B; background: #FEF3C7; }
      }

      .activity-details {
        display: flex;
        flex-direction: column;
        
        .activity-name {
          font-size: 14px;
          font-weight: 500;
          color: $text-black;
        }
        
        .activity-time {
          font-size: 12px;
          color: $text-light;
        }
      }
    }
  }

  .view-all {
    font-size: 14px;
    color: $primary-purple;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .efficiency-card {
    display: flex;
    flex-direction: column;

    .chart-placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .chart-bg {
        height: 100px;
        width: 100%;
        overflow: hidden;
        position: relative;
      }

      .chart-info {
        margin-top: 8px;
        .chart-stat {
           display: flex;
           justify-content: space-between;
           font-size: 12px;
           
           .stat-val { color: $text-black; font-weight: 600; }
           .stat-change { color: #10B981; }
        }
      }
    }
  }
}

/* 4. 偏好设置 & 5. 安全设置 (Shared Card Styles) */
.section-preferences, .section-security {
  .card {
    padding: 16px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: $text-black;
    margin: 0 0 16px 0;
  }
}

.section-preferences {
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    &:last-child {
      margin-bottom: 0;
    }

    .setting-info {
      display: flex;
      flex-direction: column;

      .setting-name {
        font-size: 14px;
        font-weight: 500;
        color: $text-black;
        margin-bottom: 2px;
      }
      .setting-desc {
        font-size: 12px;
        color: $text-light;
      }
    }

    /* Custom Switch */
    .switch-wrapper {
      position: relative;
      width: 44px;
      height: 24px;

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .switch-label {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        border-radius: 24px;
        transition: .3s;

        &:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          border-radius: 50%;
          transition: .3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      }

      input:checked + .switch-label {
        background-color: $primary-purple;
      }

      input:checked + .switch-label:before {
        transform: translateX(20px);
      }
    }
  }
}

.section-security {
  .card-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .card-title {
      margin: 0;
    }

    .view-all-top {
       font-size: 14px;
       color: $primary-purple;
       text-decoration: none;
       font-weight: 500;
       &:hover { text-decoration: underline; }
    }
  }

  .security-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;

      &:hover {
        background-color: rgba(249, 246, 252, 0.5);
        border-color: rgba(114, 46, 209, 0.1);
        
        .arrow-icon {
           transform: translateX(4px); 
           color: $primary-purple;
        }
      }

      .sec-left {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        color: $text-black;
        font-weight: 500;

        .sec-icon {
           color: $text-light;
           font-size: 18px;
        }
      }

      .arrow-icon {
        color: $text-light;
        transition: all 0.2s ease;
      }
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .workflow-grid {
    grid-template-columns: 1fr !important;
  }
  
  .profile-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    
    .profile-stats {
      width: 100%;
      justify-content: space-around;
      
      .stat-divider {
        display: none;
      }
    }
  }
}
</style>
