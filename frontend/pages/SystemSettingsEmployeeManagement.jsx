import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input
} from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import './SystemSettingsEmployeeManagement.css';

export default function SystemSettingsEmployeeManagement() {
  const [settings, setSettings] = useState({
    liveChatEnabled: false,
    disputeResolutionEnabled: false,
  });
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState('');

  useEffect(() => {
    adminAPI.fetchSystemSettings().then(setSettings).catch(console.error);
    adminAPI.listEmployees().then(setEmployees).catch(console.error);
  }, []);

  const toggleSetting = async (key) => {
    try {
      const updated = await adminAPI.updateSystemSettings({ [key]: !settings[key] });
      setSettings(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEmployee = async () => {
    if (!newEmployee) return;
    try {
      const created = await adminAPI.createEmployee({ name: newEmployee });
      setEmployees((prev) => [...prev, created]);
      setNewEmployee('');
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
          <FormLabel htmlFor="liveChat" mb="0">Live Chat</FormLabel>
          <Switch id="liveChat" isChecked={settings.liveChatEnabled} onChange={() => toggleSetting('liveChatEnabled')} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dispute" mb="0">Dispute Resolution</FormLabel>
          <Switch id="dispute" isChecked={settings.disputeResolutionEnabled} onChange={() => toggleSetting('disputeResolutionEnabled')} />
        </FormControl>
      </Stack>

      <Heading size="md" mb={2}>Employees</Heading>
      <Stack direction="row" mb={4}>
        <Input placeholder="Employee name" value={newEmployee} onChange={(e) => setNewEmployee(e.target.value)} />
        <Button colorScheme="teal" onClick={handleAddEmployee}>Add</Button>
      </Stack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map(emp => (
            <Tr key={emp.id}>
              <Td>{emp.id}</Td>
              <Td>{emp.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
