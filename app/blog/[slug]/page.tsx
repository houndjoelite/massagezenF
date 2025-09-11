import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Calendar, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { WordPressContent } from "@/components/wordpress-content"
import { DebugInfo } from "@/components/debug-info"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  publishedAt: string
  author: string
  category: string
  image: string
  tags: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

// Configuration pour le rendu dynamique
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Générer les paramètres statiques pour les articles populaires
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://massagezen-f.vercel.app'
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    
    const response = await fetch(
      `${baseUrl}/api/wordpress/posts?limit=50`,
      { 
        cache: "no-store",
        headers: {
          'User-Agent': 'MassageZen/1.0',
        }
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch posts for static params:', response.status)
      return []
    }

    const posts = await response.json()
    return posts.map((post: Article) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    
    // Utiliser l'URL absolue pour la production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://massagezen-f.vercel.app'
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    
    const response = await fetch(
      `${baseUrl}/api/wordpress/posts/${slug}`,
      { 
        cache: "no-store",
        headers: {
          'User-Agent': 'MassageZen/1.0',
        }
      }
    )

    if (!response.ok) {
      console.error(`Metadata fetch failed for ${slug}: ${response.status}`)
      return {
        title: "Article non trouvé | MassageZen",
        description: "Cet article n'existe pas ou a été supprimé.",
      }
    }

    const article: Article = await response.json()

    return {
      title: `${article.seo.title} | MassageZen`,
      description: article.seo.description,
      openGraph: {
        title: article.seo.title,
        description: article.seo.description,
        images: article.image ? [article.image] : [],
        type: 'article',
        publishedTime: article.publishedAt,
        authors: [article.author],
      },
    }
  } catch (error) {
    console.error(`Metadata generation error:`, error)
    return {
      title: "Article non trouvé | MassageZen",
      description: "Cet article n'existe pas ou a été supprimé.",
    }
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let article: Article | null = null
  let error: string | null = null

  try {
    // Utiliser l'URL absolue pour la production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://massagezen-f.vercel.app'
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    
    console.log(`Fetching article ${slug} from ${baseUrl}`)
    
    const response = await fetch(
      `${baseUrl}/api/wordpress/posts/${slug}`,
      {
        cache: "no-store",
        headers: {
          'User-Agent': 'MassageZen/1.0',
        }
      }
    )

    console.log(`Response status for ${slug}: ${response.status}`)

    if (response.ok) {
      article = await response.json()
      console.log(`Article ${slug} loaded successfully:`, article?.title)
    } else {
      const errorData = await response.json().catch(() => ({}))
      error = errorData.error || `HTTP ${response.status}: ${response.statusText}`
      console.error(`Failed to fetch article ${slug}:`, error)
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Error fetching article ${slug}:`, err)
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            {error ? `Erreur: ${error}` : "Cet article n'existe pas ou a été supprimé."}
          </p>
          <div className="space-y-4">
            <Button asChild>
              <Link href="/blog">Retour au blog</Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              Slug recherché: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
            </div>
            <DebugInfo slug={slug} type="article" error={error || undefined} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <Button 
                variant="ghost" 
                asChild 
                className="mb-8 group/back hover:bg-primary/5 transition-all duration-300"
              >
                <Link href="/blog" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover/back:-translate-x-1 transition-transform duration-300" />
                  Retour au blog
                </Link>
              </Button>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-6 flex-wrap">
                  <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground gap-6">
                    <div className="flex items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">{new Date(article.publishedAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{article.author}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance leading-tight text-content">
                    {article.title}
                  </h1>
                  <p className="text-base lg:text-lg text-content-soft text-pretty leading-relaxed max-w-4xl">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {article.image && (
                <div className="relative aspect-video overflow-hidden rounded-3xl mb-12 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              )}
            </div>

            <WordPressContent 
              content={article.content} 
              className="prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white"
            />

            <DebugInfo slug={slug} type="article" data={article} />

            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-sm text-muted-foreground bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium">{new Date(article.publishedAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 group/share"
                >
                  <Share2 className="h-4 w-4 mr-2 group-hover/share:scale-110 transition-transform duration-300" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
