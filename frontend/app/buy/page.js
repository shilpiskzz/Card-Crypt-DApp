"use client"

import { useState } from "react"
import axios from "axios"
import { ethers } from "ethers"
import { ShoppingCart, Wallet, DollarSign, CheckCircle, AlertCircle } from "lucide-react"

export default function BuyPage() {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    setResult(null)
    setLoading(true)

    if (!ethers.isAddress(address.trim())) {
      setResult({ error: "Invalid Ethereum address." })
      setLoading(false)
      return
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setResult({ error: "Amount must be a positive number." })
      setLoading(false)
      return
    }

    try {
      const res = await axios.post("http://localhost:3001/api/buy", {
        userAddress: address.trim(),
        amount: Number.parseInt(amount),
      })
      setResult(res.data)
    } catch (err) {
      console.error(err)
      setResult({ error: err?.response?.data?.error || err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-walmart-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gift Card Minting</h1>
          <p className="text-gray-600">This page simulates a simple admin experience of minting giftcards</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Wallet Address Input */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Wallet className="w-4 h-4" />
                <span>Wallet Address</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your Ethereum address (0x...)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-walmart-blue focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Amount Input */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4" />
                <span>Amount (USD)</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter gift card amount"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-walmart-blue focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Buy Button */}
            <button
              onClick={handleBuy}
              disabled={loading || !address || !amount}
              className="w-full bg-walmart-blue text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Purchase Gift Card</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div
            className={`mt-6 p-6 rounded-xl ${result.error ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`}
          >
            <div className="flex items-start space-x-3">
              {result.error ? (
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className={`font-semibold ${result.error ? "text-red-800" : "text-green-800"}`}>
                  {result.error ? "Purchase Failed" : "Purchase Successful!"}
                </h3>
                <div className={`mt-2 text-sm ${result.error ? "text-red-700" : "text-green-700"}`}>
                  <pre className="whitespace-pre-wrap font-mono bg-white p-3 rounded border">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold text-walmart-blue mb-3">How it works:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-walmart-blue rounded-full"></div>
              <span>Enter user's wallet address</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-walmart-blue rounded-full"></div>
              <span>Specify the gift card amount in USD</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-walmart-blue rounded-full"></div>
              <span>Your NFT gift card will be minted to user wallet</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-walmart-blue rounded-full"></div>
              <span>Giftcard will be minted only if Admin wallet is connected to metamask</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
