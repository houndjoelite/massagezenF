interface ProductSchemaProps {
  product: {
    title: string
    description: string
    image: string | null
    price: string
    currency: string
    stockStatus: string
    averageRating: number
    ratingCount: number
    slug: string
  }
}
interface ArticleSchemaProps {
  article: {
    title: string
    excerpt: string
    image: string
    publishedAt: string
    author: string
    slug: string
  }
}
interface BreadcrumbSchemaProps {
  items: {
    name: string
    url: string
  }[]
}

const baseUrl = 'https://monappareildemassage.com'

export function ProductSchema({ product }: ProductSchemaProps) {
  const priceValidUntil = new Date()
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1)
  const priceValidUntilStr = priceValidUntil.toISOString().split("T")[0]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.image || undefined,
    "url": `${baseUrl}/produits/${product.slug}`,
    "brand": {
      "@type": "Brand",
      "name": "MassageZen"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "EUR",
      "priceValidUntil": priceValidUntilStr,
      "availability": product.stockStatus === "instock"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "url": `${baseUrl}/produits/${product.slug}`,
      "seller": {
        "@type": "Organization",
        "name": "MassageZen"
      }
    },
    ...(product.averageRating > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.averageRating,
        "reviewCount": product.ratingCount,
        "bestRating": 5,
        "worstRating": 1,
      }
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image || undefined,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "MassageZen",
      "url": baseUrl,
    },
    "url": `${baseUrl}/blog/${article.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${article.slug}`,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
