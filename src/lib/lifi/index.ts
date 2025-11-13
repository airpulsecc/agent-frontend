import { defineChain } from 'viem'
import {
  base,
  optimism,
  abstract,
  mainnet,
  blast,
  scroll,
  linea,
  zksync,
  soneium,
  swellchain,
  berachain,
  unichain,
} from 'viem/chains'

// Временное решение, пока HyperEVM не будет официально поддерживаться в viem
const hyperEvm = defineChain({
  id: 999,
  name: 'HyperEVM',
  nativeCurrency: {
    decimals: 18,
    name: 'HYPE',
    symbol: 'HYPE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.hyperliquid.xyz/evm'],
      webSocket: ['wss://rpc.hyperliquid.xyz/evm'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://hyperliquid.cloud.blockscout.com/',
    },
  },
  contracts: {},
})

export const SUPPORTED_CHAINS = [
  mainnet,
  base,
  blast,
  scroll,
  optimism,
  linea,
  zksync,
  soneium,
  swellchain,
  abstract,
  berachain,
  hyperEvm,
  unichain,
] as const

export const CHAIN_NAME_TO_ID: Record<string, number> = {
  ethereum: 1,
  base: 8453,
  blast: 81457,
  scroll: 534352,
  optimism: 10,
  linea: 59144,
  zksync: 324,
  soneium: 1868,
  swellchain: 1923,
  corn: 21000000,
  lens: 232,
  abstract: 2741,
  xdc: 50,
  superposition: 55244,
  berachain: 80094,
  hyperEVM: 999,
  unichain: 130,
}

export const SUPPORTED_CHAIN_NAMES = Object.keys(CHAIN_NAME_TO_ID)

// Reverse lookup: id -> chain name (e.g., 8453 → 'base')
export const CHAIN_ID_TO_NAME: Record<number, string> = Object.fromEntries(
  Object.entries(CHAIN_NAME_TO_ID).map(([name, id]) => [id, name]),
) as Record<number, string>

export const findChainNameById = (id: number): string => {
  return (
    CHAIN_ID_TO_NAME[id]?.charAt(0).toUpperCase() +
      CHAIN_ID_TO_NAME[id]?.slice(1) || ''
  )
}

export const resolveChainId = (chain: string): number | undefined => {
  return CHAIN_NAME_TO_ID[chain]
}
