const contractPerNetwork = {
  mainnet: '',
  testnet: 'chunky-arch.testnet',
};

// Chains for EVM Wallets
const evmWalletChains = {
  mainnet: {
    chainId: 397,
    name: 'Near Mainnet',
    explorer: 'https://eth-explorer.near.org',
    rpc: 'https://eth-rpc.mainnet.near.org',
  },
  testnet: {
    chainId: 398,
    name: 'Near Testnet',
    explorer: 'https://eth-explorer-testnet.near.org',
    rpc: 'https://eth-rpc.testnet.near.org',
  },
};

export const NetworkId = 'testnet';
export const CrowdfundingNearContract = contractPerNetwork[NetworkId];
export const EVMWalletChain = evmWalletChains[NetworkId];

// 1738051734823516400 < 1738069020000000000
// 18446744073709551615