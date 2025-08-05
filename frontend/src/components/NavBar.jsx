import React from 'react';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/NavBar.css';

export default function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <Flex className="nav-bar" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
      {user ? (
        <>
          <Button as={RouterLink} to="/profile" variant="ghost" color="white" mr={2}>
            Profile
          </Button>
          <Button as={RouterLink} to="/classroom/WorkhouseClassroom" variant="ghost" color="white" mr={2}>
            Classroom
          </Button>
          <Button variant="outline" color="white" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button as={RouterLink} to="/login" variant="ghost" color="white" mr={2}>
            Login
          </Button>
          <Button as={RouterLink} to="/signup" variant="outline" color="white">
            Sign Up
          </Button>
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
    <Flex as="nav" className="navbar" p={4} bg="gray.700" color="white">
      <NavLink to="/profile" className="nav-link">Profile</NavLink>
      <NavLink to="/profile/customize" className="nav-link">Customize</NavLink>
    <Flex className="nav-bar" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
      <Button as={RouterLink} to="/profile" variant="ghost" color="white" mr={2}>
        Profile
      </Button>
      <Button as={RouterLink} to="/orders" variant="ghost" color="white">
        Orders
      </Button>
    </Flex>
  );
}

export default NavBar;
