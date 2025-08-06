import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Stack,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  useToast,
} from '@chakra-ui/react';
import {
  listGigs,
  createGig,
  updateGig,
  deleteGig,
} from '../api/gigs.js';
import '../styles/GigManagementPage.css';

export default function GigManagementPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    status: 'active',
    thumbnail: '',
    tagInput: '',
    tags: [],
  });
  const [gigs, setGigs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await listGigs();
      setGigs(data);
    } catch (err) {
      console.error('Failed to load gigs', err);
      toast({ title: 'Error loading gigs', status: 'error' });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function addTag() {
    if (form.tagInput.trim() !== '') {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: '',
      }));
    }
  }

  function removeTag(tag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      price: parseFloat(form.price),
      status: form.status,
      tags: form.tags,
      thumbnail: form.thumbnail,
    };
    try {
      let saved;
      if (editingId) {
        saved = await updateGig(editingId, payload);
        setGigs(gigs.map((g) => (g.id === editingId ? saved : g)));
        toast({ title: 'Gig updated', status: 'success' });
      } else {
        saved = await createGig(payload);
        setGigs([...gigs, saved]);
        toast({ title: 'Gig created', status: 'success' });
      }
      setForm({
        title: '',
        description: '',
        category: '',
        price: '',
        status: 'active',
        thumbnail: '',
        tagInput: '',
        tags: [],
      });
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save gig', err);
      toast({ title: 'Error saving gig', status: 'error' });
    }
  }

  function startEdit(gig) {
    setForm({
      title: gig.title,
      description: gig.description,
      category: gig.category,
      price: gig.price,
      status: gig.status,
      thumbnail: gig.thumbnail || '',
      tagInput: '',
      tags: gig.tags || [],
    });
    setEditingId(gig.id);
  }

  async function handleDelete(id) {
    try {
      await deleteGig(id);
      setGigs(gigs.filter((g) => g.id !== id));
      toast({ title: 'Gig deleted', status: 'info' });
    } catch (err) {
      console.error('Failed to delete gig', err);
      toast({ title: 'Error deleting gig', status: 'error' });
    }
  }

  async function toggleStatus(gig) {
    const newStatus = gig.status === 'active' ? 'paused' : 'active';
    try {
      const updated = await updateGig(gig.id, { status: newStatus });
      setGigs(gigs.map((g) => (g.id === gig.id ? updated : g)));
    } catch (err) {
      console.error('Failed to update status', err);
      toast({ title: 'Error updating status', status: 'error' });
    }
  }

  return (
    <Box className="gig-management" p={4}>
      <Heading size="lg" mb={4}>
        {editingId ? 'Edit Gig' : 'Create Gig'}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} maxW="600px">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Input name="category" value={form.category} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Thumbnail URL</FormLabel>
            <Input
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {form.thumbnail && (
              <Image
                src={form.thumbnail}
                alt="thumbnail preview"
                mt={2}
                maxH="100px"
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Stack direction="row">
              <Input
                flex="1"
                name="tagInput"
                value={form.tagInput}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button onClick={addTag}>Add</Button>
            </Stack>
            <Wrap mt={2}>
              {form.tags.map((tag) => (
                <WrapItem key={tag}>
                  <Tag borderRadius="full" colorScheme="teal">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => removeTag(tag)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </FormControl>
          <Button colorScheme="teal" type="submit">
            {editingId ? 'Update Gig' : 'Create Gig'}
          </Button>
        </Stack>
      </form>

      <Heading size="md" mt={10} mb={2}>
        Your Gigs
      </Heading>
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
          {gigs.map((g) => (
            <Tr key={g.id}>
              <Td>{g.title}</Td>
              <Td>{g.status}</Td>
              <Td isNumeric>${g.price}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => startEdit(g)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  mr={2}
                  onClick={() => toggleStatus(g)}
                >
                  {g.status === 'active' ? 'Pause' : 'Activate'}
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(g.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

