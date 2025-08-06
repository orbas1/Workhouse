import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
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
  const [flowChat, setFlowChat] = useState('');
  const [flowMessages, setFlowMessages] = useState([]);
  const [setup, setSetup] = useState({ host: '', username: '', key: '' });
  const [installing, setInstalling] = useState(false);
  const [connected, setConnected] = useState(false);

  const ideUrl = window.env?.IDE_URL || import.meta.env.VITE_IDE_URL;
  const n8nUrl = window.env?.N8N_URL || import.meta.env.VITE_N8N_URL;

  const handleSend = () => {
    if (chat.trim()) {
      setMessages([...messages, { role: 'user', content: chat }]);
      setChat('');
    }
  };

  const handleFlowSend = () => {
    if (flowChat.trim()) {
      setFlowMessages([...flowMessages, { role: 'user', content: flowChat }]);
      setFlowChat('');
    }
  };

  const launchEc3 = () => {
    // Placeholder for launching an EC3 IDE instance via AWS API
    console.log('Launch EC3 instance');
  };

  const handleN8nSetup = async () => {
    setInstalling(true);
    try {
      await fetch('/n8n/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(setup),
      });
      setConnected(true);
    } catch (err) {
      console.error('Failed to setup n8n', err);
    } finally {
      setInstalling(false);
    }
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
                {ideUrl ? (
                  <iframe src={ideUrl} title="KL IDE" className="ide-iframe" />
                ) : (
                  <Flex
                    className="ide-placeholder"
                    align="center"
                    justify="center"
                    height="100%"
                  >
                    IDE URL not configured
                  </Flex>
                )}
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
            <Flex height="70vh" borderWidth="1px" borderRadius="md" overflow="hidden">
              <Box
                width="30%"
                borderRightWidth="1px"
                p={2}
                display="flex"
                flexDirection="column"
              >
                <Box flex="1" overflowY="auto">
                  {flowMessages.map((m, i) => (
                    <Box key={i} mb={2} className="chat-message">
                      {m.content}
                    </Box>
                  ))}
                </Box>
                <Textarea
                  value={flowChat}
                  onChange={(e) => setFlowChat(e.target.value)}
                  placeholder="Chat with your team..."
                  mb={2}
                />
                <Button onClick={handleFlowSend} colorScheme="teal">
                  Send
                </Button>
              </Box>
              <Box flex="1" position="relative">
                {n8nUrl && connected ? (
                  <iframe src={n8nUrl} title="n8n workflow" className="workflow-iframe" />
                ) : (
                  <Flex
                    className="ide-placeholder"
                    align="center"
                    justify="center"
                    height="100%"
                  >
                    n8n URL not configured
                  </Flex>
                )}
                {!connected && (
                  <Box className="setup-overlay">
                    <Box className="setup-form">
                      <Input
                        placeholder="Server host"
                        value={setup.host}
                        onChange={(e) => setSetup({ ...setup, host: e.target.value })}
                        mb={2}
                      />
                      <Input
                        placeholder="SSH username"
                        value={setup.username}
                        onChange={(e) => setSetup({ ...setup, username: e.target.value })}
                        mb={2}
                      />
                      <Textarea
                        placeholder="Private SSH key"
                        value={setup.key}
                        onChange={(e) => setSetup({ ...setup, key: e.target.value })}
                        mb={2}
                      />
                      <Button
                        colorScheme="blue"
                        onClick={handleN8nSetup}
                        isLoading={installing}
                      >
                        Connect & Install
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
