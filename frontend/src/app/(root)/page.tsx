'use client'
import TimeLeft from '@/components/TimeLeft'
import ManagerPannel from '@/components/home/ManagerPannel'
import ParticipantList from '@/components/home/ParticipantList'
import ParticipantPannel from '@/components/home/ParticipantPannel'
import WinnerList from '@/components/home/WinnerList'
import { useLottery } from '@/context/LotteryContext'
import { useWallet } from '@/context/WalletContext'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

const Page = () => {
  const { isConnected } = useWallet()
  const { isManager } = useLottery()

  return (
    <div className="flex min-h-[100vh-4rem] items-center justify-center">
      {isConnected ? (
        <div className="mt-3 flex flex-col gap-2">
          <TimeLeft />
          {isManager ? <ManagerPannel /> : <ParticipantPannel />}
          <Tabs className="mt-10">
            <TabList>
              <Tab>Participants</Tab>
              <Tab>Winners</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ParticipantList />
              </TabPanel>
              <TabPanel>
                <WinnerList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      ) : (
        <div className="mt-10">
          <ConnectButton />
        </div>
      )}
    </div>
  )
}

export default Page
