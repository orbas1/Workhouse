import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
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
} from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, reports: 0, uptime: '0%' });
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    // Mock data to illustrate layout; replace with API calls as needed
    setStats({ users: 1024, reports: 3, uptime: '99.9%' });
    setActivity([
      { id: 1, event: 'User signup', date: '2024-06-01' },
      { id: 2, event: 'Report resolved', date: '2024-06-02' },
      { id: 3, event: 'Server rebooted', date: '2024-06-03' },
    ]);
  }, []);

  return (
    <Box p={4}>
      <NavMenu />
      <Heading mb={4}>Admin Dashboard</Heading>
      <SimpleGrid columns={[1, 3]} spacing={4} mb={8}>
        <Stat>
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{stats.users}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Open Reports</StatLabel>
          <StatNumber>{stats.reports}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>System Uptime</StatLabel>
          <StatNumber>{stats.uptime}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Heading size="md" mb={2}>
        Recent Activity
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Event</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {activity.map((item) => (
            <Tr key={item.id}>
              <Td>{item.event}</Td>
              <Td>{item.date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

