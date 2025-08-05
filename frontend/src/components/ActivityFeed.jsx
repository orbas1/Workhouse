import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import '../styles/ActivityFeed.css';

function ActivityFeed({ activities = [] }) {
  return (
    <Box className="activity-feed" p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="sm" mb={2}>Recent Activity</Heading>
      <VStack align="start" spacing={1}>
        {activities.length === 0 ? (
          <Text>No recent activity.</Text>
        ) : (
          activities.map((act, idx) => <Text key={idx}>{act}</Text>)
        )}
      </VStack>
    </Box>
  );
}

export default ActivityFeed;
