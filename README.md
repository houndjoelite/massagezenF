# MassageZenF — Site d'affiliation Amazon pour appareils de massage

## Description
MassageZenF est une plateforme d’affiliation spécialisée dans les équipements de massage.  
Le site propose :

- Des fiches produits détaillées  
- Des guides d'achat complets  
- Des avis d'experts  
- Des conseils personnalisés  

L'objectif est d'aider les visiteurs à faire le meilleur choix d'appareil de massage en fonction de leurs besoins spécifiques.

---

## Architecture
- **Frontend** : Next.js (TypeScript)  
- **Backend** : WordPress Headless (API REST)  
- **Hébergement** : Vercel  
- **Base de données** : MySQL (via WordPress)  

---

## Structure du projet

massagezenF/
├── public/             # Fichiers statiques
│   ├── images/         # Images du site
│   └── favicon.ico     # Favicon
├── src/
│   ├── composants/     # Composants réutilisables
│   │   ├── common/     # Composants génériques
│   │   ├── layout/     # Composants de mise en page
│   │   └── ui/         # Éléments d'interface
│   ├── pages/          # Pages du site
│   ├── produits/       # Pages produits
│   ├── blog/           # Articles de blog
│   ├── api/            # Routes API
│   ├── styles/         # Feuilles de style
│   │   ├── globals.css # Styles globaux
│   │   └── theme/      # Variables et thèmes
│   ├── lib/            # Utilitaires et configurations
│   │   ├── api/        # Appels API
│   │   └── utils/      # Fonctions utilitaires
│   │       └── types/  # Définitions TypeScript
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md


---

## Technologies Principales

- **Frontend** : Next.js 13+ (React), TypeScript, Tailwind CSS, SWR  
- **Backend** : WordPress (Headless), WooCommerce optionnel  
- **Styles** : CSS / Tailwind  
- **Langages** : TypeScript, PHP, JavaScript, HTML  

---

## Fonctionnalités Clés

- Catalogue de produits avec fiches détaillées  
- Filtres avancés et comparaison de produits  
- Articles de blog et guides d'achat  
- Avis d'experts et conseils personnalisés  
- Chargement rapide et images optimisées  
- SEO optimisé avec balises méta dynamiques et sitemap XML  
- Structure sémantique pour meilleure accessibilité  

---

## Déploiement

Le site est hébergé sur **Vercel** avec :  

- Déploiement continu (CI/CD)  
- Prévisualisation des branches  
- Optimisations de performance intégrées  

---

## Installation (Local)

### Cloner le dépôt
```bash
git clone https://github.com/houndjoelite/massagezenF.git
cd massagezenF
Installer les dépendances
bash
Copier le code
npm install
Lancer en mode développement
bash
Copier le code
npm run dev
Construire pour la production
bash
Copier le code
npm run build
Auteur
HoundjoElite
GitHub : @houndjoelite
Contact : houndjojeanjacques82@gmail.com

Notes
Ce projet est présenté dans le cadre de mon portfolio.
Le code n’est pas destiné à être réutilisé ou redistribué.
