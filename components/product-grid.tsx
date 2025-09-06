"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-4">{description}</p>
          <Badge variant="secondary" className="text-sm">
            {products.length} produit{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Aucune image</span>
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.averageRating.toFixed(1)} ({product.ratingCount} avis)
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {product.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
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
                      {product.stockStatus === "instock" ? (
                        <Badge variant="default" className="text-xs">En stock</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Rupture de stock</Badge>
                      )}
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link 
                      href={product.externalUrl || `/produits/${product.slug}`} 
                      target={product.externalUrl ? "_blank" : "_self"}
                      rel={product.externalUrl ? "noopener noreferrer" : undefined}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.buttonText}
                      {product.externalUrl && <ExternalLink className="w-4 h-4 ml-2" />}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}






