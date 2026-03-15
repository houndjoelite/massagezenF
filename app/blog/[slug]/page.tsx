import { TableOfContents } from "@/components/table-of-contents"
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-markup"
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

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateStaticParams() {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL || "https://monappareildemassage.com"
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/wordpress/posts?limit=50`, {
      cache: "no-store",
      headers: { "User-Agent": "MassageZen/1.0" },
    })

    if (!response.ok) return []
    const posts = await response.json()
    return posts.map((post: Article) => ({ slug: post.slug }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const { slug } = await params
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL || "https://monappareildemassage.com"
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/wordpress/posts/${slug}`, {
      cache: "no-store",
      headers: { "User-Agent": "MassageZen/1.0" },
    })

    if (!response.ok) {
      return {
        title: "Article non trouvé | MassageZen",
        description: "Cet article n'existe pas ou a été supprimé.",
      }
    }

    const article: Article = await response.json()

    return {
      title: `${article.seo.title} | MassageZen`,
      description: article.seo.description,
      alternates: {
        canonical: `${baseUrl}/blog/${slug}`,
      },
      openGraph: {
        title: article.seo.title,
        description: article.seo.description,
        url: `${baseUrl}/blog/${slug}`,
        images: article.image ? [article.image] : [],
        type: "article",
        publishedTime: article.publishedAt,
        authors: [article.author],
      },
    }
  } catch (error) {
    console.error("Metadata generation error:", error)
    return {
      title: "Article non trouvé | MassageZen",
      description: "Cet article n'existe pas ou a été supprimé.",
    }
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let article: Article | null = null
  let error: string | null = null

  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL || "https://monappareildemassage.com"
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/wordpress/posts/${slug}`, {
      cache: "no-store",
      headers: { "User-Agent": "MassageZen/1.0" },
    })

    if (response.ok) {
      article = await response.json()
    } else {
      const errorData = await response.json().catch(() => ({}))
      error =
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error"
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            {error
              ? `Erreur: ${error}`
              : "Cet article n'existe pas ou a été supprimé."}
          </p>
          <Button asChild>
            <Link href="/blog">Retour au blog</Link>
          </Button>
          <DebugInfo slug={slug} type="article" error={error || undefined} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <ArticleSchema
        article={{
          title: article.title,
          excerpt: article.excerpt,
          image: article.image,
          publishedAt: article.publishedAt,
          author: article.author,
          slug: article.slug,
        }}
      />

      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "https://monappareildemassage.com" },
          { name: "Blog", url: "https://monappareildemassage.com/blog" },
          {
            name: article.title,
            url: `https://monappareildemassage.com/blog/${article.slug}`,
          },
        ]}
      />

      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">

            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <p className="text-lg text-muted-foreground mb-6">
              {article.excerpt}
            </p>

            {article.image && (
              <div className="relative aspect-video overflow-hidden rounded-3xl mb-12 shadow-2xl">
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

            {/* ✅ Table des matières */}
            <TableOfContents content={article.content} />

            <WordPressContent
              content={article.content}
              className="prose max-w-none"
            />

            <DebugInfo slug={slug} type="article" data={article} />

            <div className="mt-16 pt-8 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>

                  <Calendar className="h-4 w-4 ml-4" />
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>

                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
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
