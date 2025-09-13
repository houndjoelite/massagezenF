# Guide Galeries E-commerce et Boutons Shop - MassageZen

## ✅ Améliorations apportées

### 1. **Galeries style e-commerce**
- **Problème résolu** : Les galeries affichent maintenant les images côte à côte comme sur les sites de vente
- **Layout** : Grille responsive avec images carrées
- **Taille** : Images compactes et jolies (150px minimum)
- **Effet** : Hover avec zoom et overlay de recherche
- **Lightbox** : Clic sur une image pour l'agrandir

### 2. **Icônes intégrées dans les boutons**
- **Problème résolu** : Les icônes sont maintenant dans le même bouton que le lien
- **Style** : Boutons avec icônes et texte sur la même ligne
- **Icônes automatiques** : 🛒 Amazon, 🛍️ Shop, 💰 Buy, 🔗 Affiliate
- **Couleurs** : Dégradés bleus et verts selon le type

## 🎨 Design des galeries e-commerce

### Structure
```
┌─────────────────────────────────────────────────┐
│  [img] [img] [img] [img] [img] [img] [img]     │
│  [img] [img] [img] [img] [img] [img] [img]     │
└─────────────────────────────────────────────────┘
```

### Fonctionnalités
- **Grille responsive** : 150px minimum par image
- **Images carrées** : Aspect ratio 1:1
- **Hover effect** : Zoom + overlay avec icône de recherche
- **Légendes** : Affichées sous chaque image
- **Lightbox** : Clic pour agrandir avec navigation

### Tailles
- **Desktop** : 150px minimum par image
- **Tablet** : 120px minimum par image  
- **Mobile** : 100px minimum par image
- **Espacement** : 1rem entre les images

## 🛒 Boutons de shop intégrés

### Types de boutons
- **Liens Amazon** : 🛒 + texte (bleu)
- **Liens Shop** : 🛍️ + texte (bleu)
- **Liens Buy** : 💰 + texte (bleu)
- **Classes spéciales** : 🛒/🛍️/🔗 + texte (vert)

### Styles
- **Layout** : `display: inline-flex` avec `align-items: center`
- **Espacement** : `gap: 0.5rem` entre icône et texte
- **Padding** : `0.75rem 1.25rem`
- **Bordures** : Arrondies `0.75rem`
- **Ombres** : Subtiles avec effet de levée au hover

### Couleurs
- **Liens normaux** : Dégradé bleu `#3b82f6` → `#1d4ed8`
- **Classes spéciales** : Dégradé vert `#059669` → `#047857`
- **Hover** : Couleurs plus foncées + effet de levée

## 📱 Responsive

### Galeries
- **Desktop** : 150px minimum, grille flexible
- **Tablet** : 120px minimum, espacement réduit
- **Mobile** : 100px minimum, grille compacte

### Boutons
- **Taille** : `0.875rem` de police
- **Padding** : Adaptatif selon l'écran
- **Marges** : `0.25rem` entre les boutons

## 🎯 Navigation lightbox

### Contrôles
- **Ouverture** : Clic sur n'importe quelle image
- **Navigation** : Flèches gauche/droite
- **Fermeture** : Bouton X ou clic en dehors
- **Raccourcis** : Échap pour fermer

### Fonctions JavaScript
- `galleryOpenLightbox(galleryIndex, imageIndex)` - Ouvrir la lightbox
- `galleryPrevious()` - Image précédente
- `galleryNext()` - Image suivante

## 🔧 Détection automatique

### Liens d'affiliation
```css
a[href*="amazon"]  /* 🛒 */
a[href*="shop"]    /* 🛍️ */
a[href*="buy"]     /* 💰 */
```

### Classes spéciales
```css
.shop-icon         /* Icône générique */
.affiliate-link    /* Lien d'affiliation */
.product-link      /* Lien produit */
.buy-button        /* 🛒 */
.shop-button       /* 🛍️ */
.affiliate-button  /* 🔗 */
```

## 🚀 Utilisation

### Galeries
1. Créez une galerie dans WordPress
2. Placez-la dans votre article
3. Elle sera automatiquement convertie en galerie e-commerce

### Boutons de shop
1. Créez des liens vers Amazon/shop
2. Ou utilisez les classes spéciales
3. Les icônes seront automatiquement ajoutées

## ✨ Résultat

Vos articles WordPress ont maintenant :
- **Galeries e-commerce** avec images côte à côte
- **Boutons shop intégrés** avec icônes et texte
- **Design compact** et professionnel
- **Navigation intuitive** avec lightbox
- **Responsive parfait** sur tous les écrans

## 📁 Fichiers modifiés

- `components/wordpress-content.tsx` - Logique des galeries e-commerce
- `styles/wordpress-content.css` - Styles pour galeries et boutons
- `app/api/wordpress/posts/[slug]/route.ts` - Nettoyage préservant les éléments

## 🎨 Exemple de galerie e-commerce

```html
<div class="ecommerce-gallery-container">
  <div class="gallery-grid">
    <div class="gallery-item" onclick="galleryOpenLightbox(0, 0)">
      <div class="gallery-item-image">
        <img src="image1.jpg" alt="Image 1" />
        <div class="gallery-item-overlay">
          <svg class="gallery-zoom-icon">...</svg>
        </div>
      </div>
      <div class="gallery-item-caption">Légende</div>
    </div>
    <!-- Plus d'images... -->
  </div>
</div>
```

## 🛒 Exemple de bouton shop

```html
<a href="https://amazon.com/product" class="shop-link">
  Voir sur Amazon
</a>
<!-- Devient automatiquement : 🛒 Voir sur Amazon -->
```


