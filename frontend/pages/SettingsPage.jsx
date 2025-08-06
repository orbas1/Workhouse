import { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import '../styles/SettingsPage.css';
import { fetchSettings, updateSettings } from '../api/settings';
import { fetchTimezones } from '../utils/timezone';

export default function SettingsPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    profileVisibility: 'public',
    language: 'en',
    region: 'UTC',
    notifications: { jobUpdates: true, messages: true },
  });
  const [timezones, setTimezones] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const [settings, tz] = await Promise.all([
          fetchSettings(),
          fetchTimezones(),
        ]);
        setForm({
          ...form,
          ...settings,
          notifications: settings.notifications || form.notifications,
        });
        setTimezones(tz);
      } catch (err) {
        toast({ title: 'Failed to load settings', status: 'error' });
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setForm((f) => ({
      ...f,
      notifications: { ...f.notifications, [name]: checked },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(form);
      toast({ title: 'Settings saved', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to save settings', status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="settings-page" p={4}>
        <Heading mb={4}>Settings</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input name="fullName" value={form.fullName} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={form.email} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input name="phone" value={form.phone} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Profile Visibility</FormLabel>
              <Select name="profileVisibility" value={form.profileVisibility} onChange={handleChange}>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="restricted">Restricted</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Language</FormLabel>
              <Select name="language" value={form.language} onChange={handleChange}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Region</FormLabel>
              <Select name="region" value={form.region} onChange={handleChange}>
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Job Updates</FormLabel>
              <Switch
                name="jobUpdates"
                isChecked={form.notifications.jobUpdates}
                onChange={handleNotificationChange}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Messages</FormLabel>
              <Switch
                name="messages"
                isChecked={form.notifications.messages}
                onChange={handleNotificationChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Save Settings
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  );
}
