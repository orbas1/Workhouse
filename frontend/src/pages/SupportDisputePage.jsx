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
} from '@chakra-ui/react';
import '../styles/SupportDisputePage.css';
import { fetchTickets, createTicket, resolveTicket, fetchDisputes } from '../api/support';

export default function SupportDisputePage() {
  const [tickets, setTickets] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({ subject: '', message: '' });

  async function loadData() {
    const [t, d] = await Promise.all([fetchTickets(), fetchDisputes()]);
    setTickets(t);
    setDisputes(d);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit() {
    await createTicket(form);
    setForm({ subject: '', message: '' });
    onClose();
    loadData();
  }

  async function handleResolve(id) {
    await resolveTicket(id);
    loadData();
  }

  return (
    <Box className="support-page">
      <Heading mb={4}>Support & Disputes</Heading>
      <Tabs>
        <TabList>
          <Tab>Support Tickets</Tab>
          <Tab>Disputes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button colorScheme="teal" mb={4} onClick={onOpen}>
              New Ticket
            </Button>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Subject</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickets.map(t => (
                  <Tr key={t.id}>
                    <Td>{t.subject}</Td>
                    <Td>{t.status}</Td>
                    <Td>
                      {t.status !== 'resolved' && (
                        <Button size="sm" onClick={() => handleResolve(t.id)}>
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
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Category</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {disputes.map(d => (
                  <Tr key={d.id}>
                    <Td>{d.userId}</Td>
                    <Td>{d.category}</Td>
                    <Td>{d.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Support Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Subject</FormLabel>
              <Input
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
