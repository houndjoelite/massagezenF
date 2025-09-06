import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingCart, ExternalLink, Star, Truck, Shield, RotateCcw } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

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

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/wordpress/products/${slug}`,
      {
        next: { revalidate: 300 },
      },
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
        },
      }
    }
  } catch (error) {
    console.error("Error fetching product metadata:", error)
  }

  return {
    title: "Produit non trouvé | MassageZen",
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  let product: Product | null = null

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/wordpress/products/${slug}`,
      {
        next: { revalidate: 300 },
      },
    )

    if (response.ok) {
      product = await response.json()
    }
  } catch (error) {
    console.error("Error fetching product:", error)
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-primary">Catégories</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        {/* Bouton retour */}
        <Button variant="outline" asChild className="mb-8">
          <Link href="/categories">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux catégories
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image du produit */}
          <div className="space-y-4">
            {product.image ? (
              <div className="aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Aucune image disponible</span>
              </div>
            )}
          </div>

          {/* Informations du produit */}
          <div className="space-y-6">
            {/* Titre et catégories */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Prix et stock */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">
                  {product.price} {product.currency}
                </span>
                {product.regularPrice && product.regularPrice !== product.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.regularPrice} {product.currency}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {product.stockStatus === "instock" ? (
                  <Badge variant="default" className="text-sm">
                    <Truck className="w-3 h-3 mr-1" />
                    En stock
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-sm">
                    Rupture de stock
                  </Badge>
                )}
                
                {product.averageRating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.averageRating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({product.ratingCount} avis)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {product.excerpt && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.excerpt}
                </p>
              </div>
            )}

            {/* Bouton d'achat */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full" 
                asChild
                disabled={product.stockStatus !== "instock"}
              >
                <Link 
                  href={product.externalUrl || "#"}
                  target={product.externalUrl ? "_blank" : "_self"}
                  rel={product.externalUrl ? "noopener noreferrer" : undefined}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.buttonText}
                  {product.externalUrl && <ExternalLink className="w-4 h-4 ml-2" />}
                </Link>
              </Button>

              {/* Garanties */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Garantie 2 ans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Livraison gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Retour 30 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu détaillé */}
        {product.content && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Détails du produit</h2>
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

