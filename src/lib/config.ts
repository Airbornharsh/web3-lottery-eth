import abi from '@/lib/contractConstants/abi.json'
import contractAddress from '@/lib/contractConstants/contractAddress.json'

export const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || ''
export const WALLET_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_PROJECT_ID || ''

export const ABI = abi || []
export const CONTRACT_ADDRESS = contractAddress || ''
