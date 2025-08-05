const { Box, Flex, Text, Input, Button } = ChakraUI;
const { useState, useEffect, useRef } = React;

function ChatWidget({ defaultOpen = false, embedded = false }) {
  const [isOpen, setIsOpen] = useState(embedded ? true : defaultOpen);
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen]);

  async function loadConversations() {
    try {
      const data = await communicationAPI.listConversations();
      setConversations(data);
    } catch (err) {
      console.error('Failed to load conversations', err);
    }
  }

  async function openConversation(id) {
    setActive(id);
    try {
      const data = await communicationAPI.getMessages(id);
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
      await communicationAPI.sendMessage({ conversationId: active, content: text });
      setText('');
      const data = await communicationAPI.getMessages(active);
      setMessages(data);
      scrollToEnd();
    } catch (err) {
      console.error('Failed to send message', err);
    }
  }

  if (!isOpen && !embedded) {
    return (
      <Box className="chat-widget" onClick={() => setIsOpen(true)}>
        <Text color="white" fontWeight="bold">Chat</Text>
      </Box>
    );
  }

  const windowClass = embedded ? 'chat-widget-window embedded' : 'chat-widget-window';

  return (
    <Box className={windowClass}>
      {!embedded && (
        <Flex className="chat-header" justify="space-between" align="center" bg="teal.500" color="white" p={2}>
          <Text>Messages</Text>
          <Button size="xs" onClick={() => setIsOpen(false)}>Close</Button>
        </Flex>
      )}
      <Flex className="chat-body" flex="1">
        <Box className="conversation-list" w="35%" borderRight="1px solid #ccc" overflowY="auto">
          {conversations.map((c) => (
            <Box
              key={c.id}
              p={2}
              className={`conversation-item ${active === c.id ? 'active' : ''}`}
              onClick={() => openConversation(c.id)}
            >
              <Text noOfLines={1}>{c.participants?.filter(p => p !== c.id).join(', ') || c.id}</Text>
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
            <div ref={endRef}></div>
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

window.ChatWidget = ChatWidget;
