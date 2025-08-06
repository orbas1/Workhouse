import React from 'react';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/NavBar.css';

export default function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }

  return (
    <Flex className="nav-bar" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
      {user ? (
        <>
          <Button as={RouterLink} to="/profile" variant="ghost" color="white" mr={2}>Profile</Button>
          <Button as={RouterLink} to="/services" variant="ghost" color="white" mr={2}>Services</Button>
          <Button as={RouterLink} to="/tasks" variant="ghost" color="white" mr={2}>Tasks</Button>
          <Button as={RouterLink} to="/affiliates" variant="ghost" color="white" mr={2}>Affiliates</Button>
          <Button variant="outline" color="white" onClick={handleLogout}>Logout</Button>
          <Button as={RouterLink} to="/profile" variant="ghost" color="white" mr={2}>
            Profile
          </Button>
          <Button as={RouterLink} to="/ads" variant="ghost" color="white" mr={2}>
            Ads
          <Button as={RouterLink} to="/live" variant="ghost" color="white" mr={2}>
            Live
          <Button as={RouterLink} to="/tasks" variant="ghost" color="white" mr={2}>
            Tasks
          </Button>
          <Button as={RouterLink} to="/services" variant="ghost" color="white" mr={2}>
            Services
          </Button>
          <Button as={RouterLink} to="/tasks" variant="ghost" color="white" mr={2}>
            Tasks
          </Button>
          <Button as={RouterLink} to="/admin/analytics" variant="ghost" color="white" mr={2}>
            Analytics
          <Button as={RouterLink} to="/sim-dashboard" variant="ghost" color="white" mr={2}>
            Dashboard
          <Button as={RouterLink} to="/connections" variant="ghost" color="white" mr={2}>
            Connections
          </Button>
          <Button as={RouterLink} to="/orders" variant="ghost" color="white" mr={2}>
            Orders
          <Button as={RouterLink} to="/freelancers" variant="ghost" color="white" mr={2}>
            Freelancers
          <Button as={RouterLink} to="/classroom/WorkhouseClassroom" variant="ghost" color="white" mr={2}>
            Classroom
          </Button>
          <Button variant="outline" color="white" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button as={RouterLink} to="/login" variant="ghost" color="white" mr={2}>Login</Button>
          <Button as={RouterLink} to="/signup" variant="outline" color="white">Sign Up</Button>
        </>
      )}
    </Flex>
  );
}



import { Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <Flex className="nav-bar" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
        <Button as={RouterLink} to="/profile" variant="ghost" color="white" mr={2}>
          Profile
        </Button>
        <Button as={RouterLink} to="/orders" variant="ghost" color="white" mr={2}>
          Orders
        </Button>
        <Button as={RouterLink} to="/creator/analytics" variant="ghost" color="white">
          Analytics
        </Button>
      <Button as={RouterLink} to="/profile" variant="ghost" color="white" mr={2}>
        Profile
      </Button>
      <Button as={RouterLink} to="/orders" variant="ghost" color="white" mr={2}>
        Orders
      </Button>
      <Button as={RouterLink} to="/volunteer-applications" variant="ghost" color="white">
        Volunteer Tracking
        Orders
      </Button>
      <Button as={RouterLink} to="/payments" variant="ghost" color="white">
        Payments
      <Button as={RouterLink} to="/services" variant="ghost" color="white" mr={2}>
        Services
      </Button>
      <Button as={RouterLink} to="/orders" variant="ghost" color="white">
      <Button as={RouterLink} to="/orders" variant="ghost" color="white" mr={2}>
        Orders
      </Button>
      <Button as={RouterLink} to="/contracts" variant="ghost" color="white">
        Contracts
      <Button as={RouterLink} to="/tasks" variant="ghost" color="white">
        Tasks
      </Button>
    </Flex>
  );
}

export default NavBar;
