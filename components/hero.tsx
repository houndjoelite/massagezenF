import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Découvrez le <span className="text-primary">bien-être</span> avec nos appareils de massage
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Guides d'achat, comparatifs détaillés et sélection des meilleurs appareils de massage pour votre détente
                quotidienne.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Plus de 10,000 clients satisfaits</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/categories">
                  Découvrir nos produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 bg-transparent">
                <Link href="/guides">Guides d'achat</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20 p-8 flex items-center justify-center">
              <Image
                src="/massage-device-for-back-and-neck.png"
                alt="Appareil de massage professionnel"
                width={400}
                height={400}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
              Nouveau
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
