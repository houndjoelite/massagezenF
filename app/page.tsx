import Header from "@/components/header"
import Hero from "@/components/hero"
import CategoryGrid from "@/components/category-grid"
import { BlogPreview } from "@/components/blog-preview"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CategoryGrid />
      <BlogPreview />
      <Footer />
    </div>
  )
}
