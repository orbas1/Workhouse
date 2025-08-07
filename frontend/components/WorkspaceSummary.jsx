import { SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import '../styles/WorkspaceSummary.css';

export default function WorkspaceSummary({ stats }) {
  if (!stats) return null;
  const {
    activeUsers = 0,
    projects = 0,
    tasks = 0,
    team = 0,
    budget = 0,
  } = stats;

  return (
    <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4} className="workspace-summary">
      <Stat>
        <StatLabel>Active Users</StatLabel>
        <StatNumber>{activeUsers}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Projects</StatLabel>
        <StatNumber>{projects}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Tasks</StatLabel>
        <StatNumber>{tasks}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Team Members</StatLabel>
        <StatNumber>{team}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Budget Spent</StatLabel>
        <StatNumber>${budget.toFixed(2)}</StatNumber>
      </Stat>
    </SimpleGrid>
  );
}
