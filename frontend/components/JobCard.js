const { Box, Heading, Text, Badge } = ChakraUI;

function JobCard({ job, onSelect }) {
  return (
    <Box className="job-card" borderWidth="1px" borderRadius="md" p={4} mb={4} onClick={() => onSelect(job)} cursor="pointer" _hover={{ bg: 'gray.50' }}>
      <Heading size="md" mb={2}>{job.title}</Heading>
      <Text fontSize="sm" color="gray.600" noOfLines={2}>{job.description}</Text>
      {job.location && <Badge mt={2}>{job.location}</Badge>}
    </Box>
  );
}

window.JobCard = JobCard;
