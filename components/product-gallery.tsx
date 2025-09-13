"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  content: string
  className?: string
}

export function ProductGallery({ content, className = "" }: ProductGalleryProps) {
  const [showLightbox, setShowLightbox] = useState(false)
  const [currentImage, setCurrentImage] = useState<string>("")
  const [currentAlt, setCurrentAlt] = useState<string>("")

  // Écouter les événements de lightbox
  useEffect(() => {
    const handleOpenLightbox = (event: CustomEvent) => {
      setCurrentImage(event.detail.src)
      setCurrentAlt(event.detail.alt)
      setShowLightbox(true)
    }

    window.addEventListener('openLightbox', handleOpenLightbox as EventListener)
    
    return () => {
      window.removeEventListener('openLightbox', handleOpenLightbox as EventListener)
    }
  }, [])

  const handleImageClick = (src: string, alt: string) => {
    setCurrentImage(src)
    setCurrentAlt(alt)
    setShowLightbox(true)
  }

  const closeLightbox = () => {
    setShowLightbox(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <div className={`product-content-wrapper ${className}`}>
      <div 
        className="prose prose-xl max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
          prose-h1:text-4xl prose-h1:font-extrabold prose-h1:text-center prose-h1:bg-gradient-to-r prose-h1:from-purple-600 prose-h1:to-pink-600 prose-h1:bg-clip-text prose-h1:text-transparent
          prose-h2:text-3xl prose-h2:font-bold prose-h2:bg-gradient-to-r prose-h2:from-pink-500 prose-h2:to-red-500 prose-h2:bg-clip-text prose-h2:text-transparent prose-h2:border-l-4 prose-h2:border-pink-500 prose-h2:pl-4
          prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-green-600
          prose-h4:text-xl prose-h4:font-semibold prose-h4:text-red-600 prose-h4:bg-yellow-100 prose-h4:px-4 prose-h4:py-2 prose-h4:rounded-lg prose-h4:border-l-4 prose-h4:border-red-500
          prose-h5:text-lg prose-h5:font-semibold prose-h5:text-purple-600 prose-h5:uppercase prose-h5:tracking-wide
          prose-h6:text-base prose-h6:font-semibold prose-h6:text-blue-600 prose-h6:italic
          prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:text-justify
          prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:bg-yellow-100 prose-strong:px-1 prose-strong:py-0.5 prose-strong:rounded
          prose-em:italic prose-em:text-gray-600 prose-em:bg-blue-100 prose-em:px-1 prose-em:py-0.5 prose-em:rounded
          prose-ul:space-y-2 prose-ul:my-6
          prose-li:text-lg prose-li:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-ol:space-y-2 prose-ol:my-6
          prose-blockquote:bg-gradient-to-r prose-blockquote:from-gray-50 prose-blockquote:to-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:italic prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-lg prose-blockquote:my-8
          prose-code:bg-gray-900 prose-code:text-white prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:border prose-pre:border-gray-700
          prose-table:w-full prose-table:my-8 prose-table:bg-white prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-lg
          prose-th:bg-gradient-to-r prose-th:from-purple-600 prose-th:to-pink-600 prose-th:text-white prose-th:p-4 prose-th:font-semibold prose-th:text-left
          prose-td:p-4 prose-td:border-b prose-td:border-gray-200 prose-td:text-gray-700
          prose-tr:hover:bg-gray-50
          prose-a:text-blue-600 prose-a:underline prose-a:font-medium prose-a:transition-colors prose-a:hover:text-blue-800
          prose-hr:border-none prose-hr:h-0.5 prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-gray-300 prose-hr:to-transparent prose-hr:my-8
          [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:object-contain [&_img]:cursor-pointer [&_img]:transition-transform [&_img]:hover:scale-105
          [&_a]:inline-flex [&_a]:items-center [&_a]:gap-2 [&_a]:px-6 [&_a]:py-3 [&_a]:bg-gradient-to-r [&_a]:from-orange-500 [&_a]:to-red-600 [&_a]:text-white [&_a]:font-semibold [&_a]:rounded-lg [&_a]:shadow-lg [&_a]:transition-all [&_a]:duration-300 [&_a]:my-4 [&_a]:no-underline [&_a]:hover:shadow-xl [&_a]:hover:-translate-y-0.5
        "
        dangerouslySetInnerHTML={{ 
          __html: content
            .replace(/<img([^>]*)>/gi, (match, attributes) => {
              // Extraire src et alt des attributs
              const srcMatch = attributes.match(/src="([^"]*)"/);
              const altMatch = attributes.match(/alt="([^"]*)"/);
              const src = srcMatch ? srcMatch[1] : '';
              const alt = altMatch ? altMatch[1] : 'Image';
              
              return `<img${attributes} onclick="window.openImageLightbox('${src}', '${alt}')" style="cursor: pointer;" />`;
            })
            .replace(/<a([^>]*href="[^"]*amazon[^"]*"[^>]*)>/gi, (match, attributes) => {
              return `<a${attributes} class="affiliate-button">`;
            })
            .replace(/<a([^>]*href="[^"]*shop[^"]*"[^>]*)>/gi, (match, attributes) => {
              return `<a${attributes} class="affiliate-button">`;
            })
            .replace(/<a([^>]*href="[^"]*buy[^"]*"[^>]*)>/gi, (match, attributes) => {
              return `<a${attributes} class="affiliate-button">`;
            })
        }}
      />
      
      {/* Lightbox */}
      {showLightbox && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <Image
              src={currentImage}
              alt={currentAlt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Fonction globale pour ouvrir la lightbox
if (typeof window !== 'undefined') {
  (window as any).openImageLightbox = (src: string, alt: string) => {
    const event = new CustomEvent('openLightbox', { detail: { src, alt } });
    window.dispatchEvent(event);
  };
}
