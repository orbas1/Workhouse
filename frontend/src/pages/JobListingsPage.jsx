import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast
} from '@chakra-ui/react';
import { fetchJobPostings, submitJobApplication } from '../api/jobPostings.js';
import { useProfile } from '../context/ProfileContext.jsx';
import JobSearchBar from '../components/JobSearchBar.jsx';
import '../styles/JobListingsPage.css';

export default function JobListingsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const toast = useToast();
  const { profile } = useProfile();

  useEffect(() => {
    handleSearch();
  }, []);

  async function handleSearch(filters = {}) {
    setLoading(true);
    try {
      const data = await fetchJobPostings(filters);
      setJobs(data);
    } catch (err) {
      console.error('Failed to load jobs', err);
      toast({ title: 'Error loading jobs', status: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleApply(job) {
    try {
      await submitJobApplication({ jobId: job.id, applicantName: profile?.name || 'Anonymous' });
      toast({ title: 'Application submitted', status: 'success' });
      setSelected(null);
    } catch (err) {
      console.error('Failed to apply', err);
      toast({ title: 'Failed to apply', status: 'error' });
    }
  }

  return (
    <Box className="job-listings-page" p={4}>
      <Heading size="lg" mb={4}>Job Listings</Heading>
      <JobSearchBar onSearch={handleSearch} />
      {loading ? (
        <Spinner />
      ) : jobs.length ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {jobs.map((job) => (
            <Box
              key={job.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg="white"
              boxShadow="sm"
              _hover={{ boxShadow: 'md' }}
              cursor="pointer"
              onClick={() => setSelected(job)}
            >
              <Heading size="md">{job.title}</Heading>
              {job.location && <Text mt={2}>{job.location}</Text>}
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text mt={4}>No jobs found.</Text>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selected?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={3}>{selected?.description}</Text>
            {selected?.budget && <Text>Budget: {selected.budget}</Text>}
            {selected?.deadline && (
              <Text>Deadline: {new Date(selected.deadline).toLocaleDateString()}</Text>
            )}
            <Button mt={4} colorScheme="teal" onClick={() => handleApply(selected)}>
              Apply Now
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
