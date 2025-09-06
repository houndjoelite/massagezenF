import { type NextRequest, NextResponse } from "next/server"

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "https://your-domain.com/wp-json/wp/v2"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "10"
    const category = searchParams.get("category")

    // Assuming you have a custom post type 'products' in WordPress
    let url = `${WORDPRESS_API_URL}/products?per_page=${limit}&_embed`

    if (category) {
      url += `&product_categories=${category}`
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`)
    }

    const products = await response.json()

    // Transform WordPress products to match our Product interface
    const transformedProducts = products.map((product: any) => ({
      id: product.id.toString(),
      name: product.title.rendered,
      description: product.content.rendered,
      price: product.acf?.price || "Prix sur demande",
      originalPrice: product.acf?.original_price,
      image: product._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/massage-device.png",
      category: product._embedded?.["wp:term"]?.[0]?.[0]?.name || "Appareils de massage",
      rating: product.acf?.rating || 4.5,
      reviews: product.acf?.reviews || 0,
      features: product.acf?.features ? product.acf.features.split("\n") : [],
      amazonUrl: product.acf?.amazon_url || "#",
      inStock: product.acf?.in_stock !== false,
      badge: product.acf?.badge || null,
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error("Error fetching WordPress products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
