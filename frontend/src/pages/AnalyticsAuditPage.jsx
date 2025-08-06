import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchContentPerformance, fetchAuditLogs } from '../api/analytics.js';
import '../styles/AnalyticsAuditPage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function AnalyticsAuditPage() {
  const [analytics, setAnalytics] = useState([]);
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [analyticsData, auditData] = await Promise.all([
          fetchContentPerformance(),
          fetchAuditLogs(),
        ]);
        setAnalytics(Array.isArray(analyticsData) ? analyticsData : []);
        setAudits(Array.isArray(auditData) ? auditData : []);
      } catch (err) {
        console.error('Failed to load analytics or audit logs', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <Box className="analytics-audit" p={4} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  const chartData = {
    labels: analytics.map((item) => item.title || item.contentId || 'item'),
    datasets: [
      {
        label: 'Views',
        data: analytics.map((item) => item.views || 0),
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49,130,206,0.3)',
      },
    ],
  };

  return (
    <Box className="analytics-audit" p={4}>
      <Heading mb={6}>Analytics & Audit</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box>
          <Heading size="md" mb={4}>Content Performance</Heading>
          <Line data={chartData} />
        </Box>
        <Box>
          <Heading size="md" mb={4}>Audit Logs</Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                <Th>Created</Th>
              </Tr>
            </Thead>
            <Tbody>
              {audits.map((log) => (
                <Tr key={log.id}>
                  <Td>{log.id}</Td>
                  <Td>{log.description}</Td>
                  <Td>{log.status}</Td>
                  <Td>{new Date(log.createdAt).toLocaleString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
