# Configuration WordPress Headless CMS

## Vue d'ensemble
Ce projet utilise WordPress comme CMS headless avec Next.js en frontend. Voici comment configurer l'intégration complète.

## 1. Configuration WordPress (Backend)

### Installation WordPress sur O2switch
1. Connectez-vous à votre panneau de contrôle O2switch
2. Utilisez l'installateur automatique WordPress
3. Choisissez un sous-domaine pour l'admin (ex: `admin.votre-domaine.com`)

### Plugins WordPress requis
Installez ces plugins essentiels :

\`\`\`bash
# Plugins obligatoires
- Advanced Custom Fields (ACF) Pro
- Yoast SEO
- WP REST API Controller
- Custom Post Type UI
- WP Headless
\`\`\`

### Configuration des Custom Post Types

#### 1. Type de contenu "Products" (Produits)
\`\`\`php
// Dans Custom Post Type UI, créez :
Post Type: products
Slug: products
Supports: title, editor, thumbnail, custom-fields
Public: true
Show in REST: true
REST Base: products
\`\`\`

#### 2. Taxonomies personnalisées
\`\`\`php
// Catégories de produits
Taxonomy: product_categories
Post Types: products
Slug: product_categories
Show in REST: true

// Tags de produits  
Taxonomy: product_tags
Post Types: products
Slug: product_tags
Show in REST: true
\`\`\`

### Champs personnalisés ACF pour les produits

\`\`\`php
// Groupe de champs : "Product Details"
// Assigné au post type : products

Champs :
- price (Text) - Prix du produit
- original_price (Text) - Prix barré
- amazon_url (URL) - Lien d'affiliation Amazon
- rating (Number) - Note sur 5
- reviews (Number) - Nombre d'avis
- features (Textarea) - Caractéristiques (une par ligne)
- in_stock (True/False) - En stock
- badge (Text) - Badge promotionnel
\`\`\`

### Configuration des permaliens
\`\`\`
Structure : /%postname%/
\`\`\`

## 2. Configuration Next.js (Frontend)

### Variables d'environnement
Créez un fichier `.env.local` :

\`\`\`env
# WordPress API Configuration
WORDPRESS_API_URL=https://admin.votre-domaine.com/wp-json/wp/v2
WORDPRESS_USERNAME=votre-username
WORDPRESS_PASSWORD=votre-app-password

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
\`\`\`

### Génération des App Passwords WordPress
1. Allez dans WordPress Admin → Utilisateurs → Profil
2. Descendez à "Mots de passe d'application"
3. Créez un nouveau mot de passe pour "Next.js Frontend"
4. Utilisez ce mot de passe dans `WORDPRESS_PASSWORD`

## 3. Structure des contenus WordPress

### Articles de blog
- Utilisez les catégories : "Guide d'achat", "Comparatif", "Bien-être", "Actualités"
- Ajoutez des images à la une
- Optimisez avec Yoast SEO

### Produits
- Créez dans le post type "Products"
- Assignez aux bonnes catégories :
  - dos-nuque
  - pieds
  - pistolets-massage
  - fauteuils-massage
  - jambes-mollets
  - massage-oculaire
  - tete-cuir-chevelu
  - pressotherapie
  - mains
  - coussinets-ceintures
  - multifonctions

### Pages statiques
- Guides → Créez des articles avec catégorie "Guide"
- Comparatifs → Créez des articles avec catégorie "Comparatif"

## 4. Déploiement sur O2switch

### Structure des fichiers
\`\`\`
votre-domaine.com/
├── admin/ (WordPress)
└── public_html/ (Next.js build)
\`\`\`

### Build et déploiement Next.js
\`\`\`bash
# Local
npm run build
npm run export

# Upload du dossier 'out' vers public_html/
\`\`\`

### Configuration serveur
Créez un fichier `.htaccess` dans public_html :

```apache
# Next.js Static Export
RewriteEngine On
RewriteRule ^$ /index.html [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1.html [L,QSA]

# CORS pour API WordPress
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
