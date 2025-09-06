export interface Product {
  id: number
  name: string
  category: string
  price: string
  originalPrice: string
  rating: number
  reviews: number
  image: string
  badge: string
  amazonUrl: string
  features: string[]
  description?: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  href: string
  content?: string
  seoTitle?: string
  seoDescription?: string
}

// Template pour vos produits - remplacez par vos vrais produits
export const productTemplate: Product = {
  id: 1,
  name: "Nom de votre produit",
  category: "Catégorie du produit",
  price: "Prix actuel",
  originalPrice: "Prix barré",
  rating: 4.5,
  reviews: 100,
  image: "/chemin/vers/votre/image.jpg",
  badge: "Badge promotionnel",
  amazonUrl: "https://amazon.fr/dp/VOTRE-ID-AFFILIE",
  features: ["Caractéristique 1", "Caractéristique 2", "Caractéristique 3"],
  description: "Description détaillée du produit...",
}

// Template pour vos articles - remplacez par vos vrais articles
export const blogPostTemplate: BlogPost = {
  id: 1,
  title: "Titre de votre article",
  excerpt: "Résumé de votre article",
  image: "/chemin/vers/votre/image.jpg",
  category: "Catégorie de l'article",
  date: "Date de publication",
  readTime: "Temps de lecture",
  href: "/blog/url-de-votre-article",
  content: "Contenu complet de votre article...",
  seoTitle: "Titre SEO optimisé",
  seoDescription: "Description meta pour SEO",
}
