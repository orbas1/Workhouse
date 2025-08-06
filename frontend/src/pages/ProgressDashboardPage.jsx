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
  Text,
  Spinner
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { getProgressDashboard, getTasks } from '../api/progress.js';
import '../styles/ProgressDashboardPage.css';

export default function ProgressDashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const dash = await getProgressDashboard(user.id);
        const taskData = await getTasks(user.id);
        setDashboard(dash);
        setTasks(taskData || []);
      } catch (err) {
        console.error('Failed to load progress', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  if (loading) {
    return (
      <Box className="progress-dashboard-page" p={4}>
        <Heading size="lg" mb={4}>Progress</Heading>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="progress-dashboard-page" p={4}>
      <Heading size="lg" mb={4}>Progress</Heading>
      <Tabs colorScheme="teal" variant="enclosed">
        <TabList>
          <Tab>Participant View</Tab>
          <Tab>Provider View</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
              <Stat borderWidth="1px" borderRadius="md" p={4}>
                <StatLabel>Achievements</StatLabel>
                <StatNumber>{dashboard?.achievementsCount || 0}</StatNumber>
              </Stat>
              <Stat borderWidth="1px" borderRadius="md" p={4}>
                <StatLabel>Skills</StatLabel>
                <StatNumber>{dashboard?.skillsCount || 0}</StatNumber>
              </Stat>
            </SimpleGrid>
            <Heading size="md" mb={2}>Completed Tasks</Heading>
            {tasks.map((t) => (
              <Box key={t.id} className="task-card" borderWidth="1px" borderRadius="md" p={3} mb={3} bg="white">
                <Heading size="sm">{t.title}</Heading>
                {t.summary && <Text fontSize="sm" mb={1}>{t.summary}</Text>}
                <Text fontSize="xs">Completed: {t.completedAt ? new Date(t.completedAt).toLocaleDateString() : 'N/A'}</Text>
                {t.feedback && (
                  <Box mt={2} fontSize="sm">
                    <Text>Rating: {t.feedback.rating}/5</Text>
                    {t.feedback.comment && <Text>{t.feedback.comment}</Text>}
                  </Box>
                )}
              </Box>
            ))}
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={2}>Participant Performance</Heading>
            {tasks.map((t) => (
              <Box key={t.id} className="task-card" borderWidth="1px" borderRadius="md" p={3} mb={3} bg="white">
                <Heading size="sm">{t.title}</Heading>
                {t.feedback && (
                  <Box fontSize="sm" mt={1}>
                    <Text>Rating: {t.feedback.rating || 'N/A'}</Text>
                    {t.feedback.comment && <Text>{t.feedback.comment}</Text>}
                  </Box>
                )}
              </Box>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

