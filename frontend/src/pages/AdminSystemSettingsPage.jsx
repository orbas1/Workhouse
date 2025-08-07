import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import EmployeeTable from '../components/EmployeeTable.jsx';
import {
  fetchSystemSettings,
  updateSystemSettings,
  listEmployees,
} from '../api/admin.js';
import '../styles/AdminSystemSettingsPage.css';

export default function AdminSystemSettingsPage() {
  const [settings, setSettings] = useState({
    liveChatEnabled: false,
    disputeResolutionEnabled: false,
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemSettings().then(setSettings).catch(console.error);
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await listEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = async (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    try {
      await updateSystemSettings(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className="settings-page" p={4}>
      <Heading mb={4}>System Settings</Heading>
      <Stack spacing={4} mb={8}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="liveChat" mb="0">
            Live Chat
          </FormLabel>
          <Switch
            id="liveChat"
            isChecked={settings.liveChatEnabled}
            onChange={() => toggleSetting('liveChatEnabled')}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dispute" mb="0">
            Dispute Resolution
          </FormLabel>
          <Switch
            id="dispute"
            isChecked={settings.disputeResolutionEnabled}
            onChange={() => toggleSetting('disputeResolutionEnabled')}
          />
        </FormControl>
      </Stack>

      <Heading size="md" mb={4}>
        Employees
      </Heading>
      {loading ? (
        <Spinner />
      ) : (
        <EmployeeTable employees={employees} onRefresh={loadEmployees} />
      )}
    </Box>
  );
}
