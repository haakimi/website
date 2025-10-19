'use client'

import React, { useEffect, useRef, useState } from 'react'
import { notFound } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Eye, User, Tag, Share2, Heart } from 'lucide-react'
import { articlesData, Article } from '@/data/articles'

gsap.registerPlugin(ScrollTrigger)

interface ArticleDetailPageProps {
  params: {
    slug: string
  }
}

const ArticleDetailPage = ({ params }: ArticleDetailPageProps) => {
  const article = articlesData.find(a => a.slug === params.slug)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(42)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!article) return

    // Animate article content
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      contentRef.current?.querySelector('.article-header'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      contentRef.current?.querySelector('.article-meta'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .fromTo(
      contentRef.current?.querySelector('.article-content'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )

    // Scroll animations for content sections
    ScrollTrigger.create({
      trigger: '.content-section',
      start: 'top 80%',
      onEnter: (self) => {
        gsap.fromTo(
          self.trigger,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [article])

  if (!article) {
    notFound()
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 mt-12">{line.slice(2)}</h1>
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-10">{line.slice(3)}</h2>
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">{line.slice(4)}</h3>
      } else if (line.startsWith('- ')) {
        return (
          <li key={index} className="flex items-start mb-3 text-gray-700 dark:text-gray-300">
            <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
            <span className="flex-1">{line.slice(2)}</span>
          </li>
        )
      } else if (line.match(/^\d+\. /)) {
        return (
          <li key={index} className="flex items-start mb-3 text-gray-700 dark:text-gray-300">
            <span className="text-primary-600 dark:text-primary-400 mr-3 font-semibold">{line.split('.')[0]}.</span>
            <span className="flex-1">{line.split('. ').slice(1).join('. ')}</span>
          </li>
        )
      } else if (line.startsWith('```')) {
        return null // Handle code blocks separately
      } else if (line.trim() === '') {
        return <br key={index} className="mb-4" />
      } else {
        return <p key={index} className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">{line}</p>
      }
    })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    }
  }

  const relatedArticles = articlesData
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(tag => article.tags.includes(tag))))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="container-max pt-24 pb-8">
        <Link
          href="/articles"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回文章列表
        </Link>
      </div>

      <div ref={contentRef} className="container-max pb-20">
        {/* Article Header */}
        <motion.article
          className="article-header bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Article Hero */}
          <div className="h-64 md:h-96 bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative text-center text-white p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="px-4 py-2 bg-yellow-400/80 backdrop-blur-sm text-yellow-900 rounded-full text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      精选
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  {article.title}
                </h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  {article.description}
                </p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Article Meta */}
            <motion.div
              className="article-meta flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <User className="w-5 h-5 mr-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{article.readTime} 分钟阅读</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Eye className="w-5 h-5 mr-2" />
                  <span>{article.views} 次阅读</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isLiked
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <Share2 className="w-5 h-5" />
                  <span>分享</span>
                </button>
              </div>
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {article.tags.map((tag) => (
                <div key={tag} className="flex items-center px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>

            {/* Article Body */}
            <motion.div
              className="article-content prose prose-lg dark:prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="content-section">
                {formatContent(article.content)}
              </div>
            </motion.div>
          </div>
        </motion.article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.section
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              相关文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-32 bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-lg font-bold">{relatedArticle.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(relatedArticle.publishedAt).toLocaleDateString('zh-CN', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {relatedArticle.readTime} 分钟
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

export default ArticleDetailPage