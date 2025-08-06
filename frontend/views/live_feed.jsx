const { useEffect, useState } = React;
const {
  Box,
  Flex,
  Button,
  Textarea,
  Select,
  Heading,
  VStack,
  HStack,
  Avatar,
  Text,
} = ChakraUI;

function StoryBubble({ story }) {
  return (
    <VStack spacing={1} className="story-bubble">
      <Avatar size="lg" name={story.author} src={story.image} />
      <Text fontSize="sm" noOfLines={1} maxW="16">
        {story.author}
      </Text>
    </VStack>
  );
}

function EventBubble({ event }) {
  return (
    <VStack spacing={1} className="event-bubble">
      <Avatar size="md" name={event.title} src={event.image} />
      <Text fontSize="xs" noOfLines={1} textAlign="center" maxW="20">
        {event.title}
      </Text>
      <Button size="xs" colorScheme="blue">
        Join
      </Button>
    </VStack>
  );
}

function LiveFeed() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [news, setNews] = useState([]);
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

  async function fetchStories() {
    try {
      const data = await liveFeedAPI.getStories();
      setStories(data);
    } catch (err) {
      console.error('Failed to load stories', err);
    }
  }

  async function fetchNews() {
    try {
      const data = await liveFeedAPI.getNews();
      setNews(data);
    } catch (err) {
      console.error('Failed to load news', err);
    }
  }

  useEffect(() => {
    fetchPosts();
    fetchEvents();
    fetchStories();
    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchPosts(category);
        fetchEvents();
        fetchStories();
        fetchNews();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [category]);

  useEffect(() => {
    function handleVisibility() {
      if (!document.hidden) {
        fetchPosts(category);
        fetchEvents();
        fetchStories();
        fetchNews();
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [category]);

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
    <Flex
      className="live-feed"
      p={4}
      align="flex-start"
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Box flex={{ base: 1, md: 3 }}>
        <HStack spacing={4} overflowX="auto" pb={4} className="story-bubbles">
          {stories.map(story => (
            <StoryBubble key={story.id} story={story} />
          ))}
        </HStack>
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
      <Box flex={{ base: 1, md: 1 }} ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
        <Heading size="sm" mb={2}>
          News
        </Heading>
        <VStack spacing={2} align="stretch" mb={4}>
          {news.map(item => (
            <Box
              key={item.id}
              className="news-item"
              borderWidth="1px"
              borderRadius="md"
              p={2}
              bg="white"
            >
              {item.title}
            </Box>
          ))}
        </VStack>
        <Heading size="md" mb={2}>
          Live Now
        </Heading>
        <HStack spacing={4} overflowX="auto" className="event-bubbles">
          {events.map(ev => (
            <EventBubble key={ev.id} event={ev} />
          ))}
        </HStack>
      </Box>
    </Flex>
  );
}

window.LiveFeed = LiveFeed;
