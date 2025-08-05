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
        <Button as={RouterLink} to="/networking" mt={4} colorScheme="purple">
          Networking
        </Button>
      </Box>
    </ChakraProvider>
  );
}
