import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Tag,
  VStack,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { searchFreelancers } from '../api/freelancers.js';
import '../../styles/FreelancerSearchPage.css';

export default function FreelancerSearchPage() {
  const [filters, setFilters] = useState({
    query: '',
    location: '',
    minRate: '',
    maxRate: '',
    minExperience: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const freelancers = await searchFreelancers(filters);
      setResults(freelancers);
    } catch (err) {
      toast({ title: 'Search failed', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="freelancer-search-page" p={4}>
      <Heading mb={4}>Freelancer Search</Heading>
      <SimpleGrid columns={[1, 2, 5]} spacing={4} mb={4}>
        <Input placeholder="Keyword" name="query" value={filters.query} onChange={handleChange} />
        <Input placeholder="Location" name="location" value={filters.location} onChange={handleChange} />
        <NumberInput min={0} value={filters.minRate} onChange={(v) => setFilters({ ...filters, minRate: v })}>
          <NumberInputField placeholder="Min Rate" name="minRate" />
        </NumberInput>
        <NumberInput min={0} value={filters.maxRate} onChange={(v) => setFilters({ ...filters, maxRate: v })}>
          <NumberInputField placeholder="Max Rate" name="maxRate" />
        </NumberInput>
        <NumberInput min={0} value={filters.minExperience} onChange={(v) => setFilters({ ...filters, minExperience: v })}>
          <NumberInputField placeholder="Min Experience" name="minExperience" />
        </NumberInput>
      </SimpleGrid>
      <Button onClick={handleSearch} colorScheme="teal" mb={4}>
        Search
      </Button>
      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {results.map((freelancer) => (
            <Box key={freelancer.id} className="freelancer-card" borderWidth="1px" borderRadius="md" p={4}>
              <Heading size="md" mb={2}>{freelancer.fullName}</Heading>
              <VStack align="start" spacing={1} mb={2}>
                {(freelancer.skills || []).map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </VStack>
              {freelancer.hourlyRate !== undefined && (
                <Box>Rate: ${freelancer.hourlyRate}/hr</Box>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
