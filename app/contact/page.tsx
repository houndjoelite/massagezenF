import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Contactez-nous</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Une question sur nos recommandations ? Besoin d'aide pour choisir votre appareil de massage ?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour toute question concernant nos guides d'achat, comparatifs ou recommandations d'appareils de
                  massage.
                </p>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="font-semibold text-primary">contact@monappareildemassage.com</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nous nous efforçons de répondre à tous les emails dans les 24-48 heures.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Horaires de réponse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend</span>
                    <span className="font-medium">10h - 16h</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nos experts sont disponibles pour vous conseiller dans le choix de votre appareil de massage idéal.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle>Questions fréquentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Comment choisir le bon appareil de massage ?</h4>
                  <p className="text-muted-foreground text-sm">
                    Consultez nos guides d'achat détaillés par catégorie ou contactez-nous pour un conseil personnalisé.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Vos recommandations sont-elles fiables ?</h4>
                  <p className="text-muted-foreground text-sm">
                    Tous nos produits sont testés et évalués par notre équipe d'experts selon des critères stricts.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Proposez-vous un service après-vente ?</h4>
                  <p className="text-muted-foreground text-sm">
                    Nous vous accompagnons dans vos achats mais la garantie et le SAV sont gérés directement par les
                    vendeurs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
