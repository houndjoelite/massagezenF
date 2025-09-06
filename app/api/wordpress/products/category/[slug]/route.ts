import { type NextRequest, NextResponse } from "next/server"
import { reverseCategoryMapping } from "@/lib/category-mapping"
import { getProductsByCategory } from "@/lib/woocommerce-api"
import { mockProductsByCategory } from "@/data/mock-products"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "20")

    console.log("Fetching WooCommerce products for category slug:", slug)

    // Convertir le slug Next.js en slug WooCommerce
    const wooCommerceSlug = reverseCategoryMapping[slug]
    
    if (!wooCommerceSlug) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    console.log("WooCommerce slug:", wooCommerceSlug)

    // Récupérer les produits WooCommerce de cette catégorie
    const products = await getProductsByCategory(wooCommerceSlug, limit)
    console.log("WooCommerce products fetched:", products.length)

    if (products.length === 0) {
      console.log("Aucun produit trouvé, utilisation des données de test")
      const mockProducts = (mockProductsByCategory as any)[slug] || []
      return NextResponse.json(mockProducts)
    }

    // Transformer les produits WooCommerce pour correspondre à l'interface ProductGrid
    const transformedProducts = products.map((product: any) => ({
      id: product.id.toString(),
      title: product.name,
      slug: product.slug,
      excerpt: product.short_description ? product.short_description.replace(/<[^>]*>/g, "") : "Aucun résumé disponible",
      content: product.description || "",
      image: product.images?.[0]?.src || null,
      price: product.price || "0",
      regularPrice: product.regular_price && product.regular_price !== product.price ? product.regular_price : undefined,
      salePrice: product.sale_price || undefined,
      currency: "€",
      stockStatus: product.stock_status || "outofstock",
      averageRating: parseFloat(product.average_rating) || 0,
      ratingCount: parseInt(product.rating_count) || 0,
      externalUrl: product.external_url || null,
      buttonText: product.external_url ? "Voir sur Amazon" : "Voir le produit",
      categories: product.categories?.map((cat: any) => cat.name) || [],
      tags: product.tags?.map((tag: any) => tag.name) || [],
      seo: {
        title: product.meta_data?.find((meta: any) => meta.key === "_yoast_wpseo_title")?.value || product.name,
        description: product.meta_data?.find((meta: any) => meta.key === "_yoast_wpseo_metadesc")?.value || (product.short_description ? product.short_description.replace(/<[^>]*>/g, "").substring(0, 160) : ""),
        keywords: [],
      },
    }))

    console.log("Transformed products:", transformedProducts.length)
    return NextResponse.json(transformedProducts)

  } catch (error) {
    console.error("Error fetching WooCommerce products:", error)
    console.log("Utilisation des données de test pour la catégorie:", slug)

    // Utiliser les données de test spécifiques à la catégorie
    const mockProducts = (mockProductsByCategory as any)[slug] || [
      {
        id: "1",
        title: "Produit de Test - Configuration WooCommerce Requise",
        slug: "produit-test",
        excerpt: "Ce produit s'affiche car WooCommerce n'est pas configuré. Suivez le guide de configuration.",
        content: "<p>Pour afficher les vrais produits, configurez l'API WooCommerce selon le guide fourni.</p>",
        image: null,
        price: "99.99",
        regularPrice: "149.99",
        salePrice: undefined,
        currency: "€",
        stockStatus: "instock",
        averageRating: 4.5,
        ratingCount: 0,
        externalUrl: null,
        buttonText: "Voir le produit",
        categories: ["Configuration requise"],
        tags: ["test", "configuration"],
        seo: {
          title: "Configuration WooCommerce Requise",
          description: "Configurez WooCommerce pour afficher les vrais produits",
          keywords: ["configuration", "woocommerce"]
        }
      }
    ]

    return NextResponse.json(mockProducts)
  }
}

