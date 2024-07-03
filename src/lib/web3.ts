import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { Config } from 'wagmi'
import { getConnectorClient } from '@wagmi/core'
import { WALLET_PROJECT_ID } from './config'
import { sepolia } from 'viem/chains'
import { QueryClient } from '@tanstack/react-query'
import type { Account, Chain, Client, Transport } from 'viem'

export const wagmiConfig: Config = getDefaultConfig({
  appName: 'Lottery App',
  projectId: WALLET_PROJECT_ID,
  chains: [sepolia],
  ssr: true,
})

export const queryClient = new QueryClient()

export async function getEthersSigner() {
  const client = await getConnectorClient(wagmiConfig)
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}
