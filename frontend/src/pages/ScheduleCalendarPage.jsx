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
  useDisclosure
} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/ScheduleCalendarPage.css';
import { fetchEvents, createEvent } from '../api/calendar.js';
import { useAuth } from '../context/AuthContext.jsx';

function ScheduleCalendarPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({ title: '', startTime: '', endTime: '' });

  useEffect(() => {
    if (user) {
      const params =
        user.role === 'seller' ? { sellerId: user.id } : { buyerId: user.id };
      fetchEvents(params).then(setEvents).catch(console.error);
    }
  }, [user]);

  const dailyEvents = events.filter(
    (e) => new Date(e.startTime).toDateString() === date.toDateString()
  );

  async function handleAdd() {
    try {
      const payload = {
        title: form.title,
        startTime: form.startTime,
        endTime: form.endTime,
      };
      if (user.role === 'seller') {
        payload.sellerId = user.id;
      } else {
        payload.buyerId = user.id;
      }
      const newEvent = await createEvent(payload);
      setEvents((prev) => [...prev, newEvent]);
      setForm({ title: '', startTime: '', endTime: '' });
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box className="schedule-calendar-page">
      <Heading mb={4}>Schedule</Heading>
      <Calendar onChange={setDate} value={date} />
      <Button mt={4} colorScheme="teal" onClick={onOpen}>
        Add Event
      </Button>

      <Heading size="md" mt={6}>
        Events on {date.toDateString()}
      </Heading>
      <List spacing={2} mt={2}>
        {dailyEvents.length === 0 && <Text>No events.</Text>}
        {dailyEvents.map((ev) => (
          <ListItem key={ev.id} className="event-item">
            {new Date(ev.startTime).toLocaleTimeString()} -
            {new Date(ev.endTime).toLocaleTimeString()} {ev.title && `| ${ev.title}`}
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
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
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
