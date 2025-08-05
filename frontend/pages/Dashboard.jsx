import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import '../styles/Dashboard.css';
import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Dashboard() {
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading mb={4}>Dashboard</Heading>
        <Button as={RouterLink} to="/contracts" colorScheme="teal">Manage Contracts</Button>
      </Box>
    </ChakraProvider>
  );
}
