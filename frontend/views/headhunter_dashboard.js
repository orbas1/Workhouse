const { Box, Heading, Input, Button, List, ListItem, Text, SimpleGrid } = ChakraUI;
const { useState } = React;

function HeadhunterDashboard(){
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const token = localStorage.getItem('token');

  async function handleSearch(e){
    e.preventDefault();
    try {
      const data = await headhunterAPI.searchJobSeekers(query, token);
      setResults(data);
    } catch(err){
      console.error('search failed', err);
    }
  }

  return (
    <Box className="headhunter-dashboard" p={4}>
      <NavMenu />
      <Heading mb={4}>Headhunter Dashboard</Heading>
      <Box as="form" onSubmit={handleSearch} className="candidate-search" mb={4}>
        <Input placeholder="Search candidates" value={query} onChange={e => setQuery(e.target.value)} mr={2} />
        <Button type="submit" colorScheme="teal">Search</Button>
      </Box>
      <List spacing={3} className="candidate-results">
        {results.map(c => (
          <ListItem key={c.id} className="candidate-item">
            <Text fontWeight="bold">{c.name}</Text>
            {c.skills && <Text fontSize="sm">{c.skills.join(', ')}</Text>}
          </ListItem>
        ))}
      </List>
      <SimpleGrid columns={[1,2]} spacing={4} mt={6}>
        <Box className="task-management" p={4} borderWidth="1px" borderRadius="md" bg="white">
          <Heading size="md" mb={2}>Task Management</Heading>
          <Text fontSize="sm">No tasks loaded.</Text>
        </Box>
        <Box className="job-allocation" p={4} borderWidth="1px" borderRadius="md" bg="white">
          <Heading size="md" mb={2}>Job Allocation</Heading>
          <Text fontSize="sm">No assignments.</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

window.HeadhunterDashboard = HeadhunterDashboard;
