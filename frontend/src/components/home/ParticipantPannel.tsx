import React from 'react'
import { useLottery } from '@/context/LotteryContext'
import { Button } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

const ParticipantPannel = () => {
  const { address } = useAccount()
  const { lotteryState, enterLottery, participants } = useLottery()
  return (
    <>
      {lotteryState === 0 ? <div></div> : <div>Lottery is Closed</div>}
      <div>
        {participants.includes(address!.toLowerCase()) ? (
          <div>
            <div>You are in the lottery</div>
          </div>
        ) : (
          <Button onClick={() => enterLottery()}>Enter Lottery</Button>
        )}
      </div>
    </>
  )
}

export default ParticipantPannel
