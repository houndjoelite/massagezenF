import { type NextRequest, NextResponse } from "next/server"
import { fetchWooCommerce } from "@/lib/woocommerce-api"
import { decodeHtml } from "@/lib/utils/decode"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "100"
    const category = searchParams.get("category")

    let endpoint = `/products?per_page=${limit}&status=publish&orderby=date&order=desc`
    if (category) {
      endpoint += `&category=${category}`
    }

    const response = await fetchWooCommerce(endpoint)

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`)
    }

    const products = await response.json()

    const transformedProducts = products.map((product: any) => ({
      id: product.id.toString(),
      slug: product.slug,
      name: decodeHtml(product.name),
      description: decodeHtml(product.description),
      price: product.price || "Prix sur demande",
      originalPrice: product.regular_price || null,
      image: product.images?.[0]?.src || "/massage-device.png",
      category: decodeHtml(product.categories?.[0]?.name || "Appareils de massage"),
      categorySlug: product.categories?.[0]?.slug || "",
      inStock: product.stock_status === "instock",
      publishedAt: product.date_created,
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error)
    return NextResponse.json([], { status: 200 })
  }
}
