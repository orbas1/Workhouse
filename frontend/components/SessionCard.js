const { Box, Heading, Text, Badge } = ChakraUI;

function SessionCard({ session }) {
  return (
    <Box className="session-card" borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <Heading size="md">{session.title}</Heading>
      <Text fontSize="sm" color="gray.600">{new Date(session.date).toLocaleString()}</Text>
      {session.description && <Text mt={2}>{session.description}</Text>}
      <Badge mt={2}>{session.type}</Badge>
    </Box>
  );
}

window.SessionCard = SessionCard;
