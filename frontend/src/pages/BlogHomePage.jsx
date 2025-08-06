import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Spinner,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast
} from '@chakra-ui/react';
import { fetchCategories, fetchPosts } from '../api/blog.js';
import '../styles/BlogHomePage.css';

export default function BlogHomePage() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
        const initialPosts = await fetchPosts();
        setPosts(initialPosts);
      } catch (err) {
        toast({ title: 'Failed to load blog', status: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [toast]);

  async function handleTabChange(index) {
    setTabIndex(index);
    setLoading(true);
    try {
      const category = index === 0 ? undefined : categories[index - 1].name;
      const data = await fetchPosts(category);
      setPosts(data);
    } catch {
      toast({ title: 'Failed to load posts', status: 'error' });
    } finally {
      setLoading(false);
    }
  }

  const postsList = (
    <Stack spacing={4} mt={4}>
      {posts.map((post) => (
        <Box key={post.id} p={4} borderWidth="1px" borderRadius="md" className="post-card">
          {post.image && <Image src={post.image} alt={post.title} className="post-image" mb={2} />}
          <Heading size="md" mb={1}>{post.title}</Heading>
          <Text fontSize="sm" color="gray.600" mb={2}>{new Date(post.createdAt).toLocaleDateString()}</Text>
          <Text>{post.excerpt}</Text>
        </Box>
      ))}
      {posts.length === 0 && !loading && <Text>No posts found.</Text>}
    </Stack>
  );

  return (
    <Box className="blog-home-page" p={4}>
      <Heading mb={4}>Blog</Heading>
      {categories.length > 0 && (
        <Tabs
          variant="enclosed"
          index={tabIndex}
          onChange={handleTabChange}
        >
          <TabList overflowX="auto">
            <Tab>All</Tab>
            {categories.map((c) => (
              <Tab key={c.name}>{c.name} ({c.count})</Tab>
            ))}
          </TabList>
          <TabPanels>
            {[null, ...categories].map((c, idx) => (
              <TabPanel key={idx} p={0}>
                {loading && tabIndex === idx ? <Spinner /> : postsList}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
      {categories.length === 0 && (loading ? <Spinner /> : postsList)}
    </Box>
  );
}
