import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  List,
  ListItem,
  Spinner,
  Divider
} from '@chakra-ui/react';
import { fetchConversations, fetchMessages, sendMessage } from '../api/communications.js';
import '../styles/ChatInboxPage.css';

export default function ChatInboxPage() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchConversations();
        setConversations(data);
        if (data.length) {
          selectConversation(data[0].id);
        }
      } catch (err) {
        console.error('Failed to load conversations', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function selectConversation(id) {
    setActiveId(id);
    try {
      const msgs = await fetchMessages(id);
      setMessages(msgs);
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  }

  async function handleSend() {
    if (!messageText.trim() || !activeId) return;
    try {
      const { message } = await sendMessage({ conversationId: activeId, content: messageText });
      setMessages((prev) => [...prev, message]);
      setMessageText('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  }

  return (
    <Flex className="chat-inbox-page" h="100vh">
      <Box w="30%" borderRight="1px solid #e2e8f0" overflowY="auto">
        <VStack align="stretch" spacing={0}>
          {loading ? (
            <Spinner m={4} />
          ) : (
            conversations.map((conv) => (
              <Box
                key={conv.id}
                p={4}
                bg={conv.id === activeId ? 'gray.100' : 'transparent'}
                cursor="pointer"
                onClick={() => selectConversation(conv.id)}
              >
                <Text fontWeight="bold">{conv.id}</Text>
                <Text fontSize="sm">Participants: {conv.participants.join(', ')}</Text>
              </Box>
            ))
          )}
        </VStack>
      </Box>
      <Flex direction="column" flex="1" className="chat-inbox-container">
        <Box flex="1" overflowY="auto" p={4}>
          <List spacing={3}>
            {messages.map((msg) => (
              <ListItem key={msg.id}>
                <Box bg="gray.50" p={2} borderRadius="md">
                  <Text fontSize="sm" color="gray.600">
                    {msg.senderId} - {new Date(msg.createdAt).toLocaleString()}
                  </Text>
                  <Text>{msg.content}</Text>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <HStack p={4} spacing={2}>
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message"
          />
          <Button colorScheme="teal" onClick={handleSend}>
            Send
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}
