import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Select, SimpleGrid, Image, Text, Spinner } from '@chakra-ui/react';
import { fetchContentLibrary } from '../api/contentLibrary.js';
import '../styles/ContentLibraryPage.css';

export default function ContentLibraryPage() {
  const [library, setLibrary] = useState({ podcasts: [], webinars: [] });
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContentLibrary();
        setLibrary(data);
      } catch (err) {
        console.error('Failed to load content library', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const items = [...library.podcasts.map(p => ({ ...p, type: 'podcast' })), ...library.webinars.map(w => ({ ...w, type: 'webinar' }))]
    .filter(item => (filter === 'all' || item.type === filter) && item.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="content-library" p={4}>
      <Heading mb={4}>Content Library</Heading>
      <Box className="controls" mb={4}>
        <Input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} mr={2} />
        <Select width="200px" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="podcast">Podcasts</option>
          <option value="webinar">Webinars</option>
        </Select>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {items.map(item => (
          <Box key={`${item.type}-${item.id}`} className="library-card" borderWidth="1px" borderRadius="md" p={3}>
            {item.thumbnail && <Image src={item.thumbnail} alt={item.title} className="library-thumb" mb={2} />}
            <Heading size="md">{item.title}</Heading>
            {item.description && <Text fontSize="sm" mt={1}>{item.description}</Text>}
            <Text fontSize="xs" color="gray.500" mt={2}>{item.type === 'podcast' ? 'Podcast' : 'Webinar'}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
