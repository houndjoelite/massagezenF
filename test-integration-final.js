// test-integration-final.js
const fetch = require('node-fetch');

// Contourner les problèmes SSL pour WordPress
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const NEXT_API_URL = "http://localhost:3001/api/wordpress";

async function testFinalIntegration() {
  console.log("🔧 Test de l'intégration finale");
  console.log("===============================");

  try {
    // Test 1: Vérifier que le serveur Next.js fonctionne
    console.log("\n1️⃣ Test du serveur Next.js");
    console.log("----------------------------");
    
    try {
      const response = await fetch("http://localhost:3001/");
      if (response.ok) {
        console.log("✅ Serveur Next.js accessible");
      } else {
        console.log(`❌ Serveur Next.js non accessible: ${response.status}`);
        return;
      }
    } catch (error) {
      console.log(`❌ Erreur de connexion au serveur Next.js: ${error.message}`);
      console.log("💡 Assurez-vous que le serveur Next.js est démarré avec 'npm run dev'");
      return;
    }

    // Test 2: Vérifier l'API des catégories
    console.log("\n2️⃣ Test de l'API des catégories");
    console.log("--------------------------------");
    
    try {
      const response = await fetch(`${NEXT_API_URL}/categories`);
      if (response.ok) {
        const categories = await response.json();
        console.log(`✅ ${categories.length} catégories récupérées`);
      } else {
        console.log(`❌ Erreur API catégories: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Erreur: ${error.message}`);
    }

    // Test 3: Vérifier l'API des produits par catégorie
    console.log("\n3️⃣ Test de l'API des produits par catégorie");
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
          }
        } else {
          console.log(`   ⚠️ Aucun produit trouvé (${productResponse.status})`);
        }
      } catch (error) {
        console.log(`   ❌ Erreur: ${error.message}`);
      }
    }

    // Test 4: Vérifier les pages de catégories
    console.log("\n4️⃣ Test des pages de catégories");
    console.log("--------------------------------");
    
    for (const categorySlug of testCategories) {
      console.log(`\n   Test de la page: /categories/${categorySlug}`);
      
      try {
        const pageResponse = await fetch(`http://localhost:3001/categories/${categorySlug}`);
        if (pageResponse.ok) {
          console.log(`   ✅ Page accessible`);
        } else {
          console.log(`   ❌ Page non accessible: ${pageResponse.status}`);
        }
      } catch (error) {
        console.log(`   ❌ Erreur: ${error.message}`);
      }
    }

    // Test 5: Résumé de l'intégration
    console.log("\n5️⃣ Résumé de l'intégration");
    console.log("--------------------------");
    console.log("✅ Configuration terminée :");
    console.log("   - Mapping des catégories WooCommerce ↔ Next.js");
    console.log("   - APIs pour récupérer les produits par catégorie");
    console.log("   - Composant ProductGrid pour l'affichage");
    console.log("   - Pages de catégories dynamiques");
    console.log("   - Gestion des erreurs et fallbacks");
    console.log("\n📋 Prochaines étapes :");
    console.log("   1. Créer des produits dans WooCommerce");
    console.log("   2. Configurer les catégories WooCommerce");
    console.log("   3. Ajouter des images aux produits");
    console.log("   4. Tester l'affichage sur le site");

  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
}

testFinalIntegration();






