import { NextRequest, NextResponse } from 'next/server'
import { fetchWooCommerce } from '@/src/lib/api/woocommerce-api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const exclude = searchParams.get('exclude') || ''
  const limit = searchParams.get('limit') || '4'

  try {
    const response = await fetchWooCommerce(
      `/products?per_page=${limit}&exclude=${exclude}&status=publish&orderby=rand`
    )
    const products = await response.json()

    const formatted = products.map((p: any) => ({
      id: p.id,
      title: p.name,
      slug: p.slug,
      image: p.images?.[0]?.src || null,
      price: p.price,
      currency: 'EUR',
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}
