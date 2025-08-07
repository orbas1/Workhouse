import { SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import DashboardLayout from '../components/DashboardLayout.jsx';

export default function MarketingDashboard() {
  return (
    <DashboardLayout title="Marketing Dashboard" requiredRole="marketing">
      <SimpleGrid columns={[1, 3]} spacing={4}>
        <Stat>
          <StatLabel>Campaigns</StatLabel>
          <StatNumber>4</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Leads</StatLabel>
          <StatNumber>120</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Conversion</StatLabel>
          <StatNumber>12%</StatNumber>
        </Stat>
      </SimpleGrid>
    </DashboardLayout>
  );
}
