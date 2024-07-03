'use client'
import '@rainbow-me/rainbowkit/styles.css'

import Navbar from '@/components/Navbar'
import { LoaderProvider } from '@/context/LoaderContext'
import { LotteryProvider } from '@/context/LotteryContext'
import { WalletProvider } from '@/context/WalletContext'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import {
  sepolia,
  bscTestnet,
  bsc,
  baseGoerli,
  base,
  zkSync,
  mainnet,
  polygon,
  polygonMumbai,
  optimism,
  optimismGoerli,
  arbitrum,
  arbitrumGoerli,
  lineaTestnet,
  linea,
} from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { WALLET_PROJECT_ID } from '@/lib/config'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()
  const config = getDefaultConfig({
    appName: 'Lottery App',
    projectId: WALLET_PROJECT_ID,
    chains: [sepolia],
    ssr: true,
  })

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <LoaderProvider>
            <WalletProvider>
              <LotteryProvider>
                <Navbar />
                {children}
              </LotteryProvider>
            </WalletProvider>
          </LoaderProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
