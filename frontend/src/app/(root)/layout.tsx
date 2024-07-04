'use client'
import '@rainbow-me/rainbowkit/styles.css'

import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import { LoaderProvider } from '@/context/LoaderContext'
import { LotteryProvider } from '@/context/LotteryContext'
import { WalletProvider } from '@/context/WalletContext'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { queryClient, wagmiConfig } from '@/lib/web3'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ChakraProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <LoaderProvider>
              <WalletProvider>
                <LotteryProvider>
                  <Navbar />
                  <main className="flex w-screen justify-center">
                    <div className="w-[98vw] max-w-[80rem]">{children}</div>
                  </main>
                </LotteryProvider>
              </WalletProvider>
            </LoaderProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  )
}
