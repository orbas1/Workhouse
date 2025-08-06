import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, HStack } from '@chakra-ui/react';
import '../styles/NavMenu.css';

export default function NavMenu() {
  return (
    <Box as="nav" className="nav-menu" p={2}>
      <HStack spacing={4}>
        <Link as={RouterLink} to="/dashboard">Client/Freelancer Dashboard</Link>
        <Link as={RouterLink} to="/jobs">Job Posts</Link>
        <Link as={RouterLink} to="/tasks">Tasks</Link>
        <Link as={RouterLink} to="/ads">Ads</Link>
        <Link as={RouterLink} to="/live">Live Room</Link>
        <Link as={RouterLink} to="/content/manage">Content</Link>
        <Link as={RouterLink} to="/opportunities">Opportunities</Link>
        <Link as={RouterLink} to="/volunteering">Volunteering</Link>
        <Link as={RouterLink} to="/progress">Progress</Link>
        <Link as={RouterLink} to="/volunteer-applications">Volunteer Tracking</Link>
        <Link as={RouterLink} to="/workspace">Workspace</Link>
        <Link as={RouterLink} to="/ads">Ads</Link>
        <Link as={RouterLink} to="/ads/create">Create Ad</Link>
        <Link as={RouterLink} to="/creator/analytics">Creator Analytics</Link>
        <Link as={RouterLink} to="/content-library">Content Library</Link>
        <Link as={RouterLink} to="/networking/session/1">Networking</Link>
        <Link as={RouterLink} to="/sessions">Sessions</Link>
        <Link as={RouterLink} to="/networking">Networking</Link>
        <Link as={RouterLink} to="/proposals-invoices">Proposals & Invoices</Link>
        <Link as={RouterLink} to="/payments">Payments</Link>
        <Link as={RouterLink} to="/workspace/projects">Projects</Link>
        <Link as={RouterLink} to="/settings">Settings</Link>
        <Link as={RouterLink} to="/billing">Billing</Link>
        <Link as={RouterLink} to="/education">Education</Link>
        <Link as={RouterLink} to="/education/courses">Courses</Link>
        <Link as={RouterLink} to="/workspace/files">Files</Link>
        <Link as={RouterLink} to="/admin">Admin</Link>
        <Link as={RouterLink} to="/admin/analytics">Analytics & Audit</Link>
        <Link as={RouterLink} to="/admin/system-settings">Admin Settings</Link>
      </HStack>
    </Box>
  );
}
