"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookies-accepted")
    if (!cookiesAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookies-accepted", "true")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookies-accepted", "false")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous
              acceptez notre utilisation des cookies.{" "}
              <Link href="/politique-confidentialite" className="text-blue-600 hover:text-blue-800 underline">
                En savoir plus
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              Refuser
            </Button>
            <Button size="sm" onClick={acceptCookies} className="bg-blue-600 hover:bg-blue-700 text-white">
              Accepter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={declineCookies}
              className="p-1 h-auto text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
