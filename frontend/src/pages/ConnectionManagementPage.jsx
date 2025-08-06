import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex, Button, Input, Stack, Select } from '@chakra-ui/react';
import ConnectionCard from '../components/ConnectionCard.jsx';
import { getConnections, addConnection } from '../api/connections.js';
import '../styles/ConnectionManagementPage.css';

export default function ConnectionManagementPage() {
  const [connections, setConnections] = useState([]);
  const [form, setForm] = useState({ name: '', title: '', tags: '' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const userId = localStorage.getItem('userId') || 'default-user';
  const [form, setForm] = useState({ name: '', role: '', tags: '' });

  useEffect(() => {
    async function fetchConnections() {
      try {
        const data = await getConnections();
        setConnections(data);
      } catch (err) {
        console.error('Failed to load connections', err);
      }
    }
    fetchConnections();
  }, []);

  const handleAdd = async () => {
    if (!form.name) return;
    try {
      const tags = form.tags.split(',').map((t) => t.trim()).filter((t) => t);
      const newConn = await addConnection(userId, {
      const tags = form.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);
      const newConn = await addConnection({
        name: form.name,
        role: form.role,
        tags,
      });
      setConnections((prev) => [...prev, newConn]);
      setForm({ name: '', role: '', tags: '' });
    } catch (err) {
      console.error('Failed to add connection', err);
    }
  };

  const filtered = connections
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((c) => (statusFilter ? c.status === statusFilter : true));

  return (
    <Box className="connection-page" p={4}>
      <Heading mb={4}>Connection Management</Heading>
      <Flex mb={4} className="connection-form" wrap="wrap">
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          mr={2}
        />
        <Input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          mr={2}
        />
        <Input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          mr={2}
        />
        <Button colorScheme="teal" onClick={handleAdd} mr={2}>
          Add
        </Button>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mr={2}
          mt={[2, 0]}
        />
        <Select
          placeholder="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          width="150px"
          mt={[2, 0]}
        >
          <option value="new">New</option>
          <option value="follow-up">Follow-Up</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </Flex>
      <Stack spacing={3}>
        {filtered.map((conn) => (
          <ConnectionCard
            key={conn.id}
            connection={conn}
            onUpdated={(u) =>
              setConnections((prev) => prev.map((c) => (c.id === u.id ? u : c)))
            }
          />
        {connections.map((conn) => (
          <Box key={conn.id} borderWidth="1px" borderRadius="md" p={4} className="connection-card">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="sm">{conn.name}</Heading>
                <Text fontSize="sm">{conn.role}</Text>
                <Flex mt={2} wrap="wrap">
                  {conn.tags &&
                    conn.tags.map((tag) => (
                      <Tag key={tag} size="sm" colorScheme="teal" mr={1} mb={1}>
                        <TagLabel>{tag}</TagLabel>
                      </Tag>
                    ))}
                </Flex>
              </Box>
              <Flex>
                <Button size="sm" mr={2} onClick={() => handleStatus(conn.id, 'followed')}>
                  Follow-Up
                </Button>
                <Button size="sm" onClick={() => handleStatus(conn.id, 'messaged')}>
                  Messaged
                </Button>
              </Flex>
            </Flex>
            <Text mt={2} fontSize="xs">
              Status: {conn.status}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

