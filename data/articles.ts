export interface Article {
  id: string
  title: string
  description: string
  content: string
  image: string
  tags: string[]
  category: string
  author: string
  authorAvatar: string
  publishedAt: string
  readTime: number
  featured: boolean
  slug: string
  views: number
}

export const articlesData: Article[] = [
  {
    id: '1',
    title: 'Next.js 14 App Router 深度解析',
    description: '全面了解 Next.js 14 中 App Router 的新特性、最佳实践以及与 Pages Router 的区别。',
    content: `
# Next.js 14 App Router 深度解析

Next.js 14 带来了许多令人兴奋的新特性，其中最引人注目的就是 App Router。本文将深入探讨 App Router 的核心概念和实际应用。

## 什么是 App Router？

App Router 是 Next.js 13 引入的新路由系统，基于 React Server Components (RSC) 构建。它提供了更强大的功能、更好的性能和更直观的开发体验。

## 核心特性

### 1. Server Components by Default
在 App Router 中，所有组件默认都是 Server Components，这意味着：
- 组件在服务器端渲染
- 可以直接访问服务器端资源
- 减少了客户端 JavaScript 包大小
- 提升了首屏加载性能

### 2. Nested Layouts
App Router 支持嵌套布局，使得构建复杂的应用界面变得更加简单：

\`\`\`tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <nav>Dashboard Navigation</nav>
      {children}
    </section>
  )
}
\`\`\`

### 3. Streaming Support
App Router 原生支持 React 18 的 Streaming 功能，可以实现：
- 即时服务器渲染
- 渐进式 hydration
- 更好的用户体验

## 最佳实践

### 1. 合理使用 Server 和 Client Components
- 使用 Server Components 处理数据获取和静态内容
- 只在需要交互性时使用 'use client' 指令
- 保持组件树的客户端边界尽可能小

### 2. 数据获取策略
App Router 提供了多种数据获取方式：

\`\`\`tsx
// 静态生成
async function getStaticData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

// 动态渲染
async function getDynamicData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  })
  return res.json()
}

// 增量静态再生
async function getISRData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  })
  return res.json()
}
\`\`\`

## 迁移指南

### 从 Pages Router 迁移
1. 重构文件结构，将页面移动到 app 目录
2. 将数据获取逻辑移至组件内部
3. 更新链接组件使用新的 App Router 语法
4. 处理客户端组件迁移

### 常见问题解决
1. **"use client" 边界问题** - 合理划分客户端边界
2. **样式处理** - 确保全局样式正确加载
3. **中间件配置** - 更新 middleware.ts 配置

## 性能优化

### 1. 代码分割
- 利用动态导入减少初始包大小
- 使用 React.lazy() 和 Suspense
- 合理组织组件结构

### 2. 缓存策略
- 配置适当的缓存头
- 使用 Next.js 的内置缓存机制
- 实施数据级缓存

### 3. 图片优化
- 使用 next/image 组件
- 配置适当的图片格式
- 实施懒加载策略

## 总结

App Router 代表了 Next.js 的未来方向，它提供了更强大的功能和更好的开发体验。虽然学习曲线有些陡峭，但掌握后将大大提升开发效率和应用性能。

建议在新项目中直接使用 App Router，在现有项目中逐步迁移。记住，关键是要理解 Server Components 的概念，并根据实际需求合理使用。
    `,
    image: '/images/articles/nextjs14.jpg',
    tags: ['Next.js', 'React', 'Web开发', '性能优化'],
    category: '技术教程',
    author: 'Your Name',
    authorAvatar: '/images/avatar.jpg',
    publishedAt: '2024-01-20',
    readTime: 15,
    featured: true,
    slug: 'nextjs-14-app-router-deep-dive',
    views: 1250
  },
  {
    id: '2',
    title: 'TypeScript 高级类型系统实战',
    description: '深入探讨 TypeScript 的高级类型特性，包括泛型、条件类型、映射类型等概念的实际应用。',
    content: `
# TypeScript 高级类型系统实战

TypeScript 的类型系统是其最强大的特性之一。本文将通过实际案例深入探讨 TypeScript 的高级类型特性。

## 泛型编程

泛型是 TypeScript 的核心特性，它允许我们编写可重用的类型安全代码：

\`\`\`typescript
// 基础泛型函数
function identity<T>(arg: T): T {
  return arg
}

// 泛型约束
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length)
}

// 泛型接口
interface Collection<T> {
  add(item: T): void
  remove(item: T): boolean
  find(predicate: (item: T) => boolean): T | undefined
}
\`\`\`

## 条件类型

条件类型允许我们根据类型关系来选择类型：

\`\`\`typescript
// 基础条件类型
type IsString<T> = T extends string ? true : false

// 分布式条件类型
type ToArray<T> = T extends any ? T[] : never

// 条件类型与 infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never
\`\`\`

## 映射类型

映射类型允许我们基于现有类型创建新类型：

\`\`\`typescript
// 基础映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// 条件映射类型
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 高级映射类型
type Getters<T> = {
  [P in keyof T as \`get\$\{Capitalize<string & P>}\`]: () => T[P]
}
\`\`\`

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型：

\`\`\`typescript
// 基础模板字面量类型
type EventName<T extends string> = \`on\$\{Capitalize<T>}\`

// 模板字面量类型与映射类型结合
type CSSProperties = {
  [K in keyof CSSStyleDeclaration as K extends string
    ? K extends \`webkit\$\{string}\`
      ? never
      : K
    : never]: CSSStyleDeclaration[K]
}
\`\`\`

## 实际应用案例

### 1. 状态管理类型

\`\`\`typescript
interface State {
  user: User | null
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }

type Reducer<S, A> = (state: S, action: A) => S

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}
\`\`\`

### 2. API 响应类型

\`\`\`typescript
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

type ApiEndpoint<T> = {
  get(): Promise<ApiResponse<T>>
  post(data: Partial<T>): Promise<ApiResponse<T>>
  put(id: string, data: Partial<T>): Promise<ApiResponse<T>>
  delete(id: string): Promise<ApiResponse<void>>
}
\`\`\`

## 性能优化

### 1. 类型推断优化
- 使用类型注解而不是类型断言
- 避免过度的类型嵌套
- 合理使用类型别名

### 2. 编译速度优化
- 使用项目引用 (Project References)
- 合理配置 tsconfig.json
- 避免全局类型污染

## 总结

TypeScript 的高级类型系统为我们提供了强大的工具来编写类型安全的代码。掌握这些特性将大大提升代码质量和开发效率。

记住，类型系统的目的是为了提高代码的可维护性和安全性，而不是过度复杂化。在实际应用中，要根据项目需求合理使用这些特性。
    `,
    image: '/images/articles/typescript.jpg',
    tags: ['TypeScript', 'JavaScript', '类型系统', '编程语言'],
    category: '技术教程',
    author: 'Your Name',
    authorAvatar: '/images/avatar.jpg',
    publishedAt: '2024-02-10',
    readTime: 20,
    featured: true,
    slug: 'typescript-advanced-types',
    views: 980
  },
  {
    id: '3',
    title: '现代 CSS 布局完全指南',
    description: '深入了解 Flexbox、Grid 以及现代 CSS 布局技术，掌握响应式设计的核心概念。',
    content: `
# 现代 CSS 布局完全指南

CSS 布局技术在过去几年中发生了巨大变革。本文将详细介绍现代 CSS 布局的各个方面。

## Flexbox 布局

Flexbox 是一维布局系统，非常适合处理行或列中的元素对齐：

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}

.item {
  flex: 1;
  min-width: 0;
}
\`\`\`

### Flexbox 关键概念
- **主轴 (Main Axis)**: flex-direction 定义的方向
- **交叉轴 (Cross Axis)**: 垂直于主轴的方向
- **Flex 容器**: display: flex 的父元素
- **Flex 项目**: Flex 容器的直接子元素

## CSS Grid 布局

Grid 是二维布局系统，可以同时处理行和列：

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  grid-auto-rows: minmax(200px, auto);
}

.grid-item {
  grid-column: span 2;
  grid-row: span 1;
}
\`\`\`

### Grid 优势
- 二维布局控制
- 精确的元素定位
- 响应式设计友好
- 复杂布局简化

## Container Queries

Container Queries 允许基于容器大小而不是视口大小来应用样式：

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
}
\`\`\`

## 现代布局技术

### 1. 逻辑属性
使用逻辑属性替代物理属性：

\`\`\`css
/* 传统方式 */
.element {
  margin-left: auto;
  padding-right: 1rem;
}

/* 现代方式 */
.element {
  margin-inline-start: auto;
  padding-inline-end: 1rem;
}
\`\`\`

### 2. 现代单位
使用相对单位提升响应式设计：

\`\`\`css
.container {
  width: min(100%, 1200px);
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  gap: max(1rem, 5%);
}
\`\`\`

### 3. 子网格 (Subgrid)
子网格允许嵌套网格继承父网格的定义：

\`\`\`css
.parent-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1rem;
}

.child-grid {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
\`\`\`

## 响应式设计策略

### 1. 移动优先
\`\`\`css
/* 基础样式（移动端） */
.container {
  padding: 1rem;
}

/* 平板端 */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
\`\`\`

### 2. 容器查询
\`\`\`css
.sidebar {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .navigation {
    display: flex;
    flex-direction: column;
  }
}

@container (min-width: 500px) {
  .navigation {
    flex-direction: row;
  }
}
\`\`\`

## 性能优化

### 1. 布局性能
- 避免强制同步布局
- 使用 transform 和 opacity 进行动画
- 合理使用 will-change

### 2. CSS 优化
- 减少选择器复杂度
- 避免过度嵌套
- 使用 CSS 自定义属性

## 实际应用案例

### 响应式卡片布局
\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-content {
  flex: 1;
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }

  .card-image {
    width: 200px;
    height: 200px;
  }
}
\`\`\`

## 总结

现代 CSS 布局为我们提供了强大而灵活的工具来创建响应式、可维护的布局。掌握这些技术将帮助你构建更好的用户界面。

记住，选择合适的布局技术取决于具体需求。Flexbox 适合一维布局，Grid 适合二维布局，Container Queries 适合组件级别的响应式设计。
    `,
    image: '/images/articles/css-layout.jpg',
    tags: ['CSS', '布局', '响应式设计', '前端开发'],
    category: '技术教程',
    author: 'Your Name',
    authorAvatar: '/images/avatar.jpg',
    publishedAt: '2024-02-15',
    readTime: 18,
    featured: false,
    slug: 'modern-css-layout-guide',
    views: 750
  },
  {
    id: '4',
    title: '构建高性能的 React 应用',
    description: '学习 React 性能优化的最佳实践，包括组件优化、状态管理、代码分割等关键技术。',
    content: `
# 构建高性能的 React 应用

React 应用的性能优化是一个系统性工程。本文将从多个角度介绍 React 性能优化的最佳实践。

## 组件优化

### 1. 使用 React.memo
React.memo 可以防止不必要的组件重渲染：

\`\`\`tsx
import React from 'react'

const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
})

// 自定义比较函数
const areEqual = (prevProps, nextProps) => {
  return prevProps.data.length === nextProps.data.length
}

export default React.memo(ExpensiveComponent, areEqual)
\`\`\`

### 2. 使用 useMemo 和 useCallback
这些 hooks 可以缓存计算结果和函数引用：

\`\`\`tsx
import React, { useMemo, useCallback } from 'react'

const Component = ({ items, onSelect }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0)
  }, [items])

  const handleClick = useCallback((id) => {
    onSelect(id)
  }, [onSelect])

  return (
    <div>
      <div>Total: {expensiveValue}</div>
      {items.map(item => (
        <Item
          key={item.id}
          item={item}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}
\`\`\`

## 状态管理优化

### 1. 状态结构设计
合理的状态结构可以减少不必要的重渲染：

\`\`\`tsx
// 不好的状态结构
const [state, setState] = useState({
  user: null,
  posts: [],
  loading: false,
  error: null
})

// 好的状态结构
const [user, setUser] = useState(null)
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
\`\`\`

### 2. 使用 useReducer
复杂状态逻辑适合使用 useReducer：

\`\`\`tsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    loading: false,
    error: null
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' })
      try {
        const response = await fetch(url)
        const data = await response.json()
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message })
      }
    }

    fetchData()
  }, [url])

  return state
}
\`\`\`

## 代码分割

### 1. 动态导入
使用 React.lazy 和 Suspense 进行代码分割：

\`\`\`tsx
import React, { Suspense } from 'react'

const LazyComponent = React.lazy(() => import('./LazyComponent'))

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}
\`\`\`

### 2. 路由级别代码分割
\`\`\`tsx
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  )
}
\`\`\`

## 渲染优化

### 1. 虚拟化长列表
对于长列表，使用虚拟化技术：

\`\`\`tsx
import { FixedSizeList as List } from 'react-window'

const Row = ({ index, style }) => (
  <div style={style}>
    Row {index}
  </div>
)

const VirtualizedList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={50}
  >
    {Row}
  </List>
)
\`\`\`

### 2. 优化渲染时机
使用 startTransition 标记非紧急更新：

\`\`\`tsx
import { startTransition } from 'react'

const handleFilterChange = (value) => {
  startTransition(() => {
    setFilterValue(value)
  })
}
\`\`\`

## 性能监控

### 1. React DevTools Profiler
使用 React DevTools Profiler 分析组件性能：

\`\`\`bash
# 安装 React DevTools
npm install --save-dev react-devtools
\`\`\`

### 2. 性能指标监控
\`\`\`tsx
import { useEffect } from 'react'

const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      console.log(\`\${componentName} render time:\`, endTime - startTime)
    }
  })
}

const Component = () => {
  usePerformanceMonitor('Component')
  // 组件逻辑
}
\`\`\`

## 图片优化

### 1. 懒加载
使用 Intersection Observer 实现图片懒加载：

\`\`\`tsx
import { useState, useEffect, useRef } from 'react'

const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} {...props}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        />
      )}
    </div>
  )
}
\`\`\`

## 总结

React 性能优化是一个持续的过程，需要从多个角度考虑：

1. **组件层面**: 使用 memo、useMemo、useCallback
2. **状态管理**: 合理设计状态结构，使用适当的状态管理工具
3. **代码分割**: 实施路由级别和组件级别的代码分割
4. **渲染优化**: 虚拟化、延迟更新等
5. **监控分析**: 使用工具分析和监控性能

记住，性能优化应该基于实际测量，不要过早优化。先测量，再优化，最后验证效果。
    `,
    image: '/images/articles/react-performance.jpg',
    tags: ['React', '性能优化', '前端开发', 'JavaScript'],
    category: '性能优化',
    author: 'Your Name',
    authorAvatar: '/images/avatar.jpg',
    publishedAt: '2024-03-01',
    readTime: 25,
    featured: true,
    slug: 'react-performance-optimization',
    views: 1100
  },
  {
    id: '5',
    title: 'Web API 最佳实践指南',
    description: '深入探讨 RESTful API 设计原则、GraphQL 实践以及现代 API 开发的安全性和性能优化。',
    content: `
# Web API 最佳实践指南

API 是现代 Web 应用的核心组成部分。本文将介绍设计和实现高质量 Web API 的最佳实践。

## RESTful API 设计

### 1. 资源命名规范
使用名词而非动词来表示资源：

\`\`\`
GET    /api/users         # 获取用户列表
GET    /api/users/123     # 获取特定用户
POST   /api/users         # 创建新用户
PUT    /api/users/123     # 更新用户
DELETE /api/users/123     # 删除用户
\`\`\`

### 2. HTTP 状态码使用
正确使用 HTTP 状态码：

\`\`\`javascript
// 成功响应
200 OK          // 请求成功
201 Created     // 资源创建成功
204 No Content  // 删除成功

// 客户端错误
400 Bad Request        // 请求参数错误
401 Unauthorized       // 未授权
403 Forbidden          // 禁止访问
404 Not Found          // 资源不存在
422 Unprocessable Entity  // 请求格式正确但语义错误

// 服务器错误
500 Internal Server Error  // 服务器内部错误
502 Bad Gateway           // 网关错误
503 Service Unavailable   // 服务不可用
\`\`\`

### 3. 版本控制
实施 API 版本控制：

\`\`\`javascript
// URL 版本控制
GET /api/v1/users
GET /api/v2/users

// Header 版本控制
GET /api/users
Accept: application/vnd.api+json;version=1
\`\`\`

## 响应格式设计

### 1. 统一响应格式
\`\`\`javascript
// 成功响应
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe"
  },
  "message": "User retrieved successfully"
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found",
    "details": "User with ID 123 does not exist"
  }
}

// 分页响应
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
\`\`\`

### 2. 数据序列化
使用 JSON API 规范：

\`\`\`javascript
// 资源对象
{
  "type": "users",
  "id": "123",
  "attributes": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "relationships": {
    "posts": {
      "data": [
        { "type": "posts", "id": "456" }
      ]
    }
  }
}
\`\`\`

## 安全性最佳实践

### 1. 身份验证
使用 JWT 或 OAuth 2.0：

\`\`\`javascript
// JWT 实现
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
\`\`\`

### 2. 输入验证
使用 Joi 或 Yup 进行输入验证：

\`\`\`javascript
const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required()
})

const validateUser = (userData) => {
  return userSchema.validate(userData)
}
\`\`\`

### 3. 速率限制
实施 API 速率限制：

\`\`\`javascript
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制每个 IP 100 次请求
  message: 'Too many requests from this IP'
})

app.use('/api/', limiter)
\`\`\`

## 性能优化

### 1. 数据库优化
\`\`\`javascript
// 使用索引
db.users.createIndex({ email: 1 })

// 查询优化
const users = await User
  .find({ isActive: true })
  .select('name email')
  .limit(20)
  .sort({ createdAt: -1 })

// 聚合查询
const stats = await User.aggregate([
  { $match: { isActive: true } },
  { $group: { _id: '$role', count: { $sum: 1 } } }
])
\`\`\`

### 2. 缓存策略
\`\`\`javascript
const redis = require('redis')
const client = redis.createClient()

// 缓存用户数据
const getUserById = async (id) => {
  const cacheKey = \`user:\$\{id}\`
  const cachedUser = await client.get(cacheKey)

  if (cachedUser) {
    return JSON.parse(cachedUser)
  }

  const user = await User.findById(id)
  await client.setex(cacheKey, 3600, JSON.stringify(user))

  return user
}
\`\`\`

### 3. 分页实现
\`\`\`javascript
const getUsers = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit),
    User.countDocuments()
  ])

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}
\`\`\`

## GraphQL 实践

### 1. Schema 设计
\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  users(limit: Int, offset: Int): [User!]!
  user(id: ID!): User
  posts: [Post!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  createPost(input: CreatePostInput!): Post!
}
\`\`\`

### 2. Resolver 实现
\`\`\`javascript
const resolvers = {
  Query: {
    users: async (_, { limit = 20, offset = 0 }) => {
      return await User.find().skip(offset).limit(limit)
    },
    user: async (_, { id }) => {
      return await User.findById(id)
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = new User(input)
      await user.save()
      return user
    }
  },
  User: {
    posts: async (user) => {
      return await Post.find({ authorId: user.id })
    }
  }
}
\`\`\`

## API 文档

### 1. OpenAPI 规范
\`\`\`yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
\`\`\`

### 2. 交互式文档
使用 Swagger UI 或 Redoc 生成交互式 API 文档。

## 测试策略

### 1. 单元测试
\`\`\`javascript
describe('User API', () => {
  test('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    }

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201)

    expect(response.body.data.name).toBe(userData.name)
  })
})
\`\`\`

### 2. 集成测试
\`\`\`javascript
describe('User Integration Tests', () => {
  test('should authenticate user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123'
      })
      .expect(200)

    expect(response.body.data.token).toBeDefined()
  })
})
\`\`\`

## 总结

构建高质量的 Web API 需要考虑多个方面：

1. **设计原则**: RESTful 设计、资源命名、版本控制
2. **安全性**: 身份验证、输入验证、速率限制
3. **性能**: 数据库优化、缓存策略、分页
4. **文档**: OpenAPI 规范、交互式文档
5. **测试**: 单元测试、集成测试

记住，好的 API 设计应该是直观的、一致的、安全的和高性能的。
    `,
    image: '/images/articles/web-api.jpg',
    tags: ['API', 'REST', 'GraphQL', '安全性', '性能优化'],
    category: '后端开发',
    author: 'Your Name',
    authorAvatar: '/images/avatar.jpg',
    publishedAt: '2024-03-10',
    readTime: 30,
    featured: false,
    slug: 'web-api-best-practices',
    views: 850
  }
]

export const categories = ['全部', '技术教程', '性能优化', '后端开发', '前端开发', '设计思考']
export const tags = ['Next.js', 'React', 'TypeScript', 'JavaScript', 'CSS', '性能优化', 'Web开发', '前端开发', '后端开发', 'API', 'REST', 'GraphQL', '安全性', '类型系统', '编程语言', '布局', '响应式设计']