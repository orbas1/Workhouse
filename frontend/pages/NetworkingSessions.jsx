import { useEffect, useState } from 'react';
import {
  ChakraProvider,
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
  Text
} from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import SessionCard from '../components/SessionCard';
import {
  fetchNetworkingEvents,
  fetchHostedNetworkingEvents,
  attendNetworkingEvent,
} from '../api/networking';
import '../styles/NetworkingSessions.css';

export default function NetworkingSessions() {
  const [sessions, setSessions] = useState([]);
  const [hosted, setHosted] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchNetworkingEvents(),
      fetchHostedNetworkingEvents(),
    ])
      .then(([all, hosted]) => {
        setSessions(all);
        setHosted(hosted);
      })
      .catch(console.error);
  }, []);

  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredHosted = hosted.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleRegister = async () => {
    if (!selected) return;
    try {
      await attendNetworkingEvent(selected.id);
      setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="networking-sessions">
        <Heading mb={4}>Networking Sessions</Heading>
        <Input
          placeholder="Search sessions"
          value={query}
          onChange={e => setQuery(e.target.value)}
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
                {filteredHosted.map((session) => (
                  <SessionCard key={session.id} session={session} onView={setSelected} />
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        <ModalOverlay />
        <ModalContent className="session-modal">
          <ModalHeader>{selected?.title}</ModalHeader>
          <ModalBody>
            <Text mb={2}>{selected?.description}</Text>
            <Text fontSize="sm">Starts: {selected ? new Date(selected.date).toLocaleString() : ''}</Text>
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
    </ChakraProvider>
  );
}
