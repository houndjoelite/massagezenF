// Test script pour vérifier les catégories WordPress
const https = require('https');

// Désactiver la vérification SSL pour les tests
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

async function testWordPressCategories() {
  console.log("🧪 Test des catégories WordPress...\n");

  const WORDPRESS_API_URL = "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2";

  try {
    // Test des catégories de produits WooCommerce
    console.log("📋 Récupération des catégories de produits...");
    const categoriesResponse = await fetch(`${WORDPRESS_API_URL}/product_cat`);
    
    if (!categoriesResponse.ok) {
      throw new Error(`Erreur HTTP: ${categoriesResponse.status} - ${categoriesResponse.statusText}`);
    }

    const categories = await categoriesResponse.json();
    console.log(`✅ ${categories.length} catégories trouvées:`);
    
    categories.forEach((category, index) => {
      console.log(`\n${index + 1}. ${category.name} (${category.slug})`);
      console.log(`   ID: ${category.id}`);
      console.log(`   Nombre de produits: ${category.count}`);
    });

    // Test des produits
    console.log("\n📦 Récupération des produits...");
    const productsResponse = await fetch(`${WORDPRESS_API_URL}/products?per_page=5`);
    
    if (!productsResponse.ok) {
      throw new Error(`Erreur HTTP: ${productsResponse.status} - ${productsResponse.statusText}`);
    }

    const products = await productsResponse.json();
    console.log(`✅ ${products.length} produits trouvés:`);
    
    products.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.title.rendered}`);
      console.log(`   Slug: ${product.slug}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Catégories: ${product.categories ? product.categories.join(', ') : 'Aucune'}`);
    });

    console.log("\n🎯 Test terminé avec succès !");
    
  } catch (error) {
    console.error("❌ Erreur lors du test:", error.message);
  }
}

testWordPressCategories();



