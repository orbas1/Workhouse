import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, HStack } from '@chakra-ui/react';
import '../styles/NavMenu.css';

export default function NavMenu() {
  return (
    <Box as="nav" className="nav-menu" p={2}>
      <HStack spacing={4}>
        <Link as={RouterLink} to="/dashboard">Client/Freelancer Dashboard</Link>
        <Link as={RouterLink} to="/jobs">Job Posts</Link>
        <Link as={RouterLink} to="/proposals-invoices">Proposals & Invoices</Link>
        <Link as={RouterLink} to="/payments">Payments</Link>
        <Link as={RouterLink} to="/education">Education</Link>
        <Link as={RouterLink} to="/education/courses">Courses</Link>
        <Link as={RouterLink} to="/workspace/files">Files</Link>
      </HStack>
    </Box>
  );
}
