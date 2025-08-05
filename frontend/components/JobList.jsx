import { List, ListItem, HStack, Heading, Text, Button, Box } from '@chakra-ui/react';
import '../styles/JobList.css';

export default function JobList({ jobs, onDelete }) {
  if (!jobs || jobs.length === 0) {
    return <Text className="job-list-empty">No jobs posted yet.</Text>;
  }

  return (
    <List spacing={3} className="job-list">
      {jobs.map((job) => (
        <ListItem key={job.id} className="job-list-item">
          <HStack justify="space-between">
            <Box>
              <Heading size="sm">{job.title}</Heading>
              <Text fontSize="sm">{job.description}</Text>
            </Box>
            <Button size="sm" colorScheme="red" onClick={() => onDelete(job.id)}>
              Delete
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}
