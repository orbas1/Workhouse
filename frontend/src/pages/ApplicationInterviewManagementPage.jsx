import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Select,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { getUserApplications } from '../api/applications.js';
import { getUserInterviews, getEmployerInterviews } from '../api/interviews.js';
import { useAuth } from '../context/AuthContext.jsx';
import JobApplicationTracker from '../components/JobApplicationTracker.jsx';
import '../styles/ApplicationInterviewManagementPage.css';

export default function ApplicationInterviewManagementPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appStatus, setAppStatus] = useState('');
  const [interviewStatus, setInterviewStatus] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const apps = await getUserApplications();
        const ints = user?.role === 'employer' ? await getEmployerInterviews() : await getUserInterviews();
        setApplications(apps);
        setInterviews(ints);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <Spinner mt={4} />;

  return (
    <Box className="application-interview-management-page" p={4}>
      <Heading size="lg" mb={4}>Applications & Interviews</Heading>
      <SimpleGrid columns={[1, 2]} spacing={4} mb={4}>
        <Stat>
          <StatLabel>Total Applications</StatLabel>
          <StatNumber>{applications.length}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Scheduled Interviews</StatLabel>
          <StatNumber>{interviews.length}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Tabs>
        <TabList>
          <Tab>Applications</Tab>
          <Tab>Interviews</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Select
              placeholder="Filter by status"
              maxW="200px"
              mb={4}
              value={appStatus}
              onChange={(e) => setAppStatus(e.target.value)}
            />
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Job</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {applications
                  .filter((a) => !appStatus || a.status === appStatus)
                  .map((app) => (
                  <Tr key={app.id}>
                    <Td>{app.jobTitle || app.opportunityId}</Td>
                    <Td>{app.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {!applications.length && <Text mt={4}>No applications yet.</Text>}
            {applications.map((app) => (
              <Box key={app.id} mt={6}>
                <Heading size="sm" mb={2}>{app.jobTitle || app.id}</Heading>
                <JobApplicationTracker
                  agencyId={user?.username}
                  jobId={app.jobId}
                  application={app}
                />
              </Box>
            ))}
          </TabPanel>
          <TabPanel>
            <Select
              placeholder="Filter by status"
              maxW="200px"
              mb={4}
              value={interviewStatus}
              onChange={(e) => setInterviewStatus(e.target.value)}
            />
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Application</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {interviews
                  .filter((i) => !interviewStatus || i.status === interviewStatus)
                  .map((inv) => (
                  <Tr key={inv.id}>
                    <Td>{inv.applicationId}</Td>
                    <Td>{new Date(inv.interviewDate).toLocaleString()}</Td>
                    <Td>{inv.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {!interviews.length && <Text mt={4}>No interviews scheduled.</Text>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

