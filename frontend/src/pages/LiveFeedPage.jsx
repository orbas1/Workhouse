import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, HStack, Textarea, Button, Text, Spinner, Select } from '@chakra-ui/react';
import '../styles/LiveFeedPage.css';
import { getPosts, createPost, likePost, getEvents } from '../api/liveFeed.js';

export default function LiveFeedPage() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, e] = await Promise.all([getPosts(), getEvents()]);
        setPosts(p);
        setEvents(e);
      } catch (err) {
        console.error('Failed to load feed', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    setCategory(value);
    try {
      const filtered = await getPosts(value || undefined);
      setPosts(filtered);
    } catch (err) {
      console.error('Failed to filter posts', err);
    }
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      const newPost = await createPost({ content, category });
      setPosts([newPost, ...posts]);
      setContent('');
    } catch (err) {
      console.error('Post failed', err);
    }
  };

  const handleLike = async (id) => {
    try {
      const updated = await likePost(id);
      setPosts(posts.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      console.error('Like failed', err);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box className="live-feed-page" p={4}>
      <Heading mb={4}>Live Feed</Heading>
      <VStack align="stretch" spacing={2} mb={6}>
        <Textarea placeholder="Share an update..." value={content} onChange={(e) => setContent(e.target.value)} />
        <HStack>
          <Select placeholder="Select category" value={category} onChange={handleCategoryChange}>
            <option value="employment">Employment</option>
            <option value="freelancing">Freelancing</option>
            <option value="education">Education</option>
            <option value="networking">Networking</option>
            <option value="local">Local Services</option>
          </Select>
          <Button colorScheme="teal" onClick={handlePost}>
            Post
          </Button>
        </HStack>
      </VStack>
      <HStack align="start" spacing={8} alignItems="flex-start">
        <VStack flex="1" spacing={4} align="stretch">
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="md">
              <Text mb={2}>{post.content}</Text>
              <Button size="sm" onClick={() => handleLike(post.id)}>
                Like ({post.likes || 0})
              </Button>
            </Box>
          ))}
        </VStack>
        <VStack w="250px" spacing={4} align="stretch" className="events-sidebar">
          <Heading size="sm">Live Events</Heading>
          {events.map((ev, idx) => (
            <Box key={idx} p={2} borderWidth="1px" borderRadius="md">
              {ev.title}
            </Box>
          ))}
        </VStack>
      </HStack>
    </Box>
  );
}
