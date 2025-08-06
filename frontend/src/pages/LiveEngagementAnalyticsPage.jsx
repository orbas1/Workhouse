import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { fetchStartupAnalytics } from '../api/startupAnalytics.js';
import '../styles/LiveEngagementAnalyticsPage.css';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LiveEngagementAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStartupAnalytics()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!data) return <Box p={4}>Unable to load analytics.</Box>;

  const chartData = {
    labels: data.history.map((h) => h.date),
    datasets: [
      {
        label: 'Profile Views',
        data: data.history.map((h) => h.views),
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49, 130, 206, 0.2)'
      }
    ]
  };

  return (
    <Box className="live-engagement-analytics" p={4}>
      <Heading mb={4}>Live Engagement &amp; Analytics</Heading>
      <SimpleGrid columns={[1, 3]} spacing={4} mb={6}>
        <Stat>
          <StatLabel>Profile Views</StatLabel>
          <StatNumber>{data.profileViews}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Document Downloads</StatLabel>
          <StatNumber>{data.documentDownloads}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Response Rate</StatLabel>
          <StatNumber>{data.responseRate}%</StatNumber>
        </Stat>
      </SimpleGrid>
      <Box className="chart-container">
        <Line data={chartData} />
      </Box>
    </Box>
  );
}
