import React, { useState } from 'react';
import { Box, VStack, Textarea, Button } from '@chakra-ui/react';
import '../styles/DisputeChat.css';
import { postDisputeMessage } from '../api/disputes.js';

function DisputeChat({ disputeId, initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  async function handleSend() {
    if (!input.trim()) return;
    try {
      const msg = await postDisputeMessage(disputeId, input.trim());
      setMessages([...messages, msg]);
      setInput('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  }

  return (
    <Box className="dispute-chat" borderWidth="1px" borderRadius="md" p={4}>
      <VStack align="stretch" spacing={3} mb={4}>
        {messages.map(m => (
          <Box key={m.id} className="chat-message">
            <strong>{m.senderId}</strong>: {m.message}
          </Box>
        ))}
      </VStack>
      <Textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message"
        mb={2}
      />
      <Button colorScheme="teal" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
}

export default DisputeChat;
