import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { getSimDashboard } from '../api/simDashboard.js';
import '../styles/SimDashboard.css';

export default function SimDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSimDashboard();
        setStats(data);
      } catch (err) {
        console.error('Failed to load dashboard', err);
      }
    }
    load();
  }, []);

  if (!stats) {
    return <Box p={4}>Loading...</Box>;
  }

  const roles = [
    { key: 'startups', title: 'Startups' },
    { key: 'investors', title: 'Investors' },
    { key: 'mentors', title: 'Mentors' }
  ];

  return (
    <Box className="sim-dashboard" p={4}>
      <Heading mb={6}>Ecosystem Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {roles.map(({ key, title }) => (
          <Box key={key} className="sim-card">
            <Heading size="md" mb={2}>{title}</Heading>
            <Stat>
              <StatLabel>Total</StatLabel>
              <StatNumber>{stats[key].total}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Active</StatLabel>
              <StatNumber>{stats[key].active}</StatNumber>
            </Stat>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
