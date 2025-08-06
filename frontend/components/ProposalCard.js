const { Box, Text } = ChakraUI;

function ProposalCard({ proposal }) {
  return (
    <Box className="proposal-card" p={4} borderWidth="1px" borderRadius="md">
      <Text fontWeight="bold">Freelancer: {proposal.freelancerId}</Text>
      <Text>Status: {proposal.status}</Text>
      {proposal.proposalText && <Text mt={2}>{proposal.proposalText}</Text>}
    </Box>
  );
}

window.ProposalCard = ProposalCard;
