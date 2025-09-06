# Guide d'Intégration WordPress Headless CMS

## ✅ Configuration Terminée

Votre site Next.js est maintenant connecté à votre WordPress headless CMS !

### 🔗 URLs de Configuration
- **WordPress CMS**: http://cmsmonappareildemagge.monappareildemassage.com
- **API WordPress**: http://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2
- **Site Next.js**: http://localhost:3001 (développement)

## 📝 Comment Publier des Articles

### 1. Connectez-vous à votre WordPress
1. Allez sur http://cmsmonappareildemagge.monappareildemassage.com/wp-admin
2. Connectez-vous avec vos identifiants

### 2. Créez un Nouvel Article
1. Dans le menu WordPress, cliquez sur **"Articles"** > **"Ajouter"**
2. Remplissez les champs :
   - **Titre** : Le titre de votre article
   - **Contenu** : Le contenu principal de l'article
   - **Extrait** : Un résumé court (optionnel mais recommandé)
   - **Image mise en avant** : Ajoutez une image d'illustration
   - **Catégorie** : Sélectionnez une catégorie appropriée
   - **Tags** : Ajoutez des mots-clés (optionnel)

### 3. Publiez l'Article
1. Cliquez sur **"Publier"** dans WordPress
2. L'article apparaîtra automatiquement sur votre site Next.js !

## 🔄 Synchronisation Automatique

- **Temps de synchronisation** : 5 minutes maximum
- **Cache** : Les articles sont mis en cache pour optimiser les performances
- **Mise à jour automatique** : Pas besoin de redémarrer le serveur

## 📍 Où Voir Vos Articles

### Sur le Site Next.js
- **Page Blog** : http://localhost:3001/blog
- **Article individuel** : http://localhost:3001/blog/[slug-article]

### Exemple
Si vous publiez un article avec le slug "mon-nouvel-article", il sera accessible à :
http://localhost:3001/blog/mon-nouvel-article

## 🛠️ Fonctionnalités Disponibles

### ✅ Déjà Configuré
- [x] Récupération automatique des articles
- [x] Affichage des métadonnées (auteur, date, catégorie)
- [x] Images mises en avant
- [x] SEO optimisé
- [x] Cache intelligent
- [x] Gestion des erreurs

### 📋 Données Récupérées
- Titre de l'article
- Contenu complet (HTML)
- Extrait/résumé
- Auteur
- Date de publication
- Catégorie
- Image mise en avant
- Tags
- Métadonnées SEO

## 🔧 Configuration Avancée

### Variables d'Environnement
Créez un fichier `.env.local` avec :
```env
WORDPRESS_API_URL=http://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2
WORDPRESS_SITE_URL=http://cmsmonappareildemagge.monappareildemassage.com
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### Personnalisation du Cache
Modifiez la valeur `revalidate` dans les fichiers API pour changer la fréquence de mise à jour :
```javascript
next: { revalidate: 300 } // 5 minutes
```

## 🚀 Déploiement en Production

### 1. Configuration du Domaine
1. Mettez à jour `NEXT_PUBLIC_SITE_URL` avec votre domaine de production
2. Configurez HTTPS pour votre WordPress (recommandé)

### 2. Optimisations
- Activez la compression Gzip sur votre serveur
- Configurez un CDN pour les images
- Optimisez les images WordPress

## 🐛 Dépannage

### Problèmes Courants

#### Articles ne s'affichent pas
1. Vérifiez que l'article est publié dans WordPress
2. Vérifiez la connexion à l'API : http://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2/posts
3. Vérifiez les logs du serveur Next.js

#### Erreurs de connexion
1. Vérifiez que votre WordPress est accessible
2. Vérifiez les paramètres CORS si nécessaire
3. Vérifiez les certificats SSL

#### Images ne s'affichent pas
1. Vérifiez que l'image mise en avant est définie dans WordPress
2. Vérifiez les permissions des fichiers média

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans la console du navigateur
2. Vérifiez les logs du serveur Next.js
3. Testez l'API WordPress directement

## 🎉 Félicitations !

Votre intégration WordPress headless CMS est maintenant opérationnelle. Vous pouvez publier des articles sur WordPress et ils apparaîtront automatiquement sur votre site Next.js !

