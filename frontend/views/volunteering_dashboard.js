const {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Flex,
  Spinner,
} = ChakraUI;
const { useState, useEffect } = React;
const { useAuth } = window;

function StatBox({ label, value }) {
  return (
    <Stat p={4} borderWidth="1px" borderRadius="md" bg="white" className="stat-box">
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
    </Stat>
  );
}

function VolunteeringDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await volunteeringAPI.getDashboard();
        setStats(data);
      } catch (err) {
        console.error('Failed to load volunteering dashboard', err);
      }
    }
    load();
  }, []);

  if (!stats) {
    return (
      <Box className="volunteering-dashboard" p={4}>
        <NavMenu />
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="volunteering-dashboard" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>
        Volunteering Dashboard
      </Heading>
      <SimpleGrid columns={[1, 3]} spacing={4} className="stats-grid">
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
            <StatBox label="Feedback Score" value={stats.feedbackScore.toFixed(1)} />
          </>
        )}
      </SimpleGrid>
      <Flex mt={6} gap={4} className="shortcut-buttons">
        {user?.role === 'organization' ? (
          <Button colorScheme="teal" onClick={() => (window.location.href = '/opportunities/create')}>
            Post Opportunity
          </Button>
        ) : (
          <Button colorScheme="teal" onClick={() => (window.location.href = '/opportunities')}>
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

window.VolunteeringDashboard = VolunteeringDashboard;

