"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimateOnScrollProps {
  children: React.ReactNode
  animation?: "fadeInUp" | "fadeInScale" | "slideInLeft" | "slideInRight" | "zoomIn"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

const animationClasses = {
  fadeInUp: "opacity-0 translate-y-8",
  fadeInScale: "opacity-0 scale-95",
  slideInLeft: "opacity-0 -translate-x-8",
  slideInRight: "opacity-0 translate-x-8",
  zoomIn: "opacity-0 scale-90"
}

const animationVisibleClasses = {
  fadeInUp: "opacity-100 translate-y-0",
  fadeInScale: "opacity-100 scale-100",
  slideInLeft: "opacity-100 translate-x-0",
  slideInRight: "opacity-100 translate-x-0",
  zoomIn: "opacity-100 scale-100"
}

export function AnimateOnScroll({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className,
  once = true
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasAnimated) return
          
          setTimeout(() => {
            setIsVisible(true)
            if (once) setHasAnimated(true)
          }, delay)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [delay, threshold, once, hasAnimated])

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all ease-out",
        isVisible ? animationVisibleClasses[animation] : animationClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}

// Composant pour animer une liste d'éléments avec un délai échelonné
interface AnimateListProps {
  children: React.ReactNode[]
  animation?: "fadeInUp" | "fadeInScale" | "slideInLeft" | "slideInRight" | "zoomIn"
  staggerDelay?: number
  delay?: number
  className?: string
}

export function AnimateList({
  children,
  animation = "fadeInUp",
  staggerDelay = 100,
  delay = 0,
  className
}: AnimateListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimateOnScroll
          key={index}
          animation={animation}
          delay={delay + (index * staggerDelay)}
          className="w-full"
        >
          {child}
        </AnimateOnScroll>
      ))}
    </div>
  )
}

// Composant pour les effets de parallaxe
interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${offset}px)`
      }}
    >
      {children}
    </div>
  )
}

// Composant pour les effets de hover avancés
interface HoverEffectProps {
  children: React.ReactNode
  effect?: "lift" | "glow" | "tilt" | "scale" | "rotate"
  intensity?: "low" | "medium" | "high"
  className?: string
}

const hoverEffectClasses = {
  lift: {
    low: "hover:-translate-y-1 hover:shadow-lg",
    medium: "hover:-translate-y-2 hover:shadow-xl",
    high: "hover:-translate-y-3 hover:shadow-2xl"
  },
  glow: {
    low: "hover:shadow-lg hover:shadow-primary/20",
    medium: "hover:shadow-xl hover:shadow-primary/30",
    high: "hover:shadow-2xl hover:shadow-primary/40"
  },
  tilt: {
    low: "hover:rotate-1",
    medium: "hover:rotate-2",
    high: "hover:rotate-3"
  },
  scale: {
    low: "hover:scale-105",
    medium: "hover:scale-110",
    high: "hover:scale-115"
  },
  rotate: {
    low: "hover:rotate-3",
    medium: "hover:rotate-6",
    high: "hover:rotate-12"
  }
}

export function HoverEffect({
  children,
  effect = "lift",
  intensity = "medium",
  className
}: HoverEffectProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        hoverEffectClasses[effect][intensity],
        className
      )}
    >
      {children}
    </div>
  )
}
