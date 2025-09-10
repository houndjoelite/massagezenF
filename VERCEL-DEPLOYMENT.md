# Configuration Vercel - MassageZen

## Variables d'environnement requises

Pour que votre application fonctionne correctement sur Vercel, vous devez configurer les variables d'environnement suivantes :

### 1. Dans le dashboard Vercel

Allez dans votre projet Vercel → Settings → Environment Variables et ajoutez :

```
NEXT_PUBLIC_SITE_URL = https://votre-domaine.vercel.app
```

### 2. Configuration automatique

Le code a été mis à jour pour utiliser automatiquement `process.env.VERCEL_URL` quand disponible, ce qui devrait résoudre le problème de routage des articles.

## Problèmes résolus

### ✅ Routage des articles sur Vercel
- Correction de l'URL de base pour les appels API côté serveur
- Utilisation de `process.env.VERCEL_URL` en priorité
- Fallback vers `NEXT_PUBLIC_SITE_URL` ou localhost

### ✅ Style des articles WordPress
- Création du composant `WordPressContent` pour un meilleur rendu
- Nettoyage automatique des classes WordPress problématiques
- Stylisation cohérente des titres, paragraphes, images, listes, etc.
- Suppression des éléments vides et des attributs inutiles

### ✅ Parsing du contenu WordPress
- Fonction `cleanWordPressContent` pour nettoyer le HTML
- Suppression des classes WordPress par défaut
- Nettoyage des attributs data-* et id
- Suppression des scripts et styles inline

### ✅ Gestion d'erreurs améliorée
- Validation des slugs
- Messages d'erreur plus détaillés
- Logging amélioré pour le debugging

## Déploiement

1. Poussez vos changements sur GitHub
2. Vercel redéploiera automatiquement
3. Vérifiez que les articles s'ouvrent correctement
4. Testez le style des articles

## Test local

Pour tester en local :
```bash
npm run dev
```

Les articles devraient maintenant s'afficher avec un style propre et cohérent.

## Support

Si vous rencontrez encore des problèmes :
1. Vérifiez les logs Vercel dans le dashboard
2. Testez l'API directement : `https://votre-domaine.vercel.app/api/wordpress/posts/[slug]`
3. Vérifiez que votre WordPress est accessible depuis Vercel
