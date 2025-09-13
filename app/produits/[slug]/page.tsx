import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingCart, ExternalLink, Star, Truck, Shield, RotateCcw } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SimpleContent } from "@/components/simple-content"

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

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// Configuration pour le rendu dynamique
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  
  try {
    // Utiliser l'URL absolue pour la production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://monappareildemassage.com'
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    
    const response = await fetch(
      `${baseUrl}/api/wordpress/products/${slug}`,
      {
        cache: "no-store",
        headers: {
          'User-Agent': 'MassageZen/1.0',
        }
      }
    )

    if (response.ok) {
      const product: Product = await response.json()
      return {
        title: `${product.title} | MassageZen`,
        description: product.excerpt || product.seo.description || `Découvrez ${product.title} - ${product.price} ${product.currency}`,
        keywords: product.seo.keywords.join(", "),
        openGraph: {
          title: product.title,
          description: product.excerpt || product.seo.description,
          images: product.image ? [product.image] : [],
          type: 'product',
        },
      }
    }
  } catch (error) {
    console.error("Error fetching product metadata:", error)
  }

  return {
    title: "Produit non trouvé | MassageZen",
    description: "Ce produit n'existe pas ou a été supprimé.",
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  let product: Product | null = null
  let error: string | null = null

  try {
    // Utiliser l'URL absolue pour la production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://monappareildemassage.com'
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    
    console.log(`Fetching product ${slug} from ${baseUrl}`)
    
    const response = await fetch(
      `${baseUrl}/api/wordpress/products/${slug}`,
      {
        cache: "no-store",
        headers: {
          'User-Agent': 'MassageZen/1.0',
        }
      }
    )

    console.log(`Response status for product ${slug}: ${response.status}`)

    if (response.ok) {
      product = await response.json()
      console.log(`Product ${slug} loaded successfully:`, product?.title)
    } else {
      const errorData = await response.json().catch(() => ({}))
      error = errorData.error || `HTTP ${response.status}: ${response.statusText}`
      console.error(`Failed to fetch product ${slug}:`, error)
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Error fetching product ${slug}:`, err)
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            {error ? `Erreur: ${error}` : "Ce produit n'existe pas ou a été supprimé."}
          </p>
          <div className="space-y-4">
            <Button asChild>
              <Link href="/categories">Retour aux catégories</Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              Slug recherché: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-primary transition-colors">Catégories</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>

        {/* Bouton retour */}
        <Button 
          variant="outline" 
          asChild 
          className="mb-12 group/back hover:bg-primary/5 transition-all duration-300"
        >
          <Link href="/categories" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover/back:-translate-x-1 transition-transform duration-300" />
            Retour aux catégories
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image du produit */}
          <div className="space-y-6">
            {product.image ? (
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Badge de statut en overlay */}
                <div className="absolute top-6 right-6 z-20">
                  {product.stockStatus === "instock" ? (
                    <Badge className="bg-green-500/90 text-white hover:bg-green-500/95 backdrop-blur-sm border-0 shadow-lg font-medium px-4 py-2">
                      <Truck className="w-4 h-4 mr-2" />
                      En stock
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/90 text-white hover:bg-red-500/95 backdrop-blur-sm border-0 shadow-lg font-medium px-4 py-2">
                      Rupture de stock
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-muted-foreground font-medium text-lg">Aucune image disponible</span>
              </div>
            )}
          </div>

          {/* Informations du produit */}
          <div className="space-y-8">
            {/* Titre et catégories */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 mb-4">
                {product.categories.map((category, index) => (
                  <Badge 
                    key={index} 
                    className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                {product.title}
              </h1>
            </div>

            {/* Prix et évaluation */}
            <div className="space-y-6">
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

            {/* Description */}
            {product.excerpt && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Description</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.excerpt}
                </p>
              </div>
            )}

            {/* Bouton d'achat et garanties */}
            <div className="space-y-8">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group/btn" 
                asChild
                disabled={product.stockStatus !== "instock"}
              >
                <Link 
                  href={product.externalUrl || "#"}
                  target={product.externalUrl ? "_blank" : "_self"}
                  rel={product.externalUrl ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center"
                >
                  <ShoppingCart className="w-6 h-6 mr-3 group-hover/btn:scale-110 transition-transform duration-300" />
                  {product.buttonText}
                  {product.externalUrl && <ExternalLink className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform duration-300" />}
                </Link>
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

        {/* Contenu détaillé */}
        {product.content && (
          <div className="mt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
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
                <SimpleContent 
                  content={product.content}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="mt-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 py-16">
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
      </main>

      <Footer />
    </div>
  )
}

