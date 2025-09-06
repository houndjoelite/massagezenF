// Script de test pour vérifier le système de fallback HTTPS/HTTP
const WORDPRESS_DOMAINS = {
  https: "https://cmsmonappareildemagge.monappareildemassage.com",
  http: "http://cmsmonappareildemagge.monappareildemassage.com"
}

const API_PATH = "/wp-json/wp/v2"

async function testConnection(url, timeout = 5000) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    return { success: response.ok, status: response.status, url }
  } catch (error) {
    return { success: false, error: error.message, url }
  }
}

async function testFallbackSystem() {
  console.log("🔍 Test du système de fallback HTTPS/HTTP...")
  console.log("=" * 50)
  
  // Test 1: HTTPS
  console.log("\n1️⃣ Test HTTPS...")
  const httpsResult = await testConnection(`${WORDPRESS_DOMAINS.https}${API_PATH}/posts?per_page=1`)
  console.log(`HTTPS: ${httpsResult.success ? "✅ Réussi" : "❌ Échec"} (${httpsResult.status || httpsResult.error})`)
  
  // Test 2: HTTP
  console.log("\n2️⃣ Test HTTP...")
  const httpResult = await testConnection(`${WORDPRESS_DOMAINS.http}${API_PATH}/posts?per_page=1`)
  console.log(`HTTP: ${httpResult.success ? "✅ Réussi" : "❌ Échec"} (${httpResult.status || httpResult.error})`)
  
  // Test 3: API Next.js
  console.log("\n3️⃣ Test API Next.js...")
  try {
    const response = await fetch("http://localhost:3001/api/wordpress/posts")
    const data = await response.json()
    console.log(`API Next.js: ${response.ok ? "✅ Réussi" : "❌ Échec"} - ${data.length} article(s)`)
  } catch (error) {
    console.log(`API Next.js: ❌ Échec - ${error.message}`)
  }
  
  // Résumé
  console.log("\n" + "=" * 50)
  console.log("📊 RÉSUMÉ:")
  console.log(`HTTPS WordPress: ${httpsResult.success ? "✅ Disponible" : "❌ Indisponible"}`)
  console.log(`HTTP WordPress: ${httpResult.success ? "✅ Disponible" : "❌ Indisponible"}`)
  
  if (httpsResult.success) {
    console.log("🎉 HTTPS fonctionne - Le système utilisera HTTPS en priorité")
  } else if (httpResult.success) {
    console.log("⚠️ Seul HTTP fonctionne - Le système utilisera HTTP comme fallback")
  } else {
    console.log("❌ Aucun protocole ne fonctionne - Vérifiez la configuration")
  }
}

testFallbackSystem()

