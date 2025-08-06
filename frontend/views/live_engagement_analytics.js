const { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, useToast } = ChakraUI;
const { useState, useEffect } = React;

function LiveEngagementAnalytics() {
  const [totals, setTotals] = useState(null);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await analyticsAPI.getLiveFeedEngagement();
        setTotals(data.totals);
      } catch (err) {
        console.error('Analytics fetch failed', err);
        toast({ title: 'Failed to load analytics', status: 'error' });
      }
    }
    load();
  }, []);

  return (
    <Box className="live-engagement-analytics" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Live Engagement Analytics</Heading>
      {totals && (
        <SimpleGrid columns={[1, 2, 4]} spacing={4}>
          <Stat className="stat-card">
            <StatLabel>Views</StatLabel>
            <StatNumber>{totals.views}</StatNumber>
          </Stat>
          <Stat className="stat-card">
            <StatLabel>Likes</StatLabel>
            <StatNumber>{totals.likes}</StatNumber>
          </Stat>
          <Stat className="stat-card">
            <StatLabel>Comments</StatLabel>
            <StatNumber>{totals.comments}</StatNumber>
          </Stat>
          <Stat className="stat-card">
            <StatLabel>Shares</StatLabel>
            <StatNumber>{totals.shares}</StatNumber>
          </Stat>
        </SimpleGrid>
      )}
    </Box>
  );
}

window.LiveEngagementAnalytics = LiveEngagementAnalytics;
