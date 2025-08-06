import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { getUserProfile } from '../api/profile.js';
import { getPodcastSeriesOverview, getPodcastEpisodeDetails, getWebinarOverview } from '../api/creatorAnalytics.js';
import '../styles/CreatorAnalyticsPage.css';

export default function CreatorAnalyticsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [seriesId, setSeriesId] = useState('');
  const [episodeId, setEpisodeId] = useState('');
  const [seriesData, setSeriesData] = useState(null);
  const [episodeData, setEpisodeData] = useState(null);
  const [webinarData, setWebinarData] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      try {
        const data = await getUserProfile(user.id);
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    }
    loadProfile();
  }, [user]);

  const handleFetchAnalytics = async () => {
    try {
      if (seriesId) {
        const data = await getPodcastSeriesOverview(seriesId);
        setSeriesData(data);
      }
      if (episodeId) {
        const data = await getPodcastEpisodeDetails(episodeId);
        setEpisodeData(data);
      }
      const webinar = await getWebinarOverview();
      setWebinarData(webinar);
    } catch (err) {
      console.error('Analytics fetch failed', err);
    }
  };

  return (
    <ChakraProvider>
      <Box className="creator-analytics" p={4}>
        <Heading mb={4}>Creator Profile & Analytics</Heading>
        {profile && (
          <Box className="profile-info" mb={6}>
            <Text fontWeight="bold">{profile.name}</Text>
            <Text>{profile.email}</Text>
          </Box>
        )}
        <VStack spacing={4} align="stretch" mb={6}>
          <Input placeholder="Podcast Series ID" value={seriesId} onChange={(e) => setSeriesId(e.target.value)} />
          <Input placeholder="Episode ID" value={episodeId} onChange={(e) => setEpisodeId(e.target.value)} />
          <Button colorScheme="teal" onClick={handleFetchAnalytics}>Load Analytics</Button>
        </VStack>
        {seriesData && (
          <Box className="analytics-section" mt={4}>
            <Heading size="md">Series Overview</Heading>
            <pre>{JSON.stringify(seriesData, null, 2)}</pre>
          </Box>
        )}
        {episodeData && (
          <Box className="analytics-section" mt={4}>
            <Heading size="md">Episode Details</Heading>
            <pre>{JSON.stringify(episodeData, null, 2)}</pre>
          </Box>
        )}
        {webinarData && (
          <Box className="analytics-section" mt={4}>
            <Heading size="md">Webinar Overview</Heading>
            <pre>{JSON.stringify(webinarData, null, 2)}</pre>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
}
