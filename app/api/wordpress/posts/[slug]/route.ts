import { type NextRequest, NextResponse } from "next/server"
import { fetchWithFallback } from "@/lib/wordpress-api"
import { decodeHtml } from "@/lib/utils/decode"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    console.log("Fetching WordPress post with slug:", slug)

    const response = await fetchWithFallback(`/posts?slug=${slug}&_embed`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "MassageZen/1.0",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json({
        error: `WordPress API error: ${response.status}`,
        details: response.statusText
      }, { status: response.status })
    }

    const posts = await response.json()

    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found", slug }, { status: 404 })
    }

    const post = posts[0]

    if (post.status !== 'publish') {
      return NextResponse.json({ error: "Post not published", slug }, { status: 404 })
    }

    const transformedPost = {
      id: post.id.toString(),
      title: decodeHtml(post.title.rendered),
      excerpt: decodeHtml(post.excerpt.rendered.replace(/<[^>]*>/g, "")),
      content: post.content.rendered,
      slug: post.slug,
      publishedAt: post.date,
      author: decodeHtml(post._embedded?.author?.[0]?.name || "Admin"),
      category: decodeHtml(post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Non classé"),
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
             post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.large?.source_url ||
             post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url ||
             post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url ||
             null,
      tags: post._embedded?.["wp:term"]?.[1]?.map((tag: any) => decodeHtml(tag.name)) || [],
      seo: {
        title: decodeHtml(post.yoast_head_json?.title || post.title.rendered),
        description: decodeHtml(
          post.yoast_head_json?.description ||
          post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160)
        ),
        keywords: post.yoast_head_json?.keywords || [],
      },
    }

    return NextResponse.json(transformedPost)
  } catch (error) {
    console.error("Error fetching WordPress post:", error)
    return NextResponse.json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
