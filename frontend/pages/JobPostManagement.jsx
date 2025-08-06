import { ChakraProvider, Box, Heading, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import JobPostForm from '../components/JobPostForm';
import JobList from '../components/JobList';
import { fetchJobs, createJob, deleteJob } from '../src/api/jobs.js';
import { useAuth } from '../src/context/AuthContext.jsx';
import '../styles/JobPostManagement.css';

export default function JobPostManagement() {
  const { user } = useAuth();
  const agencyId = user?.username;
  const isEmployer = user?.role === 'employer';
  const [jobs, setJobs] = useState([]);
  const toast = useToast();

  const loadJobs = async () => {
    if (!agencyId) return;
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
    if (!agencyId) return;
    try {
      await createJob(agencyId, form);
      toast({ title: 'Job created', status: 'success' });
      loadJobs();
    } catch (err) {
      toast({ title: 'Creation failed', status: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!agencyId) return;
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
        {isEmployer && <JobPostForm onSubmit={handleCreate} />}
        <JobList jobs={jobs} onDelete={isEmployer ? handleDelete : undefined} />
      </Box>
    </ChakraProvider>
  );
}
