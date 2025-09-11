# Configuration des Variables d'Environnement

## Variables Requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Configuration WordPress
NEXT_PUBLIC_WORDPRESS_URL=https://cmsmonappareildemagge.monappareildemassage.com
WORDPRESS_API_URL=https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2

# URL du site (pour les métadonnées et les liens internes)
NEXT_PUBLIC_SITE_URL=https://monappareildemassage.com
```

## Description des Variables

### `NEXT_PUBLIC_WORDPRESS_URL`
- **Description** : URL de base de votre installation WordPress
- **Exemple** : `https://cmsmonappareildemagge.monappareildemassage.com`
- **Utilisation** : Utilisée pour construire les URLs des API WordPress et WooCommerce

### `WORDPRESS_API_URL`
- **Description** : URL complète de l'API WordPress REST
- **Exemple** : `https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2`
- **Utilisation** : Utilisée dans les routes API pour accéder aux données WordPress

### `NEXT_PUBLIC_SITE_URL`
- **Description** : URL publique de votre site Next.js
- **Exemple** : `https://monappareildemassage.com`
- **Utilisation** : Utilisée pour les métadonnées SEO et les liens internes

## Configuration Vercel

Pour déployer sur Vercel, ajoutez ces variables dans les paramètres de votre projet :

1. Allez dans votre projet Vercel
2. Cliquez sur "Settings"
3. Allez dans "Environment Variables"
4. Ajoutez chaque variable avec sa valeur

## Fallback

Si les variables d'environnement ne sont pas définies, le code utilise des valeurs par défaut :
- `NEXT_PUBLIC_WORDPRESS_URL` → `https://cmsmonappareildemagge.monappareildemassage.com`
- `NEXT_PUBLIC_SITE_URL` → `http://localhost:3000` (en développement)

## Cache Configuration

Tous les appels API utilisent maintenant `cache: "no-store"` pour forcer la récupération de données fraîches depuis WordPress, garantissant que les données sont toujours à jour.
