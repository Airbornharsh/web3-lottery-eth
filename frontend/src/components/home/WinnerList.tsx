import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react'
import { useLottery } from '@/context/LotteryContext'

const WinnerList = () => {
  const { winners, resetWinners } = useLottery()
  return (
    <div className="w-[98vw] max-w-[80rem] self-start overflow-auto">
      <Button
        className="border-0 bg-white text-black shadow-md hover:scale-105"
        onClick={() => {
          resetWinners()
        }}
      >
        Reset Winners
      </Button>
      <TableContainer className="min-h-[30rem] min-w-[50rem]">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Address</Th>
              <Th isNumeric>Address</Th>
            </Tr>
          </Thead>
          {winners.length > 0 ? (
            <Tbody>
              {winners.map((winner, index) => (
                <Tr key={index.toString() + winner.address}>
                  <Td>{winner.address}</Td>
                  <Td isNumeric>{winner.amount} ETH</Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <div>No Winners Yet</div>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}

export default WinnerList
