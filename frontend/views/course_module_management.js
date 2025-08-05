const { useState, useEffect } = React;
const { Box, Heading, Button, Input, Textarea, VStack, HStack, List, ListItem, Checkbox } = ChakraUI;
const { useAuth } = window;

function CourseModuleManagement(){
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newModule, setNewModule] = useState({ title: '', content: '' });

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses(){
    try {
      const data = await educationAPI.listCourses();
      setCourses(data);
    } catch(err){
      console.error('Failed to load courses', err);
    }
  }

  async function handleCreateCourse(e){
    e.preventDefault();
    try {
      await educationAPI.createCourse({ ...newCourse, categoryId: crypto.randomUUID(), instructorId: user.id, type: 'course' });
      setNewCourse({ title: '', description: '' });
      loadCourses();
    } catch(err){
      console.error('Failed to create course', err);
    }
  }

  async function handleAddModule(e){
    e.preventDefault();
    if(!selectedCourse) return;
    try {
      await educationAPI.addModule(selectedCourse.id, newModule);
      setNewModule({ title: '', content: '' });
      loadCourses();
    } catch(err){
      console.error('Failed to add module', err);
    }
  }

  async function toggleModule(courseId, moduleId, completed){
    try {
      await educationAPI.trackModuleProgress({ userId: user.id, courseId, activity: moduleId, progress: completed ? 100 : 0 });
    } catch(err){
      console.error('Failed to update progress', err);
    }
  }

  return (
    <Box className="course-module-management" p={4}>
      <Heading size="lg" mb={4}>Courses</Heading>
      <VStack align="stretch" spacing={4}>
        {courses.map(course => (
          <Box key={course.id} borderWidth="1px" borderRadius="md" p={4} bg="white">
            <HStack justify="space-between" mb={2}>
              <Heading size="md">{course.title}</Heading>
              {user && user.role === 'teacher' && (
                <Button size="sm" onClick={() => setSelectedCourse(course)}>Add Module</Button>
              )}
            </HStack>
            <List spacing={2} mt={2}>
              {course.modules && course.modules.map(mod => (
                <ListItem key={mod.id} className="module-item">
                  <Checkbox onChange={e => toggleModule(course.id, mod.id, e.target.checked)}>{mod.title}</Checkbox>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </VStack>

      {user && user.role === 'teacher' && (
        <Box mt={8}>
          <Heading size="md" mb={2}>Create Course</Heading>
          <Box as="form" onSubmit={handleCreateCourse} className="course-form" mb={6}>
            <VStack spacing={2} align="stretch">
              <Input placeholder="Title" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
              <Textarea placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} />
              <Button type="submit" colorScheme="teal">Create</Button>
            </VStack>
          </Box>

          {selectedCourse && (
            <Box as="form" onSubmit={handleAddModule} className="module-form">
              <Heading size="sm" mb={2}>Add Module to {selectedCourse.title}</Heading>
              <VStack spacing={2} align="stretch">
                <Input placeholder="Module Title" value={newModule.title} onChange={e => setNewModule({...newModule, title: e.target.value})} />
                <Textarea placeholder="Content" value={newModule.content} onChange={e => setNewModule({...newModule, content: e.target.value})} />
                <Button type="submit" colorScheme="blue">Add Module</Button>
              </VStack>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

window.CourseModuleManagement = CourseModuleManagement;
