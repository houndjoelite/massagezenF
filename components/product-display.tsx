import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, ExternalLink, CheckCircle } from "lucide-react"
import { ProductGallery } from "./product-gallery"
import { SimilarProducts } from "./similar-products"
import "./product-display.css"

interface Product {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  galleryImages?: string[] // Images de la galerie WooCommerce
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

interface ProductDisplayProps {
  product: Product
  className?: string
}

/**
 * Composant principal d'affichage d'une fiche produit
 * Compatible avec Next.js Server Components
 * Affiche toutes les informations du produit de manière moderne et responsive
 */
export function ProductDisplay({ product, className = "" }: ProductDisplayProps) {
  // Image mise en avant (priorité: image principale du produit)
  const featuredImage = product.image || (product.galleryImages && product.galleryImages[0]) || null
  
  // Galerie d'images (toutes les images sauf celle mise en avant)
  const wooCommerceImages = product.galleryImages || []
  const contentImages = extractImagesFromContent(product.content)
  
  // Combiner toutes les images pour la galerie
  const allGalleryImages = [...wooCommerceImages, ...contentImages]
  
  // Filtrer les images valides et éviter les doublons
  const validGalleryImages = allGalleryImages.filter((img, index, arr) => 
    img && 
    img.trim() !== '' && 
    arr.indexOf(img) === index &&
    (img.startsWith('http') || img.startsWith('/') || img.startsWith('./') || img.startsWith('../')) &&
    img !== featuredImage // Exclure l'image mise en avant
  )
  
  // Images pour la galerie (image mise en avant + galerie)
  const galleryImages = featuredImage ? [featuredImage, ...validGalleryImages] : validGalleryImages
  
  // Debug: afficher les images trouvées (temporaire)
  if (process.env.NODE_ENV === 'development') {
    console.log('Image mise en avant:', featuredImage)
    console.log('Images WooCommerce galerie:', wooCommerceImages)
    console.log('Images du contenu:', contentImages)
    console.log('Images de galerie finale:', galleryImages)
  }

  return (
    <div className={`product-display ${className}`}>
      {/* Section principale du produit - Design simplifié */}
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
              {/* Catégories */}
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((category, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Titre principal */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
            </div>

            {/* Prix et évaluation */}
            <div className="space-y-4">
              {/* Prix */}
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

              {/* Évaluation */}
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

      {/* Contenu détaillé du produit */}
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
        categories={product.categories}
        limit={4}
      />
    </div>
  )
}

/**
 * Composant pour afficher le contenu HTML du produit
 * Gère les tableaux, listes, paragraphes, galeries d'images, etc.
 */
function ProductContent({ content }: { content: string }) {
  // Traiter le contenu pour détecter et transformer les blocs d'images en galerie
  const processedContent = processContentForGallery(content)

  return (
    <div 
      className="product-content"
      dangerouslySetInnerHTML={{ 
        __html: processedContent
      }}
    />
  )
}

/**
 * Traite le contenu pour détecter et transformer les blocs d'images en galerie
 * Fonctionne côté serveur et client
 * Améliorée pour mieux détecter les galeries d'images
 */
function processContentForGallery(content: string): string {
  if (!content) return content
  
  // Détecter les groupes d'images consécutives avec regex
  const imagePattern = /<img[^>]*>/gi
  const images = content.match(imagePattern) || []
  
  if (images.length < 2) {
    return content
  }

  let processedContent = content
  
  // 1. Détecter les images consécutives dans des paragraphes
  const paragraphImagePattern = /<p[^>]*>.*?<img[^>]*>.*?<\/p>/gi
  const paragraphMatches = content.match(paragraphImagePattern) || []
  
  if (paragraphMatches.length >= 2) {
    const consecutiveParagraphs = /(<p[^>]*>.*?<img[^>]*>.*?<\/p>\s*){2,}/gi
    processedContent = processedContent.replace(consecutiveParagraphs, (match) => {
      const imgMatches = match.match(/<img[^>]*>/gi) || []
      if (imgMatches.length >= 2) {
        const galleryHtml = `<div class="image-gallery">${imgMatches.map(img => 
          img.replace(/class="[^"]*"/, 'class="image-gallery_img"')
        ).join('')}</div>`
        return galleryHtml
      }
      return match
    })
  }
  
  // 2. Détecter les images consécutives dans des divs
  const divImagePattern = /<div[^>]*>.*?<img[^>]*>.*?<\/div>/gi
  const divMatches = content.match(divImagePattern) || []
  
  if (divMatches.length >= 2) {
    const consecutiveDivs = /(<div[^>]*>.*?<img[^>]*>.*?<\/div>\s*){2,}/gi
    processedContent = processedContent.replace(consecutiveDivs, (match) => {
      const imgMatches = match.match(/<img[^>]*>/gi) || []
      if (imgMatches.length >= 2) {
        const galleryHtml = `<div class="image-gallery">${imgMatches.map(img => 
          img.replace(/class="[^"]*"/, 'class="image-gallery_img"')
        ).join('')}</div>`
        return galleryHtml
      }
      return match
    })
  }

  // 3. Détecter les images consécutives même sans conteneurs spécifiques
  const consecutiveImagesPattern = /(<img[^>]*>\s*){2,}/gi
  processedContent = processedContent.replace(consecutiveImagesPattern, (match) => {
    const imgMatches = match.match(/<img[^>]*>/gi) || []
    if (imgMatches.length >= 2) {
      const galleryHtml = `<div class="image-gallery">${imgMatches.map(img => 
        img.replace(/class="[^"]*"/, 'class="image-gallery_img"')
      ).join('')}</div>`
      return galleryHtml
    }
    return match
  })

  // 4. Détecter les images séparées par du texte court (moins de 50 caractères)
  const imagesWithShortText = /<img[^>]*>[\s\S]{1,50}<img[^>]*>/gi
  processedContent = processedContent.replace(imagesWithShortText, (match) => {
    const imgMatches = match.match(/<img[^>]*>/gi) || []
    if (imgMatches.length >= 2) {
      const galleryHtml = `<div class="image-gallery">${imgMatches.map(img => 
        img.replace(/class="[^"]*"/, 'class="image-gallery_img"')
      ).join('')}</div>`
      return galleryHtml
    }
    return match
  })

  return processedContent
}

/**
 * Fonction utilitaire pour extraire les images du contenu HTML
 * Améliorée pour gérer différents formats d'URLs et éviter les doublons
 */
function extractImagesFromContent(content: string): string[] {
  if (!content) return []
  
  // Patterns multiples pour capturer différents formats d'images
  const imgPatterns = [
    /<img[^>]+src="([^"]+)"/gi,  // src="url"
    /<img[^>]+src='([^']+)'/gi,  // src='url'
    /<img[^>]+src=([^\s>]+)/gi,  // src=url (sans guillemets)
  ]
  
  const images: string[] = []
  
  imgPatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      if (match[1]) {
        let imageUrl = match[1].trim()
        
        // Nettoyer l'URL (enlever les guillemets restants)
        imageUrl = imageUrl.replace(/^["']|["']$/g, '')
        
        // Vérifier que c'est une URL valide
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
