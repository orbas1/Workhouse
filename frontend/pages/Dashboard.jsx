import { ChakraProvider, Box, Heading, Button } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import '../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading>Dashboard</Heading>
        <Button mt={4} colorScheme="teal" onClick={() => window.location.href = '/calendar'}>Calendar</Button>
      </Box>
    </ChakraProvider>
  );
}
