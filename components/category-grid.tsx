import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    name: "Massages pour le dos et la nuque",
    description: "Soulagement ciblé dos et cervicales",
    image: "/back-neck-massage-device.png",
    href: "/categories/dos-nuque",
    count: "22+ produits",
    badge: "Populaire",
    badgeVariant: "default" as const,
  },
  {
    name: "Massages des pieds",
    description: "Détente et circulation sanguine",
    image: "/foot-massage-device.png",
    href: "/categories/pieds",
    count: "18+ produits",
    badge: "Meilleures ventes",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Pistolets de massage musculaire",
    description: "Massage percussif professionnel",
    image: "/massage-gun-percussion-device.png",
    href: "/categories/pistolets-massage",
    count: "25+ produits",
    badge: "Recommandé",
    badgeVariant: "outline" as const,
  },
  {
    name: "Fauteuils de massage",
    description: "Massage complet du corps",
    image: "/luxury-massage-chair.png",
    href: "/categories/fauteuils-massage",
    count: "15+ produits",
    badge: "Premium",
    badgeVariant: "destructive" as const,
  },
  {
    name: "Appareils de massage pour les jambes et mollets",
    description: "Circulation sanguine et détente musculaire",
    image: "/leg-calf-massage-device.png",
    href: "/categories/jambes-mollets",
    count: "14+ produits",
    badge: "Tendance",
    badgeVariant: "default" as const,
  },
  {
    name: "Appareils de massage oculaires",
    description: "Masques relaxants anti-fatigue",
    image: "/eye-massage-device-mask.png",
    href: "/categories/massage-oculaire",
    count: "8+ produits",
    badge: "Nouveau",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Massage de la tête et cuir chevelu",
    description: "Stimulateurs et casques de massage",
    image: "/head-scalp-massage-device.png",
    href: "/categories/tete-cuir-chevelu",
    count: "11+ produits",
  },
  {
    name: "Appareils de pressothérapie",
    description: "Bottes de compression et récupération",
    image: "/pressotherapy-compression-boots-device.png",
    href: "/categories/pressotherapie",
    count: "9+ produits",
    badge: "Pro",
    badgeVariant: "outline" as const,
  },
  {
    name: "Massages des mains",
    description: "Soulagement arthrite et tensions",
    image: "/hand-massage-device.png",
    href: "/categories/mains",
    count: "12+ produits",
  },
  {
    name: "Coussinets et ceintures de massage",
    description: "Massage portable et chauffant",
    image: "/massage-cushion-belt-heating-pad.png",
    href: "/categories/coussinets-ceintures",
    count: "20+ produits",
  },
  {
    name: "Appareils de massage multifonctions",
    description: "Solutions complètes tout-en-un",
    image: "/multifunction-massage-device.png",
    href: "/categories/multifonctions",
    count: "16+ produits",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Explorez nos catégories
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Trouvez l'appareil de massage parfait selon vos besoins spécifiques
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {category.badge && (
                      <div className="absolute top-3 left-3">
                        <Badge variant={category.badgeVariant} className="shadow-lg backdrop-blur-sm">
                          {category.badge}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors leading-tight">
                        {category.name}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-1 rounded-full whitespace-nowrap">
                        {category.count}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
