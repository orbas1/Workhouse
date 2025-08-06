import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import EmployeeTable from '../components/admin/EmployeeTable';
import SystemSettings from '../components/admin/SystemSettings';
import '../api/admin';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = () => {
    adminAPI
      .listEmployees()
      .then(setEmployees)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Box className="admin-dashboard" p={4}>
      <NavMenu />
      <Heading mb={4}>Admin Dashboard</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Employees</Tab>
          <Tab>System Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {loading ? <Spinner /> : <EmployeeTable employees={employees} onRefresh={loadEmployees} />}
          </TabPanel>
          <TabPanel>
            <SystemSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
