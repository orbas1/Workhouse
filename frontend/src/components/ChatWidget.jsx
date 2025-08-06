import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, Input, Button, IconButton } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { fetchConversations, fetchMessages, sendMessage } from '../api/communications.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/ChatWidget.css';

export default function ChatWidget({ defaultOpen = false }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const pinned = [
    { id: 'synthron-ai', label: 'Synthron A.I.', participants: [] },
    { id: 'support', label: 'Support', participants: [] },
  ];
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen && user) {
      loadConversations();
    }
  }, [isOpen, user]);

  if (!user) return null;

  async function loadConversations() {
    try {
      const data = await fetchConversations();
      setConversations([...pinned, ...data]);
    } catch (err) {
      console.error('Failed to load conversations', err);
    }
  }

  async function openConversation(id) {
    setActive(id);
    try {
      const data = await fetchMessages(id);
      setMessages(data);
      scrollToEnd();
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  }

  function scrollToEnd() {
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
  }

  async function handleSend() {
    if (!text.trim() || !active) return;
    try {
      await sendMessage({ conversationId: active, content: text });
      setText('');
      const data = await fetchMessages(active);
      setMessages(data);
      scrollToEnd();
    } catch (err) {
      console.error('Failed to send message', err);
    }
  }

  if (!isOpen) {
    return (
      <IconButton
        className="chat-widget"
        icon={<ChatIcon />}
        aria-label="Open chat"
        colorScheme="teal"
        borderRadius="full"
        onClick={() => setIsOpen(true)}
      />
    );
  }

  return (
    <Box className="chat-widget-window">
      <Flex className="chat-header" justify="space-between" align="center" bg="teal.500" color="white" p={2}>
        <Text>Messages</Text>
        <Button size="xs" onClick={() => setIsOpen(false)}>Close</Button>
      </Flex>
      <Flex className="chat-body" flex="1">
        <Box className="conversation-list" w="35%" borderRight="1px solid #ccc" overflowY="auto">
          {conversations.map((c) => (
            <Box
              key={c.id}
              p={2}
              className={`conversation-item ${active === c.id ? 'active' : ''}`}
              onClick={() => openConversation(c.id)}
            >
              <Text noOfLines={1}>
                {c.label || c.participants?.filter(p => p !== user.id).join(', ') || c.id}
              </Text>
            </Box>
          ))}
        </Box>
        <Flex className="message-section" direction="column" flex="1">
          <Box className="messages" flex="1" overflowY="auto" p={2}>
            {messages.map((m) => (
              <Box key={m.id} mb={2}>
                <Text fontSize="sm"><strong>{m.senderId}:</strong> {m.content}</Text>
              </Box>
            ))}
            <div ref={endRef} />
          </Box>
          <Flex p={2} borderTop="1px solid #ccc">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              mr={2}
              placeholder="Type a message"
            />
            <Button colorScheme="teal" onClick={handleSend}>Send</Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
