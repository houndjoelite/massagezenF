import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, ExternalLink, CheckCircle } from "lucide-react"
import { ProductGallery } from "./product-gallery"
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
      {/* Section principale du produit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Galerie d'images */}
        <div className="space-y-6">
          <ProductGallery 
            images={galleryImages}
            alt={product.title}
            className="w-full"
          />
        </div>

        {/* Informations du produit */}
        <div className="space-y-8">
          
          {/* Titre et catégories */}
          <div className="space-y-6">
            {/* Catégories */}
            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {product.categories.map((category, index) => (
                  <Badge 
                    key={index} 
                    className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Titre principal */}
            <h1 className="text-5xl lg:text-6xl font-black text-balance leading-tight bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
              {product.title}
            </h1>
          </div>

          {/* Prix et évaluation */}
          <div className="space-y-6">
            {/* Prix */}
            <div className="flex items-center gap-6">
              <span className="text-4xl font-bold text-primary">
                {product.price} {product.currency}
              </span>
              {product.regularPrice && product.regularPrice !== product.price && (
                <div className="space-y-1">
                  <span className="text-xl text-muted-foreground line-through block">
                    {product.regularPrice} {product.currency}
                  </span>
                  <Badge className="bg-red-500 text-white text-sm font-bold">
                    -{Math.round(((parseFloat(product.regularPrice) - parseFloat(product.price)) / parseFloat(product.regularPrice)) * 100)}%
                  </Badge>
                </div>
              )}
            </div>

            {/* Évaluation */}
            {product.averageRating > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(product.averageRating) 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{product.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({product.ratingCount} avis)
                </span>
              </div>
            )}
          </div>

          {/* Description courte */}
          {product.excerpt && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Description</h2>
              <div 
                className="text-lg text-muted-foreground leading-relaxed prose prose-p:text-muted-foreground prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.excerpt }}
              />
            </div>
          )}

          {/* Bouton d'achat et garanties */}
          <div className="space-y-8">
            {/* Bouton d'achat principal */}
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group/btn" 
              asChild
              disabled={product.stockStatus !== "instock"}
            >
              <a 
                href={product.externalUrl || "#"}
                target={product.externalUrl ? "_blank" : "_self"}
                rel={product.externalUrl ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center"
              >
                <ShoppingCart className="w-6 h-6 mr-3 group-hover/btn:scale-110 transition-transform duration-300" />
                {product.buttonText}
                {product.externalUrl && <ExternalLink className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform duration-300" />}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu détaillé du produit */}
      {product.content && (
        <div className="mt-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 rounded-3xl">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
            <h2 className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
              Détails du produit
            </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 mx-auto rounded-full shadow-lg"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                Découvrez tous les détails, caractéristiques et avantages de ce produit exceptionnel
              </p>
            </div>
            
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
          <ProductContent content={product.content} />
        </div>
          </div>
        </div>
      )}

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="mt-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 py-16 rounded-3xl">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mots-clés associés
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explorez les termes liés à ce produit
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {product.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-sm font-semibold rounded-full hover:scale-105 transform"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
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
