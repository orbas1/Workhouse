import { ChakraProvider, Box, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import WorkspaceSummary from '../components/WorkspaceSummary';
import { fetchWorkspaceOverview } from '../api/workspace';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [overview, setOverview] = useState([]);

  useEffect(() => {
    fetchWorkspaceOverview().then(setOverview).catch(() => {});
  }, []);

  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading mb={4}>Dashboard</Heading>
        <WorkspaceSummary data={overview} />
        <Button as={RouterLink} to="/workspace" mt={6} colorScheme="teal">
          Open Workspace
        </Button>
      </Box>
    </ChakraProvider>
  );
}
