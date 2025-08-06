const { useState, useEffect } = React;
const { Box, Heading, Input, SimpleGrid, Image, Text, Button, Stack, Tag } = ChakraUI;

function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadCategories();
    loadPosts();
  }, []);

  async function loadCategories() {
    try {
      const data = await blogAPI.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  }

  async function loadPosts(cat) {
    try {
      const data = await blogAPI.getPosts(cat);
      setPosts(data);
    } catch (err) {
      console.error('Failed to load posts', err);
    }
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box className="blog-home" p={4}>
      <NavMenu />
      <Heading mb={4}>Blog</Heading>
      <Input
        placeholder="Search posts"
        value={query}
        onChange={e => setQuery(e.target.value)}
        mb={4}
      />
      <Stack direction="row" spacing={2} mb={4} flexWrap="wrap">
        <Button
          size="sm"
          colorScheme={selected === '' ? 'teal' : 'gray'}
          onClick={() => {
            setSelected('');
            loadPosts();
          }}
        >
          All
        </Button>
        {categories.map(cat => (
          <Button
            key={cat.name}
            size="sm"
            colorScheme={selected === cat.name ? 'teal' : 'gray'}
            onClick={() => {
              setSelected(cat.name);
              loadPosts(cat.name);
            }}
          >
            {cat.name} <Tag ml={1}>{cat.count}</Tag>
          </Button>
        ))}
      </Stack>
      <Heading size="md" mb={2}>
        Featured
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={6} className="featured-grid">
        {filtered.slice(0, 3).map(p => (
          <Box key={p.id} borderWidth="1px" borderRadius="md" overflow="hidden" bg="white">
            <Image src={p.image || `${window.env.BLOG_IMAGE_API}${p.id}`} alt={p.title} />
            <Box p={4}>
              <Heading size="sm" mb={2}>
                {p.title}
              </Heading>
              <Text fontSize="sm">{p.excerpt}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Heading size="md" mb={2}>
        Recent Posts
      </Heading>
      <Stack spacing={3}>
        {filtered.map(p => (
          <Box key={p.id} borderWidth="1px" borderRadius="md" p={4} bg="white">
            <Heading size="sm" mb={1}>
              {p.title}
            </Heading>
            <Text fontSize="sm" color="gray.600">
              {p.excerpt}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

window.BlogHome = BlogHome;
