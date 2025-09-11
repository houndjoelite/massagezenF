// Utilitaire pour gérer le fallback HTTPS/HTTP avec WordPress
const WORDPRESS_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cmsmonappareildemagge.monappareildemassage.com"

const WORDPRESS_DOMAINS = {
  https: WORDPRESS_BASE_URL,
  http: WORDPRESS_BASE_URL.replace('https://', 'http://')
}

const API_PATH = "/wp-json/wp/v2"

// Fonction pour tester la connectivité
async function testConnection(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000), // Timeout de 5 secondes
    })
    return response.ok
  } catch (error) {
    return false
  }
}

// Fonction pour obtenir l'URL WordPress fonctionnelle
export async function getWordPressApiUrl(): Promise<string> {
  // Vérifier d'abord HTTPS
  const httpsUrl = `${WORDPRESS_DOMAINS.https}${API_PATH}`
  const isHttpsWorking = await testConnection(`${WORDPRESS_DOMAINS.https}/wp-json/wp/v2/posts?per_page=1`)
  
  if (isHttpsWorking) {
    console.log("✅ HTTPS WordPress API accessible")
    return httpsUrl
  }
  
  // Fallback vers HTTP
  console.log("⚠️ HTTPS non disponible, utilisation de HTTP")
  return `${WORDPRESS_DOMAINS.http}${API_PATH}`
}

// Fonction pour faire une requête avec fallback automatique
export async function fetchWithFallback(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const httpsUrl = `${WORDPRESS_DOMAINS.https}${API_PATH}${endpoint}`
  const httpUrl = `${WORDPRESS_DOMAINS.http}${API_PATH}${endpoint}`
  
  try {
    // Essayer HTTPS en premier
    const response = await fetch(httpsUrl, {
      ...options,
      cache: "no-store", // Force le fetch de données fraîches
      signal: AbortSignal.timeout(10000), // Timeout de 10 secondes
    })
    
    if (response.ok) {
      console.log("✅ Requête HTTPS réussie")
      return response
    }
    
    throw new Error(`HTTPS failed: ${response.status}`)
  } catch (error) {
    console.log("⚠️ HTTPS échoué, tentative HTTP...")
    
    try {
      const response = await fetch(httpUrl, {
        ...options,
        cache: "no-store", // Force le fetch de données fraîches
        signal: AbortSignal.timeout(10000),
      })
      
      if (response.ok) {
        console.log("✅ Requête HTTP réussie")
        return response
      }
      
      throw new Error(`HTTP failed: ${response.status}`)
    } catch (httpError) {
      console.error("❌ Les deux protocoles ont échoué")
      throw new Error(`Both HTTPS and HTTP failed. HTTPS: ${error}, HTTP: ${httpError}`)
    }
  }
}

// Configuration pour contourner les problèmes SSL en développement
if (process.env.NODE_ENV === 'development') {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"
}

