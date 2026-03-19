"use client"

import { useState } from "react"
import { ethers } from "ethers"
import contractArtifact from "@/abis/WalmartGiftCardNFT.json"
import axios from "axios"
import { Gift, Wallet, CreditCard, CheckCircle, AlertCircle } from "lucide-react"

export default function RedeemPage() {
  const [tokenId, setTokenId] = useState("")
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState("")
  const [walletAddress, setWalletAddress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [proof] = useState("valid_proof")

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus("❌ MetaMask not found. Please install MetaMask.")
      return
    }

    try {
      setLoading(true)
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setWalletAddress(accounts[0])
      setStatus(`✅ Connected: ${accounts[0]}`)
    } catch (err) {
      setStatus("❌ " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRedeem = async () => {
    if (!walletAddress) {
      setStatus("❌ Please connect your wallet first.")
      return
    }

    if (!tokenId || isNaN(Number(tokenId)) || Number(tokenId) < 0) {
      setStatus("❌ Invalid Token ID.")
      return
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setStatus("❌ Invalid amount.")
      return
    }

    try {
      setLoading(true)
      setStatus("🔍 Verifying proof...")

      const proofRes = await axios.post("http://localhost:3001/api/verify-proof", { proof })
      if (!proofRes.data.success) throw new Error("Proof verification failed")

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

      if (!contractAddress) throw new Error("Missing contract address in .env.local")

      const contract = new ethers.Contract(contractAddress, contractArtifact.abi, signer)

      setStatus("📝 Sending transaction...")
      const tx = await contract.redeem(tokenId, amount)

      setStatus("⏳ Waiting for confirmation...")
      await tx.wait()

      setStatus("✅ Redeemed successfully!")
    } catch (err) {
      console.error(err)
      setStatus("❌ " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    if (status.includes("✅")) return "text-green-600"
    if (status.includes("❌")) return "text-red-600"
    if (status.includes("🔍") || status.includes("📝") || status.includes("⏳")) return "text-blue-600"
    return "text-gray-600"
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-walmart-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Redeem Gift Card</h1>
          <p className="text-gray-600">This page stimulates online user gift card redemption for store credit</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Wallet Connection */}
          <div className="mb-8">
            {!walletAddress ? (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="w-full bg-walmart-blue text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Connect MetaMask</span>
                  </>
                )}
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-800">Wallet Connected</p>
                    <p className="text-sm text-green-700 font-mono">{walletAddress}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4" />
                <span>Token ID</span>
              </label>
              <input
                type="number"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter your NFT token ID"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-walmart-blue focus:border-transparent transition-colors duration-200"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Gift className="w-4 h-4" />
                <span>Redeem Amount (USD)</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to redeem"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-walmart-blue focus:border-transparent transition-colors duration-200"
              />
            </div>

            <button
              onClick={handleRedeem}
              disabled={!walletAddress || loading || !tokenId || !amount}
              className="w-full bg-walmart-blue text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  <span>Redeem Gift Card</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Display */}
        {status && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start space-x-3">
              {status.includes("❌") ? (
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              ) : status.includes("✅") ? (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-walmart-blue"></div>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Transaction Status</h3>
                <p className={`${getStatusColor(status)} font-medium`}>{status}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold text-walmart-blue mb-3">Redemption Process:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-walmart-blue rounded-full"></div>
              <span>Connect your MetaMask wallet</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-walmart-blue rounded-full"></div>
              <span>Enter your NFT token ID and redeem amount</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-walmart-blue rounded-full"></div>
              <span>Confirm the transaction in MetaMask</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-walmart-blue rounded-full"></div>
              <span>Receive store credit after confirmation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
