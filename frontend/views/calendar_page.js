const { Box, Heading, Flex, Select, Button, Table, Text, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, useToast } = ChakraUI;
const { useState, useEffect } = React;

function CalendarPage(){
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [view, setView] = useState('month');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({ startTime:'', endTime:'' });
  const toast = useToast();

  useEffect(()=>{ if(user) loadEvents(); },[user]);

  useEffect(()=>{
    async function fetchTime(){
      try{
        const res = await fetch(`${window.env.WORLD_TIME_API}/timezone/Etc/UTC`);
        const data = await res.json();
        setCurrentTime(data.datetime);
      }catch(e){}
    }
    fetchTime();
  },[]);


  async function loadEvents(){
    try{
      const data = await calendarAPI.listEvents(user.id);
      setEvents(data);
    }catch(err){ console.error('Failed to load events', err); }
  }

  async function handleCreate(){
    try{
      await calendarAPI.createEvent({ sellerId: user.id, startTime: form.startTime, endTime: form.endTime });
      toast({ status:'success', title:'Availability added' });
      setForm({ startTime:'', endTime:'' });
      onClose();
      loadEvents();
    }catch(err){ toast({ status:'error', title:'Failed to add availability' }); }
  }

  if(!user) return <p>Loading...</p>;

  return (
    <Box className="calendar-page" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Service Calendar</Heading>
      {currentTime && <Text mb={4}>Current UTC Time: {new Date(currentTime).toLocaleString()}</Text>}
      <Flex mb={4} justify="space-between" align="center">
        <Select value={view} onChange={e=>setView(e.target.value)} width="150px">
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </Select>
        <Button colorScheme="teal" onClick={onOpen}>Add Availability</Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Start</Th>
            <Th>End</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map(ev => (
            <Tr key={ev.id}>
              <Td>{new Date(ev.startTime).toLocaleDateString()}</Td>
              <Td>{new Date(ev.startTime).toLocaleTimeString()}</Td>
              <Td>{new Date(ev.endTime).toLocaleTimeString()}</Td>
              <Td>{ev.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Availability</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Start Time</FormLabel>
              <Input type="datetime-local" value={form.startTime} onChange={e=>setForm({ ...form, startTime: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input type="datetime-local" value={form.endTime} onChange={e=>setForm({ ...form, endTime: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleCreate}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

window.CalendarPage = CalendarPage;
