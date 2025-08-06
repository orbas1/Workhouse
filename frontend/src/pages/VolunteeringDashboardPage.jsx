import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Flex,
  Spinner
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { getVolunteeringDashboard } from '../api/volunteering.js';
import '../styles/VolunteeringDashboardPage.css';

export default function VolunteeringDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getVolunteeringDashboard();
        setStats(data);
      } catch (err) {
        console.error('Failed to load volunteering dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const StatBox = ({ label, value }) => (
    <Stat borderWidth="1px" borderRadius="md" p={4} bg="white">
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
    </Stat>
  );

  if (loading) {
    return (
      <Box className="volunteering-dashboard-page" p={4}>
        <Heading size="lg" mb={4}>Volunteering Dashboard</Heading>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="volunteering-dashboard-page" p={4}>
      <Heading size="lg" mb={4}>Volunteering Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6} className="stats-grid">
        {user?.role === 'organization' ? (
          <>
            <StatBox label="Total Volunteers" value={stats.totalVolunteers} />
            <StatBox label="Active Opportunities" value={stats.activeOpportunities} />
            <StatBox label="Pending Applications" value={stats.pendingApplications} />
          </>
        ) : (
          <>
            <StatBox label="Total Hours" value={stats.totalHours} />
            <StatBox label="Active Applications" value={stats.activeApplications} />
            <StatBox label="Feedback Score" value={stats.feedbackScore?.toFixed(1)} />
          </>
        )}
      </SimpleGrid>
      <Flex gap={4} className="shortcut-buttons">
        {user?.role === 'organization' ? (
          <Button colorScheme="teal" onClick={() => (window.location.href = '/opportunities/manage')}>
            Post Opportunity
          </Button>
        ) : (
          <Button colorScheme="teal" onClick={() => (window.location.href = '/volunteer/opportunities')}>
            Find Opportunities
          </Button>
        )}
        <Button colorScheme="blue" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </Flex>
    </Box>
  );
}

