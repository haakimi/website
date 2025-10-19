export interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  slug: string
  createdAt: string
  content: string
}

export const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: '电商管理平台',
    description: '一个功能完整的电商后台管理系统，包含商品管理、订单处理、数据分析等功能。',
    image: '/images/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    category: 'Web应用',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    slug: 'ecommerce-admin-platform',
    createdAt: '2024-01-15',
    content: `
# 电商管理平台

这是一个现代化的电商后台管理系统，为电商企业提供全方位的管理解决方案。

## 核心功能

- 📊 **数据可视化** - 实时销售数据和趋势分析
- 🛍️ **商品管理** - 完整的商品生命周期管理
- 📦 **订单处理** - 自动化订单流程和物流跟踪
- 👥 **用户管理** - 客户关系管理和权限控制
- 💰 **财务管理** - 收入统计和财务报表

## 技术特点

### 前端技术栈
- **Next.js 14** - 使用最新的 App Router 架构
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 快速构建响应式界面
- **Framer Motion** - 流畅的动画效果
- **Recharts** - 数据可视化图表

### 后端技术栈
- **Prisma ORM** - 类型安全的数据库操作
- **PostgreSQL** - 可靠的关系型数据库
- **NextAuth.js** - 安全的身份验证
- **Stripe API** - 支付处理集成

## 项目亮点

1. **性能优化**
   - 静态生成和服务端渲染结合
   - 图片优化和懒加载
   - 代码分割和缓存策略

2. **用户体验**
   - 响应式设计，适配各种设备
   - 暗黑模式支持
   - 实时数据更新
   - 流畅的交互动画

3. **安全性**
   - JWT 身份验证
   - SQL 注入防护
   - XSS 攻击防护
   - CORS 配置

## 开发过程

项目历时3个月完成，经历了以下阶段：

1. **需求分析** (2周) - 与客户沟通，确定功能需求
2. **原型设计** (1周) - 使用 Figma 设计用户界面
3. **前端开发** (6周) - 实现用户界面和交互逻辑
4. **后端开发** (4周) - API 开发和数据库设计
5. **测试优化** (2周) - 性能测试和用户体验优化
6. **部署上线** (1周) - 生产环境部署和监控配置

## 成果展示

- 📈 处理超过 10,000+ 订单
- ⚡ 页面加载时间 < 2秒
- 📱 移动端用户体验评分 95+
- 🔒 通过安全审计，无重大漏洞
    `
  },
  {
    id: '2',
    title: '社交媒体仪表板',
    description: '实时监控多个社交媒体平台的数据分析工具，提供深度洞察和报告功能。',
    image: '/images/projects/dashboard.jpg',
    technologies: ['React', 'Node.js', 'Chart.js', 'MongoDB', 'Express'],
    category: '数据分析',
    featured: true,
    githubUrl: 'https://github.com',
    slug: 'social-media-dashboard',
    createdAt: '2024-02-20',
    content: `
# 社交媒体仪表板

一个综合性的社交媒体数据分析平台，帮助用户深入了解和优化社交媒体表现。

## 功能特性

- 🔍 **多平台集成** - 支持 Twitter、Instagram、LinkedIn 等平台
- 📊 **实时数据** - 实时更新的数据监控
- 📈 **趋势分析** - 数据趋势和预测分析
- 📋 **报告生成** - 自动化的数据报告
- 🎯 **智能推荐** - 基于数据的优化建议
    `
  },
  {
    id: '3',
    title: '任务管理应用',
    description: '简洁高效的个人和团队任务管理工具，支持项目协作和进度跟踪。',
    image: '/images/projects/taskmanager.jpg',
    technologies: ['Vue.js', 'Firebase', 'Vuetify', 'Vuex'],
    category: '生产力工具',
    featured: false,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    slug: 'task-management-app',
    createdAt: '2024-03-10',
    content: `
# 任务管理应用

一个现代化的任务管理解决方案，帮助个人和团队提高工作效率。

## 主要功能

- ✅ **任务创建** - 简单直观的任务创建界面
- 📅 **日程安排** - 日程和时间管理功能
- 👥 **团队协作** - 实时协作和沟通工具
- 🏷️ **标签分类** - 灵活的任务分类系统
- 📊 **进度跟踪** - 项目进度可视化展示
    `
  },
  {
    id: '4',
    title: '在线教育平台',
    description: '互动式的在线学习平台，支持视频课程、实时互动和学习进度跟踪。',
    image: '/images/projects/education.jpg',
    technologies: ['Next.js', 'AWS', 'WebRTC', 'MySQL', 'Redis'],
    category: '教育科技',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    slug: 'online-education-platform',
    createdAt: '2024-01-25',
    content: `
# 在线教育平台

一个功能完整的在线学习平台，为学生和教育者提供优质的学习体验。

## 平台特色

- 🎥 **视频课程** - 高清视频播放和进度控制
- 💬 **实时互动** - 直播课堂和即时问答
- 📚 **学习资源** - 丰富的学习资料和练习题
- 🏆 **学习认证** - 完成课程获得认证证书
- 📊 **学习分析** - 个性化学习建议和进度跟踪
    `
  },
  {
    id: '5',
    title: '健康追踪应用',
    description: '个人健康管理应用，记录运动、饮食和健康数据，提供健康建议。',
    image: '/images/projects/health.jpg',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Express'],
    category: '健康生活',
    featured: false,
    githubUrl: 'https://github.com',
    slug: 'health-tracking-app',
    createdAt: '2024-02-15',
    content: `
# 健康追踪应用

专注于个人健康管理的移动应用，帮助用户建立健康的生活方式。

## 应用功能

- 🏃 **运动记录** - 多种运动类型的数据记录
- 🥗 **饮食管理** - 营养摄入分析和建议
- 😴 **睡眠监测** - 睡眠质量分析和改善建议
- 💊 **用药提醒** - 智能用药提醒功能
- 📈 **健康报告** - 定期健康数据报告
    `
  },
  {
    id: '6',
    title: '天气预报应用',
    description: '美观实用的天气应用，提供准确的天气预报和生活建议。',
    image: '/images/projects/weather.jpg',
    technologies: ['JavaScript', 'CSS', 'Weather API', 'PWA'],
    category: '生活服务',
    featured: false,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    slug: 'weather-forecast-app',
    createdAt: '2024-03-05',
    content: `
# 天气预报应用

一个优雅的天气查询应用，提供准确的天气信息和生活建议。

## 应用特性

- 🌤️ **实时天气** - 当前天气状况实时更新
- 📅 **7天预报** - 详细的未来一周天气预报
- 🗺️ **地图视图** - 天气地图和雷达图像
- 📍 **位置服务** - 自动定位和城市搜索
- 🎨 **主题切换** - 根据天气变化的动态主题
    `
  }
]

export const categories = ['全部', 'Web应用', '数据分析', '生产力工具', '教育科技', '健康生活', '生活服务']

export const technologies = [
  'Next.js', 'React', 'Vue.js', 'TypeScript', 'JavaScript',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL',
  'Tailwind CSS', 'Chart.js', 'Prisma', 'Firebase', 'AWS'
]