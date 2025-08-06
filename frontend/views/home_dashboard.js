const { Box, Heading, Text, Button, SimpleGrid } = ChakraUI;
const { useEffect, useState } = React;
const { Box, Heading, SimpleGrid, Text, Button } = ChakraUI;
const { useState, useEffect } = React;
const { useAuth } = window;
const { useEffect, useState } = React;
const { Box, Heading, Text, Button, Flex } = ChakraUI;

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
    <Box className="dashboard-container" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Welcome, {user.username}</Heading>
      <Button mb={4} colorScheme="teal" onClick={() => window.location.href = '/setup/financial-media'}>
        Complete Financial Setup
      </Button>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
    <>
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
      <Button mt={6} colorScheme="blue" onClick={() => window.location.href = '/feed'}>
    </Box>
      <Box className="dashboard">
        <Heading size="lg" mb={2}>Dashboard</Heading>
        <Text mb={4}>Hello, {user.username}!</Text>
        <Button colorScheme="blue" onClick={() => window.location.href = '/feed'}>
          Go to Live Feed
        </Button>
        <Button colorScheme="green" mt={2} onClick={() => window.location.href = '/employment'}>
          Employment Dashboard
        </Button>
      </Box>
    </Box>
      <Box className="dashboard" mt={6}>
        <Heading size="lg" mb={2}>Dashboard</Heading>
        <Text mb={4}>Hello, {user.username}!</Text>
        <Button colorScheme="blue" mr={2} onClick={() => window.location.href = '/feed'}>
          Go to Live Feed
        </Button>
        <Button colorScheme="teal" onClick={() => window.location.href = '/interview/1'}>
          Join Interview
        </Button>
      </Box>
    <Box className="dashboard">
      <Heading size="lg" mb={2}>Dashboard</Heading>
      <Text mb={4}>Hello, {user.username}!</Text>
      <Flex gap={2}>
        <Button colorScheme="blue" onClick={() => window.location.href = '/feed'}>
          Go to Live Feed
        </Button>
        <Button colorScheme="teal" onClick={() => window.location.href = '/profile'}>
          View Profile
        </Button>
      </Flex>
      <Button colorScheme="blue" onClick={() => window.location.href = '/feed'}>
        Go to Live Feed
      </Button>
      <Button mt={2} colorScheme="green" onClick={() => window.location.href = '/onboarding/documents'}>
        Upload CV & Cover Letter
      </Button>
    </Box>
  </Box>
      <Button ml={2} colorScheme="teal" onClick={() => window.location.href = '/applications-interviews'}>
        Manage Applications
      <Button ml={2} colorScheme="teal" onClick={() => window.location.href = '/gigs/manage'}>
        Manage Gigs
      <Button ml={2} colorScheme="teal" onClick={() => window.location.href = '/gigs'}>
        Gigs Dashboard
      <Button colorScheme="teal" ml={2} onClick={() => window.location.href = '/jobs'}>
        Browse Jobs
      </Button>
      <Button ml={2} colorScheme="teal" onClick={() => window.location.href = '/freelancers'}>
        Search Freelancers
      </Button>
    </Box>
    <ChatWidget />
    </>
  <Flex mt={4} gap={2} wrap="wrap">
    <Button colorScheme="teal" onClick={() => window.location.href = '/applications-interviews'}>
      Manage Applications
    </Button>
    <Button colorScheme="teal" onClick={() => window.location.href = '/gigs/manage'}>
      Manage Gigs
    </Button>
    <Button colorScheme="teal" onClick={() => window.location.href = '/gigs'}>
      Gigs Dashboard
    </Button>
    <Button colorScheme="teal" onClick={() => window.location.href = '/jobs'}>
      Browse Jobs
    </Button>
    <Button colorScheme="teal" onClick={() => window.location.href = '/education/courses'}>
      Courses
    </Button>
    <Button colorScheme="teal" onClick={() => window.location.href = '/blog'}>
      Blog
    </Button>
  </Flex>
  <ChatWidget />
  </>
  );
}

window.HomeDashboard = HomeDashboard;
