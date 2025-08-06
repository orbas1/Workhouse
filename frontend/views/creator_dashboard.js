const { Box, Heading, Text, SimpleGrid, Button, Flex } = ChakraUI;
const { useEffect, useState } = React;

function StatCard({ label, value }) {
  return (
    <Box className="stat-card" p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="sm" mb={2}>{label}</Heading>
      <Text fontSize="xl" fontWeight="bold">{value}</Text>
    </Box>
  );
}

function CreatorDashboard() {
  const [series, setSeries] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [s, w, t] = await Promise.all([
          creatorAPI.getCreatorSeries(),
          creatorAPI.getCreatorWebinars(),
          creatorAPI.getTrendingPodcasts(),
        ]);
        setSeries(s);
        setWebinars(w);
        setTrending(t.data || []);
      } catch (err) {
        console.error('Failed to load creator dashboard', err);
        setError('Failed to load data');
      }
    }
    loadData();
  }, []);

  const totalPlays = series.reduce((sum, s) => sum + (s.listens || 0), 0);
  const totalAttendees = webinars.reduce((sum, w) => sum + (w.overview?.attendees || 0), 0);
  const totalRevenue = webinars.reduce((sum, w) => sum + (w.overview?.revenue || 0), 0);

  return (
    <Box className="creator-dashboard" p={4}>
      <NavMenu />
      <Heading mb={4}>Creator Dashboard</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={6}>
        <StatCard label="Total Plays" value={totalPlays} />
        <StatCard label="Total Attendees" value={totalAttendees} />
        <StatCard label="Revenue" value={`$${totalRevenue}`} />
      </SimpleGrid>
      <Heading size="md" mb={2}>Podcast Series</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={6}>
        {series.map(s => (
          <Box key={s.seriesId} className="series-card" borderWidth="1px" borderRadius="md" p={4} bg="white">
            <Heading size="sm" mb={2}>{s.title || 'Untitled Series'}</Heading>
            <Text>Episodes: {s.episodes || 0}</Text>
            <Text>Listens: {s.listens}</Text>
            <Flex mt={2} gap={2}>
              <Button size="sm" colorScheme="teal">Edit</Button>
              <Button size="sm" colorScheme="blue">Add Episode</Button>
              <Button size="sm" colorScheme="purple">Stats</Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
      <Heading size="md" mb={2}>Webinars</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={6}>
        {webinars.map(w => (
          <Box key={w.webinarId} className="series-card" borderWidth="1px" borderRadius="md" p={4} bg="white">
            <Heading size="sm" mb={2}>{w.title || 'Webinar'}</Heading>
            <Text>Attendees: {w.overview?.attendees || 0}</Text>
            <Text>Revenue: ${w.overview?.revenue || 0}</Text>
            <Flex mt={2} gap={2}>
              <Button size="sm" colorScheme="teal">Edit</Button>
              <Button size="sm" colorScheme="blue">Add Webinar</Button>
              <Button size="sm" colorScheme="purple">Stats</Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
      <Heading size="md" mb={2}>Trending Podcasts</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {trending.slice(0,3).map(p => (
          <Box key={p.key || p.url} className="series-card" borderWidth="1px" borderRadius="md" p={4} bg="white">
            <Text fontWeight="bold">{p.name || 'Podcast'}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt={6}>
        <Button colorScheme="teal" onClick={() => window.location.href='/content/manage'}>
          Manage Content
        </Button>
      </Box>
    </Box>
  );
}

window.CreatorDashboard = CreatorDashboard;
