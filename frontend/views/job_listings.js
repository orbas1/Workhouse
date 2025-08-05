const {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button
} = ChakraUI;
const { useState, useEffect } = React;

function JobListingsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await jobsAPI.listJobs();
        setJobs(data);
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  return (
    <Box className="job-listings-page" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Job Listings</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {jobs.map(job => (
            <JobCard key={job.id} job={job} onSelect={setSelected} />
          ))}
        </SimpleGrid>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selected?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3}>{selected?.description}</Text>
            {selected?.budget && <Text>Budget: {selected.budget}</Text>}
            {selected?.deadline && (
              <Text>Deadline: {new Date(selected.deadline).toLocaleDateString()}</Text>
            )}
            <Button mt={4} colorScheme="teal">Apply Now</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

window.JobListingsPage = JobListingsPage;
