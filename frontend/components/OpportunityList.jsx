import { List, ListItem, HStack, Heading, Text, Button, Box } from '@chakra-ui/react';
import '../styles/OpportunityList.css';

export default function OpportunityList({ opportunities, onDelete, onApply }) {
  if (!opportunities || opportunities.length === 0) {
    return <Text className="opportunity-list-empty">No opportunities available.</Text>;
  }

  return (
    <List spacing={3} className="opportunity-list">
      {opportunities.map((op) => (
        <ListItem key={op.id} className="opportunity-list-item">
          <HStack justify="space-between" align="flex-start">
            <Box>
              <Heading size="sm">{op.title}</Heading>
              <Text fontSize="sm">{op.location}{op.remote ? ' (Remote)' : ''}</Text>
              <Text fontSize="sm">Urgency: {op.urgency}</Text>
            </Box>
            <HStack>
              {onApply && (
                <Button size="sm" colorScheme="green" onClick={() => onApply(op.id)}>
                  Apply
                </Button>
              )}
              {onDelete && (
                <Button size="sm" colorScheme="red" onClick={() => onDelete(op.id)}>
                  Delete
                </Button>
              )}
            </HStack>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}
