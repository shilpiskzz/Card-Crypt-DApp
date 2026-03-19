# Card-Crypt-DApp
# Walmart Retail Fraud Prevention Suite

This project is a **multi-layered fraud detection platform** developed for the **Walmart Sparkathon**, designed to secure key aspects of retail through AI, blockchain, and cybersecurity.

## Solution Overview

### Gift Card Fraud Detection (NFT + Smart Contracts)
Gift cards are minted as **ERC-721 NFTs**, cryptographically tied to user wallets. 
Only authorized wallets can redeem via **MetaMask signature verification**.  
Built with **Next.js**, **Express.js**, and **Solidity**, deployed locally using **Hardhat**.

### Return Fraud Detection (Graph + ML)
Detects fraudulent return requests using:
- **Node2Vec graph embeddings**
- **XGBoost classifier**
- **FAISS similarity search**
- Robustness via **hybrid adversarial defense techniques**

### QRDetect: Anti-Counterfeit QR Toolkit
A Python-based framework for generating **tamper-sensitive QR codes** using:
- **HMAC-SHA256 signatures**
- **XOR obfuscation**
- **Mask pattern locking**
- **Low EC level** for edit sensitivity  
Ideal for supply chain validation, product authentication, and secure labeling.

## Why It Matters
Each module addresses a major retail vulnerability:
- Wallet-authenticated gift card usage
- AI-driven return fraud detection
- Tamper-proof QR code verification

Together, these create a unified, **modular platform to prevent fraud**, build trust, and protect customers.


