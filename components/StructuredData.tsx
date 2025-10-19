'use client'

import React from 'react'
import { generateJsonLd, SEOProps } from '@/lib/metadata'

interface StructuredDataProps extends SEOProps {
  type?: 'WebPage' | 'Article' | 'Person'
}

export default function StructuredData({ type = 'WebPage', ...props }: StructuredDataProps) {
  const jsonLd = generateJsonLd({ ...props, type })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd, null, 2),
      }}
    />
  )
}