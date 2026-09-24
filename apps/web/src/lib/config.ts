export const chainConfig = {
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 84532),
  name: process.env.NEXT_PUBLIC_CHAIN_NAME || "Base Sepolia",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://sepolia.base.org",
  explorer: process.env.NEXT_PUBLIC_BLOCK_EXPLORER || "https://sepolia.basescan.org",
  factoryAddress: process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "",
  tokenAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "",
};
