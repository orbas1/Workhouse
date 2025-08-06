import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast
} from '@chakra-ui/react';
import SessionCard from '../components/SessionCard.jsx';
import { fetchNetworkingEvents, attendNetworkingEvent } from '../api/networking.js';
import '../styles/NetworkingDashboardPage.css';

export default function NetworkingDashboardPage() {
  const [sessions, setSessions] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchNetworkingEvents()
      .then(setSessions)
      .catch(() => toast({ title: 'Failed to load sessions', status: 'error' }));
  }, [toast]);

  const filtered = sessions.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleRegister = async () => {
    if (!selected) return;
    try {
      await attendNetworkingEvent(selected.id);
      toast({ title: 'Registered for session', status: 'success' });
      setSelected(null);
    } catch (err) {
      toast({ title: 'Registration failed', status: 'error' });
    }
  };

  return (
    <Box className="networking-dashboard" p={4}>
      <Heading mb={4}>Networking Dashboard</Heading>
      <Input
        placeholder="Search sessions"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        mb={4}
      />
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Participant View</Tab>
          <Tab>Company View</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {filtered.map((session) => (
                <SessionCard key={session.id} session={session} onView={setSelected} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {filtered.map((session) => (
                <SessionCard key={session.id} session={session} onView={setSelected} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        <ModalOverlay />
        <ModalContent className="session-modal">
          <ModalHeader>{selected?.title}</ModalHeader>
          <ModalBody>
            <Text mb={2}>{selected?.description}</Text>
            <Text fontSize="sm">
              Starts: {selected ? new Date(selected.date).toLocaleString() : ''}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={() => setSelected(null)}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleRegister}>
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

