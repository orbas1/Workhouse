import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack, Text, Switch, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getMyGigs, getAppliedGigs } from '../api/gigs.js';
import '../styles/GigsDashboardPage.css';

function GigsDashboardPage() {
  const [mode, setMode] = useState('seller');
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = mode === 'seller' ? await getMyGigs() : await getAppliedGigs();
        setGigs(data);
      } catch (err) {
        console.error('Failed to load gigs', err);
      }
    }
    load();
  }, [mode]);

  return (
    <Box className="gigs-dashboard-page" p={4}>
      <Heading size="lg" mb={4}>Gigs Dashboard</Heading>
      <Stack direction="row" align="center" mb={4}>
        <Text>Buyer</Text>
        <Switch colorScheme="teal" isChecked={mode === 'seller'} onChange={(e) => setMode(e.target.checked ? 'seller' : 'buyer')} />
        <Text>Seller</Text>
        <Button size="sm" as={RouterLink} to="/gigs/search" colorScheme="teal">Discover</Button>
      </Stack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th isNumeric>Orders</Th>
          </Tr>
        </Thead>
        <Tbody>
          {gigs.map((gig) => (
            <Tr key={gig.id}>
              <Td>{gig.title}</Td>
              <Td>{gig.status}</Td>
              <Td isNumeric>{gig.orders || 0}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {mode === 'seller' && (
        <Button mt={4} as={RouterLink} to="/gigs/manage" colorScheme="teal">
          Create New Gig
        </Button>
      )}
    </Box>
  );
}

export default GigsDashboardPage;
