import { Box, SimpleGrid, Stat, StatLabel, StatNumber, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import '../../api/dashboard';

export default function ClientDashboard() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.dashboardAPI
      .getClientDashboard()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!data) return <Text>Unable to load dashboard.</Text>;

  return (
    <Box className="client-dashboard" p={6}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat>
          <StatLabel>Active Contracts</StatLabel>
          <StatNumber>{data.activeContracts}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Pending Proposals</StatLabel>
          <StatNumber>{data.pendingProposals}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Spend</StatLabel>
          <StatNumber>${data.totalSpend}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
