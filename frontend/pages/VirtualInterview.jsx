import { ChakraProvider, Box, Heading, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import InterviewForm from '../components/InterviewForm.jsx';
import InterviewList from '../components/InterviewList.jsx';
import {
  getUserInterviews,
  getEmployerInterviews,
  scheduleInterview,
  updateInterviewStatus,
} from '../src/api/interviews.js';
import { useAuth } from '../src/context/AuthContext.jsx';
import '../styles/VirtualInterview.css';

export default function VirtualInterview() {
  const { user } = useAuth();
  const isEmployer = user?.role === 'employer';
  const [interviews, setInterviews] = useState([]);
  const toast = useToast();

  const load = async () => {
    try {
      const data = isEmployer ? await getEmployerInterviews() : await getUserInterviews();
      setInterviews(data);
    } catch (err) {
      toast({ title: 'Failed to load interviews', status: 'error' });
    }
  };

  useEffect(() => {
    load();
  }, [isEmployer]);

  const handleSchedule = async (form) => {
    if (!isEmployer) return;
    try {
      await scheduleInterview(form);
      toast({ title: 'Interview scheduled', status: 'success' });
      load();
    } catch (err) {
      toast({ title: 'Scheduling failed', status: 'error' });
    }
  };

  const handleStatus = async (id, status) => {
    if (!isEmployer) return;
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
        {isEmployer && <InterviewForm onSchedule={handleSchedule} />}
        <InterviewList
          interviews={interviews}
          onStatus={isEmployer ? handleStatus : undefined}
        />
      </Box>
    </ChakraProvider>
  );
}

