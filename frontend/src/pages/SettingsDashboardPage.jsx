import React, { useState } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  VStack,
  useToast
} from '@chakra-ui/react';

function SettingsDashboardPage() {
  const [account, setAccount] = useState({ name: '', username: '', email: '' });
  const [security, setSecurity] = useState({ password: '', twoFactor: false });
  const [notifications, setNotifications] = useState({ email: true, sms: false });
  const [privacy, setPrivacy] = useState({ profileVisible: true });
  const toast = useToast();

  function handleSave(message) {
    toast({ title: message, status: 'success', duration: 3000, isClosable: true });
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Profile Settings</Heading>
      <Tabs variant="enclosed" colorScheme="teal">
        <TabList>
          <Tab>Account</Tab>
          <Tab>Security</Tab>
          <Tab>Notifications</Tab>
          <Tab>Privacy</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input value={account.name} onChange={(e) => setAccount({ ...account, name: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input value={account.username} onChange={(e) => setAccount({ ...account, username: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} />
              </FormControl>
              <Button colorScheme="teal" alignSelf="flex-start" onClick={() => handleSave('Account settings saved')}>
                Save Account
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input type="password" value={security.password} onChange={(e) => setSecurity({ ...security, password: e.target.value })} />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Two-factor Authentication</FormLabel>
                <Switch isChecked={security.twoFactor} onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })} />
              </FormControl>
              <Button colorScheme="teal" alignSelf="flex-start" onClick={() => handleSave('Security settings saved')}>
                Save Security
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Email Notifications</FormLabel>
                <Switch isChecked={notifications.email} onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })} />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">SMS Notifications</FormLabel>
                <Switch isChecked={notifications.sms} onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })} />
              </FormControl>
              <Button colorScheme="teal" alignSelf="flex-start" onClick={() => handleSave('Notification settings saved')}>
                Save Notifications
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Profile Visible</FormLabel>
                <Switch isChecked={privacy.profileVisible} onChange={(e) => setPrivacy({ ...privacy, profileVisible: e.target.checked })} />
              </FormControl>
              <Button colorScheme="teal" alignSelf="flex-start" onClick={() => handleSave('Privacy settings saved')}>
                Save Privacy
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SettingsDashboardPage;
