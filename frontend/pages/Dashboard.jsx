import { ChakraProvider, Box, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import '../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading>Dashboard</Heading>
        <Button mt={4} as={RouterLink} to="/creator/analytics" colorScheme="teal">
          Creator Analytics
        </Button>
      </Box>
    </ChakraProvider>
  );
}
