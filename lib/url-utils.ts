// Utilitaire pour gérer les URLs en production et développement

export function getBaseUrl(): string {
  // En production, utiliser l'URL publique
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://massagezen-f.vercel.app'
  }
  
  // En développement, utiliser localhost
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export function getWordPressUrl(): string {
  return process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cmsmonappareildemagge.monappareildemassage.com'
}

export function getApiUrl(endpoint: string): string {
  return `${getBaseUrl()}/api${endpoint}`
}

export function getWordPressApiUrl(endpoint: string): string {
  const wpUrl = getWordPressUrl()
  return `${wpUrl}/wp-json/wp/v2${endpoint}`
}

// Headers par défaut pour les requêtes
export function getDefaultHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'User-Agent': 'MassageZen/1.0',
  }
}

// Options de fetch par défaut
export function getDefaultFetchOptions(): RequestInit {
  return {
    cache: 'no-store',
    headers: getDefaultHeaders(),
  }
}
