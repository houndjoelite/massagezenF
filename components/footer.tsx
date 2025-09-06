import Link from "next/link"
import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl">MassageZen</span>
            </Link>
            <p className="text-muted-foreground text-pretty">
              Votre guide de référence pour choisir les meilleurs appareils de massage. Comparatifs, guides d'achat et
              conseils d'experts.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/pistolets-massage"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pistolets de Massage
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/dos-nuque"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Massage Dos & Nuque
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/fauteuils-massage"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Fauteuils de Massage
                </Link>
              </li>
              <li>
                <Link href="/categories/pieds" className="text-muted-foreground hover:text-primary transition-colors">
                  Massage des Pieds
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/jambes-mollets"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Jambes & Mollets
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                  Guides d'achat
                </Link>
              </li>
              <li>
                <Link href="/comparatifs" className="text-muted-foreground hover:text-primary transition-colors">
                  Comparatifs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>contact@monappareildemassage.com</span>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>
            © 2024 MassageZen. Tous droits réservés. |
            <span className="text-xs ml-2">
              En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions
              requises.
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
