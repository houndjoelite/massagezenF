import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = {
  title: "Tous les Produits | MassageZen",
  description: "Découvrez notre gamme complète d'appareils de massage professionnels.",
}

export default function ProduitsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Produits</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Tous nos Produits</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Découvrez notre gamme complète d'appareils de massage professionnels, 
              soigneusement sélectionnés pour répondre à tous vos besoins de bien-être.
            </p>
          </div>

          <ProductGrid
            categorySlug=""
            limit={50}
            showFilters={false}
            title=""
            description=""
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}



