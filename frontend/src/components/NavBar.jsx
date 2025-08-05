import React from 'react';
import { Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <Flex as="nav" className="navbar" p={4} bg="gray.700" color="white">
      <NavLink to="/profile" className="nav-link">Profile</NavLink>
      <NavLink to="/profile/customize" className="nav-link">Customize</NavLink>
    </Flex>
  );
}

export default NavBar;
