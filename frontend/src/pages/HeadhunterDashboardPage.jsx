import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  List,
  ListItem,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { searchJobSeekers, getRecommendations } from '../api/headhunter.js';
import '../styles/HeadhunterDashboardPage.css';

export default function HeadhunterDashboardPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const recs = await getRecommendations();
        setResults(recs);
      } catch (err) {
        console.error('Failed to load recommendations', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSearch() {
    try {
      setLoading(true);
      const data = await searchJobSeekers(query);
      setResults(data);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box className="headhunter-dashboard-page" p={4}>
      <Heading size="lg" mb={4}>Headhunter Dashboard</Heading>
      <VStack align="stretch" spacing={4} mb={4}>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search job seekers" />
        <Button colorScheme="teal" onClick={handleSearch}>Search</Button>
      </VStack>
      {loading ? (
        <Spinner />
      ) : (
        <List spacing={3}>
          {results.map((c) => (
            <ListItem key={c.id} p={3} borderWidth="1px" borderRadius="md" bg="white">
              <Text fontWeight="bold">{c.name || c.id}</Text>
              {c.skills && <Text fontSize="sm">Skills: {c.skills.join(', ')}</Text>}
            </ListItem>
          ))}
          {!results.length && <Text>No candidates found.</Text>}
        </List>
      )}
    </Box>
  );
}

