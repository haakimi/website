# 个人作品集网站

一个现代化的个人作品集网站，展示项目作品和技术文章，使用 Next.js 14、Tailwind CSS 和 GSAP 构建。

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: GSAP, Framer Motion
- **图标**: Lucide React
- **部署**: Vercel

## ✨ 特性

- 🎨 **现代化设计** - 简洁优雅的界面设计
- 🌙 **暗黑模式** - 支持明暗主题切换
- 📱 **响应式布局** - 完美适配各种设备
- ⚡ **性能优化** - 快速加载和流畅动画
- 🔍 **SEO 优化** - 完整的 SEO 配置
- 🎭 **丰富动画** - GSAP 驱动的页面动画
- 📝 **文章系统** - 支持分类和标签的文章展示
- 💼 **作品展示** - 项目作品展示和详情页
- 📧 **联系表单** - 功能完整的联系页面

## 📁 项目结构

```
├── app/                  # Next.js App Router
│   ├── portfolio/       # 作品展示页面
│   ├── articles/        # 文章页面
│   ├── contact/         # 联系页面
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 首页
│   ├── robots.ts        # SEO 机器人配置
│   └── sitemap.ts       # 网站地图
├── components/          # React 组件
│   ├── Header.tsx       # 页面头部
│   ├── Footer.tsx       # 页面底部
│   └── StructuredData.tsx # 结构化数据
├── data/               # 数据文件
│   ├── portfolio.ts    # 作品数据
│   └── articles.ts     # 文章数据
├── lib/               # 工具库
│   ├── utils.ts       # 工具函数
│   └── metadata.ts    # SEO 配置
├── styles/            # 样式文件
│   └── theme.ts       # 主题配置
└── public/            # 静态资源
```

## 🛠️ 安装和运行

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 启动生产服务器

```bash
npm run start
# 或
yarn start
```

## 📝 自定义配置

### 修改个人信息

编辑以下文件来个性化你的网站：

1. **修改网站基本信息**：
   - `lib/metadata.ts` - 网站名称、描述等
   - `app/layout.tsx` - 页面标题和元数据

2. **更新作品数据**：
   - `data/portfolio.ts` - 添加/修改你的项目作品

3. **更新文章数据**：
   - `data/articles.ts` - 添加/修改你的技术文章

4. **修改联系信息**：
   - `app/contact/page.tsx` - 更新联系方式和社交媒体链接

### 自定义样式

- **主题颜色**：编辑 `tailwind.config.js` 中的颜色配置
- **全局样式**：修改 `app/globals.css`
- **组件样式**：在对应的组件文件中修改 Tailwind CSS 类名

### 添加新页面

1. 在 `app/` 目录下创建新的文件夹
2. 添加 `page.tsx` 文件
3. 如需要，添加 `layout.tsx` 文件

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 上导入项目
3. 配置环境变量（如果有）
4. 点击部署

### 其他部署选项

- **Netlify**: 连接 GitHub 仓库，自动部署
- **AWS Amplify**: 使用 AWS 控制台部署
- **自托管**: 构建后部署到自己的服务器

## 🔧 SEO 优化

网站内置了完整的 SEO 优化：

- ✅ 结构化数据 (JSON-LD)
- ✅ 动态生成 sitemap
- ✅ robots.txt 配置
- ✅ Open Graph 标签
- ✅ Twitter Card 标签
- ✅ 语义化 HTML 标签
- ✅ 响应式设计

## 📊 性能优化

- ⚡ 图片优化 (Next.js Image)
- ⚡ 代码分割
- ⚡ 静态生成和缓存
- ⚡ CSS 优化
- ⚡ 字体优化

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- 邮箱：your-email@example.com
- GitHub：https://github.com/yourusername
- LinkedIn：https://linkedin.com/in/yourusername

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！