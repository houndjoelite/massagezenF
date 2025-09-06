import { NextResponse } from "next/server"

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "https://your-domain.com/wp-json/wp/v2"

export async function GET() {
  try {
    // Fetch both post categories and product categories
    const [postCategories, productCategories] = await Promise.all([
      fetch(`${WORDPRESS_API_URL}/categories?per_page=100`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }),
      fetch(`${WORDPRESS_API_URL}/product_categories?per_page=100`, {
        next: { revalidate: 3600 },
      }).catch(() => ({ ok: false })), // Fallback if custom taxonomy doesn't exist
    ])

    const categories = {
      posts: [],
      products: [],
    }

    if (postCategories.ok) {
      const postCats = await postCategories.json()
      categories.posts = postCats.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
      }))
    }

    if (productCategories.ok) {
      const prodCats = await productCategories.json()
      categories.products = prodCats.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
      }))
    }

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching WordPress categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
