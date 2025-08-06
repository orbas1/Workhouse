const { useEffect, useState } = React;
const { Box, Flex, Button, Textarea, Select, Heading, VStack } = ChakraUI;

function LiveFeed() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  async function fetchPosts(cat) {
    try {
      const data = await liveFeedAPI.getPosts(cat);
      setPosts(data);
    } catch (err) {
      console.error('Failed to load posts', err);
    }
  }

  async function fetchEvents() {
    try {
      const data = await liveFeedAPI.getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load events', err);
    }
  }

  useEffect(() => {
    fetchPosts();
    fetchEvents();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await liveFeedAPI.createPost({ content, category });
      setContent('');
      fetchPosts(category);
    } catch (err) {
      console.error('Failed to create post', err);
    }
  }

  return (
    <Flex className="live-feed" p={4} align="flex-start">
      <Box flex="3">
        <Box as="form" onSubmit={handleSubmit} mb={4}>
          <Textarea
            placeholder="Share an update..."
            value={content}
            onChange={e => setContent(e.target.value)}
            mb={2}
          />
          <Flex mb={2} gap={2}>
            <Select
              placeholder="Select category"
              value={category}
              onChange={e => {
                const value = e.target.value;
                setCategory(value);
                fetchPosts(value);
              }}
            >
              <option value="employment">Employment</option>
              <option value="freelancing">Freelancing</option>
              <option value="education">Education</option>
              <option value="networking">Networking</option>
              <option value="local">Local Services</option>
            </Select>
            <Button type="submit" colorScheme="blue">Post</Button>
          </Flex>
        </Box>
          {posts.map(post => (
            <FeedPost key={post.id} post={post} />
          ))}
      </Box>
      <Box flex="1" ml={4}>
        <Heading size="md" mb={2}>Live Events</Heading>
        <VStack spacing={2} align="stretch">
          {events.map(ev => (
            <Box key={ev.id} className="live-event" borderWidth="1px" borderRadius="md" p={2} bg="white">
              {ev.title}
            </Box>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}

window.LiveFeed = LiveFeed;
