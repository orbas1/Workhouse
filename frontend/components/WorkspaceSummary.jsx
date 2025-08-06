import { SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import '../styles/WorkspaceSummary.css';

export default function WorkspaceSummary({ data = [] }) {
  if (!data.length) return null;
  const totals = data.reduce(
    (acc, item) => ({
      activeUsers: acc.activeUsers + (item.activeUsers || 0),
      projectsCreated: acc.projectsCreated + (item.projectsCreated || 0),
      messagesExchanged: acc.messagesExchanged + (item.messagesExchanged || 0),
    }),
    { activeUsers: 0, projectsCreated: 0, messagesExchanged: 0 }
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} className="workspace-summary">
      <Stat>
        <StatLabel>Active Users</StatLabel>
        <StatNumber>{totals.activeUsers}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Projects</StatLabel>
        <StatNumber>{totals.projectsCreated}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Messages</StatLabel>
        <StatNumber>{totals.messagesExchanged}</StatNumber>
      </Stat>
    </SimpleGrid>
  );
}
