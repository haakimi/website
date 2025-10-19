'use client'

import React, { useEffect, useRef } from 'react'
import { notFound } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Users, Clock } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

interface PortfolioDetailPageProps {
  params: {
    slug: string
  }
}

const PortfolioDetailPage = ({ params }: PortfolioDetailPageProps) => {
  const project = portfolioData.find(p => p.slug === params.slug)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return

    // Animate content sections
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      contentRef.current?.querySelector('.project-header'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      contentRef.current?.querySelector('.project-content'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )

    // Scroll animations for sections
    ScrollTrigger.create({
      trigger: '.project-section',
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
  }, [project])

  if (!project) {
    notFound()
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8">{line.slice(2)}</h1>
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-6">{line.slice(3)}</h2>
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">{line.slice(4)}</h3>
      } else if (line.startsWith('- ')) {
        return (
          <li key={index} className="flex items-start mb-2">
            <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
            <span className="text-gray-700 dark:text-gray-300">{line.slice(2)}</span>
          </li>
        )
      } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ')) {
        return (
          <li key={index} className="flex items-start mb-2">
            <span className="text-primary-600 dark:text-primary-400 mr-2 font-semibold">{line.split('.')[0]}.</span>
            <span className="text-gray-700 dark:text-gray-300">{line.split('. ').slice(1).join('. ')}</span>
          </li>
        )
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{line}</p>
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="container-max pt-24 pb-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回作品集
        </Link>
      </div>

      <div ref={contentRef} className="container-max pb-20">
        {/* Project Header */}
        <motion.div
          className="project-header bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl p-8 md:p-12 mb-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium">
                    精选项目
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {project.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5 mr-2" />
                  {new Date(project.createdAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:flex-col">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  查看演示
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github className="w-5 h-5 mr-2" />
                  查看代码
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Project Content */}
        <motion.div
          className="project-content bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="project-content">
              {formatContent(project.content)}
            </div>
          </div>
        </motion.div>

        {/* Related Projects */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            相关项目
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData
              .filter(p => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/portfolio/${relatedProject.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-32 bg-gradient-to-br from-primary-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{relatedProject.title}</h3>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {relatedProject.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {relatedProject.description}
                  </p>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioDetailPage