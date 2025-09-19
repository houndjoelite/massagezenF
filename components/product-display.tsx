import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, ExternalLink, CheckCircle } from "lucide-react"
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
      className="max-w-none text-lg leading-relaxed
        [&_h1]:text-4xl [&_h1]:lg:text-5xl [&_h1]:mb-6 [&_h1]:mt-8 [&_h1]:font-black [&_h1]:bg-gradient-to-r [&_h1]:from-cyan-500 [&_h1]:via-blue-600 [&_h1]:to-purple-700 [&_h1]:bg-clip-text [&_h1]:text-transparent [&_h1]:text-center [&_h1]:drop-shadow-lg
        [&_h2]:text-3xl [&_h2]:lg:text-4xl [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:font-bold [&_h2]:bg-gradient-to-r [&_h2]:from-emerald-500 [&_h2]:via-teal-600 [&_h2]:to-cyan-600 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:border-l-4 [&_h2]:border-gradient-to-b [&_h2]:from-emerald-400 [&_h2]:to-teal-500 [&_h2]:pl-4 [&_h2]:py-2 [&_h2]:rounded-r-xl [&_h2]:bg-gradient-to-r [&_h2]:from-emerald-50 [&_h2]:to-teal-50 [&_h2]:dark:from-emerald-900/20 [&_h2]:dark:to-teal-900/20
        [&_h3]:text-2xl [&_h3]:lg:text-3xl [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-rose-500 [&_h3]:dark:text-rose-400 [&_h3]:bg-gradient-to-r [&_h3]:from-rose-50 [&_h3]:to-pink-50 [&_h3]:dark:from-rose-900/20 [&_h3]:dark:to-pink-900/20 [&_h3]:px-3 [&_h3]:py-1 [&_h3]:rounded-lg [&_h3]:shadow-sm
        [&_h4]:text-xl [&_h4]:lg:text-2xl [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:font-bold [&_h4]:text-amber-600 [&_h4]:dark:text-amber-400 [&_h4]:bg-gradient-to-r [&_h4]:from-amber-50 [&_h4]:to-yellow-50 [&_h4]:dark:from-amber-900/20 [&_h4]:dark:to-yellow-900/20 [&_h4]:px-3 [&_h4]:py-1 [&_h4]:rounded-lg [&_h4]:shadow-sm
        [&_h5]:text-lg [&_h5]:lg:text-xl [&_h5]:mb-2 [&_h5]:mt-3 [&_h5]:font-bold [&_h5]:text-violet-600 [&_h5]:dark:text-violet-400 [&_h5]:uppercase [&_h5]:tracking-wider [&_h5]:bg-gradient-to-r [&_h5]:from-violet-50 [&_h5]:to-purple-50 [&_h5]:dark:from-violet-900/20 [&_h5]:dark:to-purple-900/20 [&_h5]:px-2 [&_h5]:py-1 [&_h5]:rounded-md
        [&_h6]:text-base [&_h6]:lg:text-lg [&_h6]:mb-2 [&_h6]:mt-3 [&_h6]:font-semibold [&_h6]:text-slate-600 [&_h6]:dark:text-slate-400 [&_h6]:italic [&_h6]:bg-slate-50 [&_h6]:dark:bg-slate-800/50 [&_h6]:px-2 [&_h6]:py-1 [&_h6]:rounded-md
        [&_p]:text-slate-700 dark:[&_p]:text-slate-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-base [&_p]:bg-gradient-to-r [&_p]:from-slate-50 [&_p]:to-gray-50 [&_p]:dark:from-slate-800/30 [&_p]:dark:to-gray-800/30 [&_p]:p-3 [&_p]:rounded-lg [&_p]:shadow-sm
        [&_strong]:font-bold [&_strong]:text-cyan-700 [&_strong]:dark:text-cyan-300 [&_strong]:bg-gradient-to-r [&_strong]:from-cyan-100 [&_strong]:to-blue-100 [&_strong]:dark:from-cyan-900/30 [&_strong]:dark:to-blue-900/30 [&_strong]:px-2 [&_strong]:py-1 [&_strong]:rounded-md [&_strong]:shadow-sm
        [&_em]:italic [&_em]:text-emerald-600 [&_em]:dark:text-emerald-400 [&_em]:bg-gradient-to-r [&_em]:from-emerald-50 [&_em]:to-teal-50 [&_em]:dark:from-emerald-900/20 [&_em]:dark:to-teal-900/20 [&_em]:px-2 [&_em]:py-1 [&_em]:rounded-md [&_em]:shadow-sm
        [&_ul]:space-y-2 [&_ul]:my-6 [&_ul]:list-none [&_ul]:pl-0
        [&_li]:text-slate-700 dark:[&_li]:text-slate-300 [&_li]:leading-relaxed [&_li]:text-base [&_li]:mb-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:bg-gradient-to-r [&_li]:from-blue-50 [&_li]:to-indigo-50 [&_li]:dark:from-blue-900/20 [&_li]:dark:to-indigo-900/20 [&_li]:p-3 [&_li]:rounded-lg [&_li]:shadow-sm [&_li]:before:content-['✨'] [&_li]:before:text-yellow-500 [&_li]:before:text-lg [&_li]:before:flex-shrink-0
        [&_ol]:space-y-2 [&_ol]:my-6 [&_ol]:list-none [&_ol]:pl-0
        [&_blockquote]:border-l-4 [&_blockquote]:border-gradient-to-b [&_blockquote]:from-cyan-400 [&_blockquote]:to-blue-500 [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-cyan-50 [&_blockquote]:to-blue-50 [&_blockquote]:dark:from-cyan-900/20 [&_blockquote]:dark:to-blue-900/20 [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:shadow-lg [&_blockquote]:backdrop-blur-sm
        [&_code]:bg-gradient-to-r [&_code]:from-slate-900 [&_code]:to-gray-900 [&_code]:dark:from-slate-800 [&_code]:dark:to-gray-800 [&_code]:text-emerald-400 [&_code]:px-3 [&_code]:py-1 [&_code]:rounded-md [&_code]:text-sm [&_code]:font-mono [&_code]:shadow-inner [&_code]:border [&_code]:border-emerald-500/20
        [&_pre]:bg-gradient-to-r [&_pre]:from-slate-900 [&_pre]:to-gray-900 [&_pre]:dark:from-slate-800 [&_pre]:dark:to-gray-800 [&_pre]:text-emerald-400 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:border [&_pre]:border-emerald-500/20 [&_pre]:shadow-xl [&_pre]:backdrop-blur-sm
        [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:shadow-xl [&_table]:bg-white [&_table]:dark:bg-slate-800 [&_table]:border [&_table]:border-slate-200 [&_table]:dark:border-slate-700
        [&_th]:bg-gradient-to-r [&_th]:from-indigo-600 [&_th]:via-purple-600 [&_th]:to-pink-600 [&_th]:text-white [&_th]:font-bold [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-base [&_th]:shadow-lg
        [&_td]:px-4 [&_td]:py-3 [&_td]:text-slate-700 [&_td]:dark:text-slate-300 [&_td]:text-sm [&_td]:border-b [&_td]:border-slate-200 [&_td]:dark:border-slate-700 [&_td]:bg-gradient-to-r [&_td]:from-slate-50 [&_td]:to-gray-50 [&_td]:dark:from-slate-800/50 [&_td]:dark:to-gray-800/50
        [&_a]:text-cyan-600 [&_a]:dark:text-cyan-400 [&_a]:no-underline [&_a]:font-semibold [&_a]:transition-all [&_a]:duration-300 [&_a]:hover:text-cyan-700 [&_a]:dark:hover:text-cyan-300 [&_a]:hover:underline [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:bg-gradient-to-r [&_a]:from-cyan-50 [&_a]:to-blue-50 [&_a]:dark:from-cyan-900/20 [&_a]:dark:to-blue-900/20 [&_a]:px-2 [&_a]:py-1 [&_a]:rounded-lg [&_a]:hover:shadow-md
        [&_hr]:border-none [&_hr]:h-2 [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-cyan-400 [&_hr]:via-blue-500 [&_hr]:via-purple-500 [&_hr]:to-transparent [&_hr]:my-12 [&_hr]:rounded-full [&_hr]:shadow-lg
        [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:object-contain [&_img]:transition-all [&_img]:duration-300 [&_img]:hover:scale-105 [&_img]:hover:shadow-xl [&_img]:border [&_img]:border-slate-200 [&_img]:dark:border-slate-700
        [&_.image-gallery]:grid [&_.image-gallery]:grid-cols-2 [&_.image-gallery]:md:grid-cols-3 [&_.image-gallery]:lg:grid-cols-4 [&_.image-gallery]:gap-4 [&_.image-gallery]:my-6 [&_.image-gallery]:p-4 [&_.image-gallery]:bg-gradient-to-r [&_.image-gallery]:from-slate-50 [&_.image-gallery]:to-gray-50 [&_.image-gallery]:dark:from-slate-800/30 [&_.image-gallery]:dark:to-gray-800/30 [&_.image-gallery]:rounded-xl [&_.image-gallery]:shadow-lg
        [&_.image-gallery_img]:rounded-lg [&_.image-gallery_img]:shadow-md [&_.image-gallery_img]:cursor-pointer [&_.image-gallery_img]:transition-all [&_.image-gallery_img]:duration-300 [&_.image-gallery_img]:hover:scale-105 [&_.image-gallery_img]:hover:shadow-lg [&_.image-gallery_img]:border [&_.image-gallery_img]:border-slate-200 [&_.image-gallery_img]:dark:border-slate-700
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
