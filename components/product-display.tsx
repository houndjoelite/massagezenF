import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, ExternalLink, CheckCircle } from "lucide-react"
import { ProductGallery } from "./product-gallery"
import { SimilarProducts } from "./similar-products"
import "./product-display.css"

interface Category {
  id: number
  name: string
  slug: string
}

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
  categories: Array<string | Category>
  tags: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

interface ProductDisplayProps {
  product: Product
  className?: string
}

export function ProductDisplay({ product, className = "" }: ProductDisplayProps) {
  const featuredImage = product.image || (product.galleryImages && product.galleryImages[0]) || null
  
  const wooCommerceImages = product.galleryImages || []
  const contentImages = extractImagesFromContent(product.content)
  
  const allGalleryImages = [...wooCommerceImages, ...contentImages]
  
  const validGalleryImages = allGalleryImages.filter((img, index, arr) => 
    img && 
    img.trim() !== '' && 
    arr.indexOf(img) === index &&
    (img.startsWith('http') || img.startsWith('/') || img.startsWith('./') || img.startsWith('../')) &&
    img !== featuredImage
  )
  
  const galleryImages = featuredImage ? [featuredImage, ...validGalleryImages] : validGalleryImages
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Image mise en avant:', featuredImage)
    console.log('Images WooCommerce galerie:', wooCommerceImages)
    console.log('Images du contenu:', contentImages)
    console.log('Images de galerie finale:', galleryImages)
  }

  const getCategoryName = (category: string | Category): string => {
    return typeof category === 'object' ? category.name : category
  }

  return (
    <div className={`product-display ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Galerie d'images */}
          <div>
            <ProductGallery 
              images={galleryImages}
              alt={product.title}
              className="w-full"
            />
          </div>

          {/* Informations du produit */}
          <div className="space-y-6">
            
            {/* Titre et catégories */}
            <div>
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((category, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {getCategoryName(category)}
                    </span>
                  ))}
                </div>
              )}
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
            </div>

            {/* Prix et évaluation */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">
                  {product.price} {product.currency}
                </span>
                {product.regularPrice && product.regularPrice !== product.price && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through">
                      {product.regularPrice} {product.currency}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                      -{Math.round(((parseFloat(product.regularPrice) - parseFloat(product.price)) / parseFloat(product.regularPrice)) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {product.averageRating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.averageRating) 
                            ? "text-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.averageRating.toFixed(1)} ({product.ratingCount} avis)
                  </span>
                </div>
              )}
            </div>

            {/* Description courte */}
            {product.excerpt && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.excerpt }}
                />
              </div>
            )}

            {/* Bouton d'achat */}
            <div className="pt-4">
              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg" 
                asChild
                disabled={product.stockStatus !== "instock"}
              >
                <a 
                  href={product.externalUrl || "#"}
                  target={product.externalUrl ? "_blank" : "_self"}
                  rel={product.externalUrl ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.buttonText}
                  {product.externalUrl && <ExternalLink className="w-4 h-4 ml-2" />}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu détaillé */}
      {product.content && (
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails du produit</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <ProductContent content={product.content} />
          </div>
        </div>
      )}

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="max-w-6xl mx-auto mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Mots-clés associés</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Produits similaires */}
      <SimilarProducts 
        currentProductId={product.id}
        categories={product.categories.map(getCategoryName)}
        limit={4}
      />
    </div>
  )
}

function ProductContent({ content }: { content: string }) {
  const processedContent = processContentForGallery(content)
  return (
    <div 
      className="product-content"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}

function processContentForGallery(content: string): string {
  if (!content) return content
  
  const imagePattern = /<img[^>]*>/gi
  const images = content.match(imagePattern) || []
  
  if (images.length < 2) return content

  let processedContent = content
  
  const paragraphImagePattern = /<p[^>]*>.*?<img[^>]*>.*?<\/p>/gi
  const paragraphMatches = content.match(paragraphImagePattern) || []
  
  if (paragraphMatches.length >= 2) {
    const consecutiveParagraphs = /(<p[^>]*>.*?<img[^>]*>.*?<\/p>\s*){2,}/gi
    processedContent = processedContent.replace(consecutiveParagraphs, (match) => {
      const imgMatches = match.match(/<img[^>]*>/gi) || []
      if (imgMatches.length >= 2) {
        return `<div class="image-gallery">${imgMatches.map(img => 
          img.replace(/class="[^"]*"/, 'class="image-gallery_img"')
        ).join('')}</div>`
      }
      return match
    })
  }
  
  const divImagePattern = /<div[^>]*>.*?<img[^>]*>.*?<\/div>/gi
  const divMatches = content.match(divImagePattern) || []
  
  if (divMatches.length >= 2) {
    const consecutiveDivs = /(<div[^>]*>.*?<img[^>]*>.*?<\/div>\s*){2,}/gi
    processedContent = processedContent.replace(consecutiveDivs, (match) => {
      const imgMatches = match.match(/<img[^>]*>/gi) || []
      if (imgMatches.length >= 2) {
        return `<div class="image-gallery">${imgMatches.map(img => 
          img.replace(/class="[^"]*"/, 'class="image-gallery_img"')
        ).join('')}</div>`
      }
      return match
    })
  }

  const consecutiveImagesPattern = /(<img[^>]*>\s*){2,}/gi
  processedContent = processedContent.replace(consecutiveImagesPattern, (match) => {
    const imgMatches = match.match(/<img[^>]*>/gi) || []
    if (imgMatches.length >= 2) {
      return `<div class="image-gallery">${imgMatches.map(img => 
        img.replace(/class="[^"]*"/, 'class="image-gallery_img"')
      ).join('')}</div>`
    }
    return match
  })

  const imagesWithShortText = /<img[^>]*>[\s\S]{1,50}<img[^>]*>/gi
  processedContent = processedContent.replace(imagesWithShortText, (match) => {
    const imgMatches = match.match(/<img[^>]*>/gi) || []
    if (imgMatches.length >= 2) {
      return `<div class="image-gallery">${imgMatches.map(img => 
        img.replace(/class="[^"]*"/, 'class="image-gallery_img"')
      ).join('')}</div>`
    }
    return match
  })

  return processedContent
}

function extractImagesFromContent(content: string): string[] {
  if (!content) return []
  
  const imgPatterns = [
    /<img[^>]+src="([^"]+)"/gi,
    /<img[^>]+src='([^']+)'/gi,
    /<img[^>]+src=([^\s>]+)/gi,
  ]
  
  const images: string[] = []
  
  imgPatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      if (match[1]) {
        let imageUrl = match[1].trim()
        imageUrl = imageUrl.replace(/^["']|["']$/g, '')
        if (imageUrl && 
            (imageUrl.startsWith('http') || 
             imageUrl.startsWith('/') || 
             imageUrl.startsWith('./') ||
             imageUrl.startsWith('../')) &&
            !images.includes(imageUrl)) {
          images.push(imageUrl)
        }
      }
    }
  })
  
  return images
}
