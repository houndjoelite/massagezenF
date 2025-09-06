"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: string
  originalPrice?: string
  image: string
  category: string
  rating: number
  reviews: number
  features: string[]
  amazonUrl: string
  inStock: boolean
  badge?: string
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/wordpress/products?limit=3")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error loading products:", error)
        setProducts([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Nos coups de cœur</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Sélection des meilleurs appareils de massage testés et approuvés par notre équipe
          </p>
        </div>

        {loading ? (
          <div className="text-center">Chargement des produits...</div>
        ) : products.length === 0 ? (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold">Produits bientôt disponibles</h3>
            <p className="text-muted-foreground">
              Nos produits recommandés seront bientôt disponibles. Revenez plus tard !
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/massage-device.png"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews} avis)
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                          Voir sur Amazon
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">Voir tous les produits</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
