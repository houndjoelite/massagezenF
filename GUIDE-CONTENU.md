# Guide pour Personnaliser Votre Contenu

## 🎯 Comment Remplacer le Contenu Fictif

### 1. Produits (components/featured-products.tsx)
Remplacez les objets dans le tableau `featuredProducts` par vos vrais produits :

\`\`\`typescript
{
  id: 1,
  name: "Nom réel de votre produit",
  category: "Catégorie réelle",
  price: "Prix réel",
  originalPrice: "Prix barré réel",
  rating: 4.8, // Note réelle
  reviews: 1247, // Nombre d'avis réels
  image: "/chemin/vers/votre/vraie/image.jpg",
  badge: "Votre badge",
  amazonUrl: "https://amazon.fr/dp/VOTRE-LIEN-AFFILIE-REEL",
  features: ["Vraie caractéristique 1", "Vraie caractéristique 2"]
}
\`\`\`

### 2. Articles de Blog (components/blog-preview.tsx)
Remplacez les objets dans le tableau `blogPosts` :

\`\`\`typescript
{
  id: 1,
  title: "Titre de votre vrai article",
  excerpt: "Vrai résumé de votre article",
  image: "/chemin/vers/votre/vraie/image.jpg",
  category: "Vraie catégorie",
  date: "Date réelle",
  readTime: "Temps réel",
  href: "/blog/url-de-votre-vrai-article"
}
\`\`\`

### 3. Images Optimisées
- Utilisez des images de qualité (format WebP recommandé)
- Taille recommandée : 400x400px pour les produits, 400x300px pour les articles
- Placez vos images dans le dossier `/public/`
- Utilisez des noms descriptifs : `massage-gun-theragun-pro.webp`

### 4. Liens d'Affiliation Amazon
Remplacez `#` par vos vrais liens d'affiliation :
- Format : `https://amazon.fr/dp/PRODUCT-ID?tag=VOTRE-ID-AFFILIE`
- Assurez-vous d'avoir votre ID d'affilié Amazon Associates

### 5. SEO
- Personnalisez les métadonnées dans chaque page
- Utilisez des mots-clés pertinents pour votre niche
- Optimisez les alt text des images

## 📝 Structure Recommandée pour Vos Articles

1. **Titre accrocheur** avec mots-clés
2. **Introduction** (problème + solution)
3. **Sections avec sous-titres H2/H3**
4. **Comparatifs/listes** avec vos produits affiliés
5. **Conclusion** avec call-to-action
6. **Liens d'affiliation** intégrés naturellement

## 🚀 Prochaines Étapes

1. Remplacez le contenu fictif par vos vrais produits/articles
2. Ajoutez vos vraies images optimisées
3. Configurez vos liens d'affiliation Amazon
4. Testez les performances et le SEO
5. Publiez sur votre hébergement O2switch
