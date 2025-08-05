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
        <Button as={RouterLink} to="/content-library" mt={4} colorScheme="teal">
          Content Library
        </Button>
      </Box>
    </ChakraProvider>
  );
}
