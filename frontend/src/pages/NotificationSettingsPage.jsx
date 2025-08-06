import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Switch,
  Text,
  Stack,
  List,
  ListItem,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import {
  fetchNotifications,
  fetchNotificationSettings,
  updateNotificationSettings,
} from '../api/notifications.js';
import '../styles/NotificationSettingsPage.css';

function NotificationSettingsPage() {
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({ email: true, sms: false, push: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [notifs, prefs] = await Promise.all([
          fetchNotifications(),
          fetchNotificationSettings(),
        ]);
        setNotifications(notifs);
        setSettings(prefs);
      } catch (err) {
        console.error('Failed to load notifications', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleToggle(field) {
    const updated = { ...settings, [field]: !settings[field] };
    setSettings(updated);
    try {
      await updateNotificationSettings(updated);
    } catch (err) {
      console.error('Failed to update notification settings', err);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box className="notification-settings-page">
      <Heading mb={4}>Notifications</Heading>
      <Stack spacing={3} mb={6}>
        <Flex align="center">
          <Text flex="1">Email Notifications</Text>
          <Switch
            isChecked={settings.email}
            onChange={() => handleToggle('email')}
          />
        </Flex>
        <Flex align="center">
          <Text flex="1">SMS Notifications</Text>
          <Switch
            isChecked={settings.sms}
            onChange={() => handleToggle('sms')}
          />
        </Flex>
        <Flex align="center">
          <Text flex="1">Push Notifications</Text>
          <Switch
            isChecked={settings.push}
            onChange={() => handleToggle('push')}
          />
        </Flex>
      </Stack>
      <Heading size="md" mb={2}>
        Recent Messages
      </Heading>
      <List spacing={2}>
        {notifications.map((n) => (
          <ListItem key={n.id} className="notification-item">
            <Text>{n.message}</Text>
          </ListItem>
        ))}
        {notifications.length === 0 && (
          <ListItem>
            <Text>No notifications</Text>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default NotificationSettingsPage;
