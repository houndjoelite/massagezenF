import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monappareildemassage.com'
const WP_URL = 'https://cmsmonappareildemagge.monappareildemassage.com'
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || ''
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || ''

async function getProducts() {
  try {
    const url = new URL(`${WP_URL}/wp-json/wc/v3/products`)
    url.searchParams.set('consumer_key', WC_KEY)
    url.searchParams.set('consumer_secret', WC_SECRET)
    url.searchParams.set('per_page', '100')
    url.searchParams.set('status', 'publish')

    const response = await fetch(url.toString(), { next: { revalidate: 3600 } })
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

async function getPosts() {
  try {
    const url = new URL(`${WP_URL}/wp-json/wp/v2/posts`)
    url.searchParams.set('per_page', '100')
    url.searchParams.set('status', 'publish')
    url.searchParams.set('_fields', 'slug,modified,date')

    const response = await fetch(url.toString(), { next: { revalidate: 3600 } })
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getPosts()])

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/categories/pistolets-massage`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/pieds`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/dos-nuque`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/pressotherapie`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/tete-cuir-chevelu`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/massage-oculaire`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/jambes-mollets`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/multifonctions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/coussinets-ceintures`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/mains`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/categories/fauteuils-de-massage`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/produits/${product.slug}`,
    lastModified: new Date(product.date_modified || product.date_created || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const postPages: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified || post.date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages, ...postPages]
}
