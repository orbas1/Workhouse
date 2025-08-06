import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import NavMenu from '../components/NavMenu.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ManagementDashboard() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    // In a real app this data would come from an API
    setOverview({
      projects: 24,
      tasks: 132,
      completedTasks: 86,
      revenue: 56000,
      revenueTrend: [12, 19, 3, 5, 2, 3, 10],
      topTeam: [
        { id: 1, name: 'Alice Johnson', role: 'Project Manager', tasks: 30 },
        { id: 2, name: 'Bob Smith', role: 'Developer', tasks: 25 },
        { id: 3, name: 'Eve Davis', role: 'QA', tasks: 20 },
      ],
    });
  }, []);

  if (!overview) return null;

  const completion = Math.round((overview.completedTasks / overview.tasks) * 100);
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: overview.revenueTrend,
        borderColor: '#319795',
        backgroundColor: 'rgba(49,151,149,0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <Box p={4}>
      <NavMenu />
      <Heading mb={4}>Management Dashboard</Heading>
      <SimpleGrid columns={[1, 2, 4]} spacing={4} mb={8}>
        <Stat>
          <StatLabel>Active Projects</StatLabel>
          <StatNumber>{overview.projects}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Tasks</StatLabel>
          <StatNumber>{overview.tasks}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Revenue</StatLabel>
          <StatNumber>${overview.revenue.toLocaleString()}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Task Completion</StatLabel>
          <StatNumber>{completion}%</StatNumber>
          <StatHelpText>
            <Progress value={completion} size="sm" colorScheme="teal" />
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <Box mb={8}>
        <Heading size="md" mb={2}>
          Revenue Trend
        </Heading>
        <Line data={chartData} />
      </Box>

      <Box>
        <Heading size="md" mb={2}>
          Top Team Members
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th isNumeric>Tasks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {overview.topTeam.map((member) => (
              <Tr key={member.id}>
                <Td>{member.name}</Td>
                <Td>{member.role}</Td>
                <Td isNumeric>{member.tasks}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
