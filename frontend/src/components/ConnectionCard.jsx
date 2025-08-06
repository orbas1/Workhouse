import { Box, Flex, Heading, Text, Tag, TagLabel, Button, Textarea, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { updateConnection } from '../api/connections.js';
import '../styles/ConnectionCard.css';

export default function ConnectionCard({ connection, onUpdated }) {
  const [notes, setNotes] = useState(connection.notes || '');
  const [editing, setEditing] = useState(false);

  const handleSave = async () => {
    const updated = await updateConnection(connection.id, { notes });
    onUpdated(updated);
    setEditing(false);
  };

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    const updated = await updateConnection(connection.id, { status });
    onUpdated(updated);
  };

  return (
    <Box className="connection-card" borderWidth="1px" borderRadius="md" p={4}>
      <Flex justify="space-between" align="center" mb={2}>
        <Box>
          <Heading size="sm">{connection.name}</Heading>
          <Text fontSize="sm">{connection.title}</Text>
          <Flex mt={2} wrap="wrap">
            {connection.tags?.map((tag) => (
              <Tag key={tag} size="sm" colorScheme="teal" mr={1} mb={1}>
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </Flex>
        </Box>
        <Select size="sm" width="130px" value={connection.status} onChange={handleStatusChange}>
          <option value="new">New</option>
          <option value="follow-up">Follow-Up</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </Flex>
      <Box>
        {editing ? (
          <>
            <Textarea
              size="sm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              mb={2}
            />
            <Button size="sm" colorScheme="teal" mr={2} onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" onClick={() => { setNotes(connection.notes || ''); setEditing(false); }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="sm" className="notes">
              {connection.notes || 'No notes yet'}
            </Text>
            <Button size="xs" mt={2} onClick={() => setEditing(true)}>
              Edit Notes
            </Button>
          </>
        )}
        <Text fontSize="xs" mt={2} color="gray.600">
          Last interaction: {connection.lastInteraction ? new Date(connection.lastInteraction).toLocaleString() : 'N/A'}
        </Text>
      </Box>
    </Box>
  );
}

