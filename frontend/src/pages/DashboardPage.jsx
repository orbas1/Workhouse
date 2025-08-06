import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Spinner, Button } from '@chakra-ui/react';
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
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    if (user) load();
  }, [user]);

  if (loading) return <Spinner />;
  if (!data) return <Box p={4}>Unable to load dashboard.</Box>;

  return (
    <Box className="dashboard-page">
      <Heading mb={4}>Welcome back, {user?.name || user?.username}</Heading>
      <Button mb={4} colorScheme="teal" onClick={() => navigate('/ads')}>
        Go to Ads Dashboard
      </Button>
      <Button mb={4} colorScheme="teal" onClick={() => navigate('/feed')}>
        View Live Feed
      </Button>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        {'totalSpend' in data && (
          <Stat>
            <StatLabel>Total Spend</StatLabel>
            <StatNumber>${data.totalSpend}</StatNumber>
          </Stat>
        )}
        {'totalEarnings' in data && (
          <Stat>
            <StatLabel>Total Earnings</StatLabel>
            <StatNumber>${data.totalEarnings}</StatNumber>
          </Stat>
        )}
        <Stat>
          <StatLabel>Active Contracts</StatLabel>
          <StatNumber>{data.activeContracts}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Pending Proposals</StatLabel>
          <StatNumber>{data.pendingProposals}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}

