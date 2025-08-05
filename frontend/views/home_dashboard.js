const { Box, Heading, SimpleGrid, Text, Button } = ChakraUI;
const { useState, useEffect } = React;
const { useAuth } = window;

function HomeDashboard() {
  const { user } = useAuth();
  const [affiliate, setAffiliate] = useState(null);

  useEffect(() => {
    async function loadAffiliate() {
      try {
        const data = await dashboardAPI.getAffiliateDashboard(1);
        setAffiliate(data);
      } catch (err) {
        console.error('Failed to load affiliate dashboard', err);
      }
    }
    loadAffiliate();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box className="dashboard-container">
      <NavMenu />
      <Heading size="lg" mb={4}>Welcome, {user.username}</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6} className="summary-grid">
        <UserCountWidget />
        {affiliate && (
          <Box className="affiliate-widget" p={4} borderWidth="1px" borderRadius="md" bg="white">
            <Heading size="md" mb={2}>Affiliate Stats</Heading>
            <Text>Clicks: {affiliate.performance.clicks}</Text>
            <Text>Conversions: {affiliate.performance.conversions}</Text>
            <Text>Earnings: ${affiliate.earnings}</Text>
          </Box>
        )}
        <QuoteWidget />
      </SimpleGrid>
      <Box mt={6} textAlign="center">
        <Button colorScheme="blue" className="cta-button" onClick={() => window.location.href = '/feed'}>
          Go to Live Feed
        </Button>
      </Box>
    </Box>
  );
}

window.HomeDashboard = HomeDashboard;
