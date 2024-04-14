'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '9df6788cca54a25aaf7fc0a416a55f39'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io/',
  rpcUrl:
    'https://eth-mainnet.g.alchemy.com/v2/taLOTQvYb6FlvDk60vM5VR2NQ7DzpEQa',
}

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io/',
  rpcUrl:
    'https://eth-sepolia.g.alchemy.com/v2/qAohEjrNxfq4JGEkab4ekkEhpGI-_i1K',
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://fikrifirmanf.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/'],
}
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
  network: 'any',
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  themeMode: 'light',
  ethersConfig,
  chains: [mainnet, sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
})

export function Web3Modal({ children }) {
  return children
}
