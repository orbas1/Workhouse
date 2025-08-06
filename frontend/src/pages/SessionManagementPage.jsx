import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { getUpcomingSessions, cancelSession, rescheduleSession } from '../api/sessions.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/SessionManagementPage.css';

export default function SessionManagementPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function load() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getUpcomingSessions(user.id);
      setSessions(data);
    } catch (err) {
      console.error('Failed to load sessions', err);
      toast({ title: 'Failed to load sessions', status: 'error' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [user]);

  async function handleCancel(id) {
    try {
      await cancelSession(id);
      toast({ title: 'Session cancelled', status: 'info' });
      load();
    } catch (err) {
      console.error('Cancel failed', err);
      toast({ title: 'Cancel failed', status: 'error' });
    }
  }

  async function handleReschedule(id) {
    const newTime = prompt('Enter new time (YYYY-MM-DD HH:MM)');
    if (!newTime) return;
    try {
      await rescheduleSession(id, newTime);
      toast({ title: 'Session rescheduled', status: 'success' });
      load();
    } catch (err) {
      console.error('Reschedule failed', err);
      toast({ title: 'Reschedule failed', status: 'error' });
    }
  }

  return (
    <Box className="session-management-page" p={4}>
      <Heading mb={4}>Session Management</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <Table variant="simple" className="session-table">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Scheduled For</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sessions.map((s) => (
              <Tr key={s.id}>
                <Td>{s.id}</Td>
                <Td>{new Date(s.scheduledFor).toLocaleString()}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" mr={2} onClick={() => handleReschedule(s.id)}>
                    Reschedule
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleCancel(s.id)}>
                    Cancel
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
