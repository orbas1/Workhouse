import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import '../styles/TaskManagementPage.css';

export default function TaskManagementPage() {
  const { fetchTasks, editTask } = useTasks();
  const [projectId, setProjectId] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (projectId) fetchTasks(projectId);
  }, [projectId, fetchTasks]);

  const handleUpdate = async (updates) => {
    await editTask(editingTask.id, updates);
    setEditingTask(null);
  };

  return (
    <Box className="task-management-page" p={4}>
      <Heading mb={4}>Task Management</Heading>
      <TaskForm
        projectId={projectId}
        setProjectId={setProjectId}
        editingTask={editingTask}
        onUpdate={handleUpdate}
      />
      <TaskList onEdit={setEditingTask} />
    </Box>
  );
}
