import { useEffect, useState } from 'react';
import { Box, Heading, useToast } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import { fetchProjects, createProject, updateProject, deleteProject } from '../api/projectManagement';
import '../styles/ProjectManagement.css';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const toast = useToast();

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      toast({ title: 'Failed to load projects', status: 'error' });
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (form) => {
    try {
      if (editing) {
        await updateProject(editing.id, form);
        toast({ title: 'Project updated', status: 'success' });
      } else {
        await createProject(form);
        toast({ title: 'Project created', status: 'success' });
      }
      setEditing(null);
      loadProjects();
    } catch (err) {
      toast({ title: err.message, status: 'error' });
    }
  };

  const handleEdit = (project) => {
    setEditing(project);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast({ title: 'Project deleted', status: 'success' });
      loadProjects();
    } catch (err) {
      toast({ title: err.message, status: 'error' });
    }
  };

  return (
    <Box className="project-management">
      <NavMenu />
      <Box p={4}>
        <Heading mb={4}>Project Management</Heading>
        <ProjectForm onSubmit={handleSubmit} initialData={editing} />
        <ProjectList projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>
    </Box>
  );
}
