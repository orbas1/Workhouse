import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Spinner, Text, VStack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import StatCard from '../components/StatCard.jsx';
import '../styles/ExperienceDashboardPage.css';
import { fetchExperienceDashboard } from '../api/experience.js';

export default function ExperienceDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const dashboard = await fetchExperienceDashboard();
        setData(dashboard);
      } catch (err) {
        console.error('Failed to load dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <Spinner />;
  if (!data) return <Box>Unable to load dashboard.</Box>;

  return (
    <Box className="experience-dashboard-page" p={4}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Experience Dashboard</Heading>
        <Button as={RouterLink} to="/opportunities" colorScheme="teal" alignSelf="flex-start">
          Find Opportunities
        </Button>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {Object.entries(data.quickStats).map(([label, value]) => (
            <StatCard key={label} label={label} value={value} />
          ))}
        </SimpleGrid>
        <Box>
          <Heading size="md" mb={2}>Recommendations</Heading>
          {data.recommendations.length === 0 ? (
            <Text>No recommendations available.</Text>
          ) : (
            data.recommendations.map(rec => (
              <Box key={rec.id} className="recommendation-item" p={3} borderWidth="1px" borderRadius="md" mb={2}>
                <Heading size="sm">{rec.title}</Heading>
                <Text fontSize="sm">{rec.description}</Text>
              </Box>
            ))
          )}
        </Box>
        <Box>
          <Heading size="md" mb={2}>Notifications</Heading>
          {data.notifications.length === 0 ? (
            <Text>No notifications.</Text>
          ) : (
            data.notifications.map((note, idx) => (
              <Box key={idx} className="notification-item" p={3} borderWidth="1px" borderRadius="md" mb={2}>
                <Text fontSize="sm">{note.message}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Box>
  );
}
