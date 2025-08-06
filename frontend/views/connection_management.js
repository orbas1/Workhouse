const {
  Box,
  Heading,
  Input,
  Button,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Textarea,
  Select,
  Text,
} = ChakraUI;
const { useState, useEffect } = React;
const { useAuth } = window;

function ConnectionManagementPage() {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [newConn, setNewConn] = useState({ name: '', role: '', company: '' });
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    loadConnections();
    fetchAdvice();
  }, []);

  async function loadConnections() {
    try {
      const data = await connectionsAPI.listConnections();
      setConnections(data);
    } catch (err) {
      console.error('Failed to load connections', err);
    }
  }

  async function fetchAdvice() {
    try {
      const api = (window.env && window.env.ADVICE_API) || (import.meta.env && import.meta.env.VITE_ADVICE_API);
      if (!api) return;
      const res = await fetch(api);
      if (res.ok) {
        const data = await res.json();
        setAdvice(data.slip?.advice || '');
      }
    } catch (err) {
      console.error('Failed to fetch advice', err);
    }
  }

  async function handleCreate() {
    try {
      await connectionsAPI.createConnection(newConn);
      setNewConn({ name: '', role: '', company: '' });
      loadConnections();
    } catch (err) {
      console.error('Failed to create connection', err);
    }
  }

  async function handleUpdate(id, updates) {
    try {
      const updated = await connectionsAPI.updateConnection(id, updates);
      setConnections(connections.map(c => (c.id === id ? updated : c)));
    } catch (err) {
      console.error('Failed to update connection', err);
    }
  }

  return (
    <Box className="connection-page" p={4}>
      <NavMenu />
      <Heading mb={4}>Connections</Heading>

      <Box className="new-connection" mb={6}>
        <Heading size="md" mb={2}>Add Connection</Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={2} className="new-form">
          <Input placeholder="Name" value={newConn.name} onChange={e => setNewConn({ ...newConn, name: e.target.value })} />
          <Input placeholder="Role" value={newConn.role} onChange={e => setNewConn({ ...newConn, role: e.target.value })} />
          <Input placeholder="Company" value={newConn.company} onChange={e => setNewConn({ ...newConn, company: e.target.value })} />
          <Button colorScheme="teal" onClick={handleCreate}>Add</Button>
        </Stack>
      </Box>

      {advice && (
        <Box className="advice-box" mb={6} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
          <Text fontSize="sm" color="gray.600">Suggestion: {advice}</Text>
        </Box>
      )}

      <Accordion allowMultiple>
        {connections.map(conn => (
          <AccordionItem key={conn.id} className="connection-card">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {conn.name} - {conn.role}{conn.company ? ` @ ${conn.company}` : ''} ({conn.status})
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={3}>
                <Textarea
                  placeholder="Notes"
                  value={conn.notes || ''}
                  onChange={e => handleUpdate(conn.id, { notes: e.target.value })}
                />
                <Select value={conn.status} onChange={e => handleUpdate(conn.id, { status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="reengage">Re-engage</option>
                  <option value="archived">Archived</option>
                </Select>
                <Button
                  size="sm"
                  onClick={() => handleUpdate(conn.id, { lastInteraction: new Date().toISOString() })}
                >
                  Update Interaction
                </Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

window.ConnectionManagementPage = ConnectionManagementPage;
