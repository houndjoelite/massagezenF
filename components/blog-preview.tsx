"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

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

export function BlogPreview() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch("/api/wordpress/posts?limit=3")
        if (!response.ok) {
          throw new Error("Failed to fetch articles")
        }
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error("Error loading articles:", error)
        setArticles([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Chargement des articles...</div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Derniers articles</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Aucun article publié pour le moment. Revenez bientôt pour découvrir nos conseils d'experts !
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Derniers articles</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Conseils d'experts, guides d'achat et actualités du monde du massage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image || "/massage-article.png"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.publishedAt).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors text-balance">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-pretty">{post.excerpt}</p>
                  </div>

                  <Button variant="ghost" asChild className="p-0 h-auto font-semibold group/btn">
                    <Link href={`/blog/${post.slug}`}>
                      Lire l'article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">Voir tous les articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
