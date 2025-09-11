import { NextResponse } from "next/server"

// Contourner les problèmes SSL pour WordPress
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL 
  ? `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2`
  : "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2"

export async function GET() {
  try {
    console.log("Fetching comparatifs articles from WordPress")

    // Récupérer les catégories pour trouver l'ID de la catégorie "comparatifs"
    const categoriesResponse = await fetch(
      `${WORDPRESS_API_URL}/categories?slug=comparatifs`,
      {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "User-Agent": "Next.js WordPress Integration",
          "Cache-Control": "no-cache"
        },
        cache: "no-store", // Force le fetch de données fraîches
      }
    )

    if (!categoriesResponse.ok) {
      console.log("Comparatifs category not found")
      return NextResponse.json([])
    }

    const categories = await categoriesResponse.json()
    const comparatifsCategory = categories.find((cat: any) => cat.slug === 'comparatifs')
    
    if (!comparatifsCategory) {
      console.log("Comparatifs category not found")
      return NextResponse.json([])
    }

    console.log(`Found comparatifs category with ID: ${comparatifsCategory.id}`)

    // Récupérer les articles de la catégorie comparatifs
    const postsResponse = await fetch(
      `${WORDPRESS_API_URL}/posts?categories=${comparatifsCategory.id}&per_page=20&_embed&status=publish`,
      {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "User-Agent": "Next.js WordPress Integration",
          "Cache-Control": "no-cache"
        },
        cache: "no-store", // Force le fetch de données fraîches
      }
    )

    if (!postsResponse.ok) {
      console.log("No comparatifs posts found")
      return NextResponse.json([])
    }

    const posts = await postsResponse.json()
    console.log(`Found ${posts.length} comparatifs posts`)

    // Transformer les articles WordPress
    const transformedPosts = posts.map((post: any) => ({
      id: post.id.toString(),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""), // Supprimer les balises HTML
      content: post.content.rendered,
      slug: post.slug,
      publishedAt: post.date,
      author: post._embedded?.author?.[0]?.name || "Admin",
      category: "Comparatifs",
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      tags: post._embedded?.["wp:term"]?.[1]?.map((tag: any) => tag.name) || [],
      seo: {
        title: post.yoast_head_json?.title || post.title.rendered,
        description: post.yoast_head_json?.description || post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
        keywords: post.yoast_head_json?.keywords || [],
      },
    }))

    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error("Error fetching comparatifs posts:", error)
    return NextResponse.json([], { status: 200 })
  }
}
