import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const limit = searchParams.get("limit") || "12"

    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ""
    const url = `${baseUrl}/wp-json/wc/v3/products?search=${encodeURIComponent(search)}&per_page=${limit}&status=publish`

    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + Buffer.from(
          `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
        ).toString("base64"),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) throw new Error(`WooCommerce API error: ${response.status}`)

    const products = await response.json()

    return NextResponse.json(products.map((p: any) => ({
      id: p.id.toString(),
      name: p.name,
      description: p.short_description?.replace(/<[^>]*>/g, "") || "",
      image: p.images?.[0]?.src || null,
      price: p.price ? `${p.price} €` : null,
      category: p.categories?.[0]?.name || null,
      slug: p.slug,
    })))
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json([], { status: 200 })
  }
}
