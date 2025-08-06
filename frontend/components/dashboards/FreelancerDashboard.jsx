import { Box, SimpleGrid, Stat, StatLabel, StatNumber, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './FreelancerDashboard.css';
import '../../api/dashboard';

export default function FreelancerDashboard() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.dashboardAPI
      .getFreelancerDashboard()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!data) return <Text>Unable to load dashboard.</Text>;

  return (
    <Box className="freelancer-dashboard">
      <SimpleGrid columns={[1, 3]} spacing={4}>
        <Stat className="stat-card">
          <StatLabel>Active Contracts</StatLabel>
          <StatNumber>{data.activeContracts}</StatNumber>
        </Stat>
        <Stat className="stat-card">
          <StatLabel>Pending Proposals</StatLabel>
          <StatNumber>{data.pendingProposals}</StatNumber>
        </Stat>
        <Stat className="stat-card">
          <StatLabel>Total Earnings</StatLabel>
          <StatNumber>${data.totalEarnings}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
