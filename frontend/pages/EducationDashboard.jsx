import { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Progress,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import { fetchEducationOverview } from '../api/education';
import '../styles/EducationDashboard.css';

export default function EducationDashboard() {
  const [overview, setOverview] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchEducationOverview();
        setOverview(data);
      } catch (err) {
        toast({ title: 'Failed to load education data', status: 'error' });
      }
    }
    load();
  }, [toast]);

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="education-dashboard" p={4}>
        <Heading mb={4}>Education Dashboard</Heading>
        <Button as={Link} to="/education/courses" colorScheme="teal" mb={4}>
          Manage Courses
        </Button>
        <Tabs colorScheme="teal">
          <TabList>
            <Tab>Student</Tab>
            <Tab>Teacher</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {overview.map((course) => (
                  <Box key={course.id} className="course-card" p={4} borderWidth="1px" borderRadius="md">
                    <Heading size="md" mb={2}>{course.title}</Heading>
                    <Progress value={course.enrollments ? (course.completions / course.enrollments) * 100 : 0} mb={2} />
                    <Text fontSize="sm">Completions: {course.completions} / {course.enrollments}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {overview.map((course) => (
                  <Stat key={course.id} className="overview-card" p={4} borderWidth="1px" borderRadius="md">
                    <StatLabel>{course.title}</StatLabel>
                    <StatNumber>{course.enrollments} enrolled</StatNumber>
                    <Text>Average Score: {course.averageScore}</Text>
                  </Stat>
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
}

// Expose globally for non-module builds
if (typeof window !== 'undefined') {
  window.EducationDashboard = EducationDashboard;
}
