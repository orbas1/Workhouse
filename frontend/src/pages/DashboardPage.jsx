import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Spinner, Button, Flex } from '@chakra-ui/react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Button
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
      <Button mb={4} colorScheme="teal" onClick={() => navigate('/ads')}>
        Go to Ads Dashboard
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
      <Button mb={4} colorScheme="purple" onClick={() => navigate('/profile/customize')}>
        Customize Profile
      </Button>
      <Button mb={4} colorScheme="teal" onClick={() => navigate('/feed')}>
        View Live Feed
      </Button>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
      <Button mb={4} colorScheme="purple" onClick={() => navigate('/creator/analytics')}>
        Creator Analytics
      <Button mb={4} colorScheme="teal" onClick={() => navigate('/connections')}>
        Manage Connections
      <Button mb={4} colorScheme="purple" onClick={() => navigate('/sim-dashboard')}>
        Startup/Investor/Mentor Hub
      <Button mb={4} colorScheme="purple" onClick={() => navigate('/startups/analytics')}>
        Startup Analytics
      <Button mb={4} colorScheme="orange" onClick={() => navigate('/community')}>
        My Community
      <Button mb={4} colorScheme="teal" onClick={() => navigate('/notifications')}>
        Message Notifications
      </Button>
      <Button mb={4} colorScheme="teal" onClick={() => navigate('/service-orders')}>
        Manage Service Orders
      </Button>
      <Button mb={4} colorScheme="blue" onClick={() => navigate('/billing')}>
        Billing & Subscription
      <Button mb={4} colorScheme="orange" onClick={() => navigate('/articles')}>
        Read Blog
      <Button mb={4} colorScheme="blue" onClick={() => navigate('/stats')}>
        View Analytics
      </Button>
      <Button mb={4} colorScheme="orange" onClick={() => navigate('/blog')}>
        Visit Blog
      <Button mb={4} colorScheme="orange" onClick={() => navigate('/disputes')}>
        Dispute Dashboard
      </Button>
      <Button mb={4} colorScheme="red" onClick={() => navigate('/disputes/new')}>
        File a Dispute
      </Button>
      <SimpleGrid columns={[1, 3]} spacing={4}>
        {'totalSpend' in data && (
          <Stat>
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

