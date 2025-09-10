"use client"

import { useEffect, useState } from "react"
import { ImageGallery } from "./image-gallery"
import "../styles/wordpress-content.css"

interface WordPressContentProps {
  content: string
  className?: string
}

export function WordPressContent({ content, className = "" }: WordPressContentProps) {
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
    ;(window as any).__wordpress_galleries = galleries

    // Attendre que le DOM soit mis à jour, puis remplacer les placeholders
    setTimeout(() => {
      const contentElement = document.querySelector('.wordpress-content')
      if (!contentElement) return

      // Récupérer les galeries depuis le window
      const storedGalleries = (window as any).__wordpress_galleries as Array<{ images: string[], captions: string[] }>
      if (!storedGalleries) return

      // Remplacer les placeholders par les composants de galerie
      const placeholders = contentElement.querySelectorAll('.gallery-placeholder')
      placeholders.forEach((placeholder) => {
        const galleryIndex = parseInt(placeholder.getAttribute('data-gallery-index') || '0')
        const gallery = storedGalleries[galleryIndex]
        
        if (gallery && gallery.images && gallery.captions) {
          const galleryContainer = document.createElement('div')
          galleryContainer.className = 'wordpress-gallery-container'
          galleryContainer.innerHTML = `
            <div class="simple-gallery-grid">
              ${gallery.images.map((image: string, index: number) => `
                <div class="gallery-item" onclick="galleryOpenLightbox(${galleryIndex}, ${index})" role="button" tabindex="0" aria-label="Voir l'image ${index + 1} de la galerie">
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

      // Supprimer les classes WordPress par défaut qui peuvent causer des conflits
      // MAIS préserver les icônes de shop et leurs liens
      const elementsToClean = contentElement.querySelectorAll('*')
      elementsToClean.forEach((element) => {
        // Ne pas nettoyer les éléments de shop
        if (element.classList.contains('shop-icon') || 
            element.classList.contains('affiliate-link') ||
            element.classList.contains('product-link') ||
            element.tagName === 'A' && element.getAttribute('href')?.includes('amazon') ||
            element.tagName === 'A' && element.getAttribute('href')?.includes('shop') ||
            element.tagName === 'A' && element.getAttribute('href')?.includes('buy')) {
          return // Préserver ces éléments
        }
        
        // Supprimer les classes WordPress communes
        const classesToRemove = [
          'wp-block-image',
          'wp-block-paragraph',
          'wp-block-heading',
          'wp-block-list',
          'wp-block-quote',
          'wp-block-code',
          'wp-block-table',
          'wp-block-group',
          'wp-block-columns',
          'wp-block-column',
          'alignleft',
          'alignright',
          'aligncenter',
          'alignwide',
          'alignfull',
          'size-full',
          'size-large',
          'size-medium',
          'size-thumbnail',
          'wp-caption',
          'wp-caption-text',
          'gallery',
          'gallery-item',
          'gallery-icon'
        ]
        
        classesToRemove.forEach(cls => {
          element.classList.remove(cls)
        })
      })

    // Styliser les images - amélioration pour l'expérience utilisateur
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
      const isInGallery = img.closest('.gallery, .wp-block-gallery, .wordpress-gallery-container, .simple-gallery-grid')
      
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

    // Masquer les galeries WordPress originales (elles seront remplacées par notre composant)
    const galleries = contentElement.querySelectorAll('.gallery, .wp-block-gallery')
    galleries.forEach((gallery) => {
      (gallery as HTMLElement).style.display = 'none'
    })

    // Gérer les images avec légendes WordPress
    const figureElements = contentElement.querySelectorAll('figure')
    figureElements.forEach((figure) => {
      figure.classList.add('my-6', 'text-center')
      
      const img = figure.querySelector('img')
      if (img) {
        img.classList.add('rounded-lg', 'shadow-md', 'max-w-full', 'h-auto', 'mx-auto')
        img.style.maxWidth = '600px'
        img.style.width = '100%'
        img.style.height = 'auto'
      }
      
      const figcaption = figure.querySelector('figcaption')
      if (figcaption) {
        figcaption.classList.add('text-sm', 'text-gray-600', 'dark:text-gray-400', 'mt-2', 'italic')
      }
    })

    // Styliser les titres
    const headings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1))
      heading.classList.add('font-bold', 'text-gray-900', 'dark:text-white', 'mt-8', 'mb-4')
      
      if (level === 1) heading.classList.add('text-3xl', 'lg:text-4xl')
      else if (level === 2) heading.classList.add('text-2xl', 'lg:text-3xl')
      else if (level === 3) heading.classList.add('text-xl', 'lg:text-2xl')
      else if (level === 4) heading.classList.add('text-lg', 'lg:text-xl')
      else heading.classList.add('text-base', 'lg:text-lg')
    })

    // Styliser les paragraphes
    const paragraphs = contentElement.querySelectorAll('p')
    paragraphs.forEach((p) => {
      p.classList.add('text-gray-700', 'dark:text-gray-300', 'leading-relaxed', 'mb-4')
    })

    // Styliser les listes
    const lists = contentElement.querySelectorAll('ul, ol')
    lists.forEach((list) => {
      list.classList.add('my-6', 'space-y-2')
      const items = list.querySelectorAll('li')
      items.forEach((item) => {
        item.classList.add('text-gray-700', 'dark:text-gray-300', 'leading-relaxed')
      })
    })

    // Styliser les citations
    const blockquotes = contentElement.querySelectorAll('blockquote')
    blockquotes.forEach((quote) => {
      quote.classList.add('border-l-4', 'border-primary', 'bg-gray-50', 'dark:bg-gray-800/50', 'px-6', 'py-4', 'rounded-r-lg', 'italic', 'my-6')
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

    // Styliser les tableaux
    const tables = contentElement.querySelectorAll('table')
    tables.forEach((table) => {
      table.classList.add('w-full', 'border-collapse', 'border', 'border-gray-300', 'dark:border-gray-600', 'my-6', 'rounded-lg', 'overflow-hidden')
      const cells = table.querySelectorAll('td, th')
      cells.forEach((cell) => {
        cell.classList.add('border', 'border-gray-300', 'dark:border-gray-600', 'px-4', 'py-2', 'text-left')
      })
      const headers = table.querySelectorAll('th')
      headers.forEach((header) => {
        header.classList.add('bg-gray-100', 'dark:bg-gray-700', 'font-semibold')
      })
    })

    // Styliser le code
    const codeElements = contentElement.querySelectorAll('code, pre')
    codeElements.forEach((code) => {
      if (code.tagName === 'PRE') {
        code.classList.add('bg-gray-100', 'dark:bg-gray-800', 'p-4', 'rounded-lg', 'overflow-x-auto', 'my-6')
      } else {
        code.classList.add('bg-gray-100', 'dark:bg-gray-800', 'px-2', 'py-1', 'rounded', 'text-sm', 'font-mono')
      }
    })

    // Supprimer les éléments vides ou inutiles
    const emptyElements = contentElement.querySelectorAll('p:empty, div:empty, span:empty')
    emptyElements.forEach((element) => {
      if (!element.innerHTML.trim()) {
        element.remove()
      }
    })

    }, 100)
  }, [content])

  // Ajouter les fonctions globales pour les galeries
  useEffect(() => {
    // Fonction pour ouvrir la lightbox depuis une galerie e-commerce
    (window as any).galleryOpenLightbox = (galleryIndex: number, imageIndex: number) => {
      const galleries = (window as any).__wordpress_galleries
      if (galleries && galleries[galleryIndex]) {
        setCurrentGallery(galleries[galleryIndex])
        setCurrentImageIndex(imageIndex)
        setShowLightbox(true)
      }
    }

    // Fonction pour naviguer vers l'image précédente dans la lightbox
    (window as any).galleryPrevious = () => {
      if (currentGallery && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1)
      } else if (currentGallery) {
        setCurrentImageIndex(currentGallery.images.length - 1)
      }
    }

    // Fonction pour naviguer vers l'image suivante dans la lightbox
    (window as any).galleryNext = () => {
      if (currentGallery && currentImageIndex < currentGallery.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1)
      } else if (currentGallery) {
        setCurrentImageIndex(0)
      }
    }

    // Pas de fonctions de carrousel - galerie simple
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
    <div className={`wordpress-content-wrapper ${className}`}>
      <div 
        className="wordpress-content prose prose-lg max-w-none"
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

            <img
              src={currentGallery.images[currentImageIndex]}
              alt={currentGallery.captions[currentImageIndex] || `Image ${currentImageIndex + 1}`}
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
