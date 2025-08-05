const {
  Box,
  Heading,
  Button,
  VStack,
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
} = ChakraUI;
const { useState, useEffect } = React;

function ScheduleCalendarPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    courseId: '',
    type: 'class',
    start: '',
    end: '',
  });
  const [currentTime, setCurrentTime] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function load() {
      try {
        const data = await educationScheduleAPI.listEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events', err);
      }
    }
    load();

    fetch(`${env.WORLD_TIME_API}/timezone/Etc/UTC`)
      .then((res) => res.json())
      .then((data) => setCurrentTime(data.datetime))
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newEvent = await educationScheduleAPI.createEvent(form);
      setEvents([...events, newEvent]);
      onClose();
      setForm({ title: '', description: '', courseId: '', type: 'class', start: '', end: '' });
    } catch (err) {
      console.error('Failed to create event', err);
    }
  }

  return (
    <Box className="schedule-calendar" p={4}>
      <NavMenu />
      <Heading mb={2}>Schedule & Calendar</Heading>
      {currentTime && <Box mb={4} fontSize="sm">Current UTC time: {currentTime}</Box>}
      <Button colorScheme="teal" onClick={onOpen} mb={4}>Add Event</Button>
      <VStack align="stretch" spacing={3}>
        {events.map(evt => (
          <Box key={evt.id} borderWidth="1px" borderRadius="md" p={3}>
            <Heading size="sm">{evt.title}</Heading>
            <Box fontSize="sm">{new Date(evt.start).toLocaleString()} - {new Date(evt.end).toLocaleString()}</Box>
            <Box fontSize="sm">{evt.description}</Box>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <form id="event-form" onSubmit={handleSubmit}>
              <FormControl mb={3}>
                <FormLabel>Title</FormLabel>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Description</FormLabel>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Course ID</FormLabel>
                <Input value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })} required />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Type</FormLabel>
                <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Start</FormLabel>
                <Input type="datetime-local" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} required />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>End</FormLabel>
                <Input type="datetime-local" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} required />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="teal" type="submit" form="event-form">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

window.ScheduleCalendarPage = ScheduleCalendarPage;
