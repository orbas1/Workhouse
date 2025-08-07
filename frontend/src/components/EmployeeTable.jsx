import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api/admin.js';
import '../styles/EmployeeTable.css';

export default function EmployeeTable({ employees, onRefresh }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({ name: '', role: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', role: '', email: '' });
    onOpen();
  };

  const openEdit = (emp) => {
    setEditingId(emp.id);
    setForm({ name: emp.name || '', role: emp.role || '', email: emp.email || '' });
    onOpen();
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateEmployee(editingId, form);
    } else {
      await createEmployee(form);
    }
    onClose();
    onRefresh();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    onRefresh();
  };

  return (
    <>
      <Button colorScheme="teal" onClick={openAdd} mb={4}>
        Add Employee
      </Button>
      <Table className="employee-table" variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((emp) => (
            <Tr key={emp.id}>
              <Td>{emp.name}</Td>
              <Td>{emp.role}</Td>
              <Td>{emp.email}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => openEdit(emp)}
                  aria-label="Edit"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(emp.id)}
                  aria-label="Delete"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingId ? 'Edit Employee' : 'Add Employee'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Role</FormLabel>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
