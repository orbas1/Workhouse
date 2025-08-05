import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, HStack } from '@chakra-ui/react';
import '../styles/NavMenu.css';

export default function NavMenu() {
  return (
    <Box as="nav" className="nav-menu" p={2}>
      <HStack spacing={4}>
        <Link as={RouterLink} to="/dashboard">Client/Freelancer Dashboard</Link>
        <Link as={RouterLink} to="/jobs">Job Posts</Link>
      </HStack>
    </Box>
  );
}
