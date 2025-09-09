"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimateOnScroll, AnimateList, HoverEffect } from "@/components/ui/animate-on-scroll"

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
        <AnimateOnScroll animation="fadeInUp" className="text-center space-y-4 mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-balance text-content">Derniers articles</h2>
          <p className="text-base lg:text-lg text-content-soft text-pretty max-w-2xl mx-auto">
            Conseils d'experts, guides d'achat et actualités du monde du massage
          </p>
        </AnimateOnScroll>

        <AnimateList
          animation="fadeInUp"
          staggerDelay={150}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((post) => (
            <HoverEffect key={post.id} effect="lift" intensity="medium">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <Image
                    src={post.image || "/massage-article.png"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white/95 backdrop-blur-sm border-0 shadow-lg font-medium px-3 py-1.5">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <Calendar className="h-4 w-4 text-gray-700" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">{new Date(post.publishedAt).toLocaleDateString("fr-FR")}</span>
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold group-hover:text-primary transition-colors text-balance leading-tight text-content">
                      {post.title}
                    </h3>
                    <p className="text-base lg:text-lg text-content-soft text-pretty leading-relaxed line-clamp-3">{post.excerpt}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button 
                      variant="ghost" 
                      asChild 
                      className="p-0 h-auto font-semibold group/btn text-primary hover:text-primary/80 hover:bg-transparent"
                    >
                      <Link href={`/blog/${post.slug}`} className="flex items-center">
                        Lire l'article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
              </Card>
            </HoverEffect>
          ))}
        </AnimateList>

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
