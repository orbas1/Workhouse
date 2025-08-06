const { Box, Heading, useToast } = ChakraUI;
const { useState, useEffect } = React;

function ContentManager() {
  const [items, setItems] = useState([]);
  const toast = useToast();

  async function load() {
    try {
      const data = await contentAPI.listContent();
      setItems(data);
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to load content', status: 'error' });
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(form) {
    try {
      await contentAPI.createContent(form);
      toast({ title: 'Content created', status: 'success' });
      load();
    } catch (err) {
      toast({ title: 'Creation failed', status: 'error' });
    }
  }

  return (
    <Box className="content-manager" p={4}>
      <NavMenu />
      <Heading mb={4}>Content Manager</Heading>
      <ContentForm onSubmit={handleCreate} />
      <ContentList items={items} />
    </Box>
  );
}

window.ContentManager = ContentManager;
