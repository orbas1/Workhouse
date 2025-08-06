import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import '../styles/TaskTable.css';

function TaskTable({ tasks }) {
  return (
    <Table variant="simple" className="task-table">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Status</Th>
          <Th>Due Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task) => (
          <Tr key={task.id}>
            <Td>{task.title}</Td>
            <Td>{task.status}</Td>
            <Td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TaskTable;
