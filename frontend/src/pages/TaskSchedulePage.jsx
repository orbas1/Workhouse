import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  Text,
  Spinner,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { getTasks, updateTask } from '../api/tasks.js';
import { listTasks } from '../api/tasks.js';
import '../styles/TaskSchedulePage.css';

export default function TaskSchedulePage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newDue, setNewDue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await getTasks({ assignee: user.id });
        setTasks(Array.isArray(data) ? data : []);
        const data = await listTasks({ assignee: user.id });
        setTasks(data);
      } catch (err) {
        toast({ title: 'Failed to load tasks', status: 'error' });
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      load();
    }
  }, [user, toast]);

  const activeTasks = tasks.filter((t) => t.status !== 'completed');
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const sortedActive = [...activeTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const openReschedule = (task) => {
    setSelectedTask(task);
    setNewDue(task.dueDate ? task.dueDate.slice(0, 16) : '');
    onOpen();
  };

  const handleReschedule = async () => {
    try {
      await updateTask(selectedTask.id, { dueDate: newDue });
      setTasks((prev) => prev.map((t) => (t.id === selectedTask.id ? { ...t, dueDate: newDue } : t)));
      toast({ title: 'Task rescheduled', status: 'success' });
      onClose();
    } catch (err) {
      toast({ title: 'Failed to reschedule', status: 'error' });
    }
  };

  return (
    <Box className="task-schedule-page">
      <Heading mb={4}>Task &amp; Schedule Management</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <Tabs>
          <TabList>
            <Tab>Active Tasks</Tab>
            <Tab>Schedule</Tab>
            <Tab>Completed Tasks</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <List spacing={3}>
                {activeTasks.map((task) => (
                  <ListItem key={task.id}>
                    <Text fontWeight="bold">{task.title}</Text>
                    <Text fontSize="sm">Due: {task.dueDate ? new Date(task.dueDate).toLocaleString() : 'N/A'}</Text>
                    <Button size="xs" ml={2} onClick={() => openReschedule(task)}>
                      Reschedule
                    </Button>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <List spacing={3}>
                {sortedActive.map((task) => (
                  <ListItem key={task.id}>
                    <Text fontWeight="bold">{task.title}</Text>
                    <Text fontSize="sm">Due: {task.dueDate ? new Date(task.dueDate).toLocaleString() : 'N/A'}</Text>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <List spacing={3}>
                {completedTasks.map((task) => (
                  <ListItem key={task.id}>
                    <Text fontWeight="bold">{task.title}</Text>
                    <Text fontSize="sm">Completed</Text>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reschedule Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Input
              type="datetime-local"
              value={newDue}
              onChange={(e) => setNewDue(e.target.value)}
              mb={3}
            />
            <Button colorScheme="teal" onClick={handleReschedule}>
              Save
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
