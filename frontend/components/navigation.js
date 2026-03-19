"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Gift, Home } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/buy", label: "Buy Cards", icon: ShoppingCart },
    { href: "/redeem", label: "Redeem", icon: Gift },
  ]

  return (
    <nav className="bg-white shadow-lg border-b-4 border-walmart-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-walmart-blue rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-walmart-blue">Walmart Gift Cards</span>
          </div>

          <div className="flex space-x-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === href
                    ? "bg-walmart-blue text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-walmart-blue"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
