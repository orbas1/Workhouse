import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Progress,
  useToast
} from '@chakra-ui/react';
import { useAuth } from '../src/context/AuthContext.jsx';
import {
  fetchEducationOverview,
  fetchUserEngagement
} from '../src/api/education.js';
import '../styles/EducationDashboard.css';

export default function EducationDashboard() {
  const { user } = useAuth();
  const [overview, setOverview] = useState([]);
  const [engagement, setEngagement] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const data = await fetchUserEngagement(user.id);
        setEngagement(data);
      } catch (err) {
        toast({ title: 'Failed to load engagement data', status: 'error' });
      }

      if (user.role === 'instructor' || user.role === 'admin') {
        try {
          const overviewData = await fetchEducationOverview();
          setOverview(overviewData);
        } catch (err) {
          toast({ title: 'Failed to load course overview', status: 'error' });
        }
      }
    }

    load();
  }, [user, toast]);

  const isTeacher = user?.role === 'instructor' || user?.role === 'admin';

  return (
    <Box className="education-dashboard" p={4}>
      <Heading mb={4}>Education Dashboard</Heading>
      <Tabs colorScheme="teal">
        <TabList>
          <Tab>Student</Tab>
          {isTeacher && <Tab>Teacher</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            {engagement ? (
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <Stat className="engagement-card" p={4} borderWidth="1px" borderRadius="md">
                  <StatLabel>Courses Completed</StatLabel>
                  <StatNumber>{engagement.coursesCompleted}</StatNumber>
                </Stat>
                <Stat className="engagement-card" p={4} borderWidth="1px" borderRadius="md">
                  <StatLabel>Average Score</StatLabel>
                  <StatNumber>{engagement.averageScore}</StatNumber>
                </Stat>
                <Stat className="engagement-card" p={4} borderWidth="1px" borderRadius="md">
                  <StatLabel>Time Spent (mins)</StatLabel>
                  <StatNumber>{engagement.timeSpent}</StatNumber>
                </Stat>
              </SimpleGrid>
            ) : (
              <Text>No engagement data available.</Text>
            )}
          </TabPanel>
          {isTeacher && (
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {overview.map((course) => (
                  <Box
                    key={course.id}
                    className="course-card"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <Heading size="sm" mb={2}>
                      {course.title}
                    </Heading>
                    <Progress
                      value={
                        course.enrollments
                          ? (course.completions / course.enrollments) * 100
                          : 0
                      }
                      mb={2}
                    />
                    <Text fontSize="sm">
                      Completions: {course.completions} / {course.enrollments}
                    </Text>
                    <Text fontSize="sm">Avg Score: {course.averageScore}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

// Expose globally for non-module builds
if (typeof window !== 'undefined') {
  window.EducationDashboard = EducationDashboard;
}
