# Guide de Configuration des Permissions Utilisateur WooCommerce

## 🔍 Problème Identifié

L'erreur `woocommerce_rest_cannot_view` indique que l'utilisateur associé à la clé API n'a pas les permissions nécessaires pour accéder aux ressources WooCommerce.

## 🛠️ Solution : Configurer les Permissions Utilisateur

### 1. Vérifier le Rôle de l'Utilisateur

1. **Connectez-vous** à WordPress : http://cmsmonappareildemagge.monappareildemassage.com/wp-admin
2. Allez dans **Utilisateurs** > **Tous les utilisateurs**
3. **Trouvez** l'utilisateur associé à votre clé API
4. **Vérifiez** son rôle

### 2. Rôles Requis

L'utilisateur doit avoir l'un de ces rôles :
- ✅ **Administrateur** (Administrator)
- ✅ **Gestionnaire de boutique** (Shop Manager)

### 3. Si l'utilisateur n'a pas le bon rôle

#### Option A: Changer le rôle
1. **Cliquez** sur "Modifier" à côté de l'utilisateur
2. **Sélectionnez** "Administrateur" ou "Gestionnaire de boutique"
3. **Mettez à jour** l'utilisateur

#### Option B: Créer une nouvelle clé API
1. Allez dans **WooCommerce** > **Réglages** > **Avancé** > **API REST**
2. **Supprimez** l'ancienne clé
3. **Cliquez** sur "Ajouter une clé"
4. **Description** : "MassageZen API"
5. **Utilisateur** : Sélectionnez un utilisateur **Administrateur**
6. **Permissions** : **Lecture** uniquement
7. **Générez** la clé

### 4. Vérifier les Permissions WooCommerce

1. Allez dans **WooCommerce** > **Réglages** > **Avancé** > **API REST**
2. **Vérifiez** que l'API REST est activée
3. **Cochez** "Permettre l'accès public aux données de l'API REST" (optionnel mais recommandé)

### 5. Alternative : Plugin de Permissions

Si le problème persiste, installez un plugin de gestion des permissions :

1. Allez dans **Extensions** > **Ajouter**
2. **Recherchez** "User Role Editor" ou "Members"
3. **Installez** et **activez** le plugin
4. **Configurez** les permissions WooCommerce pour l'utilisateur

## 🧪 Test de la Configuration

Une fois configuré, testez avec :

```bash
node test-new-woocommerce-keys.js
```

Vous devriez voir :
- ✅ Catégories récupérées
- ✅ Produits récupérés
- ✅ Pas d'erreur 401

## 🔧 Configuration Alternative

Si vous ne pouvez pas modifier les permissions, nous pouvons utiliser une approche différente :

### 1. Utiliser l'API WordPress Standard
Au lieu de l'API WooCommerce, utiliser l'API WordPress standard pour les produits.

### 2. Configuration des Permalinks
1. Allez dans **Réglages** > **Permaliens**
2. **Sélectionnez** "Nom de l'article"
3. **Sauvegardez** les modifications

### 3. Plugin WooCommerce REST API
Installez le plugin "WooCommerce REST API" depuis le répertoire WordPress.

## 📞 Support

Si vous rencontrez des difficultés :
1. Vérifiez les logs WordPress
2. Testez avec un client API comme Postman
3. Contactez-moi avec les détails de l'erreur

## 🎯 Résultat Attendu

Une fois configuré correctement :
- ✅ L'API WooCommerce sera accessible
- ✅ Les produits s'afficheront automatiquement
- ✅ Les catégories seront synchronisées
- ✅ Votre site Next.js sera entièrement fonctionnel

