import { ChakraProvider, Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import ClientDashboard from '../components/dashboards/ClientDashboard';
import FreelancerDashboard from '../components/dashboards/FreelancerDashboard';
import '../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading mb={4}>Dashboard</Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Client</Tab>
            <Tab>Freelancer</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ClientDashboard />
            </TabPanel>
            <TabPanel>
              <FreelancerDashboard />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
}
