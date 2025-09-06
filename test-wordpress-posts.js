// Test script pour vérifier tous les types de posts WordPress
const https = require('https');

// Désactiver la vérification SSL pour les tests
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

async function testWordPressPosts() {
  console.log("🧪 Test des posts WordPress...\n");

  const WORDPRESS_API_URL = "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2";

  try {
    // Test des types de posts disponibles
    console.log("📋 Récupération des types de posts...");
    const typesResponse = await fetch(`${WORDPRESS_API_URL}/types`);
    
    if (typesResponse.ok) {
      const types = await typesResponse.json();
      console.log(`✅ Types de posts disponibles:`);
      Object.keys(types).forEach(type => {
        console.log(`   - ${type}: ${types[type].name}`);
      });
    }

    // Test des posts normaux
    console.log("\n📝 Récupération des posts normaux...");
    const postsResponse = await fetch(`${WORDPRESS_API_URL}/posts?per_page=5`);
    
    if (postsResponse.ok) {
      const posts = await postsResponse.json();
      console.log(`✅ ${posts.length} posts trouvés:`);
      posts.forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title.rendered}`);
        console.log(`   Type: ${post.type}`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   ID: ${post.id}`);
      });
    }

    // Test des posts de type "product"
    console.log("\n🛍️ Récupération des posts de type 'product'...");
    const productPostsResponse = await fetch(`${WORDPRESS_API_URL}/posts?type=product&per_page=5`);
    
    if (productPostsResponse.ok) {
      const productPosts = await productPostsResponse.json();
      console.log(`✅ ${productPosts.length} posts de type 'product' trouvés:`);
      productPosts.forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title.rendered}`);
        console.log(`   Type: ${post.type}`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   ID: ${post.id}`);
      });
    } else {
      console.log(`❌ Erreur: ${productPostsResponse.status} - ${productPostsResponse.statusText}`);
    }

    // Test des pages
    console.log("\n📄 Récupération des pages...");
    const pagesResponse = await fetch(`${WORDPRESS_API_URL}/pages?per_page=5`);
    
    if (pagesResponse.ok) {
      const pages = await pagesResponse.json();
      console.log(`✅ ${pages.length} pages trouvées:`);
      pages.forEach((page, index) => {
        console.log(`\n${index + 1}. ${page.title.rendered}`);
        console.log(`   Slug: ${page.slug}`);
        console.log(`   ID: ${page.id}`);
      });
    }

    console.log("\n🎯 Test terminé !");
    
  } catch (error) {
    console.error("❌ Erreur lors du test:", error.message);
  }
}

testWordPressPosts();



