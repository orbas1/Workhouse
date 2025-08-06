import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import '../styles/TimesheetTable.css';

export default function TimesheetTable({ timesheets = [] }) {
  return (
    <Table variant="simple" className="timesheet-table">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Job</Th>
          <Th isNumeric>Hours</Th>
          <Th>Notes</Th>
        </Tr>
      </Thead>
      <Tbody>
        {timesheets.map((t) => (
          <Tr key={t.id}>
            <Td>{new Date(t.date).toLocaleDateString()}</Td>
            <Td>{t.jobId}</Td>
            <Td isNumeric>{t.hours}</Td>
            <Td>{t.notes}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
