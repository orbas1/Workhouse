import { Box, Heading, Text, Button, Avatar } from '@chakra-ui/react';
import '../styles/SessionCard.css';

export default function SessionCard({ session, onView }) {
  const avatarSrc = `${window.env?.AVATAR_API || ''}?seed=${session.hostId}`;

  return (
    <Box className="session-card" p={4} borderWidth="1px" borderRadius="md">
      <Heading size="sm" mb={2}>{session.title}</Heading>
      <Text fontSize="sm" mb={2}>{new Date(session.date).toLocaleString()}</Text>
      <Avatar src={avatarSrc} size="sm" mb={2} />
      <Button size="sm" colorScheme="teal" onClick={() => onView(session)}>
        View Details
      </Button>
    </Box>
  );
}
