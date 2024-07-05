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

const ParticipantList = () => {
  const { participants } = useLottery()
  return (
    <div className="w-[98vw] max-w-[80rem] self-start overflow-auto">
      <TableContainer className="min-h-[30rem] min-w-[50rem]">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Address</Th>
            </Tr>
          </Thead>
          {participants.length > 0 ? (
            <Tbody>
              {participants.map((participant, index) => (
                <Tr key={index.toString() + new Date()}>
                  <Td>{participant}</Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <div>No Participants</div>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}

export default ParticipantList
