import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Spinner, Button, Flex } from '@chakra-ui/react';
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
    <Box className="dashboard-page" p={4}>
      <Heading mb={4}>Welcome back, {user?.name || user?.username}</Heading>
      <Flex mb={4} gap={4} flexWrap="wrap">
        <Button colorScheme="purple" onClick={() => navigate('/install')}>
          Run Installation Wizard
        </Button>
        <Button colorScheme="teal" onClick={() => navigate('/feed')}>
          View Live Feed
        </Button>
        <Button colorScheme="green" onClick={() => navigate('/progress')}>
          View Progress
        </Button>
        <Button colorScheme="blue" onClick={() => navigate('/volunteering')}>
          Volunteering
        </Button>
      </Flex>
      <SimpleGrid columns={[1, 3]} spacing={4}>
        {'totalSpend' in data && (
          <Stat borderWidth="1px" borderRadius="md" p={4}>
            <StatLabel>Total Spend</StatLabel>
            <StatNumber>${data.totalSpend}</StatNumber>
          </Stat>
        )}
        {'totalEarnings' in data && (
          <Stat borderWidth="1px" borderRadius="md" p={4}>
            <StatLabel>Total Earnings</StatLabel>
            <StatNumber>${data.totalEarnings}</StatNumber>
          </Stat>
        )}
        <Stat borderWidth="1px" borderRadius="md" p={4}>
          <StatLabel>Active Contracts</StatLabel>
          <StatNumber>{data.activeContracts}</StatNumber>
        </Stat>
        <Stat borderWidth="1px" borderRadius="md" p={4}>
          <StatLabel>Pending Proposals</StatLabel>
          <StatNumber>{data.pendingProposals}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
