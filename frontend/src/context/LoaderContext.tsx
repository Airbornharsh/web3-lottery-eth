'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import LoaderModal from '@/components/ui/modals/LoaderModal'
import { useToast } from '@chakra-ui/react'

interface LoaderContextProps {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  setToastMessage: ({
    title,
    status,
    duration,
  }: {
    title: string
    status: 'success' | 'error' | 'warning' | 'info'
    duration?: number
  }) => void
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined)

export const useLoader = () => {
  const context = useContext(LoaderContext)

  if (!context) {
    throw new Error('userLoader must be used within a LoaderProvider')
  }

  return context
}

interface LoaderContextProviderProps {
  children: ReactNode
}

export const LoaderProvider: React.FC<LoaderContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const setToastMessage = ({
    title,
    status,
    duration = 2000,
  }: {
    title: string
    status: 'success' | 'error' | 'warning' | 'info'
    duration?: number
  }) => {
    toast({
      title,
      description: '',
      status,
      duration,
      isClosable: true,
    })
  }

  const contextValue: LoaderContextProps = {
    isLoading,
    setIsLoading,
    setToastMessage,
  }

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
      {isLoading && <LoaderModal />}
    </LoaderContext.Provider>
  )
}
