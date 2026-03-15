"use client"

import { useEffect, useState } from "react"
import { List } from "lucide-react"

interface Heading {
  id: string
  text: string
}

function extractH2s(html: string): Heading[] {
  // Nettoyer les spans Elementor
  const cleaned = html
    .replace(/<span[^>]*>(.*?)<\/span>/gi, "$1")
    .replace(/\s+/g, " ")

  const matches = [...cleaned.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)]

  return matches
    .map((match) => {
      const rawText = match[1].replace(/<[^>]*>/g, "").trim()
      const id = rawText
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 60)

      return { id, text: rawText }
    })
    .filter((h) => h.text.length > 0)
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    setHeadings(extractH2s(content))
  }, [content])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav className="bg-muted/40 border border-border rounded-xl p-6 mb-10">
      <div className="flex items-center gap-2 mb-4">
        <List className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-base">Table des matières</h2>
      </div>

      <ol className="space-y-2 list-none">
        {headings.map((heading, index) => (
          <li key={index}>
            <a
              href={`#${heading.id}`}
              className={`text-sm hover:text-primary transition-colors flex items-center gap-2 ${
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(heading.id)
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" })
                  window.history.pushState(null, "", `#${heading.id}`)
                }
              }}
            >
              <span className="text-primary font-medium min-w-[20px]">
                {index + 1}.
              </span>
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
