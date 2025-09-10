import { type NextRequest, NextResponse } from "next/server"
import { fetchWithFallback } from "@/lib/wordpress-api"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    console.log("Fetching WordPress post with slug:", slug)
    
    // Validation du slug
    if (!slug || typeof slug !== 'string') {
      console.error("Invalid slug provided:", slug)
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }
    
    const response = await fetchWithFallback(`/posts?slug=${encodeURIComponent(slug)}&_embed`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    })

    console.log("WordPress API response status:", response.status)

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} - ${response.statusText}`)
      const errorText = await response.text()
      console.error("Error response body:", errorText)
      return NextResponse.json({ 
        error: `WordPress API error: ${response.status}`,
        details: errorText 
      }, { status: response.status })
    }

    const posts = await response.json()
    console.log("WordPress posts found:", posts.length)

    if (posts.length === 0) {
      console.log("No posts found for slug:", slug)
      return NextResponse.json({ 
        error: "Post not found",
        slug: slug 
      }, { status: 404 })
    }

    const post = posts[0]
    console.log("Post found:", post.title?.rendered || "No title")
    console.log("Featured media data:", JSON.stringify(post._embedded?.["wp:featuredmedia"], null, 2))

    // Fonction pour nettoyer le contenu WordPress
    const cleanWordPressContent = (content: string) => {
      return content
        // Supprimer les classes WordPress problématiques mais garder les galeries
        .replace(/class="[^"]*wp-[^"]*(?<!gallery|wp-block-gallery)[^"]*"/g, '')
        .replace(/class="[^"]*align[^"]*"/g, '')
        .replace(/class="[^"]*size-[^"]*"/g, '')
        // Nettoyer les images mais garder les classes de galerie
        .replace(/<img([^>]*?)class="[^"]*(?<!gallery-item|wp-block-image)[^"]*"([^>]*?)>/g, '<img$1$2>')
        // Nettoyer les divs vides
        .replace(/<div[^>]*>\s*<\/div>/g, '')
        // Nettoyer les paragraphes vides
        .replace(/<p[^>]*>\s*<\/p>/g, '')
        // Nettoyer les spans vides
        .replace(/<span[^>]*>\s*<\/span>/g, '')
        // Nettoyer les attributs WordPress spécifiques
        .replace(/data-[^=]*="[^"]*"/g, '')
        .replace(/id="[^"]*"/g, '')
        // Nettoyer les commentaires HTML
        .replace(/<!--[\s\S]*?-->/g, '')
        // Nettoyer les scripts et styles
        .replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
        // Nettoyer les attributs width et height des images pour un meilleur contrôle CSS
        .replace(/(<img[^>]*?)\s+width="[^"]*"/g, '$1')
        .replace(/(<img[^>]*?)\s+height="[^"]*"/g, '$1')
        // Nettoyer les attributs de taille des images
        .replace(/(<img[^>]*?)\s+sizes="[^"]*"/g, '$1')
        .replace(/(<img[^>]*?)\s+srcset="[^"]*"/g, '$1')
    }

    // Transform WordPress post to match our Article interface
    const transformedPost = {
      id: post.id.toString(),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
      content: cleanWordPressContent(post.content.rendered),
      slug: post.slug,
      publishedAt: post.date,
      author: post._embedded?.author?.[0]?.name || "Admin",
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Non classé",
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 
             post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.large?.source_url ||
             post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url ||
             post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url ||
             null,
      tags: post._embedded?.["wp:term"]?.[1]?.map((tag: any) => tag.name) || [],
      seo: {
        title: post.yoast_head_json?.title || post.title.rendered,
        description:
          post.yoast_head_json?.description || post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
        keywords: post.yoast_head_json?.keywords || [],
      },
    }

    console.log("Transformed post:", transformedPost.title)
    return NextResponse.json(transformedPost)
  } catch (error) {
    console.error("Error fetching WordPress post:", error)
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
}
