"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface SearchResult {
  id: string
  title: string
  content: string
  type: 'product' | 'post' | 'page'
  url: string
  image?: string
  price?: string
  category?: string
}

export default function RecherchePage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return
    
    setLoading(true)
    try {
      // Recherche dans les produits
      const productsResponse = await fetch(`/api/wordpress/products?search=${encodeURIComponent(searchTerm)}`)
      const products = productsResponse.ok ? await productsResponse.json() : []
      
      // Recherche dans les articles de blog
      const postsResponse = await fetch(`/api/wordpress/posts?search=${encodeURIComponent(searchTerm)}`)
      const posts = postsResponse.ok ? await postsResponse.json() : []
      
      // Transformer les résultats
      const searchResults: SearchResult[] = [
        ...products.map((product: any) => ({
          id: product.id,
          title: product.name,
          content: product.description,
          type: 'product' as const,
          url: `/produits/${product.id}`,
          image: product.image,
          price: product.price,
          category: product.category
        })),
        ...posts.map((post: any) => ({
          id: post.id,
          title: post.title.rendered,
          content: post.excerpt.rendered.replace(/<[^>]*>/g, ''), // Supprimer les balises HTML
          type: 'post' as const,
          url: `/blog/${post.slug}`,
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        }))
      ]
      
      setResults(searchResults)
    } catch (error) {
      console.error('Erreur lors de la recherche:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher des produits, guides, articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <Button type="submit" disabled={!searchQuery.trim()}>
                Rechercher
              </Button>
            </form>
          </div>

          {/* Résultats */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Recherche en cours...</p>
            </div>
          ) : query ? (
            <div>
              <h1 className="text-2xl font-bold mb-6">
                Résultats pour "{query}" ({results.length} résultat{results.length > 1 ? 's' : ''})
              </h1>
              
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    Essayez avec d'autres mots-clés ou explorez nos catégories.
                  </p>
                  <Button asChild>
                    <Link href="/categories">Voir les catégories</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.map((result) => (
                    <Card key={result.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          {result.image && (
                            <div className="w-24 h-24 flex-shrink-0">
                              <Image
                                src={result.image}
                                alt={result.title}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                                <Link href={result.url}>{result.title}</Link>
                              </h3>
                              <Badge variant={result.type === 'product' ? 'default' : 'secondary'}>
                                {result.type === 'product' ? 'Produit' : 'Article'}
                              </Badge>
                            </div>
                            
                            {result.category && (
                              <p className="text-sm text-muted-foreground">{result.category}</p>
                            )}
                            
                            {result.price && (
                              <p className="text-lg font-bold text-primary">{result.price}</p>
                            )}
                            
                            <p className="text-muted-foreground line-clamp-2">
                              {result.content}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2">
                              <Button asChild variant="outline" size="sm">
                                <Link href={result.url}>
                                  {result.type === 'product' ? 'Voir le produit' : 'Lire l\'article'}
                                </Link>
                              </Button>
                              
                              {result.type === 'product' && (
                                <Button asChild size="sm">
                                  <Link href="#" target="_blank" rel="noopener noreferrer">
                                    Voir sur Amazon
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Rechercher sur MassageZen</h2>
              <p className="text-muted-foreground">
                Trouvez les meilleurs appareils de massage et guides d'achat
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
