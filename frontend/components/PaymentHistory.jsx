import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import '../styles/PaymentHistory.css';

export default function PaymentHistory({ payments = [] }) {
  return (
    <Table variant="simple" className="payment-history">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Employee</Th>
          <Th>Job</Th>
          <Th isNumeric>Amount</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {payments.map((p) => (
          <Tr key={p.id}>
            <Td>{new Date(p.createdAt).toLocaleDateString()}</Td>
            <Td>{p.employeeId}</Td>
            <Td>{p.jobId}</Td>
            <Td isNumeric>{p.amount}</Td>
            <Td>{p.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
