import { ChakraProvider, Box, Heading, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import InterviewForm from '../components/InterviewForm.jsx';
import InterviewList from '../components/InterviewList.jsx';
import { getUserInterviews, scheduleInterview, updateInterviewStatus } from '../api/interviews.js';
import '../styles/VirtualInterview.css';

export default function VirtualInterview() {
  const [interviews, setInterviews] = useState([]);
  const toast = useToast();

  const load = async () => {
    try {
      const data = await getUserInterviews();
      setInterviews(data);
    } catch (err) {
      toast({ title: 'Failed to load interviews', status: 'error' });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSchedule = async (form) => {
    try {
      await scheduleInterview(form);
      toast({ title: 'Interview scheduled', status: 'success' });
      load();
    } catch (err) {
      toast({ title: 'Scheduling failed', status: 'error' });
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateInterviewStatus(id, status);
      toast({ title: 'Status updated', status: 'info' });
      load();
    } catch (err) {
      toast({ title: 'Update failed', status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="virtual-interview-page" p={4}>
        <Heading mb={4}>Virtual Interview</Heading>
        <InterviewForm onSchedule={handleSchedule} />
        <InterviewList interviews={interviews} onStatus={handleStatus} />
      </Box>
    </ChakraProvider>
  );
}

