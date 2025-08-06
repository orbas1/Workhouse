import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Divider,
  useToast
} from '@chakra-ui/react';
import { listCourses, createCourse, addModule, deleteModule } from '../api/courses.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/CourseModuleManagementPage.css';

export default function CourseModuleManagementPage() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '' });
  const [moduleInputs, setModuleInputs] = useState({});
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await listCourses();
        setCourses(data);
      } catch (err) {
        toast({ title: 'Failed to load courses', status: 'error' });
      }
    }
    load();
  }, [toast]);

  function handleCourseInput(e) {
    const { name, value } = e.target;
    setNewCourse((c) => ({ ...c, [name]: value }));
  }

  async function handleCreateCourse() {
    if (!newCourse.title.trim()) return;
    try {
      const payload = {
        ...newCourse,
        instructorId: user?.id,
        price: Number(newCourse.price) || 0
      };
      const course = await createCourse(payload);
      setCourses((c) => [...c, course]);
      setNewCourse({ title: '', description: '', price: '' });
      toast({ title: 'Course created', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to create course', status: 'error' });
    }
  }

  function handleModuleInput(courseId, e) {
    const { name, value } = e.target;
    setModuleInputs((m) => ({ ...m, [courseId]: { ...m[courseId], [name]: value } }));
  }

  async function handleAddModule(courseId) {
    const input = moduleInputs[courseId];
    if (!input?.title) return;
    try {
      const module = await addModule(courseId, {
        title: input.title,
        content: input.content || ''
      });
      setCourses((cs) =>
        cs.map((c) => (c.id === courseId ? { ...c, modules: [...c.modules, module] } : c))
      );
      setModuleInputs((m) => ({ ...m, [courseId]: { title: '', content: '' } }));
      toast({ title: 'Module added', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to add module', status: 'error' });
    }
  }

  async function handleDeleteModule(courseId, moduleId) {
    try {
      await deleteModule(courseId, moduleId);
      setCourses((cs) =>
        cs.map((c) =>
          c.id === courseId
            ? { ...c, modules: c.modules.filter((m) => m.id !== moduleId) }
            : c
        )
      );
      toast({ title: 'Module removed', status: 'info' });
    } catch (err) {
      toast({ title: 'Failed to remove module', status: 'error' });
    }
  }

  return (
    <Box className="course-management-page" p={4}>
      <Heading mb={4}>Course & Module Management</Heading>
      <VStack spacing={6} align="stretch">
        <Box p={4} borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={4}>Create New Course</Heading>
          <VStack spacing={3} align="stretch">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={newCourse.title} onChange={handleCourseInput} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={newCourse.description} onChange={handleCourseInput} />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input name="price" value={newCourse.price} onChange={handleCourseInput} type="number" />
            </FormControl>
            <Button alignSelf="flex-start" colorScheme="teal" onClick={handleCreateCourse}>Create Course</Button>
          </VStack>
        </Box>

        {courses.map((course) => (
          <Box key={course.id} className="course-card">
            <Heading size="md" mb={2}>{course.title}</Heading>
            <Text mb={2}>{course.description}</Text>
            <Heading size="sm" mt={4}>Modules</Heading>
            <VStack spacing={2} align="stretch">
              {course.modules.map((m) => (
                <HStack key={m.id} className="module-item" justify="space-between">
                  <Box>
                    <Text fontWeight="bold">{m.title}</Text>
                    {m.content && <Text fontSize="sm">{m.content}</Text>}
                  </Box>
                  <Button size="sm" colorScheme="red" onClick={() => handleDeleteModule(course.id, m.id)}>Delete</Button>
                </HStack>
              ))}
            </VStack>
            <Divider my={4} />
            <Heading size="sm" mb={2}>Add Module</Heading>
            <VStack spacing={3} align="stretch">
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={moduleInputs[course.id]?.title || ''}
                  onChange={(e) => handleModuleInput(course.id, e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Input
                  name="content"
                  value={moduleInputs[course.id]?.content || ''}
                  onChange={(e) => handleModuleInput(course.id, e)}
                />
              </FormControl>
              <Button alignSelf="flex-start" size="sm" colorScheme="teal" onClick={() => handleAddModule(course.id)}>
                Add Module
              </Button>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

