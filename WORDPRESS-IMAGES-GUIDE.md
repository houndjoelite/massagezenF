# Guide des Images WordPress - MassageZen

## Améliorations apportées

### ✅ **Tailles d'images optimisées**
- **Taille maximale** : 600px de largeur pour les images normales
- **Images centrées** : Affichage automatique au centre avec marges appropriées
- **Responsive** : Adaptation automatique sur mobile (100% de largeur)
- **Images flottantes** : Support des images alignées à gauche/droite (300px max)

### ✅ **Support des galeries d'images**
- **Détection automatique** : Les galeries WordPress sont automatiquement détectées
- **Grille responsive** : 1 colonne sur mobile, 2 sur tablette, 3 sur desktop
- **Effet lightbox** : Clic sur une image pour l'agrandir en plein écran
- **Navigation** : Flèches pour naviguer entre les images de la galerie
- **Légendes** : Support des légendes d'images dans les galeries
- **Raccourcis clavier** : Échap pour fermer, flèches pour naviguer

### ✅ **Styles améliorés**
- **Bordures arrondies** : Toutes les images ont des coins arrondis
- **Ombres** : Effet d'ombre subtil pour la profondeur
- **Hover effects** : Effet de zoom au survol des images de galerie
- **Transitions fluides** : Animations douces pour tous les effets

## Fonctionnalités des galeries

### Navigation
- **Clic sur image** : Ouvre la lightbox
- **Bouton X** : Ferme la lightbox
- **Flèches** : Navigation entre les images
- **Échap** : Ferme la lightbox
- **Flèches clavier** : Navigation gauche/droite

### Affichage
- **Grille responsive** : S'adapte à la taille d'écran
- **Images carrées** : Format 256px de hauteur pour la cohérence
- **Légendes** : Affichées en overlay sur les images de galerie
- **Compteur** : Affiche "X / Y" dans la lightbox

## Types d'images supportés

### Images simples
- Taille maximale : 600px
- Centrées automatiquement
- Bordures arrondies et ombres

### Images avec légendes (figure)
- Même taille que les images simples
- Légende centrée en dessous
- Style italique et couleur grise

### Images flottantes
- Taille maximale : 300px
- Alignement gauche ou droite
- Texte qui s'enroule autour

### Galeries
- Grille responsive
- Effet lightbox
- Navigation complète
- Support des légendes

## Configuration CSS

Le fichier `styles/wordpress-content.css` contient tous les styles personnalisés :

```css
/* Images normales */
.wordpress-content img {
  max-width: 600px !important;
  width: 100% !important;
  height: auto !important;
  /* ... */
}

/* Galeries */
.wordpress-content .gallery {
  display: none !important; /* Remplacé par notre composant */
}
```

## Utilisation

Les améliorations sont automatiques. Quand vous publiez un article WordPress avec :

1. **Images normales** → Affichage optimisé automatique
2. **Galeries** → Conversion automatique en galerie interactive
3. **Images avec légendes** → Style cohérent appliqué
4. **Images flottantes** → Alignement préservé

## Test

Pour tester les fonctionnalités :

1. Publiez un article WordPress avec des images
2. Créez une galerie d'images dans WordPress
3. Ajoutez des légendes aux images
4. Vérifiez l'affichage sur votre site

## Support

Si vous rencontrez des problèmes :

1. Vérifiez que les images WordPress sont accessibles
2. Testez en local d'abord
3. Vérifiez la console pour les erreurs
4. Les galeries nécessitent au moins 2 images pour être détectées
