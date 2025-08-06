import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Switch,
  FormControl,
  FormLabel,
  Button
} from '@chakra-ui/react';
import '../../styles/FreelanceDashboardPage.css';
import { getContracts } from '../api/contracts.js';
import { getOrders } from '../api/orders.js';
import { Link } from 'react-router-dom';

export default function FreelanceDashboardPage() {
  const [mode, setMode] = useState('client');
  const [contracts, setContracts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [c, o] = await Promise.all([
          getContracts(),
          getOrders(),
        ]);
        setContracts(c);
        setOrders(o);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    }
    load();
  }, []);

  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const pendingContracts = contracts.filter(c => c.status === 'pending').length;
  const totalSpend = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const totalEarnings = orders.reduce((sum, o) => sum + (o.payout || 0), 0);

  return (
    <Box className="freelance-dashboard-page" p={4}>
      <Heading mb={4}>Freelance Dashboard</Heading>
      <FormControl display="flex" alignItems="center" mb={6}>
        <FormLabel htmlFor="mode-switch" mb="0">
          {mode === 'client' ? 'Client View' : 'Freelancer View'}
        </FormLabel>
        <Switch id="mode-switch" onChange={e => setMode(e.target.checked ? 'freelancer' : 'client')} />
      </FormControl>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        <Stat>
          <StatLabel>Active Contracts</StatLabel>
          <StatNumber>{activeContracts}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>{mode === 'client' ? 'Total Spend' : 'Total Earnings'}</StatLabel>
          <StatNumber>${mode === 'client' ? totalSpend : totalEarnings}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Pending Contracts</StatLabel>
          <StatNumber>{pendingContracts}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Box mt={6} display="flex" gap={3}>
        <Button as={Link} to="/freelancers" colorScheme="teal">
          Find Freelancers
        </Button>
        <Button as={Link} to="/proposals-invoices" colorScheme="blue">
          Manage Proposals & Invoices
        </Button>
      </Box>
    </Box>
  );
}
