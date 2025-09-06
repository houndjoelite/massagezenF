import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { categoryMappings } from "@/lib/category-mapping"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const dynamic = 'force-dynamic' // Désactive la génération statique

// Interface Product supprimée car ProductGrid gère les types

// Utiliser les données du mapping des catégories

export async function generateStaticParams() {
  return categoryMappings.map((category: any) => ({
    slug: category.nextJsSlug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const category = categoryMappings.find((cat: any) => cat.nextJsSlug === slug)

  if (!category) {
    return {
      title: "Catégorie non trouvée | MassageZen",
      description: "Cette catégorie n'existe pas.",
    }
  }

  return {
    title: `${category.name} | MassageZen`,
    description: category.description,
  }
}

// Cette fonction n'est plus nécessaire car ProductGrid gère le fetch

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const category = categoryMappings.find((cat: any) => cat.nextJsSlug === slug)

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Catégorie non trouvée</h1>
          <p className="text-muted-foreground mb-8">Cette catégorie n'existe pas.</p>
          <Link href="/categories">
            <Button>Retour aux catégories</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/categories">Catégories</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">{category.name}</h1>
                <p className="text-xl text-muted-foreground text-pretty">{category.description}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-sm">
                    Produits disponibles
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Produits de la catégorie */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid
              categorySlug={slug}
              limit={20}
              showFilters={false}
              title={`Produits ${category.name}`}
              description={`Découvrez notre sélection de produits pour ${category.name.toLowerCase()}`}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
