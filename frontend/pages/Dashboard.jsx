import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import '../styles/Dashboard.css';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading>Dashboard</Heading>
        <Button as={RouterLink} to="/proposals-invoices" mt={4} colorScheme="teal">
          Manage Proposals & Invoices
        </Button>
      </Box>
    </ChakraProvider>
  );
}
