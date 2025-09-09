"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimateOnScroll, AnimateList, HoverEffect } from "@/components/ui/animate-on-scroll"

interface Product {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  price: string
  regularPrice?: string
  salePrice?: string
  currency: string
  stockStatus: string
  averageRating: number
  ratingCount: number
  externalUrl: string | null
  buttonText: string
  categories: string[]
  tags: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

interface ProductGridProps {
  categorySlug: string
  limit?: number
  showFilters?: boolean
  title?: string
  description?: string
}

export function ProductGrid({ 
  categorySlug, 
  limit = 12, 
  showFilters = true,
  title = "Produits",
  description = "Découvrez notre sélection de produits"
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch(`/api/wordpress/products/category/${categorySlug}?limit=${limit}`)
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err)
        setError(err instanceof Error ? err.message : "Erreur inconnue")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categorySlug, limit])

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground mb-8">{description}</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            <p className="mt-4 text-muted-foreground">Chargement des produits...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground mb-8">{description}</p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <p className="text-destructive font-medium">Erreur lors du chargement des produits</p>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground mb-8">{description}</p>
            <div className="bg-muted/50 rounded-lg p-8">
              <p className="text-lg font-medium mb-2">Aucun produit trouvé</p>
              <p className="text-muted-foreground">
                Nous travaillons actuellement sur la sélection des meilleurs produits pour cette catégorie.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fadeInUp" className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-content">{title}</h2>
          <p className="text-base lg:text-lg text-content-soft mb-4">{description}</p>
          <Badge variant="secondary" className="text-sm">
            {products.length} produit{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}
          </Badge>
        </AnimateOnScroll>

        <AnimateList
          animation="fadeInUp"
          staggerDelay={200}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <HoverEffect key={product.id} effect="lift" intensity="high">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] rounded-3xl">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10"></div>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                      <span className="text-muted-foreground font-medium">Aucune image</span>
                    </div>
                  )}
                  
                  {/* Badge de statut en stock */}
                  <div className="absolute top-4 right-4 z-20">
                    {product.stockStatus === "instock" ? (
                      <Badge className="bg-green-500/90 text-white hover:bg-green-500/95 backdrop-blur-sm border-0 shadow-lg font-medium px-3 py-1.5">
                        En stock
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/90 text-white hover:bg-red-500/95 backdrop-blur-sm border-0 shadow-lg font-medium px-3 py-1.5">
                        Rupture
                      </Badge>
                    )}
                  </div>

                  {/* Overlay avec prix */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">
                            {product.price} {product.currency}
                          </span>
                          {product.regularPrice && product.regularPrice !== product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.regularPrice} {product.currency}
                            </span>
                          )}
                        </div>
                        {product.regularPrice && product.regularPrice !== product.price && (
                          <Badge className="bg-red-500 text-white text-xs font-bold">
                            -{Math.round(((parseFloat(product.regularPrice) - parseFloat(product.price)) / parseFloat(product.regularPrice)) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg lg:text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight text-content">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.averageRating) 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {product.averageRating.toFixed(1)} ({product.ratingCount} avis)
                      </span>
                    </div>

                    <p className="text-base lg:text-lg text-content-soft line-clamp-3 leading-relaxed">
                      {product.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn" 
                      asChild
                    >
                      <Link 
                        href={product.externalUrl || `/produits/${product.slug}`} 
                        target={product.externalUrl ? "_blank" : "_self"}
                        rel={product.externalUrl ? "noopener noreferrer" : undefined}
                        className="flex items-center justify-center"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                        {product.buttonText}
                        {product.externalUrl && <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
              </Card>
            </HoverEffect>
          ))}
        </AnimateList>
      </div>
    </div>
  )
}






