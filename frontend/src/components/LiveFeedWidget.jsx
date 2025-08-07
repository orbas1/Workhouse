import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Spinner } from '@chakra-ui/react';
import { getPosts } from '../api/liveFeed.js';

const demoPosts = [
  { id: 1, author: 'Alice', content: 'First post!' },
  { id: 2, author: 'Bob', content: 'Another update' },
  { id: 3, author: 'Eve', content: 'Hello world' }
];

export default function LiveFeedWidget() {
  const [posts, setPosts] = useState(demoPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPosts();
        if (Array.isArray(data) && data.length) {
          setPosts(data.slice(0, 3));
        }
      } catch (err) {
        // ignore errors and fall back to demo data
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="md" bg="white" textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="sm" mb={2}>Live Feed</Heading>
      <VStack align="stretch" spacing={1}>
        {posts.map((p) => (
          <Text key={p.id} fontSize="sm">
            <strong>{p.author}:</strong> {p.content}
          </Text>
        ))}
      </VStack>
    </Box>
  );
}
