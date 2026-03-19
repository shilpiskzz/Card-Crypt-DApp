## Getting Started
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