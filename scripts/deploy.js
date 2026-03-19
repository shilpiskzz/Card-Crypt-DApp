const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying from:", deployer.address);

  const Contract = await hre.ethers.getContractFactory("WalmartGiftCardNFT");

  // Pass deployer address as both admin and initial owner
  const contract = await Contract.deploy(deployer.address, deployer.address);
  await contract.waitForDeployment();

  console.log("✅ Contract deployed at:", contract.target);
  console.log("🛡️ Walmart admin set to:", await contract.walmartAdmin());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
