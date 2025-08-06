import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
} from '@chakra-ui/react';
import '../styles/KlEditionPage.css';

export default function KlEditionPage() {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (chat.trim()) {
      setMessages([...messages, { role: 'user', content: chat }]);
      setChat('');
    }
  };

  const launchEc3 = () => {
    // Placeholder for launching an EC3 IDE instance via AWS API
    console.log('Launch EC3 instance');
  };

  const launchN8n = () => {
    // Placeholder for launching n8n workflow instance
    console.log('Launch n8n instance');
  };

  return (
    <Box className="kl-edition-page" p={4}>
      <Heading size="lg" mb={4}>
        KL Edition
      </Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>IDE</Tab>
          <Tab>AutoFlows</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex height="70vh" borderWidth="1px" borderRadius="md" overflow="hidden">
              <Box
                width="30%"
                borderRightWidth="1px"
                p={2}
                display="flex"
                flexDirection="column"
              >
                <Box flex="1" overflowY="auto">
                  {messages.map((m, i) => (
                    <Box key={i} mb={2} className="chat-message">
                      {m.content}
                    </Box>
                  ))}
                </Box>
                <Textarea
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  placeholder="Chat with the operator..."
                  mb={2}
                />
                <Button onClick={handleSend} colorScheme="teal">
                  Send
                </Button>
              </Box>
              <Box flex="1" position="relative">
                <Box
                  className="ide-placeholder"
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button colorScheme="purple" onClick={launchEc3}>
                    Launch IDE Instance
                  </Button>
                </Box>
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Box textAlign="center" p={10} borderWidth="1px" borderRadius="md">
              <Button colorScheme="blue" onClick={launchN8n}>
                Launch n8n Workflow
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
