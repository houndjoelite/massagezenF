# Guide Configuration WooCommerce - MassageZen

## 🛍️ Configuration des Produits WooCommerce

### 1. Configuration de Base

Votre WordPress avec WooCommerce est déjà configuré avec les catégories suivantes :
- `massage-pour-le-dos-et-la-nuque`
- `pistolets-de-massage-musculaire`
- `massage-des-pieds`
- `massage-des-mains`
- `massage-de-la-tete-et-cuir-chevelu`
- `fauteuils-de-massage`
- `coussinets-et-ceintures-de-massage`
- `appareils-de-pressotherapie`
- `appareils-de-massage-pour-les-jambes-et-mollets`
- `appareils-de-massage-oculaires`
- `appareils-de-massage-multifonctions`

### 2. Configuration des Attributs de Produits

#### Attributs recommandés :
1. **Marque** (`pa_marque`)
   - Type : Liste de sélection
   - Visible sur la page du produit : ✅
   - Utilisé pour les variations : ❌

2. **Modèle** (`pa_modele`)
   - Type : Liste de sélection
   - Visible sur la page du produit : ✅
   - Utilisé pour les variations : ❌

3. **Puissance** (`pa_puissance`)
   - Type : Liste de sélection
   - Visible sur la page du produit : ✅

4. **Poids** (`pa_poids`)
   - Type : Liste de sélection
   - Visible sur la page du produit : ✅

5. **Autonomie** (`pa_autonomie`)
   - Type : Liste de sélection
   - Visible sur la page du produit : ✅

### 3. Configuration des Champs Personnalisés

#### Via WooCommerce → Produits → Attributs :

1. **Marque** :
   - Nom : `marque`
   - Slug : `pa_marque`
   - Type : Liste de sélection
   - Valeurs : Theragun, Hyperice, Renpho, etc.

2. **Modèle** :
   - Nom : `modele`
   - Slug : `pa_modele`
   - Type : Liste de sélection

### 4. Structure d'un Produit WooCommerce

#### Exemple de produit :

**Nom** : "Pistolet de Massage Theragun Elite"
**Description courte** : "Pistolet de massage professionnel avec 5 vitesses"
**Description** : Description détaillée du produit
**Image principale** : Photo du produit
**Galerie d'images** : Photos supplémentaires
**Catégorie** : Pistolet de massage musculaire

**Données du produit** :
- Prix : 299€
- Prix barré : 399€
- Statut du stock : En stock
- Gestion du stock : ✅
- Stock : 50
- Produit en vedette : ✅

**Attributs** :
- Marque : Theragun
- Modèle : Elite
- Puissance : 30W
- Poids : 1.3kg
- Autonomie : 2h

### 5. URLs des Produits

Les produits seront accessibles via :
- **WooCommerce** : `https://cmsmonappareildemagge.monappareildemassage.com/produit/nom-du-produit/`
- **Next.js** : `https://monappareildemassage.com/produits/nom-du-produit/`

### 6. API Endpoints WooCommerce

- **Tous les produits** : `/wp-json/wc/v3/products`
- **Produit par ID** : `/wp-json/wc/v3/products/{id}`
- **Produits par catégorie** : `/wp-json/wc/v3/products?category={category_id}`
- **Catégories** : `/wp-json/wc/v3/products/categories`

### 7. Configuration REST API

#### Dans WooCommerce → Paramètres → Avancé → REST API :

1. Créer une clé API :
   - Description : "Next.js Integration"
   - Utilisateur : Admin
   - Permissions : Lecture/Écriture

2. Noter la clé API et le secret

#### Dans votre fichier `.env.local` :
```
WOOCOMMERCE_CONSUMER_KEY=votre_cle_api
WOOCOMMERCE_CONSUMER_SECRET=votre_secret
```

### 8. Configuration CORS

#### Ajouter dans functions.php :
```php
// Activer CORS pour WooCommerce API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});
```

### 9. Champs Personnalisés pour Liens Externes

#### Via WooCommerce → Produits → Champs personnalisés :

1. **Lien Amazon** (`_amazon_url`)
2. **Lien Cdiscount** (`_cdiscount_url`)
3. **Lien Fnac** (`_fnac_url`)

### 10. Configuration SEO

#### Via Yoast SEO :
1. Activer Yoast SEO pour WooCommerce
2. Configurer les templates de produits
3. Ajouter des mots-clés spécifiques par catégorie

### 11. Test de l'Intégration

#### Vérifier que l'API fonctionne :
```bash
curl "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wc/v3/products?per_page=5"
```

#### Vérifier les catégories :
```bash
curl "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wc/v3/products/categories"
```

### 12. Prochaines Étapes

1. ✅ Créer les attributs de produits
2. ✅ Ajouter quelques produits de test
3. ✅ Configurer les champs personnalisés
4. ✅ Tester l'API REST
5. ✅ Vérifier l'intégration Next.js

### 13. Exemple de Produit Complet

#### Pistolet de Massage Theragun Elite :

**Informations de base** :
- Nom : Pistolet de Massage Theragun Elite
- Prix : 299€
- Prix barré : 399€
- Stock : 50
- Catégorie : Pistolet de massage musculaire

**Attributs** :
- Marque : Theragun
- Modèle : Elite
- Puissance : 30W
- Poids : 1.3kg
- Autonomie : 2h

**Champs personnalisés** :
- Lien Amazon : https://amazon.fr/...
- Lien Cdiscount : https://cdiscount.com/...
- Lien Fnac : https://fnac.com/...

**SEO** :
- Titre : "Pistolet de Massage Theragun Elite - Meilleur Prix 2024"
- Description : "Découvrez le pistolet de massage Theragun Elite..."

Une fois configuré, les produits apparaîtront automatiquement dans les bonnes catégories de votre site Next.js !






