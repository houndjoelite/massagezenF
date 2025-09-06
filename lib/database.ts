export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  readTime: number
  image: string
  seoTitle: string
  seoDescription: string
  publishedAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: string
  originalPrice?: string
  rating: number
  amazonUrl: string
  description: string
  features: string[]
  image: string
  createdAt: Date
  updatedAt: Date
}

// Simulate database operations (replace with real database calls)
let articles: Article[] = []
let products: Product[] = []

export const articleOperations = {
  create: async (articleData: Omit<Article, "id" | "publishedAt" | "updatedAt">) => {
    const article: Article = {
      ...articleData,
      id: Date.now().toString(),
      publishedAt: new Date(),
      updatedAt: new Date(),
    }
    articles.push(article)
    return article
  },

  getAll: async () => articles,

  getBySlug: async (slug: string) => articles.find((a) => a.slug === slug),

  update: async (id: string, updates: Partial<Article>) => {
    const index = articles.findIndex((a) => a.id === id)
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updates, updatedAt: new Date() }
      return articles[index]
    }
    return null
  },

  delete: async (id: string) => {
    articles = articles.filter((a) => a.id !== id)
  },
}

export const productOperations = {
  create: async (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const product: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    products.push(product)
    return product
  },

  getAll: async () => products,

  getBySlug: async (slug: string) => products.find((p) => p.slug === slug),

  update: async (id: string, updates: Partial<Product>) => {
    const index = products.findIndex((p) => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...updates, updatedAt: new Date() }
      return products[index]
    }
    return null
  },

  delete: async (id: string) => {
    products = products.filter((p) => p.id !== id)
  },
}

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
