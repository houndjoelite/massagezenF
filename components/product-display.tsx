import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, ExternalLink, Shield, Truck, RotateCcw } from "lucide-react"
import { ProductGallery } from "./product-gallery"

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

  const getCategoryName = (category: string | Category): string => {
    return typeof category === 'object' ? category.name : category
  }

  const hasDiscount = product.regularPrice && product.regularPrice !== product.price
  const discountPercent = hasDiscount
    ? Math.round(((parseFloat(product.regularPrice!) - parseFloat(product.price)) / parseFloat(product.regularPrice!)) * 100)
    : 0

  const isInStock = product.stockStatus === "instock"

  return (
    <div className={`product-display ${className}`}>

      {/* SECTION PRINCIPALE */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* Galerie */}
          <div className="relative">
            {hasDiscount && (
              <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                -{discountPercent}%
              </div>
            )}
            {!isInStock && (
              <div className="absolute top-4 right-4 z-10 bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                Rupture de stock
              </div>
            )}
            <ProductGallery
              images={galleryImages}
              alt={product.title}
              className="w-full rounded-2xl overflow-hidden"
            />
          </div>

          {/* Infos produit */}
          <div className="flex flex-col justify-between space-y-8">

            {/* En-tête */}
            <div className="space-y-5">

              {/* Catégories */}
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category, index) => (
                    <span
                      key={index}
                      className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full"
                    >
                      {getCategoryName(category)}
                    </span>
                  ))}
                </div>
              )}

              {/* Titre */}
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white">
                {product.title}
              </h1>

              {/* Étoiles */}
              {product.averageRating > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.averageRating)
                            ? "text-amber-400 fill-amber-400"
                            : i < product.averageRating
                            ? "text-amber-400 fill-amber-200"
                            : "text-gray-300 fill-gray-100"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {product.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.ratingCount} avis)
                  </span>
                </div>
              )}
            </div>

            {/* Prix */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-2">
              <div className="flex items-end gap-4">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  {product.price} {product.currency}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-400 line-through mb-1">
                    {product.regularPrice} {product.currency}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Vous économisez {(parseFloat(product.regularPrice!) - parseFloat(product.price)).toFixed(2)} {product.currency}
                </p>
              )}

              {/* Stock */}
              <div className="flex items-center gap-2 pt-1">
                <div className={`w-2 h-2 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${isInStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isInStock ? 'En stock — expédition rapide' : 'Rupture de stock'}
                </span>
              </div>
            </div>

            {/* Description courte */}
            {product.excerpt && (
              <div
                className="text-gray-600 dark:text-gray-400 leading-relaxed text-base border-l-4 border-primary/30 pl-4"
                dangerouslySetInnerHTML={{ __html: product.excerpt }}
              />
            )}

            {/* CTA */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full h-14 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isInStock}
                asChild={isInStock}
              >
                {isInStock ? (
                  <a
                    href={product.externalUrl || "#"}
                    target={product.externalUrl ? "_blank" : "_self"}
                    rel={product.externalUrl ? "noopener noreferrer sponsored" : undefined}
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.buttonText || "Voir sur Amazon"}
                    {product.externalUrl && <ExternalLink className="w-4 h-4 opacity-70" />}
                  </a>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Produit indisponible
                  </span>
                )}
              </Button>
            </div>

            {/* Garanties */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Shield, label: "Paiement sécurisé" },
                { icon: Truck, label: "Livraison rapide" },
                { icon: RotateCcw, label: "Retour facile" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESCRIPTION DÉTAILLÉE */}
        {product.content && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Détails du produit</h2>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
              <ProductContent content={product.content} />
            </div>
          </div>
        )}

        {/* TAGS */}
        {product.tags && product.tags.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mots-clés associés</h3>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-1.5 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductContent({ content }: { content: string }) {
  return (
    <div
      className="product-content prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-ul:space-y-1 prose-li:text-gray-600 dark:prose-li:text-gray-400
        prose-img:rounded-xl prose-img:shadow-md"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

function extractImagesFromContent(content: string): string[] {
  if (!content) return []
  const imgPatterns = [
    /<img[^>]+src="([^"]+)"/gi,
    /<img[^>]+src='([^']+)'/gi,
  ]
  const images: string[] = []
  imgPatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      if (match[1]) {
        const imageUrl = match[1].trim().replace(/^["']|["']$/g, '')
        if (imageUrl &&
          (imageUrl.startsWith('http') || imageUrl.startsWith('/')) &&
          !images.includes(imageUrl)) {
          images.push(imageUrl)
        }
      }
    }
  })
  return images
}
