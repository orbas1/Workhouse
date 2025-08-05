const { Box, Heading, SimpleGrid, Text, Button } = ChakraUI;
const { useState, useEffect } = React;

function HomeDashboard() {
  const { user } = useAuth();
  const [affiliate, setAffiliate] = useState(null);

  useEffect(() => {
    async function loadAffiliate() {
      try {
        const res = await apiFetch('/api/affiliates/dashboard/1');
        if (res.ok) {
          const data = await res.json();
          setAffiliate(data);
        }
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
    <Box className="dashboard-container" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Welcome, {user.username}</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
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
      <Button mt={6} colorScheme="blue" onClick={() => window.location.href = '/feed'}>
        Go to Live Feed
      </Button>
    </Box>
  );
}

window.HomeDashboard = HomeDashboard;
