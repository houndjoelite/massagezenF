import { type NextRequest, NextResponse } from "next/server"
import { getProductBySlug } from "@/lib/woocommerce-api"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    console.log("Fetching WooCommerce product by slug:", slug)

    // Utiliser la fonction WooCommerce API
    const product = await getProductBySlug(slug)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Transformer le produit WooCommerce
    const transformedProduct = {
      id: product.id.toString(),
      title: product.name,
      slug: product.slug,
      excerpt: product.short_description || "Aucun résumé disponible",
      content: product.description || "",
      image: product.images && product.images.length > 0 ? product.images[0].src : null,
      price: product.price || "0",
      regularPrice: product.regular_price && product.regular_price !== product.price ? product.regular_price : undefined,
      currency: product.currency || "€",
      stockStatus: product.stock_status || "instock",
      averageRating: product.average_rating || 0,
      ratingCount: product.rating_count || 0,
      externalUrl: product.external_url || null,
      buttonText: product.button_text || "Voir le produit",
      categories: product.categories ? product.categories.map((cat: any) => cat.name) : [],
      tags: product.tags ? product.tags.map((tag: any) => tag.name) : [],
      seo: {
        title: product.name,
        description: product.short_description || "",
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