import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const entryFee = 15000000000000

const LotteryModule = buildModule('LotteryModule', (m) => {
  console.log('Deploying Lottery contract...')

  const _entryFee = m.getParameter('_entryFee', entryFee)

  const lottery = m.contract('Lottery', [_entryFee])

  console.log(`Deployed Lottery contract at ${lottery.id}`)

  return { lottery }
})

export default LotteryModule
