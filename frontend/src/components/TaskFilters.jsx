import React from 'react';
import { HStack, FormControl, FormLabel, Select } from '@chakra-ui/react';
import '../styles/TaskFilters.css';

function TaskFilters({ filters, onChange, team }) {
  const handleChange = (field) => (e) => {
    onChange({ ...filters, [field]: e.target.value });
  };

  return (
    <HStack spacing={4} className="task-filters">
      <FormControl w="200px">
        <FormLabel>Status</FormLabel>
        <Select value={filters.status} onChange={handleChange('status')}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
      </FormControl>
      <FormControl w="200px">
        <FormLabel>Assignee</FormLabel>
        <Select value={filters.assignee} onChange={handleChange('assignee')}>
          <option value="">All</option>
          {team.map((member) => (
            <option key={member.userId} value={member.userId}>
              {member.userId}
            </option>
          ))}
        </Select>
      </FormControl>
    </HStack>
  );
}

export default TaskFilters;
