import React from 'react';
import {
  Flex,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import NavBar from './NavBar.jsx';
import NavMenu from './NavMenu.jsx';

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="column" className="layout" minH="100vh">
      <NavBar onMenuOpen={onOpen} />
      <Flex flex="1" overflow="hidden">
        <Box display={{ base: 'none', md: 'block' }} w="250px" borderRight="1px solid #e2e8f0">
          <NavMenu />
        </Box>
        <Box flex="1" p={4} overflowY="auto">
          {children}
        </Box>
      </Flex>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box p={4}>
            <NavMenu />
          </Box>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
