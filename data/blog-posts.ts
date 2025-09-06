// Données de test pour le blog
export const mockBlogPosts = [
  {
    id: "1",
    title: "Guide Complet des Appareils de Massage Oculaires",
    excerpt: "Découvrez les meilleurs appareils de massage oculaires pour soulager la fatigue et améliorer votre bien-être visuel.",
    content: `
      <h2>Introduction aux Appareils de Massage Oculaires</h2>
      <p>Les appareils de massage oculaires sont devenus indispensables dans notre monde moderne où nous passons de plus en plus de temps devant les écrans. Ces dispositifs innovants offrent une solution naturelle pour soulager la fatigue oculaire et améliorer votre bien-être visuel.</p>
      
      <h3>Les Bienfaits du Massage Oculaire</h3>
      <p>Le massage oculaire présente de nombreux avantages :</p>
      <ul>
        <li><strong>Réduction de la fatigue oculaire</strong> : Soulage les tensions causées par la lecture prolongée</li>
        <li><strong>Amélioration de la circulation sanguine</strong> : Stimule la microcirculation autour des yeux</li>
        <li><strong>Détente musculaire</strong> : Relâche les muscles oculaires tendus</li>
        <li><strong>Réduction des maux de tête</strong> : Préviens les céphalées liées à la fatigue visuelle</li>
        <li><strong>Amélioration du sommeil</strong> : Favorise un endormissement plus facile</li>
      </ul>
      
      <h3>Comment Choisir le Bon Appareil</h3>
      <p>Pour choisir l'appareil de massage oculaire idéal, considérez ces critères essentiels :</p>
      <ol>
        <li><strong>Type de massage</strong> : Vibrations, chaleur, pression ou combinaison</li>
        <li><strong>Confort</strong> : Ergonomie et matériaux hypoallergéniques</li>
        <li><strong>Fonctionnalités</strong> : Timer, intensité réglable, portabilité</li>
        <li><strong>Autonomie</strong> : Durée de batterie et facilité de charge</li>
        <li><strong>Prix</strong> : Rapport qualité-prix selon votre budget</li>
      </ol>
      
      <h3>Conseils d'Utilisation</h3>
      <p>Pour optimiser les bienfaits de votre appareil de massage oculaire :</p>
      <ul>
        <li>Utilisez-le 10-15 minutes par session</li>
        <li>Appliquez une pression douce et constante</li>
        <li>Fermez les yeux pendant le massage</li>
        <li>Utilisez-le dans un environnement calme et détendu</li>
        <li>Nettoyez régulièrement l'appareil selon les instructions</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Investir dans un appareil de massage oculaire de qualité est un excellent moyen de prendre soin de vos yeux et de votre bien-être général. Avec les bons conseils et le bon équipement, vous pouvez facilement intégrer cette pratique dans votre routine quotidienne.</p>
    `,
    slug: "guide-appareils-massage-oculaires",
    publishedAt: "2024-01-15T10:00:00Z",
    author: "Dr. Marie Dubois",
    category: "Guides",
    image: "/eye-massage-device-mask.png",
    tags: ["massage", "yeux", "fatigue", "bien-être"],
    seo: {
      title: "Guide Complet des Appareils de Massage Oculaires | MassageZen",
      description: "Découvrez les meilleurs appareils de massage oculaires pour soulager la fatigue et améliorer votre bien-être visuel.",
      keywords: ["massage oculaire", "fatigue des yeux", "bien-être visuel"]
    }
  },
  {
    id: "2", 
    title: "Comparatif des Pistolets de Massage Musculaire 2024",
    excerpt: "Notre comparatif détaillé des meilleurs pistolets de massage musculaire pour sportifs et particuliers.",
    content: "Contenu complet de l'article...",
    slug: "comparatif-pistolets-massage-musculaire-2024",
    publishedAt: "2024-01-10T14:30:00Z",
    author: "Jean-Pierre Martin",
    category: "Comparatifs",
    image: "/massage-gun-percussion-device.png",
    tags: ["pistolet massage", "muscles", "sport", "récupération"],
    seo: {
      title: "Comparatif des Pistolets de Massage Musculaire 2024 | MassageZen",
      description: "Notre comparatif détaillé des meilleurs pistolets de massage musculaire pour sportifs et particuliers.",
      keywords: ["pistolet massage", "massage musculaire", "récupération sportive"]
    }
  },
  {
    id: "3",
    title: "Les Bienfaits du Massage des Pieds au Quotidien",
    excerpt: "Apprenez pourquoi le massage des pieds est essentiel pour votre santé et découvrez les meilleures techniques.",
    content: "Contenu complet de l'article...",
    slug: "bienfaits-massage-pieds-quotidien",
    publishedAt: "2024-01-05T09:15:00Z",
    author: "Sophie Laurent",
    category: "Bien-être",
    image: "/foot-massage-device.png",
    tags: ["massage pieds", "réflexologie", "détente", "circulation"],
    seo: {
      title: "Les Bienfaits du Massage des Pieds au Quotidien | MassageZen",
      description: "Apprenez pourquoi le massage des pieds est essentiel pour votre santé et découvrez les meilleures techniques.",
      keywords: ["massage pieds", "réflexologie", "bien-être", "détente"]
    }
  },
  {
    id: "4",
    title: "Comment Choisir son Fauteuil de Massage",
    excerpt: "Guide d'achat complet pour choisir le fauteuil de massage parfait selon vos besoins et votre budget.",
    content: "Contenu complet de l'article...",
    slug: "choisir-fauteuil-massage-guide-achat",
    publishedAt: "2024-01-01T16:45:00Z",
    author: "Dr. Pierre Moreau",
    category: "Guides",
    image: "/luxury-massage-chair.png",
    tags: ["fauteuil massage", "guide achat", "bien-être", "détente"],
    seo: {
      title: "Comment Choisir son Fauteuil de Massage | MassageZen",
      description: "Guide d'achat complet pour choisir le fauteuil de massage parfait selon vos besoins et votre budget.",
      keywords: ["fauteuil massage", "guide achat", "bien-être", "détente"]
    }
  },
  {
    id: "5",
    title: "Pressothérapie : Tout ce qu'il faut savoir",
    excerpt: "Découvrez les bienfaits de la pressothérapie et comment cette technique peut améliorer votre circulation sanguine.",
    content: "Contenu complet de l'article...",
    slug: "pressotherapie-tout-savoir",
    publishedAt: "2023-12-28T11:20:00Z",
    author: "Dr. Claire Bernard",
    category: "Techniques",
    image: "/pressotherapy-device.png",
    tags: ["pressothérapie", "circulation", "santé", "bien-être"],
    seo: {
      title: "Pressothérapie : Tout ce qu'il faut savoir | MassageZen",
      description: "Découvrez les bienfaits de la pressothérapie et comment cette technique peut améliorer votre circulation sanguine.",
      keywords: ["pressothérapie", "circulation sanguine", "bien-être", "santé"]
    }
  },
  {
    id: "6",
    title: "Massage des Mains : Techniques et Bienfaits",
    excerpt: "Apprenez les meilleures techniques de massage des mains pour soulager les tensions et améliorer la mobilité.",
    content: "Contenu complet de l'article...",
    slug: "massage-mains-techniques-bienfaits",
    publishedAt: "2023-12-25T13:10:00Z",
    author: "Marie-Claire Petit",
    category: "Techniques",
    image: "/hand-massage-device.png",
    tags: ["massage mains", "techniques", "mobilité", "détente"],
    seo: {
      title: "Massage des Mains : Techniques et Bienfaits | MassageZen",
      description: "Apprenez les meilleures techniques de massage des mains pour soulager les tensions et améliorer la mobilité.",
      keywords: ["massage mains", "techniques massage", "mobilité", "détente"]
    }
  }
]

export type MockBlogPost = typeof mockBlogPosts[0]
