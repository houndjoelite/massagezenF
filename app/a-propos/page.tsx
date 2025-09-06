import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Heart, Shield } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = {
  title: "À Propos de MassageZen | Notre Mission & Expertise",
  description:
    "Découvrez MassageZen, votre expert en appareils de massage. Notre mission : vous aider à choisir les meilleurs équipements pour votre bien-être.",
}

const values = [
  {
    icon: Award,
    title: "Expertise Reconnue",
    description: "Plus de 10 ans d'expérience dans le domaine du bien-être et des appareils de massage thérapeutiques.",
  },
  {
    icon: Users,
    title: "Communauté Active",
    description: "Plus de 50 000 utilisateurs nous font confiance pour leurs achats d'appareils de massage.",
  },
  {
    icon: Heart,
    title: "Passion du Bien-être",
    description: "Notre équipe partage une véritable passion pour le bien-être et la santé naturelle.",
  },
  {
    icon: Shield,
    title: "Transparence Totale",
    description: "Tests indépendants, avis honnêtes et recommandations basées sur des critères objectifs.",
  },
]

export default function AProposPage() {
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
                <BreadcrumbPage>À propos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">À Propos de MassageZen</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Votre guide de confiance pour choisir les meilleurs appareils de massage et optimiser votre bien-être au
              quotidien
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Notre Mission</h2>
              <p className="text-lg text-muted-foreground">
                Chez MassageZen, nous croyons que chacun mérite d'accéder aux bienfaits du massage thérapeutique. Notre
                mission est de vous accompagner dans le choix des meilleurs appareils de massage, adaptés à vos besoins
                spécifiques et à votre budget.
              </p>
              <p className="text-lg text-muted-foreground">
                Grâce à nos tests approfondis, nos comparatifs détaillés et nos guides d'experts, nous vous aidons à
                prendre des décisions éclairées pour votre bien-être et votre santé.
              </p>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img
                src="/massage-zen-team-wellness-experts.png"
                alt="Équipe MassageZen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-secondary/30 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Pourquoi Nous Faire Confiance ?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Produits testés</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50k+</div>
                <p className="text-muted-foreground">Utilisateurs satisfaits</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <p className="text-muted-foreground">Années d'expertise</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
