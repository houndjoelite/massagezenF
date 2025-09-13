"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  content: string
  className?: string
}

export function ProductGallery({ content, className = "" }: ProductGalleryProps) {
  const [processedContent, setProcessedContent] = useState<string>("")
  const [showLightbox, setShowLightbox] = useState(false)
  const [currentGallery, setCurrentGallery] = useState<{ images: string[], captions: string[] } | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Traiter le contenu pour remplacer les galeries par nos composants
    let processedHtml = content
    
    // Détecter les galeries WordPress et les groupes d'images
    let galleryIndex = 0
    const galleries: Array<{ images: string[], captions: string[] }> = []
    
    // Créer un DOM temporaire pour analyser le HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = processedHtml
    
    // 1. Détecter les galeries WordPress natives (.gallery, .wp-block-gallery)
    const wordpressGalleries = tempDiv.querySelectorAll('.gallery, .wp-block-gallery, [class*="gallery"]')
    wordpressGalleries.forEach((gallery) => {
      const images = Array.from(gallery.querySelectorAll('img'))
      if (images.length >= 2) {
        const galleryImages: string[] = []
        const galleryCaptions: string[] = []
        
        images.forEach((img) => {
          const imgElement = img as HTMLImageElement
          galleryImages.push(imgElement.src)
          // Chercher une légende dans le conteneur parent
          const caption = img.closest('.gallery-item, .wp-block-image, figure')?.querySelector('figcaption, .wp-caption-text, .gallery-caption, .wp-element-caption')
          galleryCaptions.push(caption?.textContent?.trim() || '')
        })
        
        galleries.push({ images: galleryImages, captions: galleryCaptions })
        
        // Remplacer la galerie WordPress par un placeholder
        const placeholder = document.createElement('div')
        placeholder.setAttribute('data-gallery-index', galleryIndex.toString())
        placeholder.className = 'gallery-placeholder'
        gallery.parentNode?.replaceChild(placeholder, gallery)
        
        galleryIndex++
      }
    })
    
    // 2. Détecter les groupes d'images consécutives (pas dans des galeries WordPress)
    const allImages = tempDiv.querySelectorAll('img:not(.gallery img, .wp-block-gallery img, [class*="gallery"] img)')
    let currentGroup: { images: string[], captions: string[], elements: Element[] } = { images: [], captions: [], elements: [] }
    
    allImages.forEach((img, index) => {
      // Vérifier si cette image fait partie d'un groupe
      const nextImg = allImages[index + 1]
      const prevImg = allImages[index - 1]
      
      // Si c'est la première image d'un groupe ou si elle suit une autre image
      if (!prevImg || (img.previousElementSibling === prevImg) || (img.parentElement === prevImg.parentElement)) {
        const imgElement = img as HTMLImageElement
        currentGroup.images.push(imgElement.src)
        currentGroup.elements.push(img)
        
        // Chercher une légende
        const caption = img.parentElement?.querySelector('figcaption, .wp-caption-text, .gallery-caption, .wp-element-caption')
        currentGroup.captions.push(caption?.textContent?.trim() || '')
        
        // Si c'est la dernière image du groupe (pas d'image suivante ou pas consécutive)
        if (!nextImg || (img.nextElementSibling !== nextImg) || (img.parentElement !== nextImg.parentElement)) {
          if (currentGroup.images.length >= 2) {
            // C'est un groupe d'images, le remplacer par une galerie
            galleries.push({ images: currentGroup.images, captions: currentGroup.captions })
            
            // Remplacer le premier élément du groupe par un placeholder
            const firstElement = currentGroup.elements[0]
            const placeholder = document.createElement('div')
            placeholder.setAttribute('data-gallery-index', galleryIndex.toString())
            placeholder.className = 'gallery-placeholder'
            firstElement.parentNode?.replaceChild(placeholder, firstElement)
            
            // Supprimer les autres éléments du groupe
            currentGroup.elements.slice(1).forEach(el => el.remove())
            
            galleryIndex++
          }
          currentGroup = { images: [], captions: [], elements: [] }
        }
      }
    })
    
    // Mettre à jour le HTML traité
    processedHtml = tempDiv.innerHTML
    
    setProcessedContent(processedHtml)
    
    // Stocker les galeries pour le rendu
    ;(window as any).__product_galleries = galleries

    // Attendre que le DOM soit mis à jour, puis remplacer les placeholders
    setTimeout(() => {
      const contentElement = document.querySelector('.product-content')
      if (!contentElement) return

      // Récupérer les galeries depuis le window
      const storedGalleries = (window as any).__product_galleries as Array<{ images: string[], captions: string[] }>
      if (!storedGalleries) return

      // Remplacer les placeholders par les composants de galerie
      const placeholders = contentElement.querySelectorAll('.gallery-placeholder')
      placeholders.forEach((placeholder) => {
        const galleryIndex = parseInt(placeholder.getAttribute('data-gallery-index') || '0')
        const gallery = storedGalleries[galleryIndex]
        
        if (gallery && gallery.images && gallery.captions) {
          const galleryContainer = document.createElement('div')
          galleryContainer.className = 'product-gallery-container'
          galleryContainer.innerHTML = `
            <div class="product-gallery-grid">
              ${gallery.images.map((image: string, index: number) => `
                <div class="product-gallery-item" onclick="productGalleryOpenLightbox(${galleryIndex}, ${index})" role="button" tabindex="0" aria-label="Voir l'image ${index + 1} de la galerie produit">
                  <img 
                    src="${image}" 
                    alt="${gallery.captions[index] || `Image ${index + 1}`}" 
                    loading="lazy"
                    decoding="async"
                  />
                  ${gallery.captions[index] ? `
                    <div class="gallery-caption">
                      ${gallery.captions[index]}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          `
          placeholder.replaceWith(galleryContainer)
        }
      })

      // Styliser les liens et transformer les liens d'affiliation en boutons
      const links = contentElement.querySelectorAll('a')
      links.forEach((link) => {
        const href = link.getAttribute('href') || ''
        const text = link.textContent?.toLowerCase() || ''
        
        // Détecter les liens d'affiliation
        const isAffiliateLink = href.includes('amazon') || 
                               href.includes('shop') || 
                               href.includes('buy') ||
                               text.includes('voir sur amazon') ||
                               text.includes('acheter') ||
                               text.includes('commander') ||
                               text.includes('disponible sur') ||
                               text.includes('voir le produit') ||
                               text.includes('voir sur') ||
                               text.includes('en savoir plus') ||
                               text.includes('découvrir')
        
        if (isAffiliateLink) {
          // Transformer en bouton d'affiliation
          link.classList.add('affiliate-button', 'inline-flex', 'items-center', 'gap-2', 'px-6', 'py-3', 'bg-gradient-to-r', 'from-orange-500', 'to-red-600', 'text-white', 'font-semibold', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition-all', 'duration-300', 'hover:scale-105', 'my-4', 'no-underline')
          
          // Ajouter une icône si c'est Amazon
          if (href.includes('amazon') || text.includes('amazon')) {
            link.innerHTML = `
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              ${link.textContent}
            `
          } else {
            // Icône générique pour les autres liens d'affiliation
            link.innerHTML = `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              ${link.textContent}
            `
          }
        } else {
          // Lien normal
          link.classList.add('text-primary', 'hover:underline', 'font-medium')
        }
      })

      // Styliser les images individuelles - amélioration pour l'expérience utilisateur
      const images = contentElement.querySelectorAll('img')
      images.forEach((img) => {
        // Classes de base
        img.classList.add('rounded-lg', 'shadow-md', 'my-6', 'max-w-full', 'h-auto')
        
        // Styles responsifs améliorés
        img.style.maxWidth = '100%'
        img.style.width = '100%'
        img.style.height = 'auto'
        img.style.display = 'block'
        img.style.marginLeft = 'auto'
        img.style.marginRight = 'auto'
        img.style.objectFit = 'contain'
        
        // Détecter si l'image est dans une galerie ou seule
        const isInGallery = img.closest('.gallery, .wp-block-gallery, .product-gallery-container, .product-gallery-grid')
        
        if (!isInGallery) {
          // Image unique - optimiser l'affichage
          img.style.maxWidth = 'min(800px, 100%)'
          img.style.width = '100%'
          img.style.height = 'auto'
          img.style.maxHeight = '70vh'
          img.style.objectFit = 'contain'
          img.style.cursor = 'pointer'
          
          // Ajouter un effet de zoom au survol pour les images uniques
          img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.02)'
            img.style.transition = 'transform 0.3s ease'
          })
          
          img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)'
          })
          
          // Permettre le clic pour agrandir l'image
          img.addEventListener('click', () => {
            const lightbox = document.createElement('div')
            lightbox.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.9);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              cursor: pointer;
            `
            
            const enlargedImg = img.cloneNode(true) as HTMLImageElement
            enlargedImg.style.cssText = `
              max-width: 90%;
              max-height: 90%;
              object-fit: contain;
              border-radius: 8px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            `
            
            lightbox.appendChild(enlargedImg)
            document.body.appendChild(lightbox)
            
            lightbox.addEventListener('click', () => {
              document.body.removeChild(lightbox)
            })
          })
        }
      })

    }, 100)
  }, [content])

  // Ajouter les fonctions globales pour les galeries
  useEffect(() => {
    // Fonction pour ouvrir la lightbox depuis une galerie produit
    (window as any).productGalleryOpenLightbox = (galleryIndex: number, imageIndex: number) => {
      const galleries = (window as any).__product_galleries
      if (galleries && galleries[galleryIndex]) {
        setCurrentGallery(galleries[galleryIndex])
        setCurrentImageIndex(imageIndex)
        setShowLightbox(true)
      }
    }

    // Fonction pour naviguer vers l'image précédente dans la lightbox
    (window as any).productGalleryPrevious = () => {
      if (currentGallery && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1)
      } else if (currentGallery) {
        setCurrentImageIndex(currentGallery.images.length - 1)
      }
    }

    // Fonction pour naviguer vers l'image suivante dans la lightbox
    (window as any).productGalleryNext = () => {
      if (currentGallery && currentImageIndex < currentGallery.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1)
      } else if (currentGallery) {
        setCurrentImageIndex(0)
      }
    }
  }, [currentGallery, currentImageIndex])

  const closeLightbox = () => {
    setShowLightbox(false)
  }

  const goToPrevious = () => {
    if (currentGallery && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentGallery && currentImageIndex < currentGallery.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }

  return (
    <div className={`product-content-wrapper ${className}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .product-content {
            max-width: none !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: #374151;
          }
          
          .product-content h1 {
            font-size: 2.5rem !important;
            font-weight: 800 !important;
            line-height: 1.2 !important;
            margin: 2rem 0 1.5rem 0 !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            text-align: center;
            position: relative;
          }
          
          .product-content h1::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 2px;
          }
          
          .product-content h2 {
            font-size: 2rem !important;
            font-weight: 700 !important;
            line-height: 1.3 !important;
            margin: 2rem 0 1.25rem 0 !important;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            border-left: 4px solid #f5576c;
            padding-left: 1rem;
          }
          
          .product-content h3 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin: 1.75rem 0 1rem 0 !important;
            color: #059669 !important;
            position: relative;
          }
          
          .product-content h3::before {
            content: '▶';
            color: #059669;
            margin-right: 0.5rem;
            font-size: 0.8em;
          }
          
          .product-content h4 {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin: 1.5rem 0 0.75rem 0 !important;
            color: #dc2626 !important;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border-left: 4px solid #dc2626;
          }
          
          .product-content h5 {
            font-size: 1.125rem !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin: 1.25rem 0 0.5rem 0 !important;
            color: #7c3aed !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .product-content h6 {
            font-size: 1rem !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin: 1rem 0 0.5rem 0 !important;
            color: #0891b2 !important;
            font-style: italic;
          }
          
          .product-content p {
            font-size: 1.125rem !important;
            line-height: 1.8 !important;
            margin: 1.25rem 0 !important;
            color: #4b5563 !important;
            text-align: justify;
          }
          
          .product-content strong {
            font-weight: 700 !important;
            color: #1f2937 !important;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
          }
          
          .product-content em {
            font-style: italic !important;
            color: #6b7280 !important;
            background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
          }
          
          .product-content ul {
            margin: 1.5rem 0 !important;
            padding-left: 0 !important;
          }
          
          .product-content ul li {
            position: relative;
            padding-left: 2rem !important;
            margin: 0.75rem 0 !important;
            font-size: 1.125rem !important;
            line-height: 1.7 !important;
            color: #4b5563 !important;
          }
          
          .product-content ul li::before {
            content: '✨';
            position: absolute;
            left: 0;
            top: 0;
            font-size: 1.2em;
          }
          
          .product-content ol {
            margin: 1.5rem 0 !important;
            padding-left: 0 !important;
            counter-reset: custom-counter;
          }
          
          .product-content ol li {
            position: relative;
            padding-left: 3rem !important;
            margin: 0.75rem 0 !important;
            font-size: 1.125rem !important;
            line-height: 1.7 !important;
            color: #4b5563 !important;
            counter-increment: custom-counter;
          }
          
          .product-content ol li::before {
            content: counter(custom-counter);
            position: absolute;
            left: 0;
            top: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.875rem;
          }
          
          .product-content blockquote {
            margin: 2rem 0 !important;
            padding: 1.5rem !important;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
            border-left: 4px solid #3b82f6 !important;
            border-radius: 0.5rem !important;
            font-style: italic !important;
            color: #475569 !important;
            position: relative;
          }
          
          .product-content blockquote::before {
            content: '"';
            position: absolute;
            top: -0.5rem;
            left: 1rem;
            font-size: 3rem;
            color: #3b82f6;
            font-family: serif;
          }
          
          .product-content code {
            background: #1f2937 !important;
            color: #f9fafb !important;
            padding: 0.25rem 0.5rem !important;
            border-radius: 0.25rem !important;
            font-size: 0.875rem !important;
            font-family: 'Fira Code', monospace !important;
          }
          
          .product-content pre {
            background: #1f2937 !important;
            color: #f9fafb !important;
            padding: 1.5rem !important;
            border-radius: 0.75rem !important;
            overflow-x: auto !important;
            margin: 1.5rem 0 !important;
            border: 1px solid #374151;
          }
          
          .product-content pre code {
            background: none !important;
            padding: 0 !important;
            color: inherit !important;
          }
          
          .product-content table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 2rem 0 !important;
            background: white !important;
            border-radius: 0.75rem !important;
            overflow: hidden !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          }
          
          .product-content th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            padding: 1rem !important;
            text-align: left !important;
            font-weight: 600 !important;
          }
          
          .product-content td {
            padding: 1rem !important;
            border-bottom: 1px solid #e5e7eb !important;
            color: #374151 !important;
          }
          
          .product-content tr:hover {
            background: #f9fafb !important;
          }
          
          .product-gallery-container {
            margin: 2rem 0 !important;
          }
          
          .product-gallery-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            gap: 1rem !important;
            margin: 1.5rem 0 !important;
          }
          
          .product-gallery-item {
            position: relative !important;
            border-radius: 0.75rem !important;
            overflow: hidden !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          }
          
          .product-gallery-item:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
          }
          
          .product-gallery-item img {
            width: 100% !important;
            height: 200px !important;
            object-fit: cover !important;
            transition: transform 0.3s ease !important;
          }
          
          .product-gallery-item:hover img {
            transform: scale(1.05) !important;
          }
          
          .gallery-caption {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8)) !important;
            color: white !important;
            padding: 1rem !important;
            font-size: 0.875rem !important;
            font-weight: 500 !important;
          }
          
          .affiliate-button {
            display: inline-flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            padding: 0.75rem 1.5rem !important;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
            color: white !important;
            font-weight: 600 !important;
            border-radius: 0.5rem !important;
            text-decoration: none !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.3s ease !important;
            margin: 1rem 0 !important;
          }
          
          .affiliate-button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
            text-decoration: none !important;
          }
          
          .product-content a:not(.affiliate-button) {
            color: #3b82f6 !important;
            text-decoration: underline !important;
            font-weight: 500 !important;
            transition: color 0.3s ease !important;
          }
          
          .product-content a:not(.affiliate-button):hover {
            color: #1d4ed8 !important;
          }
          
          .product-content hr {
            border: none !important;
            height: 2px !important;
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent) !important;
            margin: 2rem 0 !important;
          }
          
          @media (max-width: 768px) {
            .product-content h1 {
              font-size: 2rem !important;
            }
            
            .product-content h2 {
              font-size: 1.75rem !important;
            }
            
            .product-content h3 {
              font-size: 1.25rem !important;
            }
            
            .product-content p {
              font-size: 1rem !important;
            }
            
            .product-gallery-grid {
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
            }
          }
        `
      }} />
      <div 
        className="product-content prose prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: processedContent || content }}
      />
      
      {/* Lightbox */}
      {showLightbox && currentGallery && (
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
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <Image
              src={currentGallery.images[currentImageIndex]}
              alt={currentGallery.captions[currentImageIndex] || `Image ${currentImageIndex + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {currentGallery.captions[currentImageIndex] && (
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <p className="bg-black bg-opacity-75 rounded-lg p-3">
                  {currentGallery.captions[currentImageIndex]}
                </p>
              </div>
            )}
            
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {currentGallery.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
