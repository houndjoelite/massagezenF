// Données de test pour les produits de massage multifonctions
export const mockMultifunctionProducts = [
  {
    id: "1",
    title: "Appareil de Massage Multifonctions Premium",
    slug: "appareil-massage-multifonctions-premium",
    excerpt: "Appareil de massage 6-en-1 avec percussion, vibration, chaleur et pression d'air pour un massage complet du corps.",
    content: "<p>Cet appareil de massage multifonctions révolutionnaire combine 6 techniques de massage différentes pour offrir une expérience de relaxation complète. Parfait pour la maison ou le bureau.</p>",
    image: "/multifunction-massage-device.png",
    price: "299.99",
    regularPrice: "399.99",
    salePrice: "299.99",
    currency: "€",
    stockStatus: "instock",
    averageRating: 4.8,
    ratingCount: 127,
    externalUrl: "https://amazon.fr/dp/example1",
    buttonText: "Voir sur Amazon",
    categories: ["Appareils de massage multifonctions"],
    tags: ["multifonctions", "premium", "percussion", "vibration"],
    seo: {
      title: "Appareil de Massage Multifonctions Premium - 6 Techniques",
      description: "Appareil de massage 6-en-1 avec percussion, vibration, chaleur et pression d'air. Livraison gratuite.",
      keywords: ["massage multifonctions", "appareil massage", "percussion", "vibration"]
    }
  },
  {
    id: "2", 
    title: "Massageur Multifonctions Professionnel",
    slug: "massageur-multifonctions-professionnel",
    excerpt: "Massageur professionnel avec 8 têtes interchangeables et 5 niveaux d'intensité pour tous types de massages.",
    content: "<p>Conçu pour les professionnels et les particuliers exigeants, ce massageur offre une polyvalence exceptionnelle avec ses 8 têtes spécialisées.</p>",
    image: "/multifunction-massage-device.png",
    price: "199.99",
    regularPrice: "249.99",
    salePrice: "199.99",
    currency: "€",
    stockStatus: "instock",
    averageRating: 4.6,
    ratingCount: 89,
    externalUrl: "https://amazon.fr/dp/example2",
    buttonText: "Voir sur Amazon",
    categories: ["Appareils de massage multifonctions"],
    tags: ["professionnel", "8-têtes", "intensité", "polyvalent"],
    seo: {
      title: "Massageur Multifonctions Professionnel - 8 Têtes",
      description: "Massageur professionnel avec 8 têtes interchangeables et 5 niveaux d'intensité. Garantie 2 ans.",
      keywords: ["massageur professionnel", "8 têtes", "intensité", "garantie"]
    }
  },
  {
    id: "3",
    title: "Kit de Massage Multifonctions Complet",
    slug: "kit-massage-multifonctions-complet",
    excerpt: "Kit complet avec appareil principal, 12 accessoires et guide d'utilisation pour tous les besoins de massage.",
    content: "<p>Ce kit complet comprend tout ce dont vous avez besoin pour des massages professionnels à domicile. Idéal pour les débutants et les experts.</p>",
    image: "/multifunction-massage-device.png",
    price: "149.99",
    regularPrice: "199.99",
    salePrice: "149.99",
    currency: "€",
    stockStatus: "instock",
    averageRating: 4.4,
    ratingCount: 156,
    externalUrl: "https://amazon.fr/dp/example3",
    buttonText: "Voir sur Amazon",
    categories: ["Appareils de massage multifonctions"],
    tags: ["kit complet", "12 accessoires", "guide", "débutant"],
    seo: {
      title: "Kit de Massage Multifonctions Complet - 12 Accessoires",
      description: "Kit complet avec appareil principal et 12 accessoires. Guide d'utilisation inclus. Livraison gratuite.",
      keywords: ["kit massage", "12 accessoires", "guide utilisation", "complet"]
    }
  }
]

// Données de test pour les autres catégories
export const mockProductsByCategory = {
  "multifonctions": mockMultifunctionProducts,
  "dos-nuque": [
    {
      id: "4",
      title: "Massageur Dos et Nuque Professionnel",
      slug: "massageur-dos-nuque-professionnel",
      excerpt: "Spécialement conçu pour le dos et la nuque avec technologie de percussion avancée.",
      content: "<p>Massageur spécialisé pour soulager les tensions du dos et de la nuque. Technologie de percussion avancée.</p>",
      image: "/back-neck-massage-device.png",
      price: "179.99",
      regularPrice: "229.99",
      salePrice: "179.99",
      currency: "€",
      stockStatus: "instock",
      averageRating: 4.7,
      ratingCount: 203,
      externalUrl: "https://amazon.fr/dp/example4",
      buttonText: "Voir sur Amazon",
      categories: ["Massage pour le dos et la nuque"],
      tags: ["dos", "nuque", "percussion", "tensions"],
      seo: {
        title: "Massageur Dos et Nuque Professionnel - Percussion",
        description: "Massageur spécialisé pour le dos et la nuque. Technologie de percussion avancée. Soulagement immédiat.",
        keywords: ["massage dos", "massage nuque", "percussion", "tensions"]
      }
    }
  ],
  "pistolets-massage": [
    {
      id: "5",
      title: "Pistolet de Massage Musculaire Pro",
      slug: "pistolet-massage-musculaire-pro",
      excerpt: "Pistolet de massage professionnel avec 6 têtes et 5 niveaux d'intensité pour la récupération musculaire.",
      content: "<p>Pistolet de massage professionnel conçu pour la récupération musculaire. 6 têtes spécialisées et 5 niveaux d'intensité.</p>",
      image: "/massage-gun-percussion-device.png",
      price: "159.99",
      regularPrice: "199.99",
      salePrice: "159.99",
      currency: "€",
      stockStatus: "instock",
      averageRating: 4.9,
      ratingCount: 312,
      externalUrl: "https://amazon.fr/dp/example5",
      buttonText: "Voir sur Amazon",
      categories: ["Pistolets de massage musculaire"],
      tags: ["pistolet", "musculaire", "récupération", "professionnel"],
      seo: {
        title: "Pistolet de Massage Musculaire Pro - 6 Têtes",
        description: "Pistolet de massage professionnel avec 6 têtes et 5 niveaux d'intensité. Récupération musculaire optimale.",
        keywords: ["pistolet massage", "musculaire", "récupération", "6 têtes"]
      }
    }
  ]
}

