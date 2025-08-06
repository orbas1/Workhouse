import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '../styles/CourseListPage.css';
import { listCourses } from '../api/courses.js';

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await listCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to load courses', err);
      }
    }
    load();
  }, []);

  return (
    <Box className="course-list-page" p={4}>
      <Heading mb={4}>Courses</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {courses.map((course) => (
          <Box key={course.id} className="course-card" p={4} borderWidth="1px" borderRadius="md">
            <Heading size="md" mb={2}>{course.title}</Heading>
            <Text mb={2}>{course.description}</Text>
            <Button as={Link} to={`/courses/${course.id}`} colorScheme="teal">
              View Details
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
