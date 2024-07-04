import { useLottery } from '@/context/LotteryContext'
import { Button, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const ManagerPannel = () => {
  const { lotteryState, lotteryEndTime, startLottery, pickWinners } =
    useLottery()
  const [duration, setDuration] = useState<number>(0)
  const [noOfWinners, setNoOfWinners] = useState<number>(0)

  return (
    <>
      {lotteryState === 0 ? (
        <div>
          <Button onClick={() => pickWinners()}>Pick Winners</Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <div>
            <FormLabel htmlFor="duration">Duration (in minutes)</FormLabel>
            <Input
              value={duration}
              onChange={(e) => {
                if (e.target.value === '') {
                  setDuration(0)
                  return
                }
                if (Number.isNaN(parseInt(e.target.value))) return
                if (parseInt(e.target.value) < 0) {
                  setDuration(0)
                  return
                }
                setDuration(parseInt(e.target.value))
              }}
            />
          </div>
          <div>
            <FormLabel htmlFor="noOfWinners">No Of Winners</FormLabel>
            <Input
              value={noOfWinners}
              onChange={(e) => {
                if (e.target.value === '') {
                  setNoOfWinners(0)
                  return
                }
                if (Number.isNaN(parseInt(e.target.value))) return
                if (parseInt(e.target.value) < 0) {
                  setNoOfWinners(0)
                  return
                }
                setNoOfWinners(parseInt(e.target.value))
              }}
            />
          </div>
          <Button
            className="self-end px-2"
            onClick={() => {
              if (duration === 0 || noOfWinners === 0) return
              startLottery({ duration: duration * 60, noOfWinners })
            }}
          >
            Start Lottery
          </Button>
        </div>
      )}
    </>
  )
}

export default ManagerPannel
