const { useEffect, useState } = React;
const { ChakraProvider, Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Tabs, TabList, TabPanels, Tab, TabPanel, Text } = ChakraUI;
const { useAuth } = window;

function ProgressDashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const dash = await progressAPI.getProgressDashboard(user.id);
        const taskData = await progressAPI.getTasks(user.id);
        setDashboard(dash);
        setTasks(taskData);
      } catch (err) {
        console.error('Failed to load progress', err);
      }
    }
    load();
  }, [user]);

  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="progress-dashboard">
        <Heading mb={4}>Progress Dashboard</Heading>
        <Tabs colorScheme="teal">
          <TabList>
            <Tab>Participant View</Tab>
            <Tab>Provider View</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={[1, 2]} spacing={4} mb={4}>
                <Stat>
                  <StatLabel>Achievements</StatLabel>
                  <StatNumber>{dashboard?.achievementsCount || 0}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Skills</StatLabel>
                  <StatNumber>{dashboard?.skillsCount || 0}</StatNumber>
                </Stat>
              </SimpleGrid>
              <Heading size="md" mb={2}>Completed Tasks</Heading>
              {tasks.map((t) => (
                <Box key={t.id} className="task-card" p={3} mb={3} borderWidth="1px" borderRadius="md">
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
                <Box key={t.id} className="task-card" p={3} mb={3} borderWidth="1px" borderRadius="md">
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
    </ChakraProvider>
  );
}

window.ProgressDashboard = ProgressDashboard;
