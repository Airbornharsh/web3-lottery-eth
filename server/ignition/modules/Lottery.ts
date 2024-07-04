import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const entryFee = 15000000000000
const noOfWinners = 1

const LotteryModule = buildModule('LotteryModule', (m) => {
  console.log('Deploying Lottery contract...')

  const _entryFee = m.getParameter('_entryFee', entryFee)
  const _numberOfWinners = m.getParameter('_numberOfWinners', noOfWinners)

  const lottery = m.contract('Lottery', [_entryFee, _numberOfWinners])

  console.log(`Deployed Lottery contract at ${lottery.id}`)

  return { lottery }
})

export default LotteryModule
