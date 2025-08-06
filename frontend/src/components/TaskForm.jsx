import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Select } from '@chakra-ui/react';
import { useTasks } from '../context/TaskContext.jsx';
import '../styles/TaskForm.css';

function TaskForm({ projectId, setProjectId, editingTask, onUpdate, team }) {
  const { addTask, editTask, assign } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [assignee, setAssignee] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : '');
      setStatus(editingTask.status || 'pending');
      setAssignee(editingTask.assignee || '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
      setAssignee('');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) return;
    if (editingTask) {
      await onUpdate({ title, description, dueDate, status });
      if (assignee) await assign(editingTask.id, assignee);
    } else {
      const created = await addTask({ projectId, title, description, dueDate });
      if (assignee) await assign(created.id, assignee);
      if (status !== 'pending') await editTask(created.id, { status });
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
      <FormControl mb={3}>
        <FormLabel>Status</FormLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Assignee</FormLabel>
        <Select placeholder="Select assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
          {team.map((member) => (
            <option key={member.userId} value={member.userId}>
              {member.userId}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" colorScheme="teal">
        {editingTask ? 'Update Task' : 'Create Task'}
      </Button>
    </Box>
  );
}

export default TaskForm;
