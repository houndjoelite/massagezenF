"use client"

import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  publishedAt: string
  author: string
  category: string
  image: string
  tags: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch("/api/wordpress/posts")
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Erreur ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        setArticles(data)
        setError(null)
      } catch (error) {
        console.error("Error loading articles:", error)
        setError(error instanceof Error ? error.message : "Erreur inconnue")
        setArticles([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance text-content">Blog Massage & Bien-être</h1>
            <p className="text-base lg:text-lg text-content-soft text-pretty max-w-3xl mx-auto">
              Guides d'experts, comparatifs détaillés et conseils professionnels pour optimiser votre bien-être
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Chargement des articles...</p>
            </div>
          ) : error ? (
            <div className="text-center space-y-4 py-12">
              <h2 className="text-2xl font-semibold text-destructive">Erreur de chargement</h2>
              <p className="text-muted-foreground">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Réessayer
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center space-y-4 py-12">
              <h2 className="text-2xl font-semibold">Aucun article disponible</h2>
              <p className="text-muted-foreground">Les articles seront bientôt disponibles. Revenez plus tard !</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">Aucune image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>

                        <h3 className="text-lg lg:text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2 text-content">
                          {post.title}
                        </h3>

                        <p className="text-base lg:text-lg text-content-soft line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between meta-text text-meta pt-4 border-t">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <span>{new Date(post.publishedAt).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
