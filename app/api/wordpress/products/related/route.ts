import { NextRequest, NextResponse } from 'next/server'
import { fetchWooCommerce } from '@/lib/woocommerce-api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const exclude = searchParams.get('exclude') || ''
  const limit = searchParams.get('limit') || '5'
  const category = searchParams.get('category') || ''

  try {
    const categoryParam = category ? `&category=${category}` : ''
    const response = await fetchWooCommerce(
      `/products?per_page=${limit}&exclude=${exclude}&status=publish&orderby=date&order=desc${categoryParam}`
    )
    const products = await response.json()

    const formatted = products.map((p: any) => ({
      id: p.id,
      title: p.name,
      slug: p.slug,
      image: p.images?.[0]?.src || null,
      price: p.price,
      currency: 'EUR',
      categorySlug: p.categories?.[0]?.slug || '',
      categoryName: p.categories?.[0]?.name || '',
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}
