// Utilitaire pour l'API WooCommerce avec authentification
const WORDPRESS_DOMAINS = {
  https: "https://cmsmonappareildemagge.monappareildemassage.com",
  http: "http://cmsmonappareildemagge.monappareildemassage.com"
}

// Clés API WooCommerce
const WOOCOMMERCE_KEYS = {
  consumerKey: "ck_a33bb68de87fa336c3d4a452714fa736f8272eb2",
  consumerSecret: "cs_25dccf2cf701a3539e39e5e8c578d3a5c28c4d88"
}

// Fonction pour encoder les clés en base64
function encodeCredentials(key: string, secret: string): string {
  return Buffer.from(`${key}:${secret}`).toString('base64')
}

// Fonction pour faire une requête authentifiée WooCommerce
export async function fetchWooCommerce(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const credentials = encodeCredentials(WOOCOMMERCE_KEYS.consumerKey, WOOCOMMERCE_KEYS.consumerSecret)
  
  // Essayer HTTPS en premier
  try {
    const httpsUrl = `${WORDPRESS_DOMAINS.https}/wp-json/wc/v3${endpoint}`
    console.log(`🔐 Tentative HTTPS WooCommerce: ${httpsUrl}`)
    
    const response = await fetch(httpsUrl, {
      ...options,
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'User-Agent': 'MassageZen/1.0',
        ...options.headers,
      },
      signal: AbortSignal.timeout(10000),
    })
    
    if (response.ok) {
      console.log("✅ Requête HTTPS WooCommerce réussie")
      return response
    }
    
    throw new Error(`HTTPS failed: ${response.status}`)
  } catch (error) {
    console.log("⚠️ HTTPS WooCommerce échoué, tentative HTTP...")
    
    try {
      const httpUrl = `${WORDPRESS_DOMAINS.http}/wp-json/wc/v3${endpoint}`
      console.log(`🔐 Tentative HTTP WooCommerce: ${httpUrl}`)
      
      const response = await fetch(httpUrl, {
        ...options,
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
          'User-Agent': 'MassageZen/1.0',
          ...options.headers,
        },
        signal: AbortSignal.timeout(10000),
      })
      
      if (response.ok) {
        console.log("✅ Requête HTTP WooCommerce réussie")
        return response
      }
      
      throw new Error(`HTTP failed: ${response.status}`)
    } catch (httpError) {
      console.error("❌ Les deux protocoles WooCommerce ont échoué")
      throw new Error(`Both HTTPS and HTTP WooCommerce failed. HTTPS: ${error}, HTTP: ${httpError}`)
    }
  }
}

// Fonction pour récupérer les catégories de produits
export async function getProductCategories(): Promise<any[]> {
  try {
    const response = await fetchWooCommerce('/products/categories?per_page=100')
    return await response.json()
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error)
    return []
  }
}

// Fonction pour récupérer les produits d'une catégorie
export async function getProductsByCategory(categorySlug: string, limit: number = 20): Promise<any[]> {
  try {
    // Import dynamique pour éviter les problèmes de dépendances circulaires
    const { categoryIdMapping } = await import('./category-mapping')
    
    // Vérifier d'abord le mapping direct par ID
    const categoryId = categoryIdMapping[categorySlug as keyof typeof categoryIdMapping]
    
    if (categoryId && categoryId > 0) {
      console.log(`✅ Utilisation de l'ID de catégorie mappé: ${categoryId} pour ${categorySlug}`)
      
      // Récupérer les produits de cette catégorie par ID
      const response = await fetchWooCommerce(`/products?category=${categoryId}&per_page=${limit}&status=publish`)
      const products = await response.json()
      console.log(`✅ ${products.length} produit(s) récupéré(s) pour la catégorie ID: ${categoryId}`)
      return products
    }
    
    // Fallback: chercher par slug si pas d'ID mappé
    console.log(`⚠️ Pas d'ID mappé pour ${categorySlug}, recherche par slug...`)
    const categories = await getProductCategories()
    const category = categories.find(cat => cat.slug === categorySlug)
    
    if (!category) {
      console.log(`❌ Catégorie '${categorySlug}' non trouvée`)
      return []
    }
    
    console.log(`✅ Catégorie trouvée par slug: ${category.name} (ID: ${category.id})`)
    
    // Récupérer les produits de cette catégorie
    const response = await fetchWooCommerce(`/products?category=${category.id}&per_page=${limit}&status=publish`)
    const products = await response.json()
    console.log(`✅ ${products.length} produit(s) récupéré(s) pour la catégorie: ${category.name}`)
    return products
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error)
    return []
  }
}

// Fonction pour récupérer un produit par slug
export async function getProductBySlug(slug: string): Promise<any | null> {
  try {
    const response = await fetchWooCommerce(`/products?slug=${slug}`)
    const products = await response.json()
    return products.length > 0 ? products[0] : null
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error)
    return null
  }
}

// Configuration pour contourner les problèmes SSL en développement
if (process.env.NODE_ENV === 'development') {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"
}
