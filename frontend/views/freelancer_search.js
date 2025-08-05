const {
  Box,
  Heading,
  Input,
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  Stack,
  Tag
} = ChakraUI;
const { useState, useEffect } = React;

function FreelancerCard({ freelancer }) {
  return (
    <Box className="freelancer-card" borderWidth="1px" borderRadius="md" p={4}>
      <Heading size="md">{freelancer.fullName || 'Unnamed'}</Heading>
      {freelancer.title && (
        <Text className="freelancer-card-title">{freelancer.title}</Text>
      )}
      {freelancer.location && (
        <Text className="freelancer-card-location">{freelancer.location}</Text>
      )}
      <Stack direction="row" mt={2} flexWrap="wrap">
        {(freelancer.skills || []).map((skill) => (
          <Tag key={skill} mr={1} mb={1}>{skill}</Tag>
        ))}
      </Stack>
      {freelancer.hourlyRate !== undefined && (
        <Text mt={2}>Rate: ${freelancer.hourlyRate}/hr</Text>
      )}
      {freelancer.experienceYears !== undefined && (
        <Text>Experience: {freelancer.experienceYears} yrs</Text>
      )}
    </Box>
  );
}

function FreelancerSearchPage() {
  const [filters, setFilters] = useState({ query: '', location: '', minRate: '', maxRate: '', minExperience: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await freelancersAPI.searchFreelancers(filters);
      setResults(data.freelancers || []);
    } catch (e) {
      console.error('Search failed', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Box className="freelancer-search-page" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Find Freelancers</Heading>
      <Flex className="filters" mb={4} gap={2} wrap="wrap">
        <Input placeholder="Skills or title" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
        <Input placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <Input placeholder="Min Rate" type="number" value={filters.minRate} onChange={(e) => setFilters({ ...filters, minRate: e.target.value })} />
        <Input placeholder="Max Rate" type="number" value={filters.maxRate} onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })} />
        <Input placeholder="Min Experience" type="number" value={filters.minExperience} onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })} />
        <Button colorScheme="teal" onClick={load}>Search</Button>
      </Flex>
      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {results.map((f) => (
            <FreelancerCard key={f.id} freelancer={f} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

window.FreelancerSearchPage = FreelancerSearchPage;
