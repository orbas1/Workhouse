const { Box, Heading, FormControl, FormLabel, Input, Textarea, Select, Button, Stack, Tag, TagLabel, TagCloseButton, Wrap, WrapItem, Table, Thead, Tr, Th, Tbody, Td } = ChakraUI;
const { useState, useEffect } = React;

function GigManagementPage(){
  const [form, setForm] = useState({ title:'', description:'', category:'', price:'', tagInput:'', tags:[] });
  const [gigs, setGigs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function load(){
      try {
        const data = await gigsAPI.listGigs(token);
        setGigs(data);
      } catch(err){
        console.error(err);
      }
    }
    load();
  }, []);

  function handleChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function addTag(){
    if(form.tagInput.trim() !== ''){
      setForm(prev => ({ ...prev, tags:[...prev.tags, prev.tagInput.trim()], tagInput:'' }));
    }
  }

  function removeTag(tag){
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  }

  async function handleSubmit(e){
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      price: parseFloat(form.price),
      tags: form.tags,
    };
    try {
      let saved;
      if(editingId){
        saved = await gigsAPI.updateGig(editingId, payload, token);
        setGigs(gigs.map(g => g.id === editingId ? saved : g));
      } else {
        saved = await gigsAPI.createGig(payload, token);
        setGigs([...gigs, saved]);
      }
      setForm({ title:'', description:'', category:'', price:'', tagInput:'', tags:[] });
      setEditingId(null);
    } catch(err){
      console.error(err);
    }
  }

  function startEdit(gig){
    setForm({ title:gig.title, description:gig.description, category:gig.category, price:gig.price, tagInput:'', tags:gig.tags || [] });
    setEditingId(gig.id);
  }

  async function handleDelete(id){
    try {
      await gigsAPI.deleteGig(id, token);
      setGigs(gigs.filter(g => g.id !== id));
    } catch(err){
      console.error(err);
    }
  }

  return (
    <Box className="gig-management" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>{editingId ? 'Edit Gig' : 'Create Gig'}</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} maxW="600px">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Input name="category" value={form.category} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input type="number" name="price" value={form.price} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Stack direction="row">
              <Input flex="1" name="tagInput" value={form.tagInput} onChange={handleChange} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <Button onClick={addTag}>Add</Button>
            </Stack>
            <Wrap mt={2}>
              {form.tags.map(tag => (
                <WrapItem key={tag}>
                  <Tag size="md" borderRadius="full" variant="solid" colorScheme="teal">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => removeTag(tag)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </FormControl>
          <Button colorScheme="teal" type="submit">{editingId ? 'Update Gig' : 'Create Gig'}</Button>
        </Stack>
      </form>

      <Heading size="md" mt={10} mb={2}>Your Gigs</Heading>
      <Table variant="simple" className="gig-table">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th isNumeric>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {gigs.map(g => (
            <Tr key={g.id}>
              <Td>{g.title}</Td>
              <Td>{g.status}</Td>
              <Td isNumeric>${g.price}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => startEdit(g)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(g.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

window.GigManagementPage = GigManagementPage;
