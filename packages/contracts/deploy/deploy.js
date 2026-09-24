const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const treasury = process.env.TREASURY_ADDRESS;
  const resolver = process.env.RESOLVER_ADDRESS;
  const feeBps = Number(process.env.PLATFORM_FEE_BPS || 50);
  if (!treasury || !resolver) throw new Error("TREASURY_ADDRESS and RESOLVER_ADDRESS are required");
  const factory = await ethers.deployContract("EscrowFactory", [deployer.address, treasury, resolver, feeBps]);
  await factory.waitForDeployment();
  console.log("EscrowFactory:", await factory.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
