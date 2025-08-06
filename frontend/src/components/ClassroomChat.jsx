import React, { useEffect, useState } from 'react';
import { Box, VStack, Input, Button, useToast } from '@chakra-ui/react';
import { getMessages, sendMessage } from '../api/classrooms.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/ClassroomChat.css';

export default function ClassroomChat({ classroomId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const msgs = await getMessages(classroomId);
        setMessages(msgs);
      } catch {
        toast({ title: 'Failed to load messages', status: 'error' });
      }
    }
    load();
  }, [classroomId, toast]);

  async function handleSend() {
    if (!content.trim()) return;
    try {
      const msg = await sendMessage(classroomId, { userId: user?.id, content });
      setMessages((m) => [...m, msg]);
      setContent('');
    } catch {
      toast({ title: 'Failed to send message', status: 'error' });
    }
  }

  return (
    <Box className="classroom-chat">
      <VStack align="stretch" spacing={2} className="messages">
        {messages.map((m) => (
          <Box key={m.id} className="message">
            <strong>{m.userId}:</strong> {m.content}
          </Box>
        ))}
      </VStack>
      <Box className="input-area" mt={2}>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message"
        />
        <Button ml={2} onClick={handleSend} colorScheme="teal">
          Send
        </Button>
      </Box>
    </Box>
  );
}
