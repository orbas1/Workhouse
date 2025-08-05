import { ChakraProvider, Box, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import NavMenu from '../components/NavMenu.jsx';
import '../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading mb={4}>Dashboard</Heading>
        <Link as={RouterLink} to="/ads" color="blue.500">
          View Sponsored Content
        </Link>
      </Box>
    </ChakraProvider>
  );
}
