import Link from "next/link"
import { ShoppingCart, Gift, Shield, Zap, Globe, Lock } from "lucide-react"
import TailwindTest from "@/components/TailwindTest"

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Uncompromising Security",
      description: "Gift cards powered by Ethereum smart contracts, eliminating fraud, duplication, and code tampering",
    },
    {
      icon: Lock,
      title: "Verified Digital Ownership",
      description: "Each card is a unique NFT securely linked to your wallet, ensuring only you can access and redeem its value",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access your gift cards from anywhere in the world as long as it's YOURS",
    },
    {
      icon: Zap,
      title: "Long-Term Value",
      description: "Future-proof your gift card program with scalable, blockchain-based technology",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Tailwind Test - Remove this after testing */}
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-walmart-blue to-blue-700 text-white py-20 overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
          }}
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">Welcome to Walmart Gift Card DApp</h1>
            <p className="text-xl mb-8 text-white max-w-3xl mx-auto font-medium drop-shadow-md">
              Experience the future of gift cards with blockchain technology. Buy, own, and redeem NFT gift cards with
              complete security and transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buy"
                className="bg-white text-walmart-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Mint Gift Cards (Admin)</span>
              </Link>
              <Link
                href="/redeem"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-walmart-blue transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Gift className="w-5 h-5" />
                <span>Redeem Cards (User)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We’re making gift cards unforgeable, unstoppable, and unstealable with blockchain-secured NFTs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-16 h-16 bg-walmart-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who trust our platform for their gift card needs.
          </p>
          <Link
            href="/buy"
            className="bg-walmart-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Secure your Money NOW</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
