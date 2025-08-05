const { Box, Heading, SimpleGrid, Text } = ChakraUI;
const { useState, useEffect } = React;
const { useEffect, useState } = React;
const { Box, Heading, Text, Button } = ChakraUI;

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
    <Box className="dashboard-container">
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
    <Box className="dashboard">
      <Heading size="lg" mb={2}>Dashboard</Heading>
      <Text mb={4}>Hello, {user.username}!</Text>
      <Button colorScheme="blue" onClick={() => window.location.href = '/feed'}>
        Go to Live Feed
      </Button>
      <Button ml={2} colorScheme="teal" onClick={() => window.location.href = '/applications-interviews'}>
        Manage Applications
      </Button>
    </Box>
  );
}

window.HomeDashboard = HomeDashboard;
