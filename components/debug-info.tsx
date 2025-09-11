'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react'

interface DebugInfoProps {
  slug: string
  type: 'article' | 'product'
  error?: string
  data?: any
}

export function DebugInfo({ slug, type, error, data }: DebugInfoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Ne pas afficher en production sauf si NEXT_PUBLIC_DEBUG=true
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_DEBUG !== 'true') {
    return null
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    window.location.reload()
  }

  return (
    <Card className="mt-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-200">
            🐛 Informations de débogage
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-xs"
            >
              <RefreshCw className={`w-3 h-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs"
            >
              {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-0">
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Type:</strong> {type}
              </div>
              <div>
                <strong>Slug:</strong> <code className="bg-gray-100 px-1 rounded">{slug}</code>
              </div>
              <div>
                <strong>Environnement:</strong> 
                <Badge variant={process.env.NODE_ENV === 'production' ? 'destructive' : 'default'} className="ml-1">
                  {process.env.NODE_ENV}
                </Badge>
              </div>
              <div>
                <strong>Base URL:</strong> 
                <code className="bg-gray-100 px-1 rounded ml-1">
                  {process.env.NEXT_PUBLIC_SITE_URL || 'Non défini'}
                </code>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                <strong className="text-red-800 dark:text-red-200">Erreur:</strong>
                <pre className="mt-1 text-red-700 dark:text-red-300 whitespace-pre-wrap">{error}</pre>
              </div>
            )}

            {data && (
              <div className="p-3 bg-green-100 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                <strong className="text-green-800 dark:text-green-200">Données récupérées:</strong>
                <pre className="mt-1 text-green-700 dark:text-green-300 whitespace-pre-wrap text-xs">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}

            <div className="p-3 bg-blue-100 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
              <strong className="text-blue-800 dark:text-blue-200">URLs de test:</strong>
              <div className="mt-2 space-y-1">
                <div>
                  <strong>API:</strong> 
                  <code className="bg-gray-100 px-1 rounded ml-1">
                    {process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/wordpress/{type}s/{slug}
                  </code>
                </div>
                <div>
                  <strong>WordPress:</strong> 
                  <code className="bg-gray-100 px-1 rounded ml-1">
                    {process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cmsmonappareildemagge.monappareildemassage.com'}/wp-json/wp/v2/posts?slug={slug}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
