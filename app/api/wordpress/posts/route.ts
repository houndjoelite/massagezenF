import { type NextRequest, NextResponse } from "next/server"
import { fetchWithFallback } from "@/lib/wordpress-api"
import { decodeHtml } from "@/lib/utils/decode"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "12"
const page = searchParams.get("page") || "1"
    const category = searchParams.get("category")

    let endpoint = `/posts?per_page=${limit}&_embed&status=publish`
    if (category) {
      endpoint += `&categories=${category}`
    }

    const response = await fetchWithFallback(endpoint, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} - ${response.statusText}`)
    }

    const posts = await response.json()

    const transformedPosts = posts.map((post: any) => ({
      id: post.id.toString(),
      title: decodeHtml(post.title.rendered),
      excerpt: decodeHtml(post.excerpt.rendered.replace(/<[^>]*>/g, "")),
      content: post.content.rendered,
      slug: post.slug,
      publishedAt: post.date,
      author: decodeHtml(post._embedded?.author?.[0]?.name || "Admin"),
      category: decodeHtml(post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Non classé"),
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      tags: post._embedded?.["wp:term"]?.[1]?.map((tag: any) => decodeHtml(tag.name)) || [],
      seo: {
        title: decodeHtml(post.yoast_head_json?.title || post.title.rendered),
        description: decodeHtml(
          post.yoast_head_json?.description ||
          post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160)
        ),
        keywords: post.yoast_head_json?.keywords || [],
      },
    }))

    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error("Error fetching WordPress posts:", error)
    return NextResponse.json([], { status: 200 })
  }
}
