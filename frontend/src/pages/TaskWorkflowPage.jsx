import React, { useState, useEffect } from 'react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import WorkflowForm from '../components/WorkflowForm.jsx';
import WorkflowList from '../components/WorkflowList.jsx';
import TaskFilters from '../components/TaskFilters.jsx';
import WorkloadSummary from '../components/WorkloadSummary.jsx';
import { listWorkflows } from '../api/workflows.js';
import { fetchProjectTeam } from '../../api/workspace.js';
import '../styles/TaskWorkflowPage.css';

function TaskWorkflowPage() {
  const [searchParams] = useSearchParams();
  const [projectId, setProjectId] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [team, setTeam] = useState([]);
  const [filters, setFilters] = useState({ status: '', assignee: '' });
  const { fetchTasks, editTask, tasks } = useTasks();

  useEffect(() => {
    const pid = searchParams.get('projectId');
    if (pid) setProjectId(pid);
  }, [searchParams]);

  useEffect(() => {
    if (projectId) {
      fetchTasks(projectId, filters);
      fetchProjectTeam(projectId).then(setTeam).catch((err) => {
        console.error('Failed to load team', err);
      });
      listWorkflows(projectId).then(setWorkflows).catch((err) => {
        console.error('Failed to load workflows', err);
      });
    }
  }, [projectId, filters, fetchTasks]);

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
        team={team}
      />
      <TaskFilters filters={filters} onChange={setFilters} team={team} />
      <TaskList onEdit={handleEdit} />
      <WorkloadSummary tasks={tasks} team={team} />
      <Divider my={6} />
      <Heading size="md" mb={2}>Workflows</Heading>
      <WorkflowForm projectId={projectId} onCreated={reloadWorkflows} />
      <WorkflowList workflows={workflows} />
    </Box>
  );
}

export default TaskWorkflowPage;
