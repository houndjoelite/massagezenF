import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { CategoryGrid } from "@/components/category-grid"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const dynamic = 'force-dynamic' // Désactive la génération statique

export const metadata = {
  title: "Catégories d'Appareils de Massage | MassageZen",
  description:
    "Découvrez toutes nos catégories d'appareils de massage : dos, pieds, mains, pistolets de massage, fauteuils et plus encore.",
}

export default function CategoriesPage() {
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
                <BreadcrumbPage>Catégories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Toutes nos catégories</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Explorez notre gamme complète d'appareils de massage professionnels pour tous vos besoins de bien-être et
              relaxation
            </p>
          </div>
        </div>

        <CategoryGrid />
      </main>
      <Footer />
    </div>
  )
}
