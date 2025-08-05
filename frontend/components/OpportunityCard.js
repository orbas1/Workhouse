const { Box, Heading, Text, Badge, Button } = ChakraUI;

function OpportunityCard({ opportunity, onSelect }) {
  return (
    <Box className="opportunity-card" borderWidth="1px" borderRadius="md" p={4} mb={4} _hover={{ bg: 'gray.50' }}>
      <Heading size="md" mb={2}>{opportunity.title}</Heading>
      <Text fontSize="sm" color="gray.600" noOfLines={2}>{opportunity.description}</Text>
      <Badge mt={2}>{opportunity.location || 'Remote'}</Badge>
      <Button mt={3} size="sm" colorScheme="teal" onClick={() => onSelect(opportunity.id)}>
        View Details
      </Button>
    </Box>
  );
}

window.OpportunityCard = OpportunityCard;
