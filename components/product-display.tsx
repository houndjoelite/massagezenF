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
 * Gère les tableaux, listes, paragraphes, etc.
 */
function ProductContent({ content }: { content: string }) {
  return (
    <div 
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-h1:text-3xl prose-h1:lg:text-4xl prose-h1:mb-6 prose-h1:mt-8
        prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
        prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mb-3 prose-h3:mt-5
        prose-h4:text-lg prose-h4:lg:text-xl prose-h4:mb-2 prose-h4:mt-4
        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
        prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-em:italic prose-em:text-gray-600 dark:prose-em:text-gray-400
        prose-ul:space-y-2 prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
        prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
        prose-ol:space-y-2 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:my-6
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
        prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-table:rounded-lg prose-table:overflow-hidden
        prose-th:bg-gray-100 dark:prose-th:bg-gray-700 prose-th:font-semibold prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:px-4 prose-th:py-2 prose-th:text-left
        prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-4 prose-td:py-2 prose-td:text-gray-700 dark:prose-td:text-gray-300
        prose-a:text-primary prose-a:no-underline prose-a:font-medium prose-a:transition-colors prose-a:hover:underline
        prose-hr:border-none prose-hr:h-0.5 prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-gray-300 prose-hr:to-transparent prose-hr:my-8
        [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:object-contain
        [&_a]:transition-all [&_a]:duration-300
      "
      dangerouslySetInnerHTML={{ 
        __html: content
      }}
    />
  )
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
