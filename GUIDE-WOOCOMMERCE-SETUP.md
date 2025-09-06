# Guide de Configuration WooCommerce pour MassageZen

## 🔍 Diagnostic Actuel

✅ **WordPress** : Fonctionne (HTTP)  
❌ **WooCommerce API** : Erreur 401 (Authentification requise)  
❌ **Produits** : Non accessibles publiquement  

## 🛠️ Configuration Requise

### 1. Activer l'API REST WooCommerce Publique

#### Option A: Via l'Administration WordPress
1. **Connectez-vous** à votre WordPress : http://cmsmonappareildemagge.monappareildemassage.com/wp-admin
2. Allez dans **WooCommerce** > **Réglages** > **Avancé** > **API REST**
3. **Activez** l'API REST
4. **Cochez** "Permettre l'accès public aux données de l'API REST"
5. **Sauvegardez** les modifications

#### Option B: Via le Code (Recommandé)
Ajoutez ce code dans le fichier `functions.php` de votre thème :

```php
// Activer l'API REST WooCommerce pour l'accès public
add_filter('woocommerce_rest_check_permissions', function($permission, $context, $object_id, $post_type) {
    // Permettre l'accès en lecture seule aux produits et catégories
    if (in_array($context, ['read', 'read_product', 'read_products'])) {
        return true;
    }
    return $permission;
}, 10, 4);

// Permettre l'accès public aux catégories de produits
add_filter('woocommerce_rest_product_cat_query', function($args) {
    $args['hide_empty'] = false;
    return $args;
});
```

### 2. Vérifier les Permalinks
1. Allez dans **Réglages** > **Permaliens**
2. **Sélectionnez** "Nom de l'article" ou "Structure personnalisée"
3. **Sauvegardez** les modifications

### 3. Tester la Configuration
Après la configuration, testez ces URLs :

**Catégories :**
- http://cmsmonappareildemagge.monappareildemassage.com/wp-json/wc/v3/products/categories
- http://cmsmonappareildemagge.monappareildemassage.com/wp-json/wc/v2/products/categories

**Produits :**
- http://cmsmonappareildemagge.monappareildemassage.com/wp-json/wc/v3/products
- http://cmsmonappareildemagge.monappareildemassage.com/wp-json/wc/v2/products

## 🔧 Configuration Alternative (Si WooCommerce API ne fonctionne pas)

Si l'API WooCommerce reste inaccessible, nous pouvons utiliser une approche alternative :

### 1. Plugin "WooCommerce REST API"
Installez le plugin "WooCommerce REST API" depuis le répertoire WordPress

### 2. Configuration des Permissions
1. Allez dans **WooCommerce** > **Réglages** > **Avancé** > **API REST**
2. **Créez une clé API** avec les permissions :
   - ✅ Lecture
   - ❌ Écriture
3. **Notez** la clé de consommation

### 3. Utilisation de la Clé API
Nous devrons modifier notre code pour utiliser l'authentification par clé API.

## 📋 Étapes Suivantes

1. **Configurez** l'API WooCommerce selon l'une des options ci-dessus
2. **Testez** l'accès aux catégories et produits
3. **Informez-moi** du résultat pour que je puisse ajuster le code

## 🎯 Objectif

Une fois configuré, vous pourrez :
- ✅ Voir les catégories de produits sur votre site
- ✅ Afficher les produits de chaque catégorie
- ✅ Synchroniser automatiquement avec WordPress

## 🆘 Support

Si vous rencontrez des difficultés :
1. Vérifiez que WooCommerce est bien installé et activé
2. Vérifiez les permissions de l'utilisateur administrateur
3. Testez avec un plugin de test d'API REST
4. Contactez-moi avec les messages d'erreur spécifiques

