const { Box } = ChakraUI;

function ChatInbox() {
  return (
    <Box className="chat-inbox-page">
      <NavMenu />
      <Box className="chat-inbox-container">
        <ChatWidget embedded />
      </Box>
    </Box>
  );
}

window.ChatInbox = ChatInbox;
