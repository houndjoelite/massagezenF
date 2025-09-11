# 🚀 Guide de Déploiement - MassageZen

## Problèmes Résolus

### ✅ **Articles ne s'affichent pas en production**
- **Cause** : URLs incorrectes et variables d'environnement manquantes
- **Solution** : Configuration robuste des URLs et gestion d'erreurs améliorée

### ✅ **Pages dynamiques [slug] optimisées**
- **Cause** : Rendu statique non configuré
- **Solution** : `generateStaticParams` et `dynamic = 'force-dynamic'`

### ✅ **Gestion d'erreurs insuffisante**
- **Cause** : Erreurs silencieuses en production
- **Solution** : Logging détaillé et composant de débogage

## 🔧 Configuration Vercel

### 1. Variables d'Environnement

Dans les paramètres Vercel, ajoutez ces variables :

```env
NEXT_PUBLIC_SITE_URL=https://massagezen-f.vercel.app
NEXT_PUBLIC_WORDPRESS_URL=https://cmsmonappareildemagge.monappareildemassage.com
WORDPRESS_API_URL=https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2
```

### 2. Configuration du Build

Le fichier `vercel.json` est déjà configuré avec :
- Timeout de 30s pour les API
- Headers CORS
- Variables d'environnement

### 3. Configuration Next.js

Le fichier `next.config.mjs` inclut :
- Patterns d'images pour WordPress
- Headers CORS
- Configuration pour les pages dynamiques

## 🐛 Débogage en Production

### Activer le Mode Debug

Pour activer les informations de débogage en production :

```env
NEXT_PUBLIC_DEBUG=true
```

### Vérifier les Logs

1. **Logs Vercel** : Dashboard → Functions → Logs
2. **Console du navigateur** : F12 → Console
3. **Composant DebugInfo** : Affiché en bas des pages d'erreur

### Tests des URLs

Testez ces URLs directement :

```bash
# API Articles
https://massagezen-f.vercel.app/api/wordpress/posts/test-article

# API Produits  
https://massagezen-f.vercel.app/api/wordpress/products/test-product

# WordPress Direct
https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2/posts?slug=test-article
```

## 📋 Checklist de Déploiement

### Avant le Déploiement
- [ ] Variables d'environnement configurées
- [ ] Tests locaux réussis
- [ ] Articles WordPress publiés
- [ ] Images WordPress accessibles

### Après le Déploiement
- [ ] Test des pages d'articles
- [ ] Test des pages de produits
- [ ] Test des pages de catégories
- [ ] Vérification des métadonnées SEO
- [ ] Test des images

### En Cas de Problème
- [ ] Vérifier les logs Vercel
- [ ] Activer NEXT_PUBLIC_DEBUG=true
- [ ] Tester les URLs API directement
- [ ] Vérifier la connectivité WordPress

## 🔍 Diagnostic des Problèmes

### Article "Non trouvé" mais existe dans WordPress

1. **Vérifier le slug** : Doit correspondre exactement
2. **Vérifier le statut** : Article doit être "publié"
3. **Vérifier les permissions** : API WordPress accessible
4. **Vérifier les logs** : Erreurs dans la console

### Images ne s'affichent pas

1. **Vérifier les permissions** : Fichiers WordPress accessibles
2. **Vérifier les URLs** : Images dans le bon domaine
3. **Vérifier Next.js** : Configuration `remotePatterns`

### Erreurs 500

1. **Vérifier les logs** : Détails de l'erreur
2. **Vérifier la connectivité** : WordPress accessible
3. **Vérifier les timeouts** : Fonctions Vercel

## 🎯 Optimisations Implémentées

### Performance
- ✅ Cache `no-store` pour données fraîches
- ✅ `generateStaticParams` pour pré-génération
- ✅ Headers optimisés
- ✅ Images optimisées

### Fiabilité
- ✅ Gestion d'erreurs robuste
- ✅ Fallbacks multiples
- ✅ Logging détaillé
- ✅ Debug en production

### SEO
- ✅ Métadonnées dynamiques
- ✅ Open Graph optimisé
- ✅ URLs canoniques
- ✅ Structure sémantique

## 📞 Support

En cas de problème :

1. **Vérifiez les logs** Vercel
2. **Activez le debug** avec `NEXT_PUBLIC_DEBUG=true`
3. **Testez les URLs** API directement
4. **Vérifiez WordPress** : articles publiés et accessibles

Le site est maintenant optimisé pour la production ! 🎉
