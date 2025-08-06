import React from 'react';
import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import '../styles/AffiliateLeaderboard.css';

function AffiliateLeaderboard({ data }) {
  return (
    <Table className="affiliate-leaderboard" variant="simple" mb={4}>
      <Thead>
        <Tr>
          <Th>Affiliate</Th>
          <Th isNumeric>Total Earnings</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map(row => (
          <Tr key={row.affiliateId}>
            <Td>{row.affiliateId}</Td>
            <Td isNumeric>${row.total.toFixed(2)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default AffiliateLeaderboard;
