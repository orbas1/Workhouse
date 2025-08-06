import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Spinner, useToast } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import StatCard from '../components/StatCard.jsx';
import { fetchStatsOverview } from '../api/stats.js';
import '../styles/StatsAnalyticsPage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function StatsAnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchStatsOverview();
        setStats(data);
      } catch (err) {
        toast({ title: 'Failed to load statistics', status: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [toast]);

  if (loading) return <Spinner />;
  if (!stats) return <Box p={4}>No statistics available.</Box>;

  const chartData = {
    labels: ['Total Users', 'Active Users', 'New Signups', 'Revenue'],
    datasets: [
      {
        label: 'Overview',
        data: [stats.totalUsers, stats.activeUsers, stats.newSignups, stats.revenue],
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49,130,206,0.2)'
      }
    ]
  };

  return (
    <Box className="stats-analytics-page" p={4}>
      <Heading mb={4}>Stats &amp; Analytics</Heading>
      <SimpleGrid columns={[1, 2, 4]} spacing={4} mb={8}>
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Active Users" value={stats.activeUsers} />
        <StatCard label="New Signups" value={stats.newSignups} />
        <StatCard label="Revenue" value={`$${stats.revenue}`} />
      </SimpleGrid>
      <Box className="chart-container">
        <Line data={chartData} />
      </Box>
    </Box>
  );
}
