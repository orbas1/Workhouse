import { ChakraProvider, Box, Heading, Button } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import '../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading mb={4}>Dashboard</Heading>
        <Button colorScheme="teal" onClick={() => (window.location.href = '/ads')}>Manage Ads</Button>
      </Box>
    </ChakraProvider>
  );
}
