import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@chakra-ui/react'
import { useLottery } from '@/context/LotteryContext'

const Navbar = () => {
  const { isManager, resetLottery, balance } = useLottery()
  return (
    <nav className="bg-secondary sticky top-0 z-30 flex h-16 w-screen justify-center border-b bg-white">
      <div className="bg-secondary relative flex w-[98vw] max-w-[80rem] items-center justify-between pb-2 pt-2">
        <div className="flex items-center">Lottery</div>
        <div className="flex items-center gap-2">
          <p className="flex h-10 items-center justify-center rounded-md border-[0.01rem] border-black px-2 text-xs font-semibold">
            {balance / 10 ** 18} ETH
          </p>
          <ConnectButton />
          {isManager && (
            <Button
              className="border-0 bg-white text-black shadow-md hover:scale-105"
              onClick={() => {
                resetLottery()
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
