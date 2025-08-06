import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  SimpleGrid,
  Text,
  Flex,
} from '@chakra-ui/react';
import '../styles/GlobalSearchPage.css';
import { globalSearch } from '../api/globalSearch.js';

export default function GlobalSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  async function runSearch() {
    try {
      const data = await globalSearch(query);
      setResults(data);
    } catch (err) {
      console.error('Global search failed', err);
    }
  }

  return (
    <Box className="global-search-page" p={4}>
      <Flex mb={4} gap={2}>
        <Input
          placeholder="Search everything"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button colorScheme="teal" onClick={runSearch}>
          Search
        </Button>
      </Flex>
      {results && (
        <Box>
          {results.suggestions && results.suggestions.length > 0 && (
            <Box className="result-section" mb={6}>
              <Text fontWeight="bold" mb={2}>
                Suggestions
              </Text>
              <SimpleGrid columns={[1, 2, 3]} spacing={2}>
                {results.suggestions.map((s) => (
                  <Box key={s} className="result-card" p={2} borderWidth="1px" borderRadius="md">
                    <Text>{s}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}
          <Box className="result-section" mb={6}>
            <Text fontWeight="bold" mb={2}>
              Gigs
            </Text>
            <SimpleGrid columns={[1, 2, 3]} spacing={2}>
              {results.gigs.map((g) => (
                <Box key={g.id} className="result-card" p={2} borderWidth="1px" borderRadius="md">
                  <Text>{g.title}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          <Box className="result-section" mb={6}>
            <Text fontWeight="bold" mb={2}>
              Freelancers
            </Text>
            <SimpleGrid columns={[1, 2, 3]} spacing={2}>
              {results.freelancers.map((f) => (
                <Box key={f.id} className="result-card" p={2} borderWidth="1px" borderRadius="md">
                  <Text>{f.fullName || f.title}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          <Box className="result-section" mb={6}>
            <Text fontWeight="bold" mb={2}>
              Profiles
            </Text>
            <SimpleGrid columns={[1, 2, 3]} spacing={2}>
              {results.profiles.map((p) => (
                <Box key={p.id} className="result-card" p={2} borderWidth="1px" borderRadius="md">
                  <Text>{p.fullName || p.id}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </Box>
  );
}
