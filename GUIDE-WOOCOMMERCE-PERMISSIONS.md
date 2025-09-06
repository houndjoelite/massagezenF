# Guide de Configuration des Permissions WooCommerce

## 🎉 Bonne Nouvelle !

Votre API Next.js fonctionne et récupère déjà des produits de WordPress ! J'ai vu :
- **Produit récupéré** : "Appareil de massage générique"
- **Catégorie** : "Appareils de massage multifonctions"
- **API Next.js** : ✅ Fonctionnelle

## 🔧 Configuration des Permissions des Clés API

Le problème d'authentification (401) vient des permissions des clés API. Voici comment le résoudre :

### 1. Vérifier les Permissions des Clés API

1. **Connectez-vous** à votre WordPress : http://cmsmonappareildemagge.monappareildemassage.com/wp-admin
2. Allez dans **WooCommerce** > **Réglages** > **Avancé** > **API REST**
3. **Trouvez** votre clé API (ck_ca4996b8210d0bde22094b13e9f7d569eee93394)
4. **Cliquez** sur "Modifier" ou "Edit"

### 2. Configurer les Permissions

Assurez-vous que les permissions suivantes sont **COCHÉES** :
- ✅ **Lecture** (Read)
- ❌ **Écriture** (Write) - Pas nécessaire pour notre usage
- ✅ **Lire les produits** (Read products)
- ✅ **Lire les catégories** (Read product categories)

### 3. Vérifier l'Utilisateur

1. Dans la section **Utilisateur**, assurez-vous que l'utilisateur a les rôles :
   - **Administrateur** ou
   - **Gestionnaire de boutique** (Shop Manager)

### 4. Alternative : Créer une Nouvelle Clé API

Si le problème persiste, créez une nouvelle clé :

1. **Supprimez** l'ancienne clé
2. **Cliquez** sur "Ajouter une clé"
3. **Description** : "MassageZen API"
4. **Utilisateur** : Votre compte administrateur
5. **Permissions** : **Lecture** uniquement
6. **Générez** la clé
7. **Copiez** les nouvelles clés

## 🧪 Test de la Configuration

Une fois configuré, testez avec ce script :

```bash
node test-woocommerce-auth.js
```

Vous devriez voir :
- ✅ Catégories récupérées
- ✅ Produits récupérés
- ✅ Catégorie multifonctions trouvée

## 🎯 Résultat Attendu

Après la configuration, vous devriez voir :
- **Catégories** : Liste des catégories WooCommerce
- **Produits** : Produits de la catégorie multifonctions
- **API Next.js** : Produits réels au lieu des données de test

## 🆘 Dépannage

### Erreur 401 Persistante
1. Vérifiez que WooCommerce est activé
2. Vérifiez que l'API REST est activée
3. Vérifiez les permissions de l'utilisateur
4. Essayez de créer une nouvelle clé API

### Erreur 403 Forbidden
1. Vérifiez les permissions de la clé API
2. Vérifiez que l'utilisateur a les bons rôles

### Erreur 404 Not Found
1. Vérifiez que les permalinks sont configurés
2. Vérifiez que WooCommerce est installé

## 📞 Support

Si vous rencontrez des difficultés :
1. Vérifiez les logs WordPress
2. Testez avec un client API comme Postman
3. Contactez-moi avec les messages d'erreur spécifiques

## 🎉 Prochaines Étapes

Une fois l'authentification configurée :
1. ✅ Les produits WooCommerce s'afficheront automatiquement
2. ✅ Les catégories seront synchronisées
3. ✅ Vous pourrez ajouter des produits dans WordPress
4. ✅ Ils apparaîtront immédiatement sur votre site Next.js

