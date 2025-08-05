import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import { Button } from '@chakra-ui/react';
import '../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading>Dashboard</Heading>
        <Button as={RouterLink} to="/sessions" mt={4} colorScheme="teal">
          Browse Sessions
        </Button>
      </Box>
    </ChakraProvider>
  );
}
