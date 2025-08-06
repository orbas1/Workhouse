import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import '../styles/ContentList.css';

export default function ContentList({ items, onEdit, onDelete }) {
  if (!items || items.length === 0) {
    return <div className="content-empty">No content yet.</div>;
  }
  return (
    <Table size="sm" className="content-list">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Type</Th>
          <Th>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <Tr key={item.id}>
            <Td>{item.title}</Td>
            <Td>{item.type}</Td>
            <Td>{item.status}</Td>
            <Td>
              <Button size="xs" mr={2} onClick={() => onEdit(item)}>Edit</Button>
              <Button size="xs" colorScheme="red" onClick={() => onDelete(item.id)}>Delete</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
