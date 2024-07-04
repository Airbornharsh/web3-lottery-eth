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
    getBalance,
    getEntryFee,
    getLotteryEndTime,
    getLotteryState,
    getManager,
    isManagerFn,
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
          <Button onClick={getBalance}>Get Balance</Button>
          <Button onClick={getEntryFee}>Get Entry Fee</Button>
          <Button onClick={getLotteryEndTime}>Get Lottery End Time</Button>
          <Button onClick={getLotteryState}>Get Lottery State</Button>
          <Button onClick={getManager}>Get Manager</Button>
          <Button onClick={isManagerFn}>is Manager</Button>
        </div>
      ) : (
        'Not connected'
      )}
    </div>
  )
}

export default Page
