import { NextResponse } from "next/server"
import { categoryMappings } from "@/lib/category-mapping"

// Contourner les problèmes SSL pour WordPress
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wp/v2"
const WOOCOMMERCE_API_URL = "https://cmsmonappareildemagge.monappareildemassage.com/wp-json/wc/v3"

export async function GET() {
  try {
    console.log("Fetching featured products from all categories...")

    // Récupérer tous les produits disponibles
    const allProductsResponse = await fetch(
      `${WORDPRESS_API_URL}/posts?type=product&per_page=50&_embed`,
      {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "User-Agent": "Next.js WordPress Integration",
          "Cache-Control": "no-cache"
        },
        next: { revalidate: 300 },
      }
    )

    if (!allProductsResponse.ok) {
      console.log("No products found")
      return NextResponse.json([])
    }

    const allProducts = await allProductsResponse.json()
    console.log(`Found ${allProducts.length} total products`)

    // Récupérer les catégories de produits
    const categoriesResponse = await fetch(
      `${WORDPRESS_API_URL}/product_cat`,
      {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "User-Agent": "Next.js WordPress Integration",
          "Cache-Control": "no-cache"
        },
        next: { revalidate: 300 },
      }
    )

    const categories = categoriesResponse.ok ? await categoriesResponse.json() : []
    console.log(`Found ${categories.length} product categories`)

    // Créer un mapping des catégories par ID
    const categoryMap = new Map()
    categories.forEach(cat => {
      categoryMap.set(cat.id, cat)
    })

    // Grouper les produits par catégorie
    const productsByCategory = new Map()
    allProducts.forEach(product => {
      if (product.categories && product.categories.length > 0) {
        product.categories.forEach(catId => {
          if (!productsByCategory.has(catId)) {
            productsByCategory.set(catId, [])
          }
          productsByCategory.get(catId).push(product)
        })
      }
    })

    // Récupérer 1 produit de chaque catégorie mappée
    const featuredProducts = []
    
    for (const category of categoryMappings) {
      try {
        // Trouver la catégorie WordPress correspondante
        const wpCategory = categories.find(cat => cat.slug === category.wordpressSlug)
        
        if (!wpCategory) {
          console.log(`Category ${category.wordpressSlug} not found in WordPress`)
          continue
        }

        // Récupérer le premier produit de cette catégorie
        const categoryProducts = productsByCategory.get(wpCategory.id) || []
        
        if (categoryProducts.length === 0) {
          console.log(`No products found for category ${category.name}`)
          continue
        }

        const product = categoryProducts[0]
        console.log(`Found product for category ${category.name}: ${product.title.rendered}`)

        featuredProducts.push({
          id: product.id.toString(),
          title: product.title.rendered,
          slug: product.slug,
          excerpt: product.excerpt.rendered?.replace(/<[^>]*>/g, "").substring(0, 150) + "..." || "Description non disponible",
          content: product.content.rendered || "",
          image: product._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
          price: product.acf?.price || "Prix sur demande",
          regularPrice: product.acf?.regular_price,
          salePrice: product.acf?.sale_price,
          currency: "€",
          stockStatus: product.acf?.stock_status || "instock",
          averageRating: parseFloat(product.acf?.average_rating) || 4.5,
          ratingCount: parseInt(product.acf?.rating_count) || 0,
          externalUrl: product.acf?.external_url || null,
          buttonText: "Voir le produit",
          categories: [category.name],
          tags: product.acf?.tags ? product.acf.tags.split(",") : [],
          seo: {
            title: product.title.rendered,
            description: product.excerpt.rendered?.replace(/<[^>]*>/g, "").substring(0, 160) || "",
            keywords: [],
          },
          categoryInfo: {
            name: category.name,
            description: category.description,
            slug: category.nextJsSlug,
            image: category.image
          }
        })
      } catch (error) {
        console.error(`Error processing category ${category.name}:`, error)
      }
    }

    // Trier par nom de catégorie
    const validProducts = featuredProducts
      .sort((a, b) => a.categoryInfo.name.localeCompare(b.categoryInfo.name))

    console.log(`✅ Featured products fetched: ${validProducts.length} products from ${categoryMappings.length} categories`)

    return NextResponse.json(validProducts)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 })
  }
}
