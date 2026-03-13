import { NextRequest, NextResponse } from 'next/server'
import { fetchWooCommerce } from '@/lib/woocommerce-api'

const categorySlugMapping: Record<string, string> = {
  'pistolets-de-massage-musculaire': 'pistolets-massage',
  'massage-des-pieds': 'pieds',
  'massage-pour-le-dos-et-la-nuque': 'dos-nuque',
  'appareils-de-pressotherapie': 'pressotherapie',
  'massage-de-la-tete-et-cuir-chevelu': 'tete-cuir-chevelu',
  'appareils-de-massage-oculaires': 'massage-oculaire',
  'appareils-de-massage-pour-les-jambes-et-mollets': 'jambes-mollets',
  'appareils-de-massage-multifonctions': 'multifonctions',
  'coussinets-et-ceintures-de-massage': 'coussinets-ceintures',
  'massage-des-mains': 'mains',
  'fauteuils-de-massage': 'fauteuils-de-massage',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const exclude = searchParams.get('exclude') || ''
  const limit = searchParams.get('limit') || '5'

  try {
    const response = await fetchWooCommerce(
      `/products?per_page=${limit}&exclude=${exclude}&status=publish&orderby=date&order=desc`
    )
    const products = await response.json()

    const formatted = products.map((p: any) => {
      const wooSlug = p.categories?.[0]?.slug || ''
      const siteSlug = categorySlugMapping[wooSlug] || wooSlug
      return {
        id: p.id,
        title: p.name,
        slug: p.slug,
        image: p.images?.[0]?.src || null,
        price: p.price,
        currency: 'EUR',
        categorySlug: siteSlug,
        categoryName: p.categories?.[0]?.name || '',
      }
    })

    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}
