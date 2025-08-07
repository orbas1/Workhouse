import {
  ChakraProvider,
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  useToast,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import WorkspaceSummary from '../components/WorkspaceSummary';
import ProjectCard from '../components/ProjectCard';
import {
  fetchWorkspaceOverview,
  fetchProjects,
  fetchProjectTasks,
  fetchProjectBudget,
  fetchProjectTeam,
} from '../api/workspace';
import '../styles/WorkspaceDashboard.css';

export default function WorkspaceDashboard() {
  const [overview, setOverview] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const ov = await fetchWorkspaceOverview();
        const projs = await fetchProjects();
        const detailed = await Promise.all(
          projs.map(async (p) => {
            const [tasks, budget, team] = await Promise.all([
              fetchProjectTasks(p.id),
              fetchProjectBudget(p.id),
              fetchProjectTeam(p.id),
            ]);
            return { ...p, tasks, budget, team };
          })
        );
        setOverview(ov);
        setProjects(detailed);
      } catch (err) {
        toast({ title: 'Failed to load workspace', status: 'error' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const stats = {
    activeUsers: overview.reduce((sum, o) => sum + (o.activeUsers || 0), 0),
    projects: projects.length,
    tasks: projects.reduce((sum, p) => sum + (p.tasks?.length || 0), 0),
    team: projects.reduce((sum, p) => sum + (p.team?.length || 0), 0),
    budget: projects.reduce((sum, p) => sum + (p.budget?.totalSpent || 0), 0),
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="workspace-dashboard">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading>Workspace Dashboard</Heading>
          <Button as={RouterLink} to="/workspace/schedule" colorScheme="teal">
            Open Calendar
          </Button>
        </Flex>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <WorkspaceSummary stats={stats} />
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </SimpleGrid>
          </>
        )}
      </Box>
    </ChakraProvider>
  );
}

