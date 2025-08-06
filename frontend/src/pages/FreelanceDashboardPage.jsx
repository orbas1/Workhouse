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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from '@chakra-ui/react';
import '../styles/FreelanceDashboardPage.css';
import { getContracts } from '../api/contracts.js';
import { getOrders } from '../api/orders.js';
import { listMyGigs, updateGig } from '../api/gigs.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function FreelanceDashboardPage() {
  const [mode, setMode] = useState('client');
  const [contracts, setContracts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [gigs, setGigs] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const [c, o, g] = await Promise.all([
          getContracts(),
          getOrders(user.id),
          listMyGigs(user.id),
        ]);
        setContracts(c);
        setOrders(o);
        setGigs(g);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    }
    load();
  }, [user]);

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
      {mode === 'freelancer' ? (
        <Table variant="simple" className="gigs-table" mt={8}>
          <Thead>
            <Tr>
              <Th>Gig</Th>
              <Th isNumeric>Views</Th>
              <Th isNumeric>Orders</Th>
              <Th isNumeric>Earnings</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {gigs.map((gig) => (
              <Tr key={gig.id}>
                <Td>{gig.title}</Td>
                <Td isNumeric>{gig.views || 0}</Td>
                <Td isNumeric>{gig.orders || 0}</Td>
                <Td isNumeric>${gig.earnings || 0}</Td>
                <Td>
                  <Button size="sm" mr={2} onClick={() => navigate(`/gigs/manage?gigId=${gig.id}`)}>Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => updateGig(gig.id, { status: 'paused' })}>Pause</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Table variant="simple" className="orders-table" mt={8}>
          <Thead>
            <Tr>
              <Th>Gig</Th>
              <Th>Status</Th>
              <Th isNumeric>Amount</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.gigTitle || order.title}</Td>
                <Td>{order.status}</Td>
                <Td isNumeric>${order.amount || 0}</Td>
                <Td>
                  <Button size="sm" onClick={() => navigate('/orders')}>View</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
