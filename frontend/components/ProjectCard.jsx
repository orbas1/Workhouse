import { Box, Heading, Text, Badge, VStack } from '@chakra-ui/react';
import '../styles/ProjectCard.css';

export default function ProjectCard({ project }) {
  const tasksCount = project.tasks ? project.tasks.length : 0;
  const teamCount = project.team ? project.team.length : 0;
  const budget = project.budget || { allocatedBudget: 0, totalSpent: 0, remainingBudget: 0 };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} className="project-card">
      <Heading size="md" mb={2}>{project.name}</Heading>
      <Text mb={2}>{project.description}</Text>
      <VStack align="start" spacing={1}>
        <Badge colorScheme="purple">Tasks: {tasksCount}</Badge>
        <Badge colorScheme="green">Team: {teamCount}</Badge>
        <Badge colorScheme="blue">Budget: ${budget.totalSpent}/{budget.allocatedBudget}</Badge>
      </VStack>
    </Box>
  );
}
