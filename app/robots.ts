import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monappareildemassage.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
