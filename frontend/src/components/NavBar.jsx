import React from 'react';
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
