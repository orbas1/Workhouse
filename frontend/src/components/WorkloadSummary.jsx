import React, { useMemo } from 'react';
import { Box, Heading, VStack, Text, Progress } from '@chakra-ui/react';
import '../styles/WorkloadSummary.css';

function WorkloadSummary({ tasks, team }) {
  const data = useMemo(() => {
    if (!team.length) return [];
    const counts = team.map((member) => ({
      userId: member.userId,
      count: tasks.filter((t) => t.assignee === member.userId).length,
    }));
    const max = Math.max(1, ...counts.map((c) => c.count));
    return counts.map((c) => ({ ...c, percent: (c.count / max) * 100 }));
  }, [tasks, team]);

  if (!data.length) return null;

  return (
    <Box className="workload-summary" mt={6}>
      <Heading size="md" mb={3}>Workload Summary</Heading>
      <VStack spacing={2} align="stretch">
        {data.map((item) => (
          <Box key={item.userId}>
            <Text fontSize="sm" mb={1}>{item.userId} ({item.count} tasks)</Text>
            <Progress value={item.percent} size="sm" colorScheme="blue" borderRadius="md" />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default WorkloadSummary;
