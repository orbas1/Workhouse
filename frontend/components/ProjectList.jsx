import { List, ListItem, HStack, Heading, Text, Button, Box } from '@chakra-ui/react';
import '../styles/ProjectList.css';

export default function ProjectList({ projects, onEdit, onDelete }) {
  if (!projects || projects.length === 0) {
    return <Text className="project-list-empty">No projects found.</Text>;
  }

  return (
    <List spacing={3} className="project-list">
      {projects.map((project) => (
        <ListItem key={project.id} className="project-list-item">
          <HStack justify="space-between">
            <Box>
              <Heading size="sm">{project.name}</Heading>
              <Text fontSize="sm">{project.description}</Text>
            </Box>
            <HStack>
              <Button size="sm" colorScheme="blue" onClick={() => onEdit(project)}>
                Edit
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => onDelete(project.id)}>
                Delete
              </Button>
            </HStack>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}
