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
  Badge,
  Button,
  Input,
  Stack
} from '@chakra-ui/react';
import {
  fetchUserApplications,
  fetchOpportunityApplications,
  updateApplicationStatus
} from '../api/applications.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/VolunteerTrackingPage.css';

export default function VolunteerTrackingPage() {
  const { user } = useAuth();
  const [userApps, setUserApps] = useState([]);
  const [opportunityId, setOpportunityId] = useState('');
  const [orgApps, setOrgApps] = useState([]);

  useEffect(() => {
    if (user) {
      loadUserApps();
    }
  }, [user]);

  async function loadUserApps() {
    try {
      const data = await fetchUserApplications();
      setUserApps(data);
    } catch (err) {
      console.error('Failed to load applications', err);
    }
  }

  async function loadOrgApps() {
    if (!opportunityId) return;
    try {
      const data = await fetchOpportunityApplications(opportunityId);
      setOrgApps(data);
    } catch (err) {
      console.error('Failed to load opportunity applications', err);
    }
  }

  async function handleStatus(id, status) {
    try {
      await updateApplicationStatus(id, status);
      setOrgApps(apps => apps.map(a => (a.id === id ? { ...a, status } : a)));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  }

  return (
    <Box className="volunteer-tracking" p={4}>
      <Heading mb={4}>Volunteer Applications</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>My Applications</Tab>
          <Tab>Opportunity Applications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Table size="sm" className="volunteer-table">
              <Thead>
                <Tr>
                  <Th>Opportunity</Th>
                  <Th>Status</Th>
                  <Th>Submitted</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userApps.map(app => (
                  <Tr key={app.id}>
                    <Td>{app.opportunityId}</Td>
                    <Td>
                      <Badge colorScheme={statusColor(app.status)}>{app.status}</Badge>
                    </Td>
                    <Td>{new Date(app.createdAt).toLocaleDateString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Stack direction="row" mb={4}>
              <Input
                placeholder="Opportunity ID"
                value={opportunityId}
                onChange={e => setOpportunityId(e.target.value)}
              />
              <Button onClick={loadOrgApps}>Load</Button>
            </Stack>
            <Table size="sm" className="volunteer-table">
              <Thead>
                <Tr>
                  <Th>Applicant</Th>
                  <Th>Message</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orgApps.map(app => (
                  <Tr key={app.id}>
                    <Td>{app.userId}</Td>
                    <Td>{app.message}</Td>
                    <Td>
                      <Badge colorScheme={statusColor(app.status)}>{app.status}</Badge>
                    </Td>
                    <Td>
                      <Stack direction="row" spacing={2}>
                        <Button
                          size="xs"
                          colorScheme="green"
                          onClick={() => handleStatus(app.id, 'accepted')}
                        >
                          Accept
                        </Button>
                        <Button
                          size="xs"
                          colorScheme="red"
                          onClick={() => handleStatus(app.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function statusColor(status) {
  switch (status) {
    case 'accepted':
      return 'green';
    case 'rejected':
      return 'red';
    default:
      return 'yellow';
  }
}
