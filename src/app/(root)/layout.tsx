'use client'
import { LoaderProvider } from '@/context/LoaderContext'
import { LotteryProvider } from '@/context/LotteryContext'
import { WalletProvider } from '@/context/WalletContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LoaderProvider>
      <WalletProvider>
        <LotteryProvider>{children}</LotteryProvider>
      </WalletProvider>
    </LoaderProvider>
  )
}
