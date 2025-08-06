import React, { useState, useEffect } from 'react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { useTasks } from '../context/TaskContext.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import WorkflowForm from '../components/WorkflowForm.jsx';
import WorkflowList from '../components/WorkflowList.jsx';
import { listWorkflows } from '../api/workflows.js';
import '../styles/TaskWorkflowPage.css';

function TaskWorkflowPage() {
  const [projectId, setProjectId] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const { fetchTasks, editTask } = useTasks();

  useEffect(() => {
    if (projectId) {
      fetchTasks(projectId);
      listWorkflows(projectId).then(setWorkflows).catch((err) => {
        console.error('Failed to load workflows', err);
      });
    }
  }, [projectId, fetchTasks]);

  const handleEdit = (task) => setEditingTask(task);

  const handleUpdate = async (updates) => {
    if (!editingTask) return;
    await editTask(editingTask.id, updates);
    setEditingTask(null);
  };

  const reloadWorkflows = () => {
    if (projectId) {
      listWorkflows(projectId).then(setWorkflows).catch((err) => {
        console.error('Failed to load workflows', err);
      });
    }
  };

  return (
    <Box className="task-workflow-page" p={4}>
      <Heading mb={4}>Task & Workflow Management</Heading>
      <TaskForm
        projectId={projectId}
        setProjectId={setProjectId}
        editingTask={editingTask}
        onUpdate={handleUpdate}
      />
      <TaskList onEdit={handleEdit} />
      <Divider my={6} />
      <Heading size="md" mb={2}>Workflows</Heading>
      <WorkflowForm projectId={projectId} onCreated={reloadWorkflows} />
      <WorkflowList workflows={workflows} />
    </Box>
  );
}

export default TaskWorkflowPage;
