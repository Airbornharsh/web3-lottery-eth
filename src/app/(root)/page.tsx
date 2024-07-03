'use client'
import { useWallet } from '@/context/WalletContext'
import { getEthersSigner } from '@/lib/web3'
import React from 'react'

const Page = () => {
  const { isConnected } = useWallet()
  return (
    <div>
      {isConnected ? <div onClick={async () => {}}>test</div> : 'Not connected'}
    </div>
  )
}

export default Page