## Gift Card Fraud Detection
This project can be run locally on a locally deployed blockchain using Hardhat (https://hardhat.org/) and using the free ETH loaded accounts it provides.

## Prerequisites
- Node.js (version 16 or higher)
``` bash
node -v
```
- npm or yarn package manager
- Git

## Project Structure
```
Giftcardweb3/
├── contracts/          # Smart contracts
├── scripts/            # Deployment scripts
├── backend/            # Express.js backend server
├── frontend/           # Next.js frontend application
├── hardhat.config.js   # Hardhat configuration
└── package.json        # Root dependencies
```

# Step 1: Clone and Setup
Clone this repo in your local machine and navigate to it
```bash
git clone <repository-url>
cd Giftcardweb3
```

# Step 2: Instalations
Install the root dependencies for Hardhat and smart contracts:
```bash
npm install
```
You can install Hardhat globally, but usually it’s better to install locally in your project.
```bash
npx hardhat compile
npm install hardhat
```
# Step 3: Running Local Blockchain
Now run the Hardhat local blockchain
This will start a local blockchain on `http://localhost:8545` with 20 pre-funded accounts.
```bash
npx hardhat node
```
Edit .env file in root project directory and .env.local file in frontend folder
    ADMIN_PRIVATE_KEY= [Put an account's private key]
Make sure .env file in root project directory contains
    RPC_URL=http://127.0.0.1:8545

# Metamask set up
In your browser, open your metamask wallet from extensions.
- Create a new account with the private key which you are using as Admin_Private_Key
- Create another account with a second private key which will function as User side.
Note - Metamask is important for the recognition of who is executing commands on the frontend site
Add a new local network to MetaMask
  - Network Name: Localhost 8545
  - RPC URL: http://localhost:8545
  - Chain ID: 31337
  - Currency Symbol: ETH
Go to the two accounts and connect them to the local network

# Step 4: Deploy the Smart Contract to Localhost
In a new terminal, deploy the smart contracts to the local network:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
This will output
```bash
Deploying from: 0xYourAdminAddress
Deployed at: 0xYourContractAddress
```
Save that contract address
Edit .env file in root project directory, backend folder and .env.local in frontend folder
    CONTRACT_ADDRESS= [Put contact address here]
    NEXT_PUBLIC_CONTRACT_ADDRESS = [Put contact address here] (for frontend)

Note - If now you switch over to the terminal running your local blockchain, you can see the deployed contract information there
```
  Contract deployment: WalmartGiftCardNFT
  Contract address:    0xYourContractAddress
  Transaction:         0xTransactionHash
  From:                0xYourAdminAddress
  Value:               0 ETH
  Gas used:            2591067 of 30000000
  Block #1:            0xBlockHash
```
# Step 5: Set up Backend
Open another terminal and navigate to backend
```bash
cd backend
npm install
npm start
```
Terminal will show
    Admin private key from .env: 0xAdminPrivateKey
    Server running on http://localhost:3001

# Step 6: Set up Frontend
Open another terminal and navigate to frontend
```bash
cd frontend
npm install ethers axios
npm run dev
```

## Usage
1. Once everything is up and running, Open your browser and go to `http://localhost:3000`
2. Go to the buy section and make sure your admin account is connected to metamask. If not, the service won't allow you to mint giftcards as it does not recognize you as the admin.
3. Mint a giftcard to a user address with given sum of Value, note that this giftcard can only be used for redemption if the user's wallet signs the transaction during redemption.
4. This token ID can now be given to the user, save it so we can test the user end of the functionality.
5. Go to the redeem page and enter the token ID and amount of Value you want to redeem.
Note - This value cannot be more than what is stored in your giftcard
6. Make sure your User account is connected to Metamask wallet 

## Troubleshooting
- Make sure all three services are running (Hardhat node, backend, frontend)
- Verify that contract addresses are correctly set in environment files
- Check that MetaMask is connected to the local network
- Ensure you have test ETH in your wallet from the Hardhat accounts

## Available Scripts

### Root Directory
- `npx hardhat node` - Start local blockchain
- `npx hardhat run scripts/deploy.js --network localhost` - Deploy contracts locally
- `npx hardhat compile` - Compile smart contracts
- `npx hardhat test` - Run contract tests

### Backend
- `npm start` - Start the Express.js server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- 
#  Return Fraud Detection System 

## Project Structure

```
Return-Fraud-Detection/
├── data/                       # CSV datasets (train & test)
├── preprocessing/              # Feature engineering, encoding, ratios
├── graph/                     # Graph construction, Node2Vec embedding
├── model/                     # XGBoost training and evaluation
├── similarity/                # FAISS indexing and scoring
├── dashboard/                 # Streamlit UI app
├── llm_assistant/             # LLM-based risk explanation (Ollama)
├── trust_score.py             # Hybrid scoring layer
└── main_app.py                # Streamlit app entry point
```

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Return-Fraud-Detection
```

### Step 2: Install Dependencies

Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install required packages:

```bash
pip install -r requirements.txt
```

### Step 3: Prepare the Data

Ensure the following files exist in the `data/` folder:

* `return_fraud_train_india.csv`
* `return_fraud_unseen_india.csv`

---

## Running the System Locally

### Step 1: Generate Graph Embeddings

```bash
python graph/generate_embeddings.py
```

### Step 2: Train Model

```bash
python model/train_xgboost.py
```

### Step 3: Compute Graph Similarities

```bash
python similarity/faiss_similarity.py
```

### Step 4: Generate Hybrid Trust Scores

```bash
python trust_score.py
```

### Step 5: Launch Streamlit Dashboard

```bash
streamlit run main_app.py
```

---

## Enable LLM-Based Risk Explanations

Install Ollama: [https://ollama.com/](https://ollama.com/)

Start an Ollama model:

```bash
ollama run mistral  # or phi3, llama2
```

Configure Streamlit app to use `llm_assistant/generate_explanation.py`

---

## Deployed App

[🔗 View Streamlit App](https://returnfraud.streamlit.app)

Explore fraud scores, inspect users, visualize fraud rings, and test LLM explanations.

---

## Features

* Behavioral + location-based feature engineering
* Graph embeddings using Node2Vec
* XGBoost-based fraud classifier
* FAISS-based similarity scoring
* Hybrid scoring engine (60% model + 40% graph)
* Trust tiering: Highly Trusted, Trusted, Watchlist, High Risk, Banned
* Fraud ring detection
* LLM-powered reasoning for explainable fraud
* Interactive dashboard via Streamlit

---

## Usage Flow

1. Upload data → Preprocessing
2. Graph embedding → Similarity scoring
3. Train model → Score generation
4. Dashboard display → LLM optional

---


