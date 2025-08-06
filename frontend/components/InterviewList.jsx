import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import '../styles/InterviewList.css';

export default function InterviewList({ interviews, onStatus }) {
  if (!interviews.length) {
    return <Text className="interview-empty">No interviews scheduled.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch" className="interview-list">
      {interviews.map((iv) => (
        <Box key={iv.id} p={4} borderWidth="1px" borderRadius="md">
          <HStack justify="space-between">
            <Heading size="sm">{iv.candidate}</Heading>
            <Text>{new Date(iv.datetime).toLocaleString()}</Text>
          </HStack>
          <HStack mt={2} justify="space-between">
            <Text>Status: {iv.status}</Text>
            {onStatus && (
              <Button size="sm" onClick={() => onStatus(iv.id, 'completed')}>
                Mark Complete
              </Button>
            )}
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}

