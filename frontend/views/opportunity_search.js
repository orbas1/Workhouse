const {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Input,
  Select,
  Button,
  Spinner,
  Text,
} = ChakraUI;
const { useState, useEffect } = React;

function OpportunitySearchPage() {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    location: '',
    duration: '',
    compensationMin: '',
    compensationMax: '',
  });
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await opportunitiesAPI.listOpportunities(filters);
      setOpportunities(data.opportunities || []);
    } catch (err) {
      console.error('Failed to load opportunities', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => load();

  const viewDetails = async (id) => {
    try {
      const data = await opportunitiesAPI.getOpportunity(id);
      setSelected(data);
    } catch (err) {
      console.error('Failed to load opportunity', err);
    }
  };

  return (
    <Box className="opportunity-search" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Opportunities</Heading>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={4} className="filter-bar">
        <Input placeholder="Search" name="keyword" value={filters.keyword} onChange={handleChange} />
        <Input placeholder="Category" name="category" value={filters.category} onChange={handleChange} />
        <Input placeholder="Location" name="location" value={filters.location} onChange={handleChange} />
        <Select placeholder="Duration" name="duration" value={filters.duration} onChange={handleChange}>
          <option value="short-term">Short-Term</option>
          <option value="long-term">Long-Term</option>
        </Select>
        <Input placeholder="Min Pay" name="compensationMin" value={filters.compensationMin} onChange={handleChange} type="number" />
        <Input placeholder="Max Pay" name="compensationMax" value={filters.compensationMax} onChange={handleChange} type="number" />
        <Button colorScheme="teal" onClick={handleSearch}>Search</Button>
      </Stack>

      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {opportunities.map(op => (
            <OpportunityCard key={op.id} opportunity={op} onSelect={viewDetails} />
          ))}
        </SimpleGrid>
      )}

      {selected && (
        <Box className="opportunity-details" mt={8} borderWidth="1px" borderRadius="md" p={4}>
          <Heading size="md" mb={2}>{selected.title}</Heading>
          <Text mb={2}>{selected.description}</Text>
          <Text><strong>Location:</strong> {selected.location} {selected.remote ? '(Remote)' : ''}</Text>
          <Text><strong>Duration:</strong> {selected.duration}</Text>
          <Text><strong>Compensation:</strong> {selected.compensation}</Text>
          <Text><strong>Experience:</strong> {selected.experienceLevel}</Text>
          <Button mt={4} colorScheme="teal">Apply Now</Button>
        </Box>
      )}
    </Box>
  );
}

window.OpportunitySearchPage = OpportunitySearchPage;
