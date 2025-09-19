"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, ExternalLink } from "lucide-react"

interface Product {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  galleryImages?: string[]
  price: string
  regularPrice?: string
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

interface SimilarProductsProps {
  currentProductId: string
  categories: string[]
  limit?: number
}

export function SimilarProducts({ 
  currentProductId, 
  categories, 
  limit = 4 
}: SimilarProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true)
        
        // Récupérer les produits de la même catégorie
        const categorySlug = categories[0]?.toLowerCase().replace(/\s+/g, '-')
        if (!categorySlug) return

        const response = await fetch(`/api/wordpress/products/category/${categorySlug}?limit=${limit + 1}`)
        
        if (response.ok) {
          const allProducts = await response.json()
          // Filtrer le produit actuel et limiter le nombre
          const similarProducts = allProducts
            .filter((product: Product) => product.id !== currentProductId)
            .slice(0, limit)
          
          setProducts(similarProducts)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des produits similaires:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categories.length > 0) {
      fetchSimilarProducts()
    }
  }, [currentProductId, categories, limit])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/produits/${product.slug}`}
            className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-square overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Aucune image</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-primary">
                  {product.price} {product.currency}
                </span>
                {product.averageRating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {product.averageRating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              
              {product.externalUrl && (
                <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-800">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Voir le produit
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
