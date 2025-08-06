import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Spinner,
  useToast
} from '@chakra-ui/react';
import '../styles/SupportDisputePage.css';
import { fetchTickets, createTicket, resolveTicket, fetchDisputes } from '../api/support.js';
import { resolveDispute } from '../api/disputes.js';

export default function SupportDisputePage() {
  const [tickets, setTickets] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const ticketModal = useDisclosure();
  const resolveTicketModal = useDisclosure();
  const resolveDisputeModal = useDisclosure();
  const [ticketForm, setTicketForm] = useState({ subject: '', message: '' });
  const [resolution, setResolution] = useState('');
  const [activeTicket, setActiveTicket] = useState(null);
  const [activeDispute, setActiveDispute] = useState(null);
  const [ticketQuery, setTicketQuery] = useState('');
  const [disputeQuery, setDisputeQuery] = useState('');

  async function loadData() {
    try {
      setLoading(true);
      const [t, d] = await Promise.all([fetchTickets(), fetchDisputes()]);
      setTickets(t);
      setDisputes(d);
    } catch {
      toast({ status: 'error', description: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateTicket() {
    try {
      await createTicket(ticketForm);
      toast({ status: 'success', description: 'Ticket created' });
      setTicketForm({ subject: '', message: '' });
      ticketModal.onClose();
      loadData();
    } catch {
      toast({ status: 'error', description: 'Failed to create ticket' });
    }
  }

  function openResolveTicket(ticket) {
    setActiveTicket(ticket);
    setResolution('');
    resolveTicketModal.onOpen();
  }

  async function handleResolveTicket() {
    if (!activeTicket) return;
    try {
      await resolveTicket(activeTicket.id, resolution);
      toast({ status: 'success', description: 'Ticket resolved' });
      resolveTicketModal.onClose();
      loadData();
    } catch {
      toast({ status: 'error', description: 'Failed to resolve ticket' });
    }
  }

  function openResolveDispute(dispute) {
    setActiveDispute(dispute);
    setResolution('');
    resolveDisputeModal.onOpen();
  }

  async function handleResolveDispute() {
    if (!activeDispute) return;
    try {
      await resolveDispute(activeDispute.id, { resolution });
      toast({ status: 'success', description: 'Dispute resolved' });
      resolveDisputeModal.onClose();
      loadData();
    } catch {
      toast({ status: 'error', description: 'Failed to resolve dispute' });
    }
  }

  const filteredTickets = tickets.filter(t =>
    t.subject?.toLowerCase().includes(ticketQuery.toLowerCase())
  );
  const filteredDisputes = disputes.filter(d =>
    d.category?.toLowerCase().includes(disputeQuery.toLowerCase()) ||
    String(d.userId).includes(disputeQuery)
  );

  return (
    <Box className="support-page">
      <Heading mb={4}>Support &amp; Disputes</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <Tabs>
          <TabList>
            <Tab>Support Tickets</Tab>
            <Tab>Disputes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Button colorScheme="teal" mb={4} onClick={ticketModal.onOpen}>
                New Ticket
              </Button>
              <Input
                placeholder="Search tickets"
                mb={2}
                value={ticketQuery}
                onChange={e => setTicketQuery(e.target.value)}
              />
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Subject</Th>
                    <Th>User</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredTickets.map(t => (
                    <Tr key={t.id}>
                      <Td>{t.subject}</Td>
                      <Td>{t.user?.name || t.userId}</Td>
                      <Td>{t.status}</Td>
                      <Td>
                        {t.status !== 'resolved' && (
                          <Button size="sm" onClick={() => openResolveTicket(t)}>
                            Resolve
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Input
                placeholder="Search disputes"
                mb={2}
                value={disputeQuery}
                onChange={e => setDisputeQuery(e.target.value)}
              />
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>User</Th>
                    <Th>Category</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredDisputes.map(d => (
                    <Tr key={d.id}>
                      <Td>{d.user?.name || d.userId}</Td>
                      <Td>{d.category}</Td>
                      <Td>{d.status}</Td>
                      <Td>
                        {d.status !== 'resolved' && (
                          <Button size="sm" onClick={() => openResolveDispute(d)}>
                            Resolve
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      <Modal isOpen={ticketModal.isOpen} onClose={ticketModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Support Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Subject</FormLabel>
              <Input
                value={ticketForm.subject}
                onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Textarea
                value={ticketForm.message}
                onChange={e => setTicketForm({ ...ticketForm, message: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={ticketModal.onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleCreateTicket}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={resolveTicketModal.isOpen} onClose={resolveTicketModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resolve Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Resolution</FormLabel>
              <Textarea value={resolution} onChange={e => setResolution(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={resolveTicketModal.onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleResolveTicket}>
              Resolve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={resolveDisputeModal.isOpen} onClose={resolveDisputeModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resolve Dispute</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Resolution</FormLabel>
              <Textarea value={resolution} onChange={e => setResolution(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={resolveDisputeModal.onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleResolveDispute}>
              Resolve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
