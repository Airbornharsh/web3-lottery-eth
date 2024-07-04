'use client'
import { useLottery } from '@/context/LotteryContext'
import { useWallet } from '@/context/WalletContext'
import { Button } from '@chakra-ui/react'
import React from 'react'

const Page = () => {
  const { isConnected } = useWallet()
  const {
    getParticipants,
    startLottery,
    enterLottery,
    getWinners,
    pickWinners,
  } = useLottery()
  return (
    <div>
      {isConnected ? (
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => {
              startLottery({ duration: 1 * 60 * 1000 })
            }}
          >
            Start Lottery
          </Button>
          <Button onClick={enterLottery}>Enter Lottery</Button>
          <Button onClick={getParticipants}>Get participants</Button>
          <Button onClick={pickWinners}>Pick Winners</Button>
          <Button onClick={getWinners}>Get Winners</Button>
        </div>
      ) : (
        'Not connected'
      )}
    </div>
  )
}

export default Page
