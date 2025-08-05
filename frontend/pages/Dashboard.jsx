import { ChakraProvider, Box, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ChakraProvider, Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ChakraProvider, Box, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ChakraProvider, Box, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import ClientDashboard from '../components/dashboards/ClientDashboard';
import FreelancerDashboard from '../components/dashboards/FreelancerDashboard';
import '../styles/Dashboard.css';
import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function Dashboard() {
  const navigate = useNavigate();
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
        <Button as={RouterLink} to="/contracts" colorScheme="teal">Manage Contracts</Button>
        <Link as={RouterLink} to="/payments" color="teal.500">
          Manage Payments & Timesheets
        </Link>
        <Button colorScheme="teal" onClick={() => navigate('/services')}>
          Browse Services
        </Button>
        <Heading>Dashboard</Heading>
        <Button as={RouterLink} to="/content-library" mt={4} colorScheme="teal">
          Content Library
        </Button>
        <Button mt={4} as={RouterLink} to="/networking/session/1">
          Join Networking Session
        </Button>
        <Button as={RouterLink} to="/networking" mt={4} colorScheme="purple">
          Networking
        </Button>
        <Button as={RouterLink} to="/proposals-invoices" mt={4} colorScheme="teal">
          Manage Proposals & Invoices
        </Button>
        <Button mt={4} colorScheme="teal" onClick={() => navigate('/classroom/WorkhouseClassroom')}>
          Enter Classroom
        </Button>
        <Button mt={4} colorScheme="teal" onClick={() => window.location.href = '/calendar'}>Calendar</Button>
      </Box>
    </ChakraProvider>
  );
}
