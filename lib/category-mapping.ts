// Mapping entre les catégories WooCommerce et les pages Next.js
export const categoryMapping = {
  // WooCommerce slug -> Next.js slug
  "appareils-de-massage-oculaires": "massage-oculaire",
  "appareils-de-massage-multifonctions": "multifonctions",
  "appareils-de-massage-pour-les-jambes-et-mollets": "jambes-mollets",
  "appareils-de-pressotherapie": "pressotherapie",
  "coussinets-et-ceintures-de-massage": "coussinets-ceintures",
  "fauteuils-de-massage": "fauteuils-massage",
  "massage-de-la-tete-et-cuir-chevelu": "tete-cuir-chevelu",
  "massage-des-mains": "mains",
  "massage-des-pieds": "pieds",
  "massage-pour-le-dos-et-la-nuque": "dos-nuque",
  "pistolets-de-massage-musculaire": "pistolets-massage"
} as const

// Mapping inverse : Next.js slug -> WooCommerce slug
export const reverseCategoryMapping = Object.fromEntries(
  Object.entries(categoryMapping).map(([wc, next]) => [next, wc])
) as Record<string, string>

// Mapping des slugs Next.js vers les IDs WooCommerce
export const categoryIdMapping = {
  "multifonctions": 37, // ID de la catégorie "Appareils de massage multifonctions"
  "dos-nuque": 0, // À définir quand vous créerez cette catégorie
  "pieds": 0, // À définir quand vous créerez cette catégorie
  "mains": 0, // À définir quand vous créerez cette catégorie
  "tete-cuir-chevelu": 0, // À définir quand vous créerez cette catégorie
  "fauteuils-massage": 0, // À définir quand vous créerez cette catégorie
  "coussinets-ceintures": 0, // À définir quand vous créerez cette catégorie
  "pressotherapie": 0, // À définir quand vous créerez cette catégorie
  "jambes-mollets": 0, // À définir quand vous créerez cette catégorie
  "massage-oculaire": 0, // À définir quand vous créerez cette catégorie
  "pistolets-massage": 0 // À définir quand vous créerez cette catégorie
} as const

// Informations des catégories
export const categoryInfo = {
  "dos-nuque": {
    name: "Massages pour le dos et la nuque",
    description: "Soulagement ciblé dos et cervicales",
    image: "/back-neck-massage-device.png",
    badge: "Populaire",
    badgeVariant: "default" as const,
  },
  "pistolets-massage": {
    name: "Pistolets de massage musculaire", 
    description: "Massage percussif professionnel",
    image: "/massage-gun-percussion-device.png",
    badge: "Recommandé",
    badgeVariant: "outline" as const,
  },
  "pieds": {
    name: "Massages des pieds",
    description: "Détente et circulation sanguine", 
    image: "/foot-massage-device.png",
    badge: "Meilleures ventes",
    badgeVariant: "secondary" as const,
  },
  "mains": {
    name: "Massages des mains",
    description: "Détente et soin des mains",
    image: "/hand-massage-device.png",
    badge: "Nouveau",
    badgeVariant: "secondary" as const,
  },
  "tete-cuir-chevelu": {
    name: "Massage de la tête et cuir chevelu",
    description: "Relaxation et stimulation du cuir chevelu",
    image: "/head-massage-device.png", 
    badge: "Tendance",
    badgeVariant: "default" as const,
  },
  "fauteuils-massage": {
    name: "Fauteuils de massage",
    description: "Massage complet du corps",
    image: "/luxury-massage-chair.png",
    badge: "Premium",
    badgeVariant: "destructive" as const,
  },
  "coussinets-ceintures": {
    name: "Coussinets et ceintures de massage",
    description: "Massage ciblé et portable",
    image: "/massage-cushion-belt.png",
    badge: "Pratique",
    badgeVariant: "outline" as const,
  },
  "pressotherapie": {
    name: "Appareils de pressothérapie",
    description: "Amélioration de la circulation sanguine",
    image: "/pressotherapy-device.png",
    badge: "Spécialisé",
    badgeVariant: "secondary" as const,
  },
  "jambes-mollets": {
    name: "Appareils de massage pour les jambes et mollets",
    description: "Circulation sanguine et détente musculaire",
    image: "/leg-calf-massage-device.png",
    badge: "Tendance",
    badgeVariant: "default" as const,
  },
  "massage-oculaire": {
    name: "Appareils de massage oculaires",
    description: "Masques relaxants anti-fatigue",
    image: "/eye-massage-device-mask.png",
    badge: "Nouveau",
    badgeVariant: "secondary" as const,
  },
  "multifonctions": {
    name: "Appareils de massage multifonctions",
    description: "Plusieurs techniques en un seul appareil",
    image: "/multifunction-massage-device.png",
    badge: "Polyvalent",
    badgeVariant: "outline" as const,
  }
} as const

export type CategorySlug = keyof typeof categoryInfo
export type WooCommerceCategorySlug = keyof typeof categoryMapping

// Export pour compatibilité avec les imports existants
export const categoryMappings = Object.entries(categoryInfo).map(([slug, info]) => ({
  nextJsSlug: slug,
  wooCommerceSlug: reverseCategoryMapping[slug],
  ...info
}))
