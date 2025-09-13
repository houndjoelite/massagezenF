"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  alt: string
  className?: string
}

/**
 * Composant galerie d'images pour les produits
 * Affiche les images en galerie horizontale responsive
 * Inclut une lightbox pour voir les images en grand
 */
export function ProductGallery({ images, alt, className = "" }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Si pas d'images, ne rien afficher
  if (!images || images.length === 0) {
    return null
  }

  // Si une seule image, l'afficher simplement
  if (images.length === 1) {
    return (
      <div className={`product-gallery-single ${className}`}>
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
             onClick={() => setIsLightboxOpen(true)}>
          <Image
            src={images[0]}
            alt={alt}
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    )
  }

  // Galerie avec plusieurs images
  return (
    <>
      <div className={`product-gallery-multiple ${className}`}>
        {/* Image principale */}
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg mb-4 group cursor-pointer"
             onClick={() => setIsLightboxOpen(true)}>
          <Image
            src={images[selectedImage]}
            alt={`${alt} - Image ${selectedImage + 1}`}
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Miniatures */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                selectedImage === index 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : 'hover:shadow-md opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`${alt} - Miniature ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-6xl max-h-full">
            {/* Bouton fermer */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Bouton précédent */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Bouton suivant */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image en grand */}
            <Image
              src={images[selectedImage]}
              alt={`${alt} - Image ${selectedImage + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Indicateur d'image */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 rounded-full px-3 py-1">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
