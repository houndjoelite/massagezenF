MassageZenF — Site d'affiliation Amazon pour appareils de massage
Description
MassageZenF est une plateforme d'affiliation spécialisée dans les équipements de massage. Le site propose :

Des fiches produits détaillées
Des guides d'achat complets
Des avis d'experts
Des conseils personnalisés
L'objectif est d'aider les visiteurs à faire le meilleur choix d'appareil de massage en fonction de leurs besoins spécifiques.

 Architecture
Frontend : Next.js (TypeScript)
Backend : WordPress Headless (REST API)
Hébergement : Vercel
Base de données : MySQL (via WordPress)
 Structure du Projet
massagezenF/
├── public/                  # Fichiers statiques
│   ├── images/              # Images du site
│   └── favicon.ico          # Favicon
│
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── common/          # Composants génériques
│   │   ├── layout/          # Composants de mise en page
│   │   └── ui/              # Éléments d'interface
│   │
│   ├── pages/               # Pages du site
│   │   ├── produits/        # Pages produits
│   │   ├── blog/            # Articles de blog
│   │   └── api/             # Routes API
│   │
│   ├── styles/              # Feuilles de style
│   │   ├── globals.css      # Styles globaux
│   │   └── theme/           # Variables et thèmes
│   │
│   ├── lib/                 # Utilitaires et configurations
│   │   ├── api/             # Appels API
│   │   └── utils/           # Fonctions utilitaires
│   │
│   └── types/               # Définitions TypeScript
│
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
Technologies Principales
Frontend :
Next.js 13+ (React)
TypeScript
Tailwind CSS
SWR (Data Fetching)
Backend :
WordPress (Headless)
WooCommerce (optionnel pour la gestion des produits)
 Fonctionnalités Clés
Catalogue Produits
Fiches produits détaillées
Filtres avancés
Comparaison de produits
Contenu
Articles de blog
Guides d'achat
Avis d'experts
Performance
Chargement optimisé
Images optimisées
Mise en cache intelligente
SEO
Balises meta dynamiques
Sitemap XML
Structure sémantique
  Déploiement
Le site est hébergé sur Vercel avec :

Déploiement continu (CI/CD)
Prévisualisation des branches
Optimisations de performances intégrées
  Installation
bash
  Cloner le dépôt
git clone https://github.com/houndjoelite/massagezenF.git
cd massagezenF

  Installer les dépendances
npm install

  Lancer en mode développement
npm run dev

  Construire pour la production
npm run build
  Auteur
HoundjoElite
GitHub: @houndjoelite
Contact: houndjojeanjacques82@gmail.com
