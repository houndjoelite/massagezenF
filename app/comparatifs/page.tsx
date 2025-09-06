"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Clock, User, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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
  image: string | null
  tags: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export default function ComparatifsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch("/api/wordpress/posts/comparatifs")
        if (!response.ok) {
          throw new Error("Failed to fetch comparatifs articles")
        }
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error("Error loading comparatifs articles:", error)
        setArticles([])
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
                <BreadcrumbPage>Comparatifs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Comparatifs Experts</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Tests approfondis et comparaisons objectives pour vous aider à faire le meilleur choix
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Chargement des comparatifs...</p>
            </div>
          ) : articles.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">Aucun comparatif disponible</h3>
                <p className="text-muted-foreground">
                  Les comparatifs d'appareils de massage seront bientôt disponibles.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    {article.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Badge variant="secondary" className="w-fit">Comparatif</Badge>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>

                      <Button asChild className="w-full">
                        <Link href={`/blog/${article.slug}`}>
                          Lire le comparatif
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
