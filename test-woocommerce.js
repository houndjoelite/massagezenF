// Test script pour vérifier l'API WooCommerce
const https = require('https');

// Désactiver la vérification SSL pour les tests
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

async function testWooCommerceAPI() {
  console.log("🧪 Test de l'API WooCommerce...\n");

  const WOOCOMMERCE_API_URL = "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wc/v3";

  try {
    // Test des produits WooCommerce
    console.log("📦 Récupération des produits WooCommerce...");
    const productsResponse = await fetch(`${WOOCOMMERCE_API_URL}/products?per_page=5`);
    
    if (!productsResponse.ok) {
      const errorText = await productsResponse.text();
      console.log(`❌ Erreur HTTP: ${productsResponse.status} - ${productsResponse.statusText}`);
      console.log(`Détails: ${errorText}`);
      return;
    }

    const products = await productsResponse.json();
    console.log(`✅ ${products.length} produits trouvés:`);
    
    products.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   Slug: ${product.slug}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Prix: ${product.price}€`);
      console.log(`   Stock: ${product.stock_status}`);
      console.log(`   Catégories: ${product.categories ? product.categories.map(c => c.name).join(', ') : 'Aucune'}`);
      console.log(`   Images: ${product.images ? product.images.length : 0}`);
    });

    // Test des catégories WooCommerce
    console.log("\n📋 Récupération des catégories WooCommerce...");
    const categoriesResponse = await fetch(`${WOOCOMMERCE_API_URL}/products/categories`);
    
    if (!categoriesResponse.ok) {
      const errorText = await categoriesResponse.text();
      console.log(`❌ Erreur HTTP: ${categoriesResponse.status} - ${categoriesResponse.statusText}`);
      console.log(`Détails: ${errorText}`);
      return;
    }

    const categories = await categoriesResponse.json();
    console.log(`✅ ${categories.length} catégories trouvées:`);
    
    categories.forEach((category, index) => {
      console.log(`\n${index + 1}. ${category.name} (${category.slug})`);
      console.log(`   ID: ${category.id}`);
      console.log(`   Nombre de produits: ${category.count}`);
    });

    console.log("\n🎯 Test terminé avec succès !");
    
  } catch (error) {
    console.error("❌ Erreur lors du test:", error.message);
  }
}

testWooCommerceAPI();



