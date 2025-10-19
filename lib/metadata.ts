import { Metadata } from 'next'

export const siteConfig = {
  name: 'Your Name - Portfolio',
  description: '展示个人项目和文章的现代化作品集网站',
  url: 'https://your-domain.com',
  ogImage: '/images/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/yourusername',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
  author: {
    name: 'Your Name',
    email: 'your-email@example.com',
  },
}

export type SEOProps = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export function generateMetadata(props: SEOProps): Metadata {
  const {
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url = siteConfig.url,
    type = 'website',
    keywords = [],
    publishedTime,
    modifiedTime,
    section,
    tags = [],
  } = props

  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`

  return {
    title: fullTitle,
    description,
    keywords: [
      '作品集',
      '个人网站',
      '前端开发',
      'React',
      'Next.js',
      'TypeScript',
      'UI/UX设计',
      '全栈开发',
      ...keywords,
    ],
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'zh_CN',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@yourusername',
    },
    alternates: {
      canonical: url,
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  }
}

export function generateJsonLd(props: SEOProps & { type?: 'WebPage' | 'Article' | 'Person' }) {
  const {
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url = siteConfig.url,
    type = 'WebPage',
    publishedTime,
    modifiedTime,
    tags = [],
  } = props

  const baseJsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url,
    image,
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      email: siteConfig.author.email,
    },
  }

  if (type === 'Article') {
    return {
      ...baseJsonLd,
      '@type': 'Article',
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      author: {
        '@type': 'Person',
        name: siteConfig.author.name,
      },
      keywords: tags.join(', '),
    }
  }

  if (type === 'Person') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      url: siteConfig.url,
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.twitter,
      ],
      knowsAbout: [
        'Web Development',
        'Frontend Development',
        'React',
        'Next.js',
        'TypeScript',
        'UI/UX Design',
      ],
    }
  }

  return baseJsonLd
}