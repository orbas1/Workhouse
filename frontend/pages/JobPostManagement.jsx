import { ChakraProvider, Box, Heading, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import JobPostForm from '../components/JobPostForm';
import JobList from '../components/JobList';
import { fetchJobs, createJob, deleteJob } from '../api/jobs';
import '../styles/JobPostManagement.css';

export default function JobPostManagement({ agencyId }) {
  const [jobs, setJobs] = useState([]);
  const toast = useToast();

  const loadJobs = async () => {
    try {
      const data = await fetchJobs(agencyId);
      setJobs(data);
    } catch (err) {
      toast({ title: 'Failed to load jobs', status: 'error' });
    }
  };

  useEffect(() => {
    loadJobs();
  }, [agencyId]);

  const handleCreate = async (form) => {
    try {
      await createJob(agencyId, form);
      toast({ title: 'Job created', status: 'success' });
      loadJobs();
    } catch (err) {
      toast({ title: 'Creation failed', status: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(agencyId, id);
      toast({ title: 'Job deleted', status: 'info' });
      loadJobs();
    } catch (err) {
      toast({ title: 'Deletion failed', status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="job-post-management" p={4}>
        <Heading mb={4}>Job Post Management</Heading>
        <JobPostForm onSubmit={handleCreate} />
        <JobList jobs={jobs} onDelete={handleDelete} />
      </Box>
    </ChakraProvider>
  );
}
