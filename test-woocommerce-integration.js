// test-woocommerce-integration.js
const fetch = require('node-fetch');

// Contourner les problèmes SSL pour WordPress
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const WORDPRESS_API_URL = "https://cmsmonappareildemagge.monappareildemassage.com/wp-json";
const NEXT_API_URL = "http://localhost:3001/api/wordpress";

async function testWooCommerceIntegration() {
  console.log("🛍️ Test de l'intégration WooCommerce");
  console.log("====================================");

  try {
    // Test 1: Vérifier l'API WooCommerce de base
    console.log("\n1️⃣ Test de l'API WooCommerce de base");
    console.log("------------------------------------");
    
    try {
      const productsResponse = await fetch(`${WORDPRESS_API_URL}/wc/v3/products?per_page=5`);
      if (productsResponse.ok) {
        const products = await productsResponse.json();
        console.log(`✅ ${products.length} produits WooCommerce trouvés`);
        
        if (products.length > 0) {
          const product = products[0];
          console.log(`📦 Premier produit: ${product.name}`);
          console.log(`💰 Prix: ${product.price}€`);
          console.log(`📊 Stock: ${product.stock_status}`);
          console.log(`🏷️ Catégories: ${product.categories?.map(c => c.name).join(', ') || 'Aucune'}`);
        }
      } else {
        console.log(`❌ Erreur API WooCommerce: ${productsResponse.status}`);
        console.log("💡 Vérifiez que WooCommerce est installé et configuré");
      }
    } catch (error) {
      console.log(`❌ Erreur de connexion: ${error.message}`);
    }

    // Test 2: Vérifier les catégories WooCommerce
    console.log("\n2️⃣ Test des catégories WooCommerce");
    console.log("----------------------------------");
    
    try {
      const categoriesResponse = await fetch(`${WORDPRESS_API_URL}/wc/v3/products/categories`);
      if (categoriesResponse.ok) {
        const categories = await categoriesResponse.json();
        console.log(`✅ ${categories.length} catégories WooCommerce trouvées`);
        
        // Vérifier les catégories spécifiques
        const expectedCategories = [
          "massage-pour-le-dos-et-la-nuque",
          "pistolets-de-massage-musculaire",
          "massage-des-pieds",
          "massage-des-mains",
          "massage-de-la-tete-et-cuir-chevelu",
          "fauteuils-de-massage",
          "coussinets-et-ceintures-de-massage",
          "appareils-de-pressotherapie",
          "appareils-de-massage-pour-les-jambes-et-mollets",
          "appareils-de-massage-oculaires",
          "appareils-de-massage-multifonctions"
        ];

        console.log("\n📋 Vérification des catégories attendues:");
        expectedCategories.forEach(expectedSlug => {
          const category = categories.find(c => c.slug === expectedSlug);
          if (category) {
            console.log(`   ✅ ${category.name} (ID: ${category.id})`);
          } else {
            console.log(`   ❌ ${expectedSlug} - Non trouvée`);
          }
        });
      } else {
        console.log(`❌ Erreur API catégories: ${categoriesResponse.status}`);
      }
    } catch (error) {
      console.log(`❌ Erreur de connexion: ${error.message}`);
    }

    // Test 3: Vérifier l'API Next.js pour les produits
    console.log("\n3️⃣ Test de l'API Next.js pour les produits");
    console.log("------------------------------------------");
    
    const testCategories = ['dos-nuque', 'pistolets-massage', 'pieds'];
    
    for (const categorySlug of testCategories) {
      console.log(`\n   Test de la catégorie: ${categorySlug}`);
      
      try {
        const productResponse = await fetch(`${NEXT_API_URL}/products/category/${categorySlug}?limit=3`);
        if (productResponse.ok) {
          const products = await productResponse.json();
          console.log(`   ✅ ${products.length} produits récupérés`);
          
          if (products.length > 0) {
            const product = products[0];
            console.log(`   📦 Premier produit: ${product.title}`);
            console.log(`   💰 Prix: ${product.price}€`);
            console.log(`   🏷️ Marque: ${product.brand || 'Non définie'}`);
            console.log(`   ⭐ Note: ${product.rating}/5`);
          }
        } else {
          console.log(`   ⚠️ Aucun produit trouvé (${productResponse.status})`);
        }
      } catch (error) {
        console.log(`   ❌ Erreur: ${error.message}`);
      }
    }

    // Test 4: Vérifier l'API des produits individuels
    console.log("\n4️⃣ Test de l'API des produits individuels");
    console.log("----------------------------------------");
    
    try {
      const productResponse = await fetch(`${NEXT_API_URL}/products/test-produit`);
      if (productResponse.ok) {
        const product = await productResponse.json();
        console.log(`✅ Produit individuel récupéré: ${product.title}`);
        console.log(`   💰 Prix: ${product.price}€`);
        console.log(`   🏷️ Marque: ${product.brand}`);
      } else {
        console.log(`⚠️ Produit individuel non trouvé (${productResponse.status})`);
      }
    } catch (error) {
      console.log(`❌ Erreur: ${error.message}`);
    }

    // Test 5: Instructions de configuration
    console.log("\n5️⃣ Instructions de configuration");
    console.log("----------------------------------");
    console.log("Pour que l'intégration WooCommerce fonctionne :");
    console.log("1. Vérifiez que WooCommerce est installé et activé");
    console.log("2. Créez des produits dans les catégories appropriées");
    console.log("3. Configurez les attributs de produits (Marque, Modèle, etc.)");
    console.log("4. Ajoutez des images aux produits");
    console.log("5. Configurez les prix et le stock");
    console.log("6. Testez l'API REST WooCommerce");
    console.log("\nConsultez le fichier GUIDE-WOOCOMMERCE-INTEGRATION.md pour plus de détails");

  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
}

testWooCommerceIntegration();






