// Test script pour vérifier l'API des produits par catégorie
const https = require('https');

// Désactiver la vérification SSL pour les tests
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

async function testFeaturedProductsAPI() {
  console.log("🧪 Test de l'API des produits par catégorie...\n");

  try {
    const response = await fetch('http://localhost:3000/api/wordpress/products/featured');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
    }

    const products = await response.json();
    
    console.log(`✅ API accessible: ${response.status}`);
    console.log(`📊 Nombre de produits récupérés: ${products.length}`);
    
    if (products.length > 0) {
      console.log("\n📋 Détails des produits:");
      products.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.title}`);
        console.log(`   Catégorie: ${product.categoryInfo.name}`);
        console.log(`   Prix: ${product.price} ${product.currency}`);
        console.log(`   Image: ${product.image ? '✅' : '❌'}`);
        console.log(`   Stock: ${product.stockStatus}`);
        console.log(`   Note: ${product.averageRating}/5 (${product.ratingCount} avis)`);
      });
    } else {
      console.log("⚠️  Aucun produit trouvé");
    }

    console.log("\n🎯 Test terminé avec succès !");
    
  } catch (error) {
    console.error("❌ Erreur lors du test:", error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log("\n💡 Conseil: Assurez-vous que le serveur Next.js est démarré avec 'npm run dev'");
    }
  }
}

// Attendre un peu que le serveur démarre
setTimeout(() => {
  testFeaturedProductsAPI();
}, 3000);



