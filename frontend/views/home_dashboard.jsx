const { Box, Heading, Text, Button, SimpleGrid, Flex } = ChakraUI;
const { useState, useEffect } = React;
const { useAuth } = window;

function HomeDashboard() {
  const { user } = useAuth();
  const [affiliate, setAffiliate] = useState(null);

  useEffect(() => {
    if (!user) return;
    dashboardAPI
      .getAffiliateDashboard(user.id)
      .then(setAffiliate)
      .catch(err => console.error('Failed to load affiliate dashboard', err));
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <Box className="dashboard-container" p={4}>
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
      <Flex mt={6} gap={2} wrap="wrap">
        <Button colorScheme="blue" onClick={() => (window.location.href = '/feed')}>
          Go to Live Feed
        </Button>
        <Button colorScheme="teal" onClick={() => (window.location.href = '/profile')}>
          View Profile
        </Button>
        <Button colorScheme="purple" onClick={() => (window.location.href = '/ads')}>
          Ads & Billing
        </Button>
      </Flex>
    </Box>
  );
}

window.HomeDashboard = HomeDashboard;
