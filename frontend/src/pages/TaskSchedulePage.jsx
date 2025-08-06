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
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { listTasks } from '../api/tasks.js';
import '../styles/TaskSchedulePage.css';

export default function TaskSchedulePage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await listTasks({ assignee: user.id });
        setTasks(data);
      } catch (err) {
        console.error('Failed to load tasks', err);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      load();
    }
  }, [user]);

  const activeTasks = tasks.filter((t) => t.status !== 'completed');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

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
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <List spacing={3}>
                {activeTasks.map((task) => (
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
    </Box>
  );
}
