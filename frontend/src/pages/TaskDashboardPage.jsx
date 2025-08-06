import React, { useState, useEffect } from 'react';
import { Box, Heading, ButtonGroup, Button, Spinner } from '@chakra-ui/react';
import TaskTable from '../components/TaskTable.jsx';
import '../styles/TaskDashboardPage.css';
import { listTasks } from '../api/tasks.js';
import { useAuth } from '../context/AuthContext.jsx';

function TaskDashboardPage() {
  const { user } = useAuth();
  const [mode, setMode] = useState('creator');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function load() {
      setLoading(true);
      try {
        const params = mode === 'creator' ? { ownerId: user.id } : { assignee: user.id };
        const data = await listTasks(params);
        setTasks(data);
      } catch (err) {
        console.error('Failed to load tasks', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user, mode]);

  return (
    <Box className="task-dashboard-page" p={4}>
      <Heading mb={4}>Task Dashboard</Heading>
      <ButtonGroup mb={4}>
        <Button colorScheme={mode === 'creator' ? 'teal' : 'gray'} onClick={() => setMode('creator')}>
          Task Creator
        </Button>
        <Button colorScheme={mode === 'tasker' ? 'teal' : 'gray'} onClick={() => setMode('tasker')}>
          Tasker
        </Button>
      </ButtonGroup>
      {loading ? <Spinner /> : <TaskTable tasks={tasks} />}
    </Box>
  );
}

export default TaskDashboardPage;
