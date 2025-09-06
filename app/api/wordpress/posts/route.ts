import { type NextRequest, NextResponse } from "next/server"
import { fetchWithFallback } from "@/lib/wordpress-api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "10"
    const category = searchParams.get("category")

    let endpoint = `/posts?per_page=${limit}&_embed&status=publish`

    if (category) {
      endpoint += `&categories=${category}`
    }

    console.log("Fetching WordPress posts with fallback HTTPS/HTTP")

    const response = await fetchWithFallback(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`)
      throw new Error(`WordPress API error: ${response.status} - ${response.statusText}`)
    }

    const posts = await response.json()
    console.log(`Fetched ${posts.length} posts from WordPress`)

    // Transform WordPress posts to match our Article interface
    const transformedPosts = posts.map((post: any) => ({
      id: post.id.toString(),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""), // Strip HTML
      content: post.content.rendered,
      slug: post.slug,
      publishedAt: post.date,
      author: post._embedded?.author?.[0]?.name || "Admin",
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Non classé",
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      tags: post._embedded?.["wp:term"]?.[1]?.map((tag: any) => tag.name) || [],
      seo: {
        title: post.yoast_head_json?.title || post.title.rendered,
        description:
          post.yoast_head_json?.description || post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
        keywords: post.yoast_head_json?.keywords || [],
      },
    }))

    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error("Error fetching WordPress posts:", error)
    
    // Retourner un tableau vide au lieu des données mockées
    return NextResponse.json([], { status: 200 })
  }
}
