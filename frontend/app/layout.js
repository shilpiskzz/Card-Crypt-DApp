import "./globals.css"
import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Walmart Gift Card DApp",
  description: "Buy and redeem NFT gift cards with blockchain technology",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  )
}
