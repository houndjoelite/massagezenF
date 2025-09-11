import { type NextRequest, NextResponse } from "next/server"
import { fetchWithFallback } from "@/lib/wordpress-api"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    console.log("Fetching WordPress post with slug:", slug)
    
    const response = await fetchWithFallback(`/posts?slug=${slug}&_embed`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "MassageZen/1.0",
      },
      cache: "no-store", // Force le fetch de données fraîches
    })

    console.log("WordPress API response status:", response.status)

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} - ${response.statusText}`)
      return NextResponse.json({ 
        error: `WordPress API error: ${response.status}`,
        details: response.statusText 
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

    // Vérifier que le post est publié
    if (post.status !== 'publish') {
      console.log("Post is not published:", post.status)
      return NextResponse.json({ 
        error: "Post not published",
        slug: slug 
      }, { status: 404 })
    }

    // Transform WordPress post to match our Article interface
    const transformedPost = {
      id: post.id.toString(),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
      content: post.content.rendered,
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
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
