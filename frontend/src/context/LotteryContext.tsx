'use client'
import { ABI, CONTRACT_ADDRESS } from '@/lib/config'
import { LOTTERYSTATE, Winner } from '@/lib/types'
import { getEthersSigner } from '@/lib/web3'
import { ethers } from 'ethers'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useAccount } from 'wagmi'
import { useLoader } from './LoaderContext'

interface LotteryContextProps {
  getParticipants: () => Promise<void>
  startLottery: ({
    duration,
    noOfWinners,
  }: {
    duration: number
    noOfWinners: number
  }) => Promise<void>
  enterLottery: () => Promise<void>
  pickWinners: () => Promise<void>
  getWinners: () => Promise<void>
  isManager: boolean
  getBalance: () => Promise<void>
  getManager: () => Promise<void>
  getLotteryState: () => Promise<void>
  getLotteryEndTime: () => Promise<void>
  getEntryFee: () => Promise<void>
  participants: string[]
  winners: Winner[]
  lotteryState: LOTTERYSTATE
  lotteryEndTime: number
  entryFee: number
  resetLottery: () => Promise<void>
  balance: number
  resetWinners: () => Promise<void>
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
  const { setToastMessage } = useLoader()
  const { isConnected, address } = useAccount()
  const { setIsLoading } = useLoader()
  const [participants, setParticipants] = useState<string[]>([])
  const [winners, setWinners] = useState<Winner[]>([])
  const [isManager, setIsManager] = useState<boolean>(false)
  const [balance, setBalance] = useState<number>(0)
  const [manager, setManager] = useState<string>('')
  const [lotteryState, setLotteryState] = useState<LOTTERYSTATE>(0)
  const [lotteryEndTime, setLotteryEndTime] = useState<number>(0)
  const [entryFee, setEntryFee] = useState<number>(0)

  useEffect(() => {
    if (!isConnected || !address) return
    setTimeout(() => {
      reload()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address])

  const startLottery = async ({
    duration,
    noOfWinners,
  }: {
    duration: number
    noOfWinners: number
  }) => {
    setIsLoading(true)
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.startLottery(duration, noOfWinners)
      await result.wait()
      setToastMessage({
        title: 'Lottery started successfully',
        status: 'success',
      })
      reload()
    } catch (error) {
      setToastMessage({
        title: 'Error starting lottery',
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const enterLottery = async () => {
    setIsLoading(true)

    if (participants.includes(address!.toLowerCase())) {
      setToastMessage({
        title: 'Already entered lottery',
        status: 'warning',
      })
      setIsLoading(false)
      return
    }

    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.enterLottery({
        value: 15000000000000,
      })
      await result.wait()
      setToastMessage({
        title: 'Entered lottery successfully',
        status: 'success',
      })
      reload()
    } catch (error) {
      setToastMessage({
        title: 'Error entering lottery',
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getParticipants = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getParticipants()
      const tempList: string[] = []
      Object.keys(result).forEach((key) => {
        tempList.push(result[key].toString().toLowerCase())
      })
      setParticipants([...tempList])
    } catch (error) {
    }
  }

  const pickWinners = async () => {
    if (participants.length <= 0) {
      setToastMessage({
        title: 'No participants to pick winners',
        status: 'warning',
      })
      return
    }

    setIsLoading(true)
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.forcePickWinners()
      await result.wait()
      reload()
      setToastMessage({
        title: 'Winners picked successfully',
        status: 'success',
      })
    } catch (error) {
      error('Error picking winners:', error)
      setToastMessage({
        title: 'Error picking winners',
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getWinners = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getWinners()
      const tempList: Winner[] = []
      Object.keys(result).forEach((key) => {
        tempList.push({
          address: result[key][0].toString().toLowerCase(),
          amount: Number(result[key][1]) / 10 ** 18,
        })
      })
      setWinners([...tempList])
    } catch (error) {
    }
  }

  const isManagerFn = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.isManager()
      setIsManager(result)
    } catch (error) {
    }
  }

  const getBalance = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getBalance()
      setBalance(Number(result))
    } catch (error) {
    }
  }

  const getManager = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getManager()
      setManager(result.toLowerCase())
    } catch (error) {
    }
  }

  const getLotteryState = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getLotteryState()
      setLotteryState(Number(result))
    } catch (error) {
    }
  }

  const getLotteryEndTime = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getLotteryEndTime()
      setLotteryEndTime(Number(result))
    } catch (error) {
    }
  }

  const getEntryFee = async () => {
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.getEntryFee()
      setEntryFee(Number(result))
    } catch (error) {
    }
  }

  const resetLottery = async () => {
    setIsLoading(true)
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.resetLottery()
      await result.wait()
      reload()
      setToastMessage({
        title: 'Lottery reset successfully',
        status: 'success',
      })
    } catch (error) {
      error('Error starting lottery:', error)
      setToastMessage({
        title: 'Error resetting lottery',
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetWinners = async () => {
    setIsLoading(true)
    const signer = await getEthersSigner()
    if (!signer) return

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    try {
      const result = await contract.resetWinners()
      await result.wait()
      reload()
      setToastMessage({
        title: 'Winners reset successfully',
        status: 'success',
      })
    } catch (error) {
      setToastMessage({
        title: 'Error resetting winners',
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const reload = async () => {
    getParticipants()
    getWinners()
    isManagerFn()
    getBalance()
    getManager()
    getLotteryState()
    getLotteryEndTime()
    getEntryFee()
  }

  const contextValue: LotteryContextProps = {
    getParticipants,
    startLottery,
    pickWinners,
    getWinners,
    enterLottery,
    isManager,
    getBalance,
    getManager,
    getLotteryState,
    getLotteryEndTime,
    getEntryFee,
    participants,
    winners,
    lotteryState,
    lotteryEndTime,
    entryFee,
    resetLottery,
    balance,
    resetWinners,
  }

  return (
    <LotteryContext.Provider value={contextValue}>
      {children}
    </LotteryContext.Provider>
  )
}
