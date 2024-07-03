'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LotteryContextProps {}

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
  const contextValue: LotteryContextProps = {}

  return (
    <LotteryContext.Provider value={contextValue}>
      {children}
    </LotteryContext.Provider>
  )
}
