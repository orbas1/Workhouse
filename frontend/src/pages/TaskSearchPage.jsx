import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  Text,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { getTasks, getTask } from '../api/tasks.js';
import TaskCard from '../components/TaskCard.jsx';
import '../styles/TaskSearchPage.css';

export default function TaskSearchPage() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    minBudget: '',
    maxBudget: '',
    deadline: '',
    sort: '',
  });
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchTasks = async () => {
    try {
      const params = { ...filters };
      Object.keys(params).forEach((k) => {
        if (!params[k]) delete params[k];
      });
      const data = await getTasks(params);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      toast({ title: 'Failed to load tasks', status: 'error' });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSelect = async (task) => {
    try {
      const data = await getTask(task.id);
      setSelectedTask(data);
      onOpen();
    } catch (err) {
      toast({ title: 'Failed to fetch task details', status: 'error' });
    }
  };

  return (
    <Box className="task-search-page" p={4}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={4}>
        <Input
          placeholder="Search tasks"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <Select
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="writing">Writing</option>
        </Select>
        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <NumberInput
          min={0}
          value={filters.minBudget}
          onChange={(v) => setFilters({ ...filters, minBudget: v })}
        >
          <NumberInputField placeholder="Min Budget" />
        </NumberInput>
        <NumberInput
          min={0}
          value={filters.maxBudget}
          onChange={(v) => setFilters({ ...filters, maxBudget: v })}
        >
          <NumberInputField placeholder="Max Budget" />
        </NumberInput>
        <Input
          type="date"
          value={filters.deadline}
          onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
        />
        <Select
          placeholder="Sort"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="closest">Closest Tasks</option>
          <option value="highest">Highest Paying</option>
          <option value="newest">Newest</option>
        </Select>
        <Button colorScheme="teal" onClick={fetchTasks}>
          Search
        </Button>
      </Stack>

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
        {tasks.length === 0 ? (
          <Text>No tasks found</Text>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onSelect={() => handleSelect(task)} />
          ))
        )}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedTask?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTask && (
              <Stack spacing={3}>
                <Text>{selectedTask.description}</Text>
                {selectedTask.budget !== undefined && (
                  <Text>
                    <strong>Budget:</strong> ${selectedTask.budget}
                  </Text>
                )}
                {selectedTask.location && (
                  <Text>
                    <strong>Location:</strong> {selectedTask.location}
                  </Text>
                )}
                {selectedTask.dueDate && (
                  <Text>
                    <strong>Deadline:</strong> {new Date(selectedTask.dueDate).toLocaleDateString()}
                  </Text>
                )}
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
