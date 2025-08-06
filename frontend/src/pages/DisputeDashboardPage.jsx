import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  ButtonGroup,
  Button,
  Spinner,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link as ChakraLink
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { listDisputes } from '../api/disputes.js';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/DisputeDashboardPage.css';

function DisputeDashboardPage() {
  const { user } = useAuth();
  const [mode, setMode] = useState('disputor');
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    listDisputes({ role: mode, userId: user.id })
      .then(setDisputes)
      .catch(err => console.error('Failed to load disputes', err))
      .finally(() => setLoading(false));
  }, [user, mode]);

  const stats = {
    total: disputes.length,
    pending: disputes.filter(d => d.status === 'open' || d.status === 'pending').length,
    resolved: disputes.filter(d => d.status === 'resolved').length
  };

  return (
    <Box className="dispute-dashboard-page" p={4}>
      <Heading mb={4}>Dispute Dashboard</Heading>
      <ButtonGroup mb={4}>
        <Button colorScheme={mode === 'disputor' ? 'teal' : 'gray'} onClick={() => setMode('disputor')}>
          Disputor
        </Button>
        <Button colorScheme={mode === 'disputee' ? 'teal' : 'gray'} onClick={() => setMode('disputee')}>
          Disputee
        </Button>
      </ButtonGroup>

      <Button
        as={RouterLink}
        to="/disputes/new"
        colorScheme="teal"
        mb={4}
      >
        File New Dispute
      </Button>

      <SimpleGrid columns={[1, 3]} spacing={4} mb={4}>
        <Stat>
          <StatLabel>Total</StatLabel>
          <StatNumber>{stats.total}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Pending</StatLabel>
          <StatNumber>{stats.pending}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Resolved</StatLabel>
          <StatNumber>{stats.resolved}</StatNumber>
        </Stat>
      </SimpleGrid>

      {loading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {disputes.map(d => (
              <Tr key={d.id}>
                <Td>{d.id}</Td>
                <Td>{d.category}</Td>
                <Td>{d.status}</Td>
                <Td>{new Date(d.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <ChakraLink as={RouterLink} color="teal.500" to={`/disputes/${d.id}`}>
                    View
                  </ChakraLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default DisputeDashboardPage;
