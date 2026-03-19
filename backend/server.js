const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
require("dotenv").config();
const WalmartGiftCardNFT = require("./WalmartGiftCardNFT.json");

dotenv.config();
console.log("Admin private key from .env:", process.env.ADMIN_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  WalmartGiftCardNFT.abi,
  adminWallet
);

app.post("/api/buy", async (req, res) => {
  try {
    const { userAddress, amount } = req.body;

    // LOG what you received
    console.log("🟠 [/api/buy] Received request with:");
    console.log("    userAddress:", userAddress);
    console.log("    amount:", amount);

    // VALIDATE ADDRESS
    if (
      !userAddress ||
      typeof userAddress !== "string" ||
      !userAddress.trim().startsWith("0x") ||
      userAddress.trim().length !== 42 ||
      !ethers.isAddress(userAddress.trim())
    ) {
      console.error("❌ INVALID ADDRESS:", userAddress);
      return res.status(400).json({
        success: false,
        error: "Invalid Ethereum address. Must be 0x format."
      });
    }

    // VALIDATE AMOUNT
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      console.error("❌ INVALID AMOUNT:", amount);
      return res.status(400).json({
        success: false,
        error: "Invalid amount. Must be a positive number."
      });
    }

    const cleanAddress = userAddress.trim();
    const preTokenId = Date.now();
    const expiry = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

    console.log(`✅ Minting NFT to ${cleanAddress}, amount: ${amount}`);

    // CALL CONTRACT
    const tx = await contract.mintNFT(cleanAddress, preTokenId, amount, expiry);
    await tx.wait();

    console.log(`✅ Mint successful! TX Hash: ${tx.hash}`);

    res.json({ success: true, tokenId: preTokenId });
  } catch (err) {
    console.error("🔥 ERROR in /api/buy:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running! Use /api/buy or /api/verify-proof");
});

// Dummy ZK Proof verification
app.post("/api/verify-proof", (req, res) => {
  const { proof } = req.body;
  if (proof === "valid_proof") {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "Invalid proof" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
