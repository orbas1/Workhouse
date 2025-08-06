import { Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';
import './FlaggedContentTable.css';

export default function FlaggedContentTable({ items = [] }) {
  return (
    <Table className="flagged-content-table" size="sm">
      <Thead>
        <Tr>
          <Th>Content ID</Th>
          <Th>Reporter</Th>
          <Th>Reason</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((f) => (
          <Tr key={f.id}>
            <Td>{f.contentId}</Td>
            <Td>{f.reporterId}</Td>
            <Td>{f.reason}</Td>
            <Td>
              <Badge colorScheme={f.status === 'resolved' ? 'green' : 'red'}>
                {f.status}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
