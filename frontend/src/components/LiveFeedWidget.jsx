import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Spinner } from '@chakra-ui/react';
import { getPosts } from '../api/liveFeed.js';
import sanitizeInput from '../utils/sanitize.js';
import '../styles/LiveFeedWidget.css';

export default function LiveFeedWidget() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getPosts();
        if (Array.isArray(data) && data.length) {
          setPosts(data.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load live feed', err);
        setError('Unable to load feed');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <Box
        className="live-feed-widget"
        p={4}
        borderWidth="1px"
        borderRadius="md"
        bg="white"
        textAlign="center"
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="live-feed-widget" p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="sm" mb={2}>
        Live Feed
      </Heading>
      {error ? (
        <Text fontSize="sm" color="red.500">
          {error}
        </Text>
      ) : posts.length ? (
        <VStack align="stretch" spacing={1}>
          {posts.map((p) => (
            <Text key={p.id} fontSize="sm">
              <strong>{sanitizeInput(p.author)}:</strong> {sanitizeInput(p.content)}
            </Text>
          ))}
        </VStack>
      ) : (
        <Text fontSize="sm" color="gray.500">
          No activity yet.
        </Text>
      )}
    </Box>
  );
}
