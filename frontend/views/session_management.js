const {
  ChakraProvider,
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
} = ChakraUI;
const { useState, useEffect } = React;
const { useAuth } = window;

function SessionManagementPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  async function loadSessions() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await sessionsAPI.getUpcomingSessions(user.id);
      setSessions(data);
    } catch (err) {
      toast({ title: 'Failed to load sessions', status: 'error' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSessions();
  }, [user]);

  async function handleCancel(id) {
    try {
      await sessionsAPI.cancelSession(id);
      toast({ title: 'Session cancelled', status: 'info' });
      loadSessions();
    } catch (err) {
      toast({ title: 'Cancel failed', status: 'error' });
    }
  }

  async function handleReschedule(id) {
    const newTime = prompt('Enter new time (YYYY-MM-DD HH:MM)');
    if (!newTime) return;
    try {
      await sessionsAPI.rescheduleSession(id, newTime);
      toast({ title: 'Session rescheduled', status: 'success' });
      loadSessions();
    } catch (err) {
      toast({ title: 'Reschedule failed', status: 'error' });
    }
  }

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="session-management" p={4}>
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
                    <Button size="sm" colorScheme="blue" mr={2} onClick={() => handleReschedule(s.id)}>Reschedule</Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleCancel(s.id)}>Cancel</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </ChakraProvider>
  );
}

window.SessionManagementPage = SessionManagementPage;
