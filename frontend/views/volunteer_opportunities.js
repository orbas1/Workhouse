const { Box, Heading, Input, Select, Button, SimpleGrid, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } = ChakraUI;
const { useState, useEffect } = React;

function VolunteerOpportunitiesPage(){
  const [filters, setFilters] = useState({ keyword: '', location: '', remote: '' });
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [selected, setSelected] = useState(null);

  async function load(){
    setLoading(true);
    try{
      const data = await opportunitiesAPI.listOpportunities({
        keyword: filters.keyword,
        location: filters.location,
        remote: filters.remote
      });
      setOpportunities(data.opportunities || []);
    }catch(err){
      console.error('Failed to load opportunities', err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <Box className="volunteer-opportunities-page" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Volunteer Opportunities</Heading>
      <Box mb={4} display="flex" gap="2">
        <Input placeholder="Keyword" value={filters.keyword} onChange={e => setFilters({ ...filters, keyword: e.target.value })} />
        <Input placeholder="Location" value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} />
        <Select value={filters.remote} onChange={e => setFilters({ ...filters, remote: e.target.value })} width="150px">
          <option value="">Any</option>
          <option value="true">Remote</option>
          <option value="false">On-site</option>
        </Select>
        <Button colorScheme="teal" onClick={load}>Search</Button>
      </Box>
      {loading ? <Spinner /> : (
        <SimpleGrid columns={[1,2,3]} spacing={4}>
          {opportunities.map(op => (
            <Box key={op.id} p={4} borderWidth="1px" borderRadius="md" _hover={{ boxShadow: 'md', cursor: 'pointer' }} onClick={() => setSelected(op)}>
              <Heading size="md" mb={2}>{op.title}</Heading>
              <Text>{op.organizationId}</Text>
              <Text>{op.location}{op.remote ? ' (Remote)' : ''}</Text>
              <Button mt={2} size="sm" colorScheme="teal" onClick={e => { e.stopPropagation(); setSelected(op); }}>View Details</Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selected?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3}>{selected?.description}</Text>
            {selected?.location && <Text mb={1}>Location: {selected.location}</Text>}
            {selected?.remote && <Text mb={1}>Remote</Text>}
            {selected?.commitmentTime && <Text mb={1}>Commitment: {selected.commitmentTime}</Text>}
            {selected?.requirements && <Text mb={1}>Requirements: {selected.requirements}</Text>}
            <Button mt={4} colorScheme="teal">Apply Now</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

window.VolunteerOpportunitiesPage = VolunteerOpportunitiesPage;
