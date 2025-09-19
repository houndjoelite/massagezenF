import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ProductDisplay } from "@/components/product-display"

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

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// Configuration pour le rendu dynamique
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  
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
          type: 'website',
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
  const { slug } = await params
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

        {/* Composant principal d'affichage du produit */}
        <ProductDisplay product={product} />
      </main>

      <Footer />
    </div>
  )
}

