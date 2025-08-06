import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  SimpleGrid,
  useDisclosure,
  Text
} from '@chakra-ui/react';
import OpportunitySearchCard from '../components/OpportunitySearchCard.jsx';
import OpportunityDetailModal from '../components/OpportunityDetailModal.jsx';
import { listOpportunities } from '../api/opportunities.js';
import '../styles/OpportunitySearchPage.css';

export default function OpportunitySearchPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = useState(null);

  async function handleSearch() {
    try {
      setLoading(true);
      const data = await listOpportunities({ keyword });
      setResults(data.opportunities || []);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(id) {
    setSelectedId(id);
    onOpen();
  }

  return (
    <Box className="opportunity-search-page" p={4}>
      <Heading mb={4}>Search Opportunities</Heading>
      <VStack spacing={4} align="stretch" mb={6}>
        <Input
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSearch} isLoading={loading}>
          Search
        </Button>
      </VStack>
      {results.length === 0 ? (
        <Text>No opportunities found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {results.map((op) => (
            <OpportunitySearchCard key={op.id} opportunity={op} onSelect={handleSelect} />
          ))}
        </SimpleGrid>
      )}
      <OpportunityDetailModal
        opportunityId={selectedId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}
