import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex h-16 w-screen justify-center border-b bg-secondary">
      <div className="relative flex w-[98vw] max-w-[80rem] items-center justify-between bg-secondary pb-2 pt-2">
        <div className="flex items-center">Lottery</div>
        <div className="flex items-center">
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
