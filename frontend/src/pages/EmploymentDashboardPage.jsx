import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Card,
  CardBody,
  Spinner,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getOverview, getJobs as getEmployerJobs, getJob as getEmployerJob } from '../api/employment.js';
import { listPublicJobs, getPublicJob } from '../api/jobs.js';
import '../styles/EmploymentDashboardPage.css';

export default function EmploymentDashboardPage() {
  const [mode, setMode] = useState('seeker');
  const [overview, setOverview] = useState(null);
  const [seekerJobs, setSeekerJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [publicJobs, employerList, ov] = await Promise.all([
          listPublicJobs(),
          getEmployerJobs(),
          getOverview(),
        ]);
        setSeekerJobs(publicJobs);
        setEmployerJobs(employerList);
        setOverview(ov);
      } catch (err) {
        console.error('Failed to load employment data', err);
      }
    })();
  }, []);

  async function showJob(id) {
    try {
      const job = mode === 'seeker' ? await getPublicJob(id) : await getEmployerJob(id);
      setSelected(job);
    } catch (err) {
      console.error('Failed to load job', err);
    }
  }

  return (
    <Box className="employment-dashboard-page" p={4}>
      <Heading size="lg" mb={4}>Employment Dashboard</Heading>
      {!overview ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={8}>
          <Stat>
            <StatLabel>Total Jobs</StatLabel>
            <StatNumber>{overview.totalJobs}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Open Jobs</StatLabel>
            <StatNumber>{overview.openJobs}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Applications</StatLabel>
            <StatNumber>{overview.totalApplications}</StatNumber>
          </Stat>
        </SimpleGrid>
      )}

      <Tabs onChange={(i) => setMode(i === 0 ? 'seeker' : 'employer')}>
        <TabList>
          <Tab>Job Seeker</Tab>
          <Tab>Employer</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={[1, 2]} spacing={4}>
              {seekerJobs.map((job) => (
                <Card key={job.id} className="job-card" onClick={() => showJob(job.id)}>
                  <CardBody>
                    <Heading size="md">{job.title}</Heading>
                    <Text mt={2}>Status: {job.status}</Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
            {selected && mode === 'seeker' && (
              <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
                <Heading size="md" mb={2}>{selected.title}</Heading>
                <Text>Description: {selected.description}</Text>
                {selected.location && <Text>Location: {selected.location}</Text>}
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 2]} spacing={4}>
              {employerJobs.map((job) => (
                <Card key={job.id} className="job-card" onClick={() => showJob(job.id)}>
                  <CardBody>
                    <Heading size="md">{job.title}</Heading>
                    <Text mt={2}>Applications: {job.applications}</Text>
                    <Text>Hires: {job.hires}</Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
            <Button as={Link} to="/job-posts" colorScheme="teal" mt={4}>
              Manage Job Posts
            </Button>
            {selected && mode === 'employer' && (
              <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
                <Heading size="md" mb={2}>{selected.title}</Heading>
                <Text>Status: {selected.status}</Text>
                <Text>Views: {selected.views}</Text>
                <Text>Applications: {selected.applications}</Text>
                <Text>Hires: {selected.hires}</Text>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

