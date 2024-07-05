import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useLottery } from '@/context/LotteryContext'

const WinnerList = () => {
  const { winners } = useLottery()
  return (
    <div className="w-[98vw] max-w-[80rem] self-start overflow-auto">
      <TableContainer className="min-h-[30rem] min-w-[50rem]">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Address</Th>
            </Tr>
          </Thead>
          {winners.length > 0 ? (
            <Tbody>
              {winners.map((winner, index) => (
                <Tr key={index.toString() + winner}>
                  <Td>{winner}</Td>
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
