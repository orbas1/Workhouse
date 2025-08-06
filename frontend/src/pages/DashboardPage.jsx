import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  HStack,
  Switch,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';
import { getDashboard } from '../api/dashboard.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const dashboard = await getDashboard(user?.role);
        setData(dashboard);
      } catch (err) {
        console.error('Failed to load dashboard', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    if (user) load();
  }, [user]);

  if (loading) {
    return (
      <Box className="dashboard-page" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  if (!data) {
    return <Box p={4}>Unable to load dashboard.</Box>;
  }

  const stats = [
    { key: 'totalSpend', label: 'Total Spend', prefix: '$' },
    { key: 'totalEarnings', label: 'Total Earnings', prefix: '$' },
    { key: 'activeContracts', label: 'Active Contracts' },
    { key: 'pendingProposals', label: 'Pending Proposals' }
  ];

  return (
    <Box className="dashboard-page" p={4}>
      <HStack justify="space-between" mb={6} align="center">
        <Heading size="lg">Welcome back, {user?.name || user?.username}</Heading>
        <HStack>
          <Text>Feed</Text>
          <Switch colorScheme="teal" onChange={() => navigate('/feed')} aria-label="Toggle live feed" />
        </HStack>
      </HStack>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        {stats.map((s) =>
          s.key in data ? (
            <Stat key={s.key} p={4} shadow="sm" borderWidth="1px" borderRadius="md" bg="white">
              <StatLabel>{s.label}</StatLabel>
              <StatNumber>
                {s.prefix || ''}
                {data[s.key]}
              </StatNumber>
            </Stat>
          ) : null
        )}
      </SimpleGrid>
    </Box>
  );
}

