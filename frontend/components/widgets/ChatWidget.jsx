import { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';

/**
 * Simple chat widget placeholder used across admin dashboards.
 * Provides a toggled chat window that stores messages locally.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages([...messages, text]);
    setText('');
  };

  if (!open) {
    return (
      <Button
        position="fixed"
        bottom="4"
        right="4"
        colorScheme="teal"
        onClick={() => setOpen(true)}
      >
        Chat
      </Button>
    );
  }

  return (
    <Box
      position="fixed"
      bottom="4"
      right="4"
      p={4}
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      w="300px"
    >
      <VStack spacing={2} align="stretch">
        <Text fontWeight="bold">Support Chat</Text>
        <Box maxH="200px" overflowY="auto">
          {messages.map((m, idx) => (
            <Text key={idx}>{m}</Text>
          ))}
        </Box>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <Button colorScheme="teal" onClick={handleSend}>
          Send
        </Button>
        <Button variant="ghost" onClick={() => setOpen(false)}>
          Close
        </Button>
      </VStack>
    </Box>
  );
}
