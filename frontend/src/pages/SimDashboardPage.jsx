import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  Stack,
  Button
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
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
      <Tabs variant="enclosed">
        <TabList>
          {roles.map(({ key, title }) => (
            <Tab key={key}>{title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {roles.map(({ key }) => (
            <TabPanel key={key}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                <Stat>
                  <StatLabel>Total</StatLabel>
                  <StatNumber>{stats[key].stats.total}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Active</StatLabel>
                  <StatNumber>{stats[key].stats.active}</StatNumber>
                </Stat>
              </SimpleGrid>
              <Heading size="sm" mt={4} mb={2}>Notifications</Heading>
              <List spacing={2} mb={4} className="sim-notifications">
                {stats[key].notifications.map((note, idx) => (
                  <ListItem key={idx}>{note}</ListItem>
                ))}
              </List>
              <Heading size="sm" mb={2}>Quick Actions</Heading>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                {stats[key].actions.map((action) => (
                  <Button
                    key={action.path}
                    as={RouterLink}
                    to={action.path}
                    colorScheme="teal"
                  >
                    {action.label}
                  </Button>
                ))}
              </Stack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
