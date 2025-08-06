import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import '../styles/SearchConnectionPage.css';
import { searchProfiles, sendConnectionRequest } from '../api/network.js';

function SearchConnectionPage() {
  const [filters, setFilters] = useState({
    role: '',
    industry: '',
    location: '',
    fundingStage: '',
    expertise: '',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  function handleChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  async function handleSearch() {
    setLoading(true);
    try {
      const data = await searchProfiles(filters);
      setResults(data);
    } catch (err) {
      toast({ title: 'Search failed', status: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleConnect(userId) {
    try {
      await sendConnectionRequest(userId);
      toast({ title: 'Request sent', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to send request', status: 'error' });
    }
  }

  return (
    <Box className="search-connection-page" p={4}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg" textAlign="center">
          Investment Central
        </Heading>
        <Alert status="info" borderRadius="md">
          <AlertIcon />Networking only. No monetary exchange occurs on Workhouse.
          Connect with mentors or promote your startup to the community.
        </Alert>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <Select
            placeholder="Role"
            name="role"
            value={filters.role}
            onChange={handleChange}
          >
            <option value="startup">Startup</option>
            <option value="investor">Investor</option>
            <option value="mentor">Mentor</option>
          </Select>
          <Input
            placeholder="Industry"
            name="industry"
            value={filters.industry}
            onChange={handleChange}
          />
          <Input
            placeholder="Location"
            name="location"
            value={filters.location}
            onChange={handleChange}
          />
          <Input
            placeholder="Funding Stage"
            name="fundingStage"
            value={filters.fundingStage}
            onChange={handleChange}
          />
          <Input
            placeholder="Mentorship Focus"
            name="expertise"
            value={filters.expertise}
            onChange={handleChange}
          />
        </SimpleGrid>
        <Button
          colorScheme="teal"
          onClick={handleSearch}
          isLoading={loading}
          alignSelf="flex-start"
        >
          Search
        </Button>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {results.map((profile) => (
            <Box
              key={profile.id}
              className="profile-card"
              borderWidth="1px"
              borderRadius="md"
              p={4}
            >
              <Heading size="sm">{profile.name || 'Unnamed'}</Heading>
              {profile.industry && <Text>{profile.industry}</Text>}
              {profile.location && <Text>{profile.location}</Text>}
              <Button
                mt={2}
                size="sm"
                colorScheme="teal"
                onClick={() => handleConnect(profile.id)}
              >
                {profile.role === 'mentor'
                  ? 'Hire as Mentor'
                  : profile.role === 'startup'
                  ? 'Promote Startup'
                  : 'Connect'}
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default SearchConnectionPage;
