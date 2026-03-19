"use client"

import { useEffect, useState, useRef } from "react"

interface WordPressContentProps {
  content: string
  className?: string
}

export function WordPressContent({ content, className = "" }: WordPressContentProps) {
  const [processedContent, setProcessedContent] = useState<string>("")
  const [lightboxData, setLightboxData] = useState<{ images: string[]; captions: string[]; index: number } | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  /* ─────────────────────────────────────────────
     1. Process HTML galleries
  ───────────────────────────────────────────── */
  useEffect(() => {
    let html = content
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = html

    const galleries: Array<{ images: string[]; captions: string[] }> = []
    let gIdx = 0

    // WordPress native galleries
    tempDiv.querySelectorAll(".gallery, .wp-block-gallery, [class*='gallery']").forEach((gal) => {
      const imgs = Array.from(gal.querySelectorAll("img"))
      if (imgs.length >= 2) {
        const images: string[] = []
        const captions: string[] = []
        imgs.forEach((img) => {
          images.push((img as HTMLImageElement).src)
          const cap = img.closest(".gallery-item, .wp-block-image, figure")
            ?.querySelector("figcaption, .wp-caption-text, .gallery-caption, .wp-element-caption")
          captions.push(cap?.textContent?.trim() || "")
        })
        galleries.push({ images, captions })
        const ph = document.createElement("div")
        ph.dataset.galleryIndex = String(gIdx++)
        ph.className = "mz-gallery-placeholder"
        gal.parentNode?.replaceChild(ph, gal)
      }
    })

    ;(window as any).__mz_galleries = galleries
    setProcessedContent(tempDiv.innerHTML)
  }, [content])

  /* ─────────────────────────────────────────────
     2. Apply rich styling after mount
  ───────────────────────────────────────────── */
  useEffect(() => {
    if (!processedContent || !contentRef.current) return
    const el = contentRef.current

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      applyStyles(el, setLightboxData)
      renderGalleries(el)
    }, 60)

    return () => clearTimeout(timer)
  }, [processedContent])

  /* ─────────────────────────────────────────────
     3. Keyboard for lightbox
  ───────────────────────────────────────────── */
  useEffect(() => {
    if (!lightboxData) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxData(null)
      if (e.key === "ArrowLeft") setLightboxData((p) => p && p.index > 0 ? { ...p, index: p.index - 1 } : p)
      if (e.key === "ArrowRight") setLightboxData((p) => p && p.index < p.images.length - 1 ? { ...p, index: p.index + 1 } : p)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxData])

  return (
    <div className={`mz-article-wrapper ${className}`}>
      <style>{STYLES}</style>

      <div
        ref={contentRef}
        className="mz-content"
        dangerouslySetInnerHTML={{ __html: processedContent || content }}
      />

      {/* Lightbox */}
      {lightboxData && (
        <div
          className="mz-lightbox"
          onClick={() => setLightboxData(null)}
          role="dialog"
          aria-modal="true"
        >
          <button className="mz-lb-close" onClick={() => setLightboxData(null)} aria-label="Fermer">✕</button>
          <span className="mz-lb-counter">{lightboxData.index + 1} / {lightboxData.images.length}</span>

          {lightboxData.index > 0 && (
            <button className="mz-lb-nav mz-lb-prev" onClick={(e) => { e.stopPropagation(); setLightboxData((p) => p ? { ...p, index: p.index - 1 } : p) }} aria-label="Précédent">‹</button>
          )}

          <img
            src={lightboxData.images[lightboxData.index]}
            alt={lightboxData.captions[lightboxData.index] || ""}
            className="mz-lb-img"
            onClick={(e) => e.stopPropagation()}
          />

          {lightboxData.index < lightboxData.images.length - 1 && (
            <button className="mz-lb-nav mz-lb-next" onClick={(e) => { e.stopPropagation(); setLightboxData((p) => p ? { ...p, index: p.index + 1 } : p) }} aria-label="Suivant">›</button>
          )}

          {lightboxData.captions[lightboxData.index] && (
            <p className="mz-lb-caption">{lightboxData.captions[lightboxData.index]}</p>
          )}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   STYLE ENGINE — applique le design éditorial
═══════════════════════════════════════════════════ */
function applyStyles(
  el: HTMLElement,
  openLightbox: (data: { images: string[]; captions: string[]; index: number }) => void
) {
  /* --- HEADINGS --- */
  el.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6").forEach((h) => {
    const lvl = parseInt(h.tagName[1])
    h.classList.add("mz-heading", `mz-h${lvl}`)

    // Anchor id for TOC
    if (lvl === 2) {
      const id = (h.textContent || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 60)
      if (id) h.id = id
    }
  })

  /* --- PARAGRAPHS --- */
  el.querySelectorAll<HTMLElement>("p").forEach((p) => {
    if (!p.closest(".mz-callout, .mz-stat-box, .mz-modele-card, .mz-profil-card")) {
      p.classList.add("mz-para")
    }
  })

  /* --- LISTS --- */
  el.querySelectorAll<HTMLElement>("ul,ol").forEach((list) => {
    if (!list.closest(".mz-callout, .mz-pros, .mz-cons, .mz-sommaire")) {
      list.classList.add("mz-list")
    }
    list.querySelectorAll<HTMLElement>("li").forEach((li) => li.classList.add("mz-li"))
  })

  /* --- BLOCKQUOTES --- */
  el.querySelectorAll<HTMLElement>("blockquote").forEach((q) => q.classList.add("mz-blockquote"))

  /* --- TABLES --- */
  el.querySelectorAll<HTMLElement>("table").forEach((t) => {
    // Wrap for horizontal scroll
    if (!t.parentElement?.classList.contains("mz-table-wrap")) {
      const wrap = document.createElement("div")
      wrap.className = "mz-table-wrap"
      t.parentNode?.insertBefore(wrap, t)
      wrap.appendChild(t)
    }
    t.classList.add("mz-table")
    t.querySelectorAll<HTMLElement>("thead").forEach((th) => th.classList.add("mz-thead"))
    t.querySelectorAll<HTMLElement>("th").forEach((th) => th.classList.add("mz-th"))
    t.querySelectorAll<HTMLElement>("td").forEach((td) => td.classList.add("mz-td"))
    t.querySelectorAll<HTMLElement>("tr").forEach((tr, i) => {
      if (i % 2 === 0) tr.classList.add("mz-tr-even")
    })
    // Visual badges for ✓ / ✗
    t.querySelectorAll<HTMLElement>("td").forEach((td) => {
      const txt = td.textContent?.trim() || ""
      if (txt.startsWith("✓") || txt.toLowerCase() === "oui") td.classList.add("mz-cell-yes")
      else if (txt.startsWith("✗") || txt.toLowerCase() === "non") td.classList.add("mz-cell-no")
      else if (txt.startsWith("⚡")) td.classList.add("mz-cell-partial")
    })
  })

  /* --- FIGURES & IMAGES --- */
  el.querySelectorAll<HTMLElement>("figure").forEach((fig) => {
    fig.classList.add("mz-figure")
    fig.querySelector("figcaption")?.classList.add("mz-figcaption")
  })

  el.querySelectorAll<HTMLImageElement>("img:not(.mz-lb-img)").forEach((img) => {
    if (img.closest(".mz-gallery-grid, .mz-lb-img")) return
    img.classList.add("mz-img")
    img.loading = "lazy"
    img.decoding = "async"
    // Lightbox on click
    img.style.cursor = "zoom-in"
    img.addEventListener("click", () => {
      openLightbox({ images: [img.src], captions: [img.alt || ""], index: 0 })
    })
  })

  /* --- AFFILIATE LINKS → styled buttons --- */
  el.querySelectorAll<HTMLAnchorElement>("a").forEach((a) => {
    const href = a.getAttribute("href") || ""
    const txt = a.textContent?.toLowerCase() || ""
    const isAffiliate =
      href.includes("amazon") || href.includes("amzn") || href.includes("awin") ||
      txt.includes("voir sur amazon") || txt.includes("acheter") ||
      txt.includes("commander") || txt.includes("voir le produit") ||
      txt.includes("voir sur") || txt.includes("découvrir") || txt.includes("disponible")

    if (isAffiliate) {
      a.classList.add("mz-btn-affiliate")
      a.setAttribute("target", "_blank")
      a.setAttribute("rel", "nofollow sponsored noopener")
      // Amazon badge
      if (href.includes("amazon") || href.includes("amzn") || txt.includes("amazon")) {
        a.classList.add("mz-btn-amazon")
        if (!a.querySelector(".mz-amazon-icon")) {
          a.innerHTML = `<span class="mz-amazon-icon">🛒</span> ${a.textContent}`
        }
      }
    } else if (!a.closest("nav, .mz-sommaire, header, footer")) {
      a.classList.add("mz-link")
    }
  })

  /* --- CODE --- */
  el.querySelectorAll<HTMLElement>("pre").forEach((pre) => pre.classList.add("mz-pre"))
  el.querySelectorAll<HTMLElement>("code").forEach((code) => {
    if (!code.closest("pre")) code.classList.add("mz-code")
  })

  /* --- STRONG highlights --- */
  el.querySelectorAll<HTMLElement>("strong, b").forEach((s) => s.classList.add("mz-strong"))

  /* --- Remove empty nodes --- */
  el.querySelectorAll<HTMLElement>("p:empty, div:empty, span:empty").forEach((e) => {
    if (!e.innerHTML.trim()) e.remove()
  })
}

/* ═══════════════════════════════════════════════════
   GALLERY RENDERER
═══════════════════════════════════════════════════ */
function renderGalleries(el: HTMLElement) {
  const stored = (window as any).__mz_galleries as Array<{ images: string[]; captions: string[] }> | undefined
  if (!stored) return

  el.querySelectorAll<HTMLElement>(".mz-gallery-placeholder").forEach((ph) => {
    const idx = parseInt(ph.dataset.galleryIndex || "0")
    const gal = stored[idx]
    if (!gal) return

    const wrap = document.createElement("div")
    wrap.className = "mz-gallery-grid"
    wrap.innerHTML = gal.images
      .map(
        (src, i) => `
        <div class="mz-gallery-item" role="button" tabindex="0"
             onclick="window.__mz_open_lb(${idx},${i})"
             onkeydown="if(event.key==='Enter')window.__mz_open_lb(${idx},${i})"
             aria-label="Agrandir l'image ${i + 1}">
          <img src="${src}" alt="${gal.captions[i] || `Image ${i + 1}`}" loading="lazy" decoding="async" />
          ${gal.captions[i] ? `<div class="mz-gallery-caption">${gal.captions[i]}</div>` : ""}
        </div>`
      )
      .join("")
    ph.replaceWith(wrap)
  })
}

/* ═══════════════════════════════════════════════════
   SCOPED CSS — design éditorial MassageZen
═══════════════════════════════════════════════════ */
const STYLES = `
/* ── TOKENS ─────────────────────────────────────── */
.mz-article-wrapper {
  --mz-green:       #2d6a4f;
  --mz-green-light: #40916c;
  --mz-green-pale:  #e8f5e9;
  --mz-beige:       #f8f4ef;
  --mz-gold:        #d4a853;
  --mz-text:        #1a1a1a;
  --mz-muted:       #6b7280;
  --mz-border:      #e5e7eb;
  --mz-red:         #b91c1c;
  --mz-warn-bg:     #fff8e1;
  --mz-warn-border: #ffe082;
  --mz-info-bg:     #e3f2fd;
  --mz-info-border: #90caf9;
  --mz-radius:      10px;
  --mz-font-body:   Georgia, 'Times New Roman', serif;
  --mz-font-ui:     'Segoe UI', system-ui, sans-serif;
}

/* ── WRAPPER ─────────────────────────────────────── */
.mz-content {
  font-family: var(--mz-font-body);
  font-size: 17px;
  line-height: 1.85;
  color: var(--mz-text);
  max-width: 860px;
  margin: 0 auto;
}

/* ── HEADINGS ─────────────────────────────────────── */
.mz-content .mz-heading { font-family: var(--mz-font-ui); line-height: 1.25; margin-top: 3rem; margin-bottom: 1rem; }
.mz-content .mz-h1 { font-size: clamp(26px,4vw,40px); color: var(--mz-green); }
.mz-content .mz-h2 {
  font-size: clamp(20px,3vw,28px);
  color: var(--mz-green);
  border-bottom: 2px solid var(--mz-beige);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.mz-content .mz-h2::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 28px;
  background: var(--mz-gold);
  border-radius: 3px;
  flex-shrink: 0;
}
.mz-content .mz-h3 { font-size: clamp(17px,2.5vw,22px); color: var(--mz-text); margin-top: 2.2rem; }
.mz-content .mz-h4 { font-size: 17px; color: var(--mz-green-light); font-weight: 700; margin-top: 1.6rem; }
.mz-content .mz-h5,.mz-content .mz-h6 { font-size: 15px; color: var(--mz-muted); font-weight: 700; margin-top: 1.2rem; }

/* ── PARAGRAPHS ─────────────────────────────────── */
.mz-content .mz-para {
  margin-bottom: 1.2rem;
  color: #374151;
}

/* ── STRONG ─────────────────────────────────────── */
.mz-content .mz-strong {
  color: var(--mz-text);
  font-weight: 700;
}

/* ── LISTS ─────────────────────────────────────── */
.mz-content .mz-list {
  padding-left: 0;
  margin: 1.4rem 0;
  list-style: none;
}
.mz-content ul.mz-list .mz-li {
  padding-left: 1.6rem;
  position: relative;
  margin-bottom: 0.5rem;
  color: #374151;
}
.mz-content ul.mz-list .mz-li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 11px;
  width: 8px;
  height: 8px;
  background: var(--mz-green);
  border-radius: 50%;
}
.mz-content ol.mz-list { counter-reset: mz-ol; }
.mz-content ol.mz-list .mz-li {
  padding-left: 2rem;
  position: relative;
  margin-bottom: 0.5rem;
  color: #374151;
  counter-increment: mz-ol;
}
.mz-content ol.mz-list .mz-li::before {
  content: counter(mz-ol);
  position: absolute;
  left: 0;
  top: 1px;
  width: 22px;
  height: 22px;
  background: var(--mz-green);
  color: #fff;
  font-family: var(--mz-font-ui);
  font-size: 12px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── BLOCKQUOTE ─────────────────────────────────── */
.mz-content .mz-blockquote {
  border-left: 4px solid var(--mz-green);
  background: var(--mz-beige);
  padding: 16px 24px;
  border-radius: 0 var(--mz-radius) var(--mz-radius) 0;
  font-style: italic;
  color: #374151;
  margin: 1.8rem 0;
}

/* ── TABLE ─────────────────────────────────────── */
.mz-table-wrap {
  overflow-x: auto;
  margin: 1.8rem 0;
  border-radius: var(--mz-radius);
  border: 1px solid var(--mz-border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.mz-content .mz-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--mz-font-ui);
  font-size: 14px;
}
.mz-content .mz-thead { background: var(--mz-green); }
.mz-content .mz-th {
  color: #fff;
  padding: 12px 16px;
  text-align: left;
  font-weight: 700;
  white-space: nowrap;
}
.mz-content .mz-td {
  padding: 11px 16px;
  border-bottom: 1px solid var(--mz-border);
  vertical-align: top;
}
.mz-content .mz-tr-even .mz-td { background: var(--mz-beige); }
.mz-content .mz-cell-yes  { color: var(--mz-green); font-weight: 700; }
.mz-content .mz-cell-no   { color: var(--mz-red);   font-weight: 700; }
.mz-content .mz-cell-partial { color: #d97706; font-weight: 700; }

/* ── IMAGES ─────────────────────────────────────── */
.mz-content .mz-figure { margin: 2rem 0; text-align: center; }
.mz-content .mz-figcaption {
  font-family: var(--mz-font-ui);
  font-size: 13px;
  color: var(--mz-muted);
  margin-top: 8px;
  font-style: italic;
}
.mz-content .mz-img {
  max-width: 100%;
  height: auto;
  border-radius: var(--mz-radius);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  display: block;
  margin: 1.8rem auto;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.mz-content .mz-img:hover {
  transform: scale(1.015);
  box-shadow: 0 8px 28px rgba(0,0,0,0.15);
}

/* ── GALLERY GRID ───────────────────────────────── */
.mz-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  margin: 1.8rem 0;
}
.mz-gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: zoom-in;
  aspect-ratio: 1;
  background: var(--mz-beige);
}
.mz-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.mz-gallery-item:hover img { transform: scale(1.06); }
.mz-gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-family: var(--mz-font-ui);
  font-size: 12px;
  padding: 6px 10px;
}

/* ── LINKS ─────────────────────────────────────── */
.mz-content .mz-link {
  color: var(--mz-green-light);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
  font-weight: 500;
}
.mz-content .mz-link:hover { border-color: var(--mz-green-light); }

/* ── AFFILIATE BUTTONS ──────────────────────────── */
.mz-content .mz-btn-affiliate {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--mz-font-ui);
  font-weight: 700;
  font-size: 15px;
  text-decoration: none !important;
  border-bottom: none !important;
  margin: 1rem 0;
  transition: transform 0.2s, box-shadow 0.2s;
  background: linear-gradient(135deg, #f97316, #dc2626);
  color: #fff;
  box-shadow: 0 4px 14px rgba(220,38,38,0.35);
}
.mz-content .mz-btn-affiliate:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(220,38,38,0.4);
}
.mz-content .mz-btn-amazon {
  background: linear-gradient(135deg, #ff9900, #e47911);
  box-shadow: 0 4px 14px rgba(255,153,0,0.35);
}
.mz-content .mz-btn-amazon:hover {
  box-shadow: 0 8px 22px rgba(255,153,0,0.45);
}

/* ── CODE ─────────────────────────────────────── */
.mz-content .mz-pre {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 20px 24px;
  border-radius: var(--mz-radius);
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.6;
  margin: 1.8rem 0;
}
.mz-content .mz-code {
  background: var(--mz-beige);
  color: var(--mz-green);
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

/* ── CALLOUT BOXES (auto-detect from WP classes) ── */
/* WordPress often uses these classes — we restyle them */
.mz-content .wp-block-info,
.mz-content .notice,
.mz-content .callout,
.mz-content [class*="callout"],
.mz-content [class*="notice"],
.mz-content .mz-callout {
  border-radius: var(--mz-radius);
  padding: 18px 22px;
  margin: 1.8rem 0;
  font-family: var(--mz-font-ui);
  font-size: 15px;
  line-height: 1.65;
  background: var(--mz-green-pale);
  border: 1px solid #a5d6a7;
}
.mz-content [class*="warning"],
.mz-content [class*="caution"],
.mz-content .mz-callout-warning {
  background: var(--mz-warn-bg);
  border-color: var(--mz-warn-border);
}
.mz-content [class*="info"],
.mz-content .mz-callout-info {
  background: var(--mz-info-bg);
  border-color: var(--mz-info-border);
}

/* ── PRODUCT / MODELE CARDS  ────────────────────── */
/* Détecte les blocs WP avec une image + prix adjacente */
.mz-content .wp-block-group,
.mz-content .product-block,
.mz-content [class*="product"],
.mz-content [class*="modele"] {
  border: 1px solid var(--mz-border);
  border-radius: 12px;
  padding: 24px;
  margin: 1.8rem 0;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  transition: box-shadow 0.25s;
}
.mz-content .wp-block-group:hover,
.mz-content [class*="product"]:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.1);
}

/* ── STAT-LIKE PATTERN: 3+ sibling strong numbers ── */
/* We can't auto-detect stat-boxes from WP HTML perfectly,
   but any <p> that starts with a pure number + % or / gets a badge */
.mz-stat-badge {
  display: inline-block;
  font-size: 36px;
  font-weight: 700;
  color: var(--mz-green);
  font-family: var(--mz-font-ui);
  line-height: 1;
}

/* ── HORIZONTAL RULE ────────────────────────────── */
.mz-content hr {
  border: none;
  border-top: 2px solid var(--mz-beige);
  margin: 2.5rem 0;
}

/* ── LIGHTBOX ───────────────────────────────────── */
.mz-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: mzFadeIn 0.2s ease;
}
@keyframes mzFadeIn { from { opacity: 0 } to { opacity: 1 } }

.mz-lb-img {
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
}
.mz-lb-close {
  position: absolute;
  top: 20px;
  right: 24px;
  color: #fff;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
  line-height: 1;
}
.mz-lb-close:hover { opacity: 1; }
.mz-lb-counter {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.7);
  font-family: var(--mz-font-ui);
  font-size: 13px;
}
.mz-lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 48px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  line-height: 1;
  padding: 0 16px;
}
.mz-lb-nav:hover { opacity: 1; }
.mz-lb-prev { left: 10px; }
.mz-lb-next { right: 10px; }
.mz-lb-caption {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  background: rgba(0,0,0,0.65);
  padding: 8px 20px;
  border-radius: 20px;
  font-family: var(--mz-font-ui);
  font-size: 14px;
  white-space: nowrap;
  max-width: 80vw;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── RESPONSIVE ─────────────────────────────────── */
@media (max-width: 640px) {
  .mz-content { font-size: 16px; }
  .mz-content .mz-td, .mz-content .mz-th { padding: 9px 12px; font-size: 13px; }
  .mz-gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .mz-content .mz-btn-affiliate { width: 100%; justify-content: center; }
}
`
