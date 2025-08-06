const { useState, useEffect } = React;
const { Box, Heading, SimpleGrid, Spinner } = ChakraUI;

function StatsAnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await statsAPI.getOverview();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    }
    load();
  }, []);

  if (!stats) {
    return (
      <Box className="stats-container" p={4}>
        <NavMenu />
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="stats-container" p={4}>
      <NavMenu />
      <Heading mb={4}>Stats & Analytics</Heading>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Active Users" value={stats.activeUsers} />
        <StatCard label="New Signups" value={stats.newSignups} />
        <StatCard label="Revenue" value={`$${stats.revenue}`}/>
      </SimpleGrid>
    </Box>
  );
}

window.StatsAnalyticsPage = StatsAnalyticsPage;
