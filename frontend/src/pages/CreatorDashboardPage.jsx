import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Button, Flex, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getCreatorSeries, getCreatorWebinars } from '../api/creator.js';
import { fetchPopularPodcasts } from '../api/podcast.js';
import '../styles/CreatorDashboardPage.css';

function StatCard({ label, value }) {
  return (
    <Box className="stat-card" p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="sm" mb={2}>{label}</Heading>
      <Text fontSize="xl" fontWeight="bold">{value}</Text>
    </Box>
  );
}

export default function CreatorDashboardPage() {
  const [series, setSeries] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [s, w, t] = await Promise.all([
          getCreatorSeries(),
          getCreatorWebinars(),
          fetchPopularPodcasts(),
        ]);
        setSeries(s);
        setWebinars(w);
        setTrending(t?.data || t);
      } catch (err) {
        console.error('Failed to load creator dashboard', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalPlays = series.reduce((sum, s) => sum + (s.listens || 0), 0);
  const totalAttendees = webinars.reduce((sum, w) => sum + (w.overview?.attendees || 0), 0);
  const totalRevenue = webinars.reduce((sum, w) => sum + (w.overview?.revenue || 0), 0);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="creator-dashboard" p={4}>
      <Heading mb={4}>Creator Dashboard</Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
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
            <Text>Listens: {s.listens || 0}</Text>
            <Flex mt={2} gap={2} flexWrap="wrap">
              <Button size="sm" colorScheme="teal" onClick={() => navigate(`/content/manage?type=podcast&seriesId=${s.seriesId}`)}>Edit</Button>
              <Button size="sm" colorScheme="blue" onClick={() => navigate(`/content/manage?type=podcast&seriesId=${s.seriesId}&action=addEpisode`)}>Add Episode</Button>
              <Button size="sm" colorScheme="purple" onClick={() => navigate(`/creator/analytics?seriesId=${s.seriesId}`)}>Stats</Button>
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
            <Flex mt={2} gap={2} flexWrap="wrap">
              <Button size="sm" colorScheme="teal" onClick={() => navigate(`/content/manage?type=webinar&webinarId=${w.webinarId}`)}>Edit</Button>
              <Button size="sm" colorScheme="blue" onClick={() => navigate(`/content/manage?type=webinar&action=add`)}>Add Webinar</Button>
              <Button size="sm" colorScheme="purple" onClick={() => navigate(`/creator/analytics?webinarId=${w.webinarId}`)}>Stats</Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <Heading size="md" mb={2}>Trending Podcasts</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {trending.slice(0,3).map(p => (
          <Box key={p.key || p.id || p.url} className="series-card" borderWidth="1px" borderRadius="md" p={4} bg="white">
            <Text fontWeight="bold">{p.name || p.title || 'Podcast'}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
