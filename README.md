# MassageZenF — Site d'affiliation Amazon pour appareils de massage

## 📝 Description

MassageZenF est une plateforme d'affiliation spécialisée dans les équipements de massage. Le site propose :

- **Fiches produits détaillées** avec spécifications techniques
- **Guides d'achat complets** pour faciliter le choix
- **Avis d'experts** basés sur des tests approfondis
- **Conseils personnalisés** selon les besoins spécifiques

L'objectif est d'aider les visiteurs à faire le meilleur choix d'appareil de massage en fonction de leurs besoins spécifiques.

---

## 🏗️ Architecture Technique

| Composant | Technologie |
|-----------|-------------|
| **Frontend** | [Next.js](https://nextjs.org/) (TypeScript) |
| **Backend** | [WordPress Headless](https://developer.wordpress.org/rest-api/) (REST API) |
| **Hébergement** | [Vercel](https://vercel.com/) |
| **Base de données** | MySQL (via WordPress) |

---

## 🗂️ Structure du Projet

```
massagezenF/
├── public/                     # Fichiers statiques
│   ├── images/                 # Images du site (produits, bannières)
│   │   ├── products/           # Images des produits
│   │   └── blog/               # Images des articles
│   ├── icons/                  # Icônes et assets
│   └── favicon.ico             # Favicon du site
│
├── src/
│   ├── components/             # Composants réutilisables
│   │   ├── common/             # Composants génériques (Button, Card, Modal)
│   │   ├── layout/             # Composants de mise en page (Header, Footer, Sidebar)
│   │   ├── product/            # Composants produits (ProductCard, ProductFilter)
│   │   └── ui/                 # Éléments d'interface (Input, Badge, Tooltip)
│   │
│   ├── pages/                  # Pages du site (routing Next.js)
│   │   ├── index.tsx           # Page d'accueil
│   │   ├── produits/           # Pages produits
│   │   │   ├── index.tsx       # Liste des produits
│   │   │   └── [slug].tsx      # Page produit dynamique
│   │   ├── blog/               # Articles de blog
│   │   │   ├── index.tsx       # Liste des articles
│   │   │   └── [slug].tsx      # Article dynamique
│   │   ├── guides/             # Guides d'achat
│   │   ├── contact.tsx         # Page de contact
│   │   └── api/                # Routes API Next.js
│   │       └── wordpress/      # Proxy WordPress API
│   │
│   ├── styles/                 # Feuilles de style
│   │   ├── globals.css         # Styles globaux et reset CSS
│   │   └── theme/              # Variables et thèmes (couleurs, typographie)
│   │
│   ├── lib/                    # Utilitaires et configurations
│   │   ├── api/                # Appels API
│   │   │   ├── wordpress.ts    # Client WordPress REST API
│   │   │   └── amazon.ts       # Intégration Amazon Product Advertising API
│   │   ├── hooks/              # Custom React Hooks
│   │   └── utils/              # Fonctions utilitaires (formatage, validation)
│   │
│   ├── types/                  # Définitions TypeScript
│   │   ├── product.ts          # Types pour les produits
│   │   ├── post.ts             # Types pour les articles
│   │   └── api.ts              # Types pour les réponses API
│   │
│   └── config/                 # Fichiers de configuration
│       ├── seo.ts              # Configuration SEO
│       └── constants.ts        # Constantes globales
│
├── .env.local.example          # Template des variables d'environnement
├── .gitignore                  # Fichiers à ignorer par Git
├── package.json                # Dépendances et scripts npm
├── tsconfig.json               # Configuration TypeScript
├── next.config.js              # Configuration Next.js
├── tailwind.config.js          # Configuration Tailwind CSS
└── README.md                   # Documentation du projet
```

---

## 🛠️ Technologies Principales

### Frontend
- **[Next.js 13+](https://nextjs.org/)** - Framework React avec SSR/SSG
- **[React](https://react.dev/)** - Bibliothèque JavaScript pour l'interface
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique pour JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[SWR](https://swr.vercel.app/)** - Stratégie de data fetching et caching

### Backend
- **[WordPress](https://wordpress.org/)** - CMS Headless (REST API)
- **[WooCommerce](https://woocommerce.com/)** - Plugin e-commerce (optionnel pour gestion produits)
- **[ACF (Advanced Custom Fields)](https://www.advancedcustomfields.com/)** - Gestion des champs personnalisés

### Outils & Services
- **[Vercel](https://vercel.com/)** - Plateforme de déploiement
- **[Amazon Product Advertising API](https://webservices.amazon.com/paapi5/documentation/)** - Intégration affiliation Amazon
- **[Google Analytics](https://analytics.google.com/)** - Suivi des performances

---

## 🚀 Fonctionnalités Clés

### 1. Catalogue Produits
- ✅ Fiches produits détaillées avec spécifications techniques
- ✅ Filtres avancés (prix, catégorie, marque, note)
- ✅ Comparaison de produits côte à côte
- ✅ Liens d'affiliation Amazon intégrés

### 2. Contenu Éditorial
- ✅ Articles de blog optimisés SEO
- ✅ Guides d'achat thématiques
- ✅ Avis d'experts et tests produits
- ✅ FAQ et conseils d'utilisation

### 3. Performance
- ⚡ Chargement optimisé avec Next.js SSG/SSR
- ⚡ Images optimisées avec [Next/Image](https://nextjs.org/docs/basic-features/image-optimization)
- ⚡ Mise en cache intelligente avec SWR
- ⚡ Code splitting automatique

### 4. SEO & Référencement
- 🔍 Balises meta dynamiques
- 🔍 Sitemap XML automatique
- 🔍 Structure sémantique HTML5
- 🔍 Schema.org markup (produits, articles)
- 🔍 URLs optimisées et canoniques

---

## 📦 Installation

### Prérequis
- Node.js 18+ ([Télécharger](https://nodejs.org/))
- npm ou yarn
- Accès à une instance WordPress avec l'API REST activée

### Étapes d'installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/houndjoelite/massagezenF.git
cd massagezenF

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local avec vos informations

# 4. Lancer en mode développement
npm run dev

# 5. Construire pour la production
npm run build

# 6. Démarrer le serveur de production
npm start
```

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# WordPress API
NEXT_PUBLIC_WORDPRESS_API_URL=https://votre-wordpress.com/wp-json/wp/v2

# Amazon Product Advertising API
AMAZON_ACCESS_KEY=votre_access_key
AMAZON_SECRET_KEY=votre_secret_key
AMAZON_PARTNER_TAG=votre_tag_affiliation

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🚀 Déploiement

Le site est hébergé sur **[Vercel](https://vercel.com/)** avec :

- ✅ Déploiement continu (CI/CD automatique)
- ✅ Prévisualisation des branches (preview deployments)
- ✅ Optimisations de performances intégrées
- ✅ Edge Network global (CDN)
- ✅ HTTPS automatique

### Déployer sur Vercel

```bash
# Installation de Vercel CLI
npm i -g vercel

# Déploiement
vercel
```

Ou connectez directement votre dépôt GitHub sur [vercel.com](https://vercel.com/).

---

## 📚 Documentation Utile

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Guide Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Amazon Product Advertising API](https://webservices.amazon.com/paapi5/documentation/)


---


## 👥 Auteur

**HoundjoElite**

- 🐙 GitHub: [@houndjoelite](https://github.com/houndjoelite)
- 📧 Email: houndjojeanjacques82.com
- 🌐 Site web: (https://monappareildemassage.com)

---

## 🙏 Remerciements

- Merci à la communauté Next.js et WordPress pour leurs excellents outils
- Les contributeurs open-source qui rendent ce projet possible

---

<div align="center">
  
**⭐ N'oubliez pas de mettre une étoile si ce projet vous aide ! ⭐**

</div>
