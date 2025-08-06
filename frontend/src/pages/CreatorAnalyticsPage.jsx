import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Select,
  VStack,
  HStack,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Input,
  Button,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import {
  getPodcastSeriesOverview,
  getPodcastEpisodeDetails,
  getWebinarOverview,
  getCreatorSeries,
  getCreatorWebinars,
} from '../api/creatorAnalytics.js';
import { getUserProfile } from '../api/profile.js';
import { formatDuration } from '../utils/format.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import '../styles/CreatorAnalyticsPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CreatorAnalyticsPage() {
  const query = useQuery();
  const [profile, setProfile] = useState(null);
  const [seriesList, setSeriesList] = useState([]);
  const [webinarList, setWebinarList] = useState([]);
  const [seriesId, setSeriesId] = useState('');
  const [episodeId, setEpisodeId] = useState('');
  const [webinarId, setWebinarId] = useState('');
  const [seriesData, setSeriesData] = useState(null);
  const [episodeData, setEpisodeData] = useState(null);
  const [webinarData, setWebinarData] = useState(null);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitial() {
      try {
        const [profileData, sList, wList, wOverview] = await Promise.all([
          getUserProfile(),
          getCreatorSeries(),
          getCreatorWebinars(),
          getWebinarOverview(),
        ]);
        setProfile(profileData);
        setSeriesList(sList);
        setWebinarList(wList);
        setOverview(wOverview);
        const sParam = query.get('seriesId');
        const wParam = query.get('webinarId');
        if (sParam) {
          setSeriesId(sParam);
          const data = await getPodcastSeriesOverview(sParam);
          setSeriesData(data);
        }
        if (wParam) {
          setWebinarId(wParam);
          const w = wList.find((item) => item.webinarId === wParam);
          if (w) setWebinarData(w);
        }
      } catch (err) {
        console.error('Failed to load analytics page', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeriesChange = async (id) => {
    setSeriesId(id);
    setEpisodeData(null);
    if (!id) return;
    try {
      const data = await getPodcastSeriesOverview(id);
      setSeriesData(data);
    } catch (err) {
      console.error('Failed to fetch series overview', err);
    }
  };

  const handleEpisodeFetch = async () => {
    if (!episodeId) return;
    try {
      const data = await getPodcastEpisodeDetails(episodeId);
      setEpisodeData(data);
    } catch (err) {
      console.error('Failed to fetch episode details', err);
    }
  };

  const handleWebinarChange = (id) => {
    setWebinarId(id);
    const w = webinarList.find((item) => item.webinarId === id);
    setWebinarData(w || null);
  };

  if (loading) return <Spinner />;

  const seriesChartData = seriesData
    ? {
        labels: ['Listens', 'Likes', 'Donations'],
        datasets: [
          {
            label: seriesData.title || 'Series',
            data: [seriesData.listens || 0, seriesData.likes || 0, seriesData.donations || 0],
            backgroundColor: ['#3182CE', '#38A169', '#DD6B20'],
          },
        ],
      }
    : null;

  const episodeChartData = episodeData
    ? {
        labels: episodeData.engagementTimeline.map((p) => `${p.timestamp}s`),
        datasets: [
          {
            label: 'Listeners',
            data: episodeData.engagementTimeline.map((p) => p.listeners),
            borderColor: '#805AD5',
            backgroundColor: 'rgba(128,90,213,0.3)',
          },
        ],
      }
    : null;

  return (
    <Box className="creator-analytics" p={4}>
      <Heading mb={4}>Creator Profile & Analytics</Heading>
      {profile && (
        <Box className="profile-section" mb={6} p={4} borderWidth="1px" borderRadius="md">
          <HStack spacing={4} align="center">
            {profile.avatarUrl && <Image boxSize="64px" borderRadius="full" src={profile.avatarUrl} alt="Avatar" />}
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{profile.name}</Text>
              <Text>{profile.email}</Text>
            </VStack>
          </HStack>
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box>
          <Heading size="md" mb={2}>Podcast Series</Heading>
          <Select placeholder="Select series" value={seriesId} onChange={(e) => handleSeriesChange(e.target.value)} mb={4}>
            {seriesList.map((s) => (
              <option key={s.seriesId} value={s.seriesId}>
                {s.title || 'Untitled Series'}
              </option>
            ))}
          </Select>
          {seriesData && (
            <Box className="analytics-section" mb={6}>
              <Stat>
                <StatLabel>Episodes</StatLabel>
                <StatNumber>{seriesData.episodes}</StatNumber>
              </Stat>
              <Bar data={seriesChartData} />
              <Text mt={2}>Avg Listen Time: {formatDuration(seriesData.engagement?.averageListenTime || 0)}</Text>
            </Box>
          )}
          <Heading size="sm" mb={2}>Episode Analytics</Heading>
          <HStack mb={4}>
            <Input placeholder="Episode ID" value={episodeId} onChange={(e) => setEpisodeId(e.target.value)} />
            <Button onClick={handleEpisodeFetch} colorScheme="teal">Load</Button>
          </HStack>
          {episodeChartData && <Line data={episodeChartData} />}
        </Box>

        <Box>
          <Heading size="md" mb={2}>Webinars</Heading>
          <Select placeholder="Select webinar" value={webinarId} onChange={(e) => handleWebinarChange(e.target.value)} mb={4}>
            {webinarList.map((w) => (
              <option key={w.webinarId} value={w.webinarId}>
                {w.title || 'Webinar'}
              </option>
            ))}
          </Select>
          {webinarData && (
            <Box className="analytics-section" mb={6}>
              <Stat mb={2}>
                <StatLabel>Attendees</StatLabel>
                <StatNumber>{webinarData.overview?.attendees || 0}</StatNumber>
              </Stat>
              <Stat mb={2}>
                <StatLabel>Registrations</StatLabel>
                <StatNumber>{webinarData.overview?.registrations || 0}</StatNumber>
              </Stat>
              <Stat mb={2}>
                <StatLabel>Revenue</StatLabel>
                <StatNumber>${webinarData.overview?.revenue || 0}</StatNumber>
              </Stat>
              <Text mt={2}>Engagement Rate: {(webinarData.engagement?.engagementRate || 0) * 100}%</Text>
            </Box>
          )}
          {overview && (
            <Box className="analytics-section">
              <Heading size="sm" mb={2}>Overview</Heading>
              <Text>Total Webinars: {overview.totalWebinars}</Text>
              <Text>Total Attendees: {overview.totalAttendees}</Text>
              <Text>Avg Engagement: {(overview.averageEngagement * 100).toFixed(2)}%</Text>
            </Box>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
}

