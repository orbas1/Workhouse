import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Badge } from '@chakra-ui/react';
import { useTasks } from '../context/TaskContext.jsx';
import '../styles/TaskList.css';

const statusColor = {
  'pending': 'gray',
  'in-progress': 'yellow',
  'completed': 'green'
};

function TaskList({ onEdit }) {
  const { tasks, removeTask } = useTasks();

  return (
    <Table className="task-list" variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Status</Th>
          <Th>Assignee</Th>
          <Th>Due Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task) => (
          <Tr key={task.id}>
            <Td>{task.title}</Td>
            <Td>
              <Badge colorScheme={statusColor[task.status] || 'gray'}>{task.status}</Badge>
            </Td>
            <Td>{task.assignee || '-'}</Td>
            <Td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</Td>
            <Td>
              <Button size="xs" mr={2} onClick={() => onEdit(task)}>Edit</Button>
              <Button size="xs" colorScheme="red" onClick={() => removeTask(task.id)}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TaskList;
