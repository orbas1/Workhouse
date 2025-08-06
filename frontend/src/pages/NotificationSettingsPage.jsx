import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Switch,
  Text,
  Stack,
  Flex,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import {
  fetchNotifications,
  fetchNotificationSettings,
  updateNotificationSettings,
  updateNotification,
  deleteNotification,
} from '../api/notifications.js';
import MessageNotificationItem from '../components/MessageNotificationItem.jsx';
import '../styles/NotificationSettingsPage.css';

function NotificationSettingsPage() {
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    push: true,
    deliveryReceipts: true,
    readReceipts: true,
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const [notifs, prefs] = await Promise.all([
          fetchNotifications(),
          fetchNotificationSettings(),
        ]);
        setNotifications(notifs);
        setSettings({ ...settings, ...prefs });
      } catch (err) {
        toast({ title: 'Failed to load notifications', status: 'error' });
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
      toast({ title: 'Failed to update settings', status: 'error' });
    }
  }

  async function handleNotificationUpdate(id, updates) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
    try {
      await updateNotification(id, updates);
    } catch (err) {
      toast({ title: 'Failed to update notification', status: 'error' });
    }
  }

  async function handleNotificationDelete(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteNotification(id);
    } catch (err) {
      toast({ title: 'Failed to delete notification', status: 'error' });
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
        <Flex align="center">
          <Text flex="1">Delivery Receipts</Text>
          <Switch
            isChecked={settings.deliveryReceipts}
            onChange={() => handleToggle('deliveryReceipts')}
          />
        </Flex>
        <Flex align="center">
          <Text flex="1">Read Receipts</Text>
          <Switch
            isChecked={settings.readReceipts}
            onChange={() => handleToggle('readReceipts')}
          />
        </Flex>
      </Stack>
      <Heading size="md" mb={2}>
        Recent Messages
      </Heading>
      <Stack spacing={2}>
        {notifications.map((n) => (
          <MessageNotificationItem
            key={n.id}
            notification={n}
            onUpdate={(updates) => handleNotificationUpdate(n.id, updates)}
            onDelete={() => handleNotificationDelete(n.id)}
          />
        ))}
        {notifications.length === 0 && <Text>No notifications</Text>}
      </Stack>
    </Box>
  );
}

export default NotificationSettingsPage;
