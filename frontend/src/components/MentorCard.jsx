import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Heading,
  Text,
  Stack,
  Button,
  Badge
} from '@chakra-ui/react';

export default function MentorCard({ mentor, onConnect }) {
  return (
    <Card variant="outline" borderColor="gray.200" _hover={{ shadow: 'md' }}>
      <CardHeader textAlign="center">
        <Stack spacing={3} align="center">
          <Avatar name={mentor.name} src={mentor.avatarUrl} size="xl" />
          <Heading size="md">{mentor.name || 'Unnamed'}</Heading>
          <Badge colorScheme="purple">Mentor</Badge>
          {mentor.industry && (
            <Text fontSize="sm" color="gray.600">
              {mentor.industry}
            </Text>
          )}
          {mentor.location && (
            <Text fontSize="sm" color="gray.600">
              {mentor.location}
            </Text>
          )}
        </Stack>
      </CardHeader>
      <CardBody>
        {mentor.expertise && (
          <Text mb={3} fontSize="sm">
            Expertise: {mentor.expertise}
          </Text>
        )}
        <Button colorScheme="teal" width="full" size="sm" onClick={() => onConnect(mentor.id)}>
          Hire as Mentor
        </Button>
      </CardBody>
    </Card>
  );
}

