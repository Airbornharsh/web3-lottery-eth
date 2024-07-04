import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import { ALCHEMY_API_KEY, PRIVATE_KEY } from './config'

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  sourcify: {
    enabled: true,
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [
        `0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6`,
      ],
    },
  },
}

export default config
