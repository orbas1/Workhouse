import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Button,
  List,
  ListItem,
  Text,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  Flex
} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/ScheduleCalendarPage.css';
import { fetchEvents, createEvent, deleteEvent } from '../api/calendar.js';
import { fetchProjects } from '../api/workspace.js';
import { useAuth } from '../context/AuthContext.jsx';

function ScheduleCalendarPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({ title: '', startTime: '' });

  useEffect(() => {
    if (user) {
      const params =
        user.role === 'seller' ? { sellerId: user.id } : { buyerId: user.id };
      fetchEvents(params).then(setEvents).catch(console.error);
      fetchProjects().then((projs) => {
        setProjects(projs);
        if (projs.length > 0) {
          setProjectId(projs[0].id);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (projectId) {
      fetchEvents(projectId).then(setEvents).catch(console.error);
    }
  }, [projectId]);

  const dailyEvents = events.filter(
    (e) => new Date(e.date).toDateString() === date.toDateString()
  );

  async function handleAdd() {
    try {
      const payload = {
        projectId,
        title: form.title,
        date: form.startTime || date,
      };
      if (user.role === 'seller') {
        payload.sellerId = user.id;
      } else {
        payload.buyerId = user.id;
      }
      const newEvent = await createEvent(payload);
      setEvents((prev) => [...prev, newEvent]);
      setForm({ title: '', startTime: '' });
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box className="schedule-calendar-page">
      <Heading mb={4}>Schedule & Calendar</Heading>
      <Flex mb={4} gap={4} align="center">
        <Select value={projectId} onChange={(e) => setProjectId(e.target.value)} maxW="300px">
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
        <Button colorScheme="teal" onClick={onOpen}>
          Add Event
        </Button>
      </Flex>
      <Calendar onChange={setDate} value={date} />

      <Heading size="md" mt={6}>
        Events on {date.toDateString()}
      </Heading>
      <List spacing={2} mt={2}>
        {dailyEvents.length === 0 && <Text>No events.</Text>}
        {dailyEvents.map((ev) => (
          <ListItem key={ev.id} className="event-item">
            {new Date(ev.date).toLocaleTimeString()} {ev.title && `| ${ev.title}`}
            <Button size="xs" ml={2} onClick={() => handleDelete(ev.id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Event</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Date & Time</FormLabel>
              <Input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleAdd}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ScheduleCalendarPage;
