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
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/EducationSchedulePage.css';
import { listEvents, createEvent } from '../api/educationSchedule.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function EducationSchedulePage() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({ title: '', description: '', start: '', end: '', courseId: '', type: 'class' });
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await listEvents();
        setEvents(data);
      } catch (err) {
        toast({ title: 'Failed to load schedule', status: 'error' });
      }
    }
    load();
  }, [toast]);

  const dailyEvents = events.filter((e) => new Date(e.start).toDateString() === date.toDateString());

  async function handleAdd() {
    try {
      const payload = {
        ...form,
        start: new Date(form.start).toISOString(),
        end: new Date(form.end).toISOString()
      };
      const created = await createEvent(payload);
      setEvents((prev) => [...prev, created]);
      setForm({ title: '', description: '', start: '', end: '', courseId: '', type: 'class' });
      onClose();
      toast({ title: 'Event created', status: 'success' });
    } catch (err) {
      toast({ title: err.message || 'Failed to create event', status: 'error' });
    }
  }

  return (
    <Box className="education-schedule-page" p={4}>
      <Heading mb={4}>Education Schedule</Heading>
      <Calendar onChange={setDate} value={date} />
      {user && user.role === 'teacher' && (
        <Button mt={4} colorScheme="teal" onClick={onOpen}>
          Add Event
        </Button>
      )}

      <Heading size="md" mt={6}>
        Events on {date.toDateString()}
      </Heading>
      <List spacing={2} mt={2}>
        {dailyEvents.length === 0 && <Text>No events.</Text>}
        {dailyEvents.map((ev) => (
          <ListItem key={ev.id} className="event-item">
            {new Date(ev.start).toLocaleTimeString()} - {new Date(ev.end).toLocaleTimeString()} {ev.title && `| ${ev.title}`} ({ev.type})
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Event</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Course ID</FormLabel>
              <Input value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Type</FormLabel>
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="class">Class</option>
                <option value="assignment">Assignment</option>
                <option value="exam">Exam</option>
                <option value="event">Event</option>
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Start Time</FormLabel>
              <Input type="datetime-local" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input type="datetime-local" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
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
