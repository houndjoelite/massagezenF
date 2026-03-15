import { type NextRequest, NextResponse } from "next/server"
import { getProductBySlug } from "@/lib/woocommerce-api"
import { decodeHtml } from "@/lib/utils/decode"

function stripHtml(html: string, maxLength: number = 150): string {
  const text = (html || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()

  if (text.length <= maxLength) return text

  const truncated = text.substring(0, maxLength)
  return truncated.substring(0, truncated.lastIndexOf(" ")) + "..."
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    console.log("Fetching WooCommerce product by slug:", slug)

    const product = await getProductBySlug(slug)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const transformedProduct = {
      id: product.id.toString(),
      title: decodeHtml(product.name),
      slug: product.slug,
      excerpt: stripHtml(product.short_description, 150),
      content: product.description || "",
      image: product.images && product.images.length > 0 ? product.images[0].src : null,
      galleryImages: product.images ? product.images.map((img: any) => img.src) : [],
      price: product.price || "0",
      regularPrice: product.regular_price && product.regular_price !== product.price ? product.regular_price : undefined,
      currency: product.currency || "€",
      stockStatus: product.stock_status || "instock",
      averageRating: product.average_rating || 0,
      ratingCount: product.rating_count || 0,
      externalUrl: product.external_url || null,
      buttonText: product.button_text || "Voir le produit",
      categories: product.categories ? product.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) : [],
      tags: product.tags ? product.tags.map((tag: any) => tag.name) : [],
      seo: {
        title: decodeHtml(product.name),
        description: stripHtml(product.short_description || product.description, 150),
        keywords: product.tags ? product.tags.map((tag: any) => tag.name) : []
      }
    }

    console.log("Transformed product:", transformedProduct.title)
    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}
