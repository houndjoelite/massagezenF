import { ProductSchema, BreadcrumbSchema } from "@/components/schema-markup"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ProductDisplay } from "@/components/product-display"
import { ArrowLeft, ChevronRight, ShoppingCart } from "lucide-react"

const categorySlugMapping: Record<string, string> = {
  'pistolets-de-massage-musculaire': 'pistolets-massage',
  'massage-des-pieds': 'pieds',
  'massage-pour-le-dos-et-la-nuque': 'dos-nuque',
  'appareils-de-pressotherapie': 'pressotherapie',
  'massage-de-la-tete-et-cuir-chevelu': 'tete-cuir-chevelu',
  'appareils-de-massage-oculaires': 'massage-oculaire',
  'appareils-de-massage-pour-les-jambes-et-mollets': 'jambes-mollets',
  'appareils-de-massage-multifonctions': 'multifonctions',
  'coussinets-et-ceintures-de-massage': 'coussinets-ceintures',
  'massage-des-mains': 'mains',
  'fauteuils-de-massage': 'fauteuils-de-massage',
}
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
  categories: Category[]
  tags: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

interface RelatedProduct {
  id: string
  title: string
  slug: string
  image: string | null
  price: string
  currency: string
  categorySlug: string
  categoryName: string
}

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const baseUrl = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SITE_URL || 'https://monappareildemassage.com'
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  try {
    const response = await fetch(`${baseUrl}/api/wordpress/products/${slug}`, {
      cache: "no-store",
      headers: { 'User-Agent': 'MassageZen/1.0' }
    })

    if (response.ok) {
      const product: Product = await response.json()
      return {
        title: `${product.title} | MassageZen`,
        description: product.excerpt || product.seo.description,
        keywords: product.seo.keywords.join(", "),
        alternates: {
          canonical: `${baseUrl}/produits/${slug}`,
        },
        openGraph: {
          title: product.title,
          description: product.excerpt || product.seo.description,
          url: `${baseUrl}/produits/${slug}`,
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
  let relatedProducts: RelatedProduct[] = []
  let error: string | null = null

  const baseUrl = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SITE_URL || 'https://monappareildemassage.com'
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  try {
    const response = await fetch(`${baseUrl}/api/wordpress/products/${slug}`, {
      cache: "no-store",
      headers: { 'User-Agent': 'MassageZen/1.0' }
    })

    if (response.ok) {
      product = await response.json()

      if (product?.id) {
        const categoryId = product.categories?.[0]?.id || ''
        const relatedResponse = await fetch(
          `${baseUrl}/api/wordpress/products/related?exclude=${product.id}&limit=5&category=${categoryId}`,
          { cache: "no-store" }
        )
        if (relatedResponse.ok) {
          relatedProducts = await relatedResponse.json()
        }
      }
    } else {
      const errorData = await response.json().catch(() => ({}))
      error = errorData.error || `HTTP ${response.status}`
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error'
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
          <Button asChild>
            <Link href="/categories">Retour aux catégories</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

 return (
    <div className="min-h-screen">
      <Header />
      <ProductSchema product={{
        title: product.title,
        description: product.excerpt || product.seo.description,
        image: product.image,
        price: product.price,
        currency: product.currency,
        stockStatus: product.stockStatus,
        averageRating: product.averageRating,
        ratingCount: product.ratingCount,
        slug: product.slug,
      }} />
      <BreadcrumbSchema items={[
        { name: "Accueil", url: "https://monappareildemassage.com" },
        { name: "Catégories", url: "https://monappareildemassage.com/categories" },
        ...(product.categories?.[0] ? [{
          name: product.categories[0].name,
          url: `https://monappareildemassage.com/categories/${categorySlugMapping[product.categories[0].slug] || product.categories[0].slug}`
        }] : []),
        { name: product.title, url: `https://monappareildemassage.com/produits/${product.slug}` },
      ]} />

      <main className="container mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-primary transition-colors">Catégories</Link>
          <span>/</span>
          {product.categories?.[0] && (
            <>
              <Link
                href={`/categories/${categorySlugMapping[product.categories[0].slug] || product.categories[0].slug}`}
                className="hover:text-primary transition-colors"
              >
                {product.categories[0].name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>

        {/* Bouton retour */}
        <Button variant="outline" asChild className="mb-12 group/back hover:bg-primary/5 transition-all duration-300">
          <Link href="/categories" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover/back:-translate-x-1 transition-transform duration-300" />
            Retour aux catégories
          </Link>
        </Button>

        {/* Produit principal */}
        <ProductDisplay product={product} />

       {/* Produits similaires */}
{relatedProducts.length > 0 && (
  <section className="mt-24">
    <div className="flex items-center gap-4 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
        Produits similaires
      </h2>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      {relatedProducts[0]?.categorySlug && (
        <Link
          href={`/categories/${relatedProducts[0].categorySlug}`}
          className="whitespace-nowrap text-sm text-primary font-medium hover:underline flex items-center gap-1"
        >
          Voir tout <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
      {relatedProducts.map((related) => (
        <Link
          key={related.id}
          href={`/produits/${related.slug}`}
          className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
            {related.image ? (
              <Image
                src={related.image}
                alt={related.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-gray-300" />
              </div>
            )}
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors leading-snug">
              {related.title}
            </h3>
            <p className="text-primary font-bold text-base">
              {related.price} <span className="text-xs font-normal text-gray-500">{related.currency}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}

            {/* Lien vers la catégorie */}
            {relatedProducts[0]?.categorySlug && (
              <div className="mt-8 text-center">
                <Link
                  href={`/categories/${relatedProducts[0].categorySlug}`}
                  className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium"
                >
                  Voir tous les produits de cette catégorie →
                </Link>
              </div>
            )}
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}
