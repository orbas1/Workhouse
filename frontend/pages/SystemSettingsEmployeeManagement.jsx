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
import NavMenu from '../components/NavMenu';
import EmployeeTable from '../components/admin/EmployeeTable';
import {
  fetchSystemSettings,
  updateSystemSettings,
  listEmployees,
} from '../api/admin.js';
import './SystemSettingsEmployeeManagement.css';

export default function SystemSettingsEmployeeManagement() {
  const [settings, setSettings] = useState({
    liveChatEnabled: false,
    disputeResolutionEnabled: false,
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchSystemSettings().then(setSettings).catch(console.error);
    loadEmployees();
  }, []);

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
      <NavMenu />
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
      {loading ? <Spinner /> : <EmployeeTable employees={employees} onRefresh={loadEmployees} />}
    </Box>
  );
}
