'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface WalletContextProps {}

const WalletContext = createContext<WalletContextProps | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)

  if (!context) {
    throw new Error('userWallet must be used within a WalletProvider')
  }

  return context
}

interface WalletContextProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletContextProviderProps> = ({
  children,
}) => {
  const contextValue: WalletContextProps = {}

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}
