import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import '../styles/OrderList.css';

function OrderList({ orders = [], onSelect }) {
  return (
    <Table className="order-list" variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Service</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr
            key={order.id}
            _hover={{ bg: 'gray.50', cursor: 'pointer' }}
            onClick={() => onSelect && onSelect(order)}
          >
            <Td>{order.id}</Td>
            <Td>{order.serviceId}</Td>
            <Td>{order.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default OrderList;
