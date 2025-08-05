const { Box, Heading, Flex, Stack, Text, Switch, Table, Thead, Tbody, Tr, Th, Td, Button } = ChakraUI;
const { useState, useEffect } = React;

function GigsDashboard() {
  const { user } = useAuth();
  const [mode, setMode] = useState('seller');
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    async function loadGigs() {
      try {
        const endpoint = mode === 'seller' ? '/api/gigs/my-gigs' : '/api/gigs/applied';
        const res = await apiFetch(endpoint);
        if (res.ok) {
          const data = await res.json();
          setGigs(data);
        }
      } catch (err) {
        console.error('Failed to load gigs', err);
      }
    }
    loadGigs();
  }, [mode]);

  if (!user) return <p>Loading...</p>;

  return (
    <Box className="gigs-dashboard" p={4}>
      <NavMenu />
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Gigs Dashboard</Heading>
        <Stack direction="row" align="center">
          <Text>Buyer</Text>
          <Switch
            colorScheme="teal"
            isChecked={mode === 'seller'}
            onChange={(e) => setMode(e.target.checked ? 'seller' : 'buyer')}
            aria-label="Toggle seller/buyer mode"
          />
          <Text>Seller</Text>
        </Stack>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th isNumeric>Orders</Th>
          </Tr>
        </Thead>
        <Tbody>
          {gigs.map((gig) => (
            <Tr key={gig.id}>
              <Td>{gig.title}</Td>
              <Td>{gig.status}</Td>
              <Td isNumeric>{gig.orders}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {mode === 'seller' && (
        <Button mt={4} colorScheme="teal" onClick={() => window.location.href = '/gigs/create'}>
          Create New Gig
        </Button>
      )}
    </Box>
  );
}

window.GigsDashboard = GigsDashboard;
