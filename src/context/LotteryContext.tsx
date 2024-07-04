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
  isManagerFn: () => Promise<void>
  getBalance: () => Promise<void>
  getManager: () => Promise<void>
  getLotteryState: () => Promise<void>
  getLotteryEndTime: () => Promise<void>
  getEntryFee: () => Promise<void>
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
  const [isManager, setIsManager] = useState<boolean>(false)
  const [balance, setBalance] = useState<number>(0)
  const [manager, setManager] = useState<string>('')

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

  const isManagerFn = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.isManager()
      console.log('result:', result)
    } catch (error) {
      console.error('Error reading data:', error)
    }
  }

  const getBalance = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getBalance()
      console.log('result:', result)
    } catch (error) {
      console.error('Error reading data:', error)
    }
  }

  const getManager = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getManager()
      console.log('result:', result)
    } catch (error) {
      console.error('Error reading data:', error)
    }
  }

  const getLotteryState = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getLotteryState()
      console.log('result:', result)
    } catch (error) {
      console.error('Error reading data:', error)
    }
  }

  const getLotteryEndTime = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getLotteryEndTime()
      console.log('result:', result)
    } catch (error) {
      console.error('Error reading data:', error)
    }
  }

  const getEntryFee = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getEntryFee()
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
    isManagerFn,
    getBalance,
    getManager,
    getLotteryState,
    getLotteryEndTime,
    getEntryFee,
  }

  return (
    <LotteryContext.Provider value={contextValue}>
      {children}
    </LotteryContext.Provider>
  )
}
