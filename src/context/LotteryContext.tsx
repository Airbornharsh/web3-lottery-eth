'use client'
import { ABI, CONTRACT_ADDRESS } from '@/lib/config'
import { getEthersSigner } from '@/lib/web3'
import { ethers } from 'ethers'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LotteryContextProps {
  getParticipants: () => Promise<void>
  startLottery: ({ duration }: { duration: number }) => Promise<void>
  enterLottery: () => Promise<void>
  pickWinners: () => Promise<void>
  getWinners: () => Promise<void>
}

const LotteryContext = createContext<LotteryContextProps | undefined>(undefined)

export const useLottery = () => {
  const context = useContext(LotteryContext)

  if (!context) {
    throw new Error('userLottery must be used within a LotteryProvider')
  }

  return context
}

interface LotteryContextProviderProps {
  children: ReactNode
}

export const LotteryProvider: React.FC<LotteryContextProviderProps> = ({
  children,
}) => {
  const [participants, setParticipants] = useState<any[]>([])

  const startLottery = async ({ duration }: { duration: number }) => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.startLottery(duration)
      console.log('result:', result)
    } catch (error) {
      console.error('Error starting lottery:', error)
    }
  }

  const enterLottery = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.enterLottery('Harsh', {
        value: 15000000000000,
      })
      console.log('result:', result)
    } catch (error) {
      console.error('Error entering lottery:', error)
    }
  }

  const getParticipants = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getParticipants()
      console.log('result:', result)
    } catch (error) {
      console.error('Error reading data:', error)
    }
  }

  const pickWinners = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.pickWinners()
      console.log('result:', result)
    } catch (error) {
      console.error('Error picking winners:', error)
    }
  }

  const getWinners = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getWinners()
      console.log('result:', result)
    } catch (error) {
      console.error('Error reading data:', error)
    }
  }

  const contextValue: LotteryContextProps = {
    getParticipants,
    startLottery,
    pickWinners,
    getWinners,
    enterLottery,
  }

  return (
    <LotteryContext.Provider value={contextValue}>
      {children}
    </LotteryContext.Provider>
  )
}
