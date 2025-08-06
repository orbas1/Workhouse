import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { useTasks } from '../context/TaskContext.jsx';
import '../styles/TaskForm.css';

function TaskForm({ projectId, setProjectId, editingTask, onUpdate }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0,10) : '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) return;
    if (editingTask) {
      await onUpdate({ title, description, dueDate });
    } else {
      await addTask({ projectId, title, description, dueDate });
    }
  };

  return (
    <Box as="form" className="task-form" onSubmit={handleSubmit} mb={6}>
      <FormControl mb={3} isRequired>
        <FormLabel>Project ID</FormLabel>
        <Input value={projectId} onChange={(e) => setProjectId(e.target.value)} />
      </FormControl>
      <FormControl mb={3} isRequired>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Due Date</FormLabel>
        <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </FormControl>
      <Button type="submit" colorScheme="teal">
        {editingTask ? 'Update Task' : 'Create Task'}
      </Button>
    </Box>
  );
}

export default TaskForm;
