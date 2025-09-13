import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, ExternalLink, Truck, Shield, RotateCcw, CheckCircle } from "lucide-react"
import { ProductGallery } from "./product-gallery"

interface Product {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
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
  // Préparer les images pour la galerie
  const productImages = product.image ? [product.image] : []
  
  // Extraire les images supplémentaires du contenu HTML si disponibles
  const contentImages = extractImagesFromContent(product.content)
  const allImages = [...productImages, ...contentImages]

  return (
    <div className={`product-display ${className}`}>
      {/* Section principale du produit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Galerie d'images */}
        <div className="space-y-6">
          <ProductGallery 
            images={allImages}
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
            <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight text-gray-900 dark:text-white">
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

            {/* Garanties */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Garantie 2 ans</p>
                  <p className="text-xs text-muted-foreground">Protection complète</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Livraison gratuite</p>
                  <p className="text-xs text-muted-foreground">Sous 48h</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                  <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Retour 30 jours</p>
                  <p className="text-xs text-muted-foreground">Satisfait ou remboursé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu détaillé du produit */}
      {product.content && (
        <div className="mt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 rounded-3xl">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Détails du produit
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
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
      className="max-w-none text-lg leading-relaxed
        [&_h1]:text-4xl [&_h1]:lg:text-5xl [&_h1]:mb-8 [&_h1]:mt-12 [&_h1]:font-bold [&_h1]:bg-gradient-to-r [&_h1]:from-purple-600 [&_h1]:via-pink-600 [&_h1]:to-blue-600 [&_h1]:bg-clip-text [&_h1]:text-transparent [&_h1]:text-center
        [&_h2]:text-3xl [&_h2]:lg:text-4xl [&_h2]:mb-6 [&_h2]:mt-10 [&_h2]:font-bold [&_h2]:bg-gradient-to-r [&_h2]:from-indigo-600 [&_h2]:via-purple-600 [&_h2]:to-pink-600 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:border-l-4 [&_h2]:border-indigo-500 [&_h2]:pl-6 [&_h2]:py-2
        [&_h3]:text-2xl [&_h3]:lg:text-3xl [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:font-semibold [&_h3]:text-emerald-600 dark:[&_h3]:text-emerald-400
        [&_h4]:text-xl [&_h4]:lg:text-2xl [&_h4]:mb-3 [&_h4]:mt-6 [&_h4]:font-semibold [&_h4]:text-orange-600 dark:[&_h4]:text-orange-400 [&_h4]:bg-orange-50 dark:[&_h4]:bg-orange-900/20 [&_h4]:px-4 [&_h4]:py-2 [&_h4]:rounded-lg
        [&_h5]:text-lg [&_h5]:lg:text-xl [&_h5]:mb-2 [&_h5]:mt-4 [&_h5]:font-semibold [&_h5]:text-blue-600 dark:[&_h5]:text-blue-400 [&_h5]:uppercase [&_h5]:tracking-wide
        [&_h6]:text-base [&_h6]:lg:text-lg [&_h6]:mb-2 [&_h6]:mt-4 [&_h6]:font-semibold [&_h6]:text-gray-600 dark:[&_h6]:text-gray-400 [&_h6]:italic
        [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-lg
        [&_strong]:font-bold [&_strong]:text-gray-900 dark:[&_strong]:text-white [&_strong]:bg-yellow-100 dark:[&_strong]:bg-yellow-900/30 [&_strong]:px-2 [&_strong]:py-1 [&_strong]:rounded
        [&_em]:italic [&_em]:text-gray-600 dark:[&_em]:text-gray-400 [&_em]:bg-blue-50 dark:[&_em]:bg-blue-900/20 [&_em]:px-2 [&_em]:py-1 [&_em]:rounded
        [&_ul]:space-y-3 [&_ul]:my-8 [&_ul]:list-disc [&_ul]:pl-8
        [&_li]:text-gray-700 dark:[&_li]:text-gray-300 [&_li]:leading-relaxed [&_li]:text-lg [&_li]:mb-2
        [&_ol]:space-y-3 [&_ol]:my-8 [&_ol]:list-decimal [&_ol]:pl-8
        [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-gray-50 [&_blockquote]:to-gray-100 dark:[&_blockquote]:from-gray-800/50 dark:[&_blockquote]:to-gray-700/50 [&_blockquote]:px-8 [&_blockquote]:py-6 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:shadow-lg
        [&_code]:bg-gray-900 dark:[&_code]:bg-gray-800 [&_code]:text-green-400 [&_code]:px-3 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:shadow-inner
        [&_pre]:bg-gray-900 dark:[&_pre]:bg-gray-800 [&_pre]:text-green-400 [&_pre]:p-6 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-8 [&_pre]:border [&_pre]:border-gray-700 [&_pre]:shadow-2xl
        [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 dark:[&_table]:border-gray-600 [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:shadow-xl
        [&_th]:bg-gradient-to-r [&_th]:from-purple-600 [&_th]:to-pink-600 [&_th]:text-white [&_th]:font-bold [&_th]:border [&_th]:border-gray-300 dark:[&_th]:border-gray-600 [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:text-lg
        [&_td]:border [&_td]:border-gray-300 dark:[&_td]:border-gray-600 [&_td]:px-6 [&_td]:py-4 [&_td]:text-gray-700 dark:[&_td]:text-gray-300 [&_td]:text-base
        [&_a]:text-primary [&_a]:no-underline [&_a]:font-medium [&_a]:transition-colors [&_a]:hover:underline [&_a]:decoration-2 [&_a]:underline-offset-4
        [&_hr]:border-none [&_hr]:h-1 [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-purple-300 [&_hr]:to-transparent [&_hr]:my-12 [&_hr]:rounded-full
        [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:object-contain [&_img]:transition-transform [&_img]:hover:scale-105
        [&_.image-gallery]:grid [&_.image-gallery]:grid-cols-2 [&_.image-gallery]:md:grid-cols-3 [&_.image-gallery]:lg:grid-cols-4 [&_.image-gallery]:gap-4 [&_.image-gallery]:my-8
        [&_.image-gallery_img]:rounded-lg [&_.image-gallery_img]:shadow-md [&_.image-gallery_img]:cursor-pointer [&_.image-gallery_img]:transition-transform [&_.image-gallery_img]:hover:scale-105
      "
      dangerouslySetInnerHTML={{ 
        __html: processedContent
      }}
    />
  )
}

/**
 * Traite le contenu pour détecter et transformer les blocs d'images en galerie
 * Fonctionne côté serveur et client
 */
function processContentForGallery(content: string): string {
  // Détecter les groupes d'images consécutives avec regex
  const imagePattern = /<img[^>]*>/gi
  const images = content.match(imagePattern) || []
  
  if (images.length < 2) {
    return content
  }

  let processedContent = content
  
  // Pattern pour détecter des images consécutives dans des paragraphes
  const paragraphImagePattern = /<p[^>]*>.*?<img[^>]*>.*?<\/p>/gi
  const paragraphMatches = content.match(paragraphImagePattern) || []
  
  // Si on a au moins 2 paragraphes avec des images, les regrouper
  if (paragraphMatches.length >= 2) {
    // Trouver les paragraphes consécutifs avec des images
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
  
  // Pattern pour détecter des images consécutives dans des divs
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

  return processedContent
}

/**
 * Fonction utilitaire pour extraire les images du contenu HTML
 */
function extractImagesFromContent(content: string): string[] {
  if (!content) return []
  
  const imgRegex = /<img[^>]+src="([^"]+)"/gi
  const images: string[] = []
  let match
  
  while ((match = imgRegex.exec(content)) !== null) {
    if (match[1] && !images.includes(match[1])) {
      images.push(match[1])
    }
  }
  
  return images
}
