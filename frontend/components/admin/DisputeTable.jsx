import { Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';
import './DisputeTable.css';

export default function DisputeTable({ items = [] }) {
  return (
    <Table className="dispute-table" size="sm">
      <Thead>
        <Tr>
          <Th>Category</Th>
          <Th>Initiator</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((d) => (
          <Tr key={d.id}>
            <Td>{d.category}</Td>
            <Td>{d.userId}</Td>
            <Td>
              <Badge colorScheme={d.status === 'resolved' ? 'green' : 'purple'}>
                {d.status}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
