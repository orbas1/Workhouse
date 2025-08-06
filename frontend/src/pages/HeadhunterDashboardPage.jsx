import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  List,
  ListItem,
  Text,
  VStack,
  Spinner,
  HStack,
  Select,
  Divider,
} from '@chakra-ui/react';
import {
  searchJobSeekers,
  getRecommendations,
  fetchTasks,
  updateTaskStatus,
  fetchJobAllocations,
  fetchHeadhunters,
} from '../api/headhunter.js';
import '../styles/HeadhunterDashboardPage.css';

export default function HeadhunterDashboardPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ skills: '', location: '', minExperience: '', maxSalary: '', industry: '' });
  const [results, setResults] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [hunters, setHunters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [recs, taskData, jobData, hunterData] = await Promise.all([
          getRecommendations(),
          fetchTasks(),
          fetchJobAllocations(),
          fetchHeadhunters(),
        ]);
        setResults(recs);
        setTasks(taskData);
        setJobs(jobData);
        setHunters(hunterData);
      } catch (err) {
        console.error('Failed to load dashboard', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSearch() {
    try {
      setLoading(true);
      const data = await searchJobSeekers({
        q: query,
        skills: filters.skills,
        location: filters.location,
        minExperience: filters.minExperience,
        maxSalary: filters.maxSalary,
        industry: filters.industry,
      });
      setResults(data);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks((ts) => ts.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error('Update failed', err);
    }
  }

  return (
    <Box className="headhunter-dashboard-page" p={4}>
      <Heading size="lg" mb={4}>Headhunter Dashboard</Heading>
      <VStack align="stretch" spacing={2} mb={4} className="filters-form">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search job seekers" />
        <Input value={filters.skills} onChange={(e) => setFilters({ ...filters, skills: e.target.value })} placeholder="Skills (comma separated)" />
        <Input value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} placeholder="Location" />
        <HStack>
          <Input value={filters.minExperience} onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })} placeholder="Min Experience" type="number" />
          <Input value={filters.maxSalary} onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })} placeholder="Max Salary" type="number" />
        </HStack>
        <Input value={filters.industry} onChange={(e) => setFilters({ ...filters, industry: e.target.value })} placeholder="Industry" />
        <Button colorScheme="teal" onClick={handleSearch}>Search</Button>
      </VStack>
      {loading ? (
        <Spinner />
      ) : (
        <List spacing={3} className="candidate-results">
          {results.map((c) => (
            <ListItem key={c.id} p={3} borderWidth="1px" borderRadius="md" bg="white">
              <Text fontWeight="bold">{c.name || c.id}</Text>
              {c.skills && <Text fontSize="sm">Skills: {c.skills.join(', ')}; Experience: {c.experience} yrs; Salary: ${c.salary}</Text>}
            </ListItem>
          ))}
          {!results.length && <Text>No candidates found.</Text>}
        </List>
      )}

      <Box className="section tasks" mt={6}>
        <Heading size="md" mb={2}>Tasks</Heading>
        <List spacing={2}>
          {tasks.map((t) => (
            <ListItem key={t.id} className="task-item">
              <HStack justify="space-between">
                <Text>{t.title}</Text>
                <Select value={t.status} onChange={(e) => handleStatusChange(t.id, e.target.value)} w="150px">
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Select>
              </HStack>
            </ListItem>
          ))}
          {!tasks.length && <Text>No tasks assigned.</Text>}
        </List>
      </Box>

      <Box className="section job-allocations" mt={6}>
        <Heading size="md" mb={2}>Job Allocations</Heading>
        <List spacing={2}>
          {jobs.map((j) => (
            <ListItem key={j.id} className="job-item">
              <Text>{j.title} - {j.headhunterId ? `Assigned to ${j.headhunterId}` : 'Unassigned'}</Text>
            </ListItem>
          ))}
          {!jobs.length && <Text>No job allocations.</Text>}
        </List>
      </Box>

      <Box className="section headhunter-list" mt={6}>
        <Heading size="md" mb={2}>My Headhunters</Heading>
        <List spacing={2}>
          {hunters.map((h) => (
            <ListItem key={h.id} className="headhunter-item">
              <Text fontWeight="bold">{h.name}</Text>
              <Text fontSize="sm">
                Candidates: {h.metrics.candidatesSourced} | Interviews: {h.metrics.interviewsScheduled} | Placements: {h.metrics.placementsMade}
              </Text>
            </ListItem>
          ))}
          {!hunters.length && <Text>No headhunters found.</Text>}
        </List>
      </Box>
    </Box>
  );
}

