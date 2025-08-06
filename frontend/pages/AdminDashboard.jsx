import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import { useAuth } from '../context/AuthContext.jsx';
import FlaggedContentTable from '../components/admin/FlaggedContentTable.jsx';
import TicketTable from '../components/admin/TicketTable.jsx';
import DisputeTable from '../components/admin/DisputeTable.jsx';
import '../api/adminDashboard';
import EmployeeTable from '../components/admin/EmployeeTable';
import SystemSettings from '../components/admin/SystemSettings';
import { listEmployees } from '../api/admin.js';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [flags, setFlags] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = () => {
    listEmployees()
      .then(setEmployees)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await adminDashboardAPI.fetchOverview();
        setOverview(data);
        if (['admin', 'moderator'].includes(user.role)) {
          setFlags(await adminDashboardAPI.listFlags());
        }
        if (['admin', 'support'].includes(user.role)) {
          const allTickets = await adminDashboardAPI.listTickets();
          setTickets(allTickets.filter((t) => t.status !== 'resolved'));
        }
        const allDisputes = await adminDashboardAPI.listDisputes();
        setDisputes(allDisputes.filter((d) => d.status !== 'resolved'));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user.role]);

  if (loading) return <Spinner />;

  return (
    <Box className="admin-dashboard" p={4}>
      <NavMenu />
      <Heading mb={4}>Admin Dashboard</Heading>
      {overview && (
        <SimpleGrid columns={[1, 2, 4]} spacing={4} mb={6}>
          <Stat className="stat-card">
            <StatLabel>Active Users</StatLabel>
            <StatNumber>{overview.activeUsers}</StatNumber>
          </Stat>
          <Stat className="stat-card">
            <StatLabel>Flagged Content</StatLabel>
            <StatNumber>{overview.flaggedContent}</StatNumber>
          </Stat>
          <Stat className="stat-card">
            <StatLabel>Open Tickets</StatLabel>
            <StatNumber>{overview.openTickets}</StatNumber>
          </Stat>
          <Stat className="stat-card">
            <StatLabel>Active Disputes</StatLabel>
            <StatNumber>{overview.activeDisputes}</StatNumber>
          </Stat>
        </SimpleGrid>
      )}
      <Tabs variant="enclosed">
        <TabList>
          {['admin', 'moderator'].includes(user.role) && <Tab>Flagged Content</Tab>}
          {['admin', 'support'].includes(user.role) && <Tab>Support Tickets</Tab>}
          <Tab>Disputes</Tab>
        </TabList>
        <TabPanels>
          {['admin', 'moderator'].includes(user.role) && (
            <TabPanel>
              <FlaggedContentTable items={flags} />
            </TabPanel>
          )}
          {['admin', 'support'].includes(user.role) && (
            <TabPanel>
              <TicketTable items={tickets} />
            </TabPanel>
          )}
          <TabPanel>
            <DisputeTable items={disputes} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
