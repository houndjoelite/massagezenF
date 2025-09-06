"use client"

import { useState, useEffect } from "react"

export default function SimpleCookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{" "}
            <a href="/politique-confidentialite" className="underline hover:text-blue-300">
              politique de confidentialité
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800"
          >
            Refuser
          </button>
          <button onClick={acceptCookies} className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700">
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
