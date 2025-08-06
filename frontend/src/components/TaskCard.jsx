import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import '../styles/TaskCard.css';

export default function TaskCard({ task, onSelect }) {
  return (
    <Box
      className="task-card"
      borderWidth="1px"
      borderRadius="md"
      p={4}
      onClick={onSelect}
      cursor="pointer"
    >
      <Stack spacing={2}>
        <Text fontWeight="bold">{task.title}</Text>
        {task.budget !== undefined && (
          <Text color="gray.600">${task.budget}</Text>
        )}
        {task.dueDate && (
          <Text fontSize="sm">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
