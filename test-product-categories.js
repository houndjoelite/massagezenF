// Test script pour vérifier les catégories des produits
const https = require('https');

// Désactiver la vérification SSL pour les tests
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

async function testProductCategories() {
  console.log("🧪 Test des catégories des produits...\n");

  const WORDPRESS_API_URL = "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2";

  try {
    // Récupérer tous les produits
    console.log("📦 Récupération des produits...");
    const productsResponse = await fetch(`${WORDPRESS_API_URL}/posts?type=product&per_page=10&_embed`);
    
    if (!productsResponse.ok) {
      console.log(`❌ Erreur: ${productsResponse.status}`);
      return;
    }

    const products = await productsResponse.json();
    console.log(`✅ ${products.length} produits trouvés:\n`);

    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title.rendered}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Slug: ${product.slug}`);
      console.log(`   Catégories: ${product.categories ? product.categories.join(', ') : 'Aucune'}`);
      console.log(`   Tags: ${product.tags ? product.tags.join(', ') : 'Aucun'}`);
      
      // Récupérer les détails des catégories
      if (product.categories && product.categories.length > 0) {
        console.log(`   Détails des catégories:`);
        product.categories.forEach(catId => {
          console.log(`     - ID ${catId}`);
        });
      }
      console.log('');
    });

    // Récupérer les catégories de produits
    console.log("📋 Récupération des catégories de produits...");
    const categoriesResponse = await fetch(`${WORDPRESS_API_URL}/product_cat`);
    
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      console.log(`✅ ${categories.length} catégories trouvées:\n`);
      
      categories.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name} (${category.slug})`);
        console.log(`   ID: ${category.id}`);
        console.log(`   Nombre de produits: ${category.count}`);
        console.log('');
      });
    }

    console.log("🎯 Test terminé !");
    
  } catch (error) {
    console.error("❌ Erreur lors du test:", error.message);
  }
}

testProductCategories();



