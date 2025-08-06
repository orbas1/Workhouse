import { Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';
import './TicketTable.css';

export default function TicketTable({ items = [] }) {
  return (
    <Table className="ticket-table" size="sm">
      <Thead>
        <Tr>
          <Th>Subject</Th>
          <Th>User</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((t) => (
          <Tr key={t.id}>
            <Td>{t.subject}</Td>
            <Td>{t.userId}</Td>
            <Td>
              <Badge colorScheme={t.status === 'resolved' ? 'green' : 'orange'}>
                {t.status}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
