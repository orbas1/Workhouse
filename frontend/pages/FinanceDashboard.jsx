import {
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import DashboardLayout from '../components/DashboardLayout.jsx';

export default function FinanceDashboard() {
  const invoices = [
    { id: 1, client: 'Acme Corp', amount: 1200 },
    { id: 2, client: 'Globex Inc', amount: 850 },
  ];

  return (
    <DashboardLayout title="Finance Dashboard" requiredRole="finance">
      <SimpleGrid columns={[1, 3]} spacing={4} mb={8}>
        <Stat>
          <StatLabel>Revenue</StatLabel>
          <StatNumber>$12,000</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Expenses</StatLabel>
          <StatNumber>$8,500</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Invoices</StatLabel>
          <StatNumber>{invoices.length}</StatNumber>
        </Stat>
      </SimpleGrid>

      <Heading size="md" mb={2}>
        Recent Invoices
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Client</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoices.map((inv) => (
            <Tr key={inv.id}>
              <Td>{inv.client}</Td>
              <Td isNumeric>${inv.amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </DashboardLayout>
  );
}
