import { useLottery } from '@/context/LotteryContext'
import React, { useEffect, useState } from 'react'

const TimeLeft = () => {
  const { lotteryEndTime, lotteryState } = useLottery()
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>()

  const calculateTimeLeft = () => {
    const difference = +new Date(lotteryEndTime * 1000) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(
      Object.keys(timeLeft).length > 0
        ? (timeLeft as {
            days: number
            hours: number
            minutes: number
            seconds: number
          })
        : null,
    )
  }

  useEffect(() => {
    if (lotteryState === 1) {
      return setTimeLeft(null)
    }
    if (new Date().getTime() > lotteryEndTime * 1000) {
      return setTimeLeft(null)
    }
    const timer = setInterval(() => {
      calculateTimeLeft()
    }, 1000)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotteryEndTime, lotteryState])

  if (!timeLeft) return null
  return (
    <div className="text-xs">
      Lottery Ends in {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
      {timeLeft.seconds}
    </div>
  )
}

export default TimeLeft
