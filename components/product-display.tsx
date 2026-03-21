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
            <div className="space-y-5">
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
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white">
                {product.title}
              </h1>
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
              <div className="flex items-center gap-2 pt-1">
                <div className={`w-2 h-2 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${isInStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isInStock ? 'En stock — expédition rapide' : 'Rupture de stock'}
                </span>
              </div>
            </div>

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
    <>
      <style>{`
        /* ══════════════════════════════════════
           CMS CONTENT — Style Médical/Professionnel
           Palette : slate-700 texte, bleu-acier accents,
           grille stricte, typographie clinique
        ══════════════════════════════════════ */

        .cms-content {
          color: #334155;
          font-size: 0.9625rem;
          line-height: 1.85;
          font-feature-settings: "kern" 1, "liga" 1;
        }

        /* ── H2 : section principale avec badge numéroté ── */
        .cms-content h2 {
          counter-increment: section-counter;
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 2.75rem;
          margin-bottom: 1.1rem;
          padding: 0.75rem 1rem 0.75rem 1.25rem;
          background: linear-gradient(to right, #f0f4f8, #f8fafc);
          border-left: 3px solid #2563eb;
          border-radius: 0 8px 8px 0;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .cms-content h2:first-child {
          margin-top: 0;
        }
        .cms-content h2::before {
          content: counter(section-counter, decimal-leading-zero);
          font-size: 0.7rem;
          font-weight: 800;
          color: #2563eb;
          background: #dbeafe;
          padding: 0.2em 0.5em;
          border-radius: 4px;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
        }

        /* ── H3 : sous-section sobre ── */
        .cms-content h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #1e3a5f;
          margin-top: 1.875rem;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .cms-content h3::before {
          content: '';
          display: inline-block;
          width: 16px;
          height: 2px;
          background: #2563eb;
          flex-shrink: 0;
        }
        .cms-content h3::after {
          content: '';
          display: block;
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        /* ── H4 : étiquette tertiaire ── */
        .cms-content h4 {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Paragraphes ── */
        .cms-content p {
          margin-bottom: 1.1rem;
          color: #475569;
          max-width: 72ch;
        }
        .cms-content p:last-child {
          margin-bottom: 0;
        }

        /* ── Listes non ordonnées — style checklist clinique ── */
        .cms-content ul {
          margin: 1.1rem 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .cms-content ul li {
          position: relative;
          padding: 0.45rem 0.75rem 0.45rem 2.25rem;
          color: #475569;
          line-height: 1.6;
          background: #f8fafc;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          font-size: 0.925rem;
        }
        .cms-content ul li::before {
          content: '✓';
          position: absolute;
          left: 0.65rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.7rem;
          font-weight: 800;
          color: #2563eb;
          line-height: 1;
        }

        /* ── Listes ordonnées — numéros encadrés ── */
        .cms-content ol {
          margin: 1.1rem 0;
          padding: 0;
          list-style: none;
          counter-reset: ol-counter;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .cms-content ol li {
          counter-increment: ol-counter;
          position: relative;
          padding: 0.45rem 0.75rem 0.45rem 3rem;
          color: #475569;
          line-height: 1.6;
          background: #f8fafc;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          font-size: 0.925rem;
        }
        .cms-content ol li::before {
          content: counter(ol-counter);
          position: absolute;
          left: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.4rem;
          height: 1.4rem;
          background: #1d4ed8;
          color: white;
          border-radius: 3px;
          font-size: 0.68rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-variant-numeric: tabular-nums;
        }

        /* ── Tableaux — grille de données précise ── */
        .cms-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.75rem 0;
          font-size: 0.875rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          overflow: hidden;
        }
        .cms-content thead {
          background: #1e3a5f;
        }
        .cms-content thead th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 700;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #bfdbfe;
          border-right: 1px solid #2d5a8e;
          white-space: nowrap;
        }
        .cms-content thead th:last-child {
          border-right: none;
        }
        .cms-content tbody tr {
          border-bottom: 1px solid #e2e8f0;
          transition: background 0.1s ease;
        }
        .cms-content tbody tr:last-child {
          border-bottom: none;
        }
        .cms-content tbody tr:nth-child(odd) {
          background: #ffffff;
        }
        .cms-content tbody tr:nth-child(even) {
          background: #f8fafc;
        }
        .cms-content tbody tr:hover {
          background: #eff6ff;
        }
        .cms-content td {
          padding: 0.7rem 1rem;
          color: #475569;
          vertical-align: top;
          border-right: 1px solid #e2e8f0;
          line-height: 1.5;
        }
        .cms-content td:last-child {
          border-right: none;
        }
        .cms-content td:first-child {
          font-weight: 600;
          color: #1e293b;
          background: #f1f5f9;
        }

        /* ── Liens ── */
        .cms-content a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid #bfdbfe;
          transition: border-color 0.15s, color 0.15s;
        }
        .cms-content a:hover {
          color: #1d4ed8;
          border-bottom-color: #1d4ed8;
        }

        /* ── Gras ── */
        .cms-content strong,
        .cms-content b {
          font-weight: 700;
          color: #0f172a;
        }

        /* ── Italique ── */
        .cms-content em,
        .cms-content i {
          font-style: italic;
          color: #64748b;
        }

        /* ── Blockquote — note clinique ── */
        .cms-content blockquote {
          margin: 1.75rem 0;
          padding: 1rem 1.25rem 1rem 1.5rem;
          background: #f0f9ff;
          border-left: 3px solid #0284c7;
          border-radius: 0 8px 8px 0;
          color: #0c4a6e;
          font-size: 0.9rem;
          position: relative;
        }
        .cms-content blockquote::before {
          content: 'ℹ';
          position: absolute;
          top: 0.9rem;
          left: -0.85rem;
          width: 1.4rem;
          height: 1.4rem;
          background: #0284c7;
          color: white;
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          font-style: normal;
        }
        .cms-content blockquote p {
          margin: 0;
          max-width: none;
        }

        /* ── Code inline ── */
        .cms-content code {
          background: #f1f5f9;
          color: #0f172a;
          padding: 0.1em 0.4em;
          border-radius: 4px;
          font-size: 0.85em;
          font-family: ui-monospace, 'Cascadia Code', monospace;
          border: 1px solid #e2e8f0;
        }

        /* ── Images ── */
        .cms-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5rem auto;
          display: block;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        /* ── Séparateur ── */
        .cms-content hr {
          border: none;
          height: 1px;
          background: #e2e8f0;
          margin: 2.5rem 0;
        }

        /* ══ DARK MODE ══ */
        .dark .cms-content {
          color: #94a3b8;
        }
        .dark .cms-content h2 {
          color: #e2e8f0;
          background: linear-gradient(to right, #1e293b, #0f172a);
          border-left-color: #3b82f6;
        }
        .dark .cms-content h2::before {
          color: #60a5fa;
          background: #1e3a5f;
        }
        .dark .cms-content h3 {
          color: #93c5fd;
        }
        .dark .cms-content h3::before {
          background: #3b82f6;
        }
        .dark .cms-content h3::after {
          background: #1e293b;
        }
        .dark .cms-content h4 {
          color: #64748b;
        }
        .dark .cms-content p {
          color: #94a3b8;
        }
        .dark .cms-content ul li,
        .dark .cms-content ol li {
          background: #0f172a;
          border-color: #1e293b;
          color: #94a3b8;
        }
        .dark .cms-content ul li::before {
          color: #60a5fa;
        }
        .dark .cms-content ol li::before {
          background: #1d4ed8;
        }
        .dark .cms-content table {
          border-color: #1e293b;
        }
        .dark .cms-content thead {
          background: #0f172a;
        }
        .dark .cms-content thead th {
          color: #60a5fa;
          border-right-color: #1e293b;
        }
        .dark .cms-content tbody tr {
          border-bottom-color: #1e293b;
        }
        .dark .cms-content tbody tr:nth-child(odd) {
          background: #0f172a;
        }
        .dark .cms-content tbody tr:nth-child(even) {
          background: #111827;
        }
        .dark .cms-content tbody tr:hover {
          background: #1e3a5f22;
        }
        .dark .cms-content td {
          color: #94a3b8;
          border-right-color: #1e293b;
        }
        .dark .cms-content td:first-child {
          color: #cbd5e1;
          background: #111827;
        }
        .dark .cms-content strong,
        .dark .cms-content b {
          color: #e2e8f0;
        }
        .dark .cms-content blockquote {
          background: #082f49;
          border-left-color: #0284c7;
          color: #7dd3fc;
        }
        .dark .cms-content code {
          background: #1e293b;
          color: #e2e8f0;
          border-color: #334155;
        }
        .dark .cms-content img {
          border-color: #1e293b;
        }
        .dark .cms-content hr {
          background: #1e293b;
        }
      `}</style>
      <div
        className="cms-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
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
