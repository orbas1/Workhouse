import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';
import { listUsers, updateUserRole, deleteUser } from '../api/users.js';
import '../styles/AdminUserContentPage.css';

export default function AdminUserContentPage() {
  const [users, setUsers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await listUsers();
        setUsers(data);
      } catch (err) {
        toast({ status: 'error', title: 'Failed to load users' });
      }
    }
    fetchUsers();
  }, [toast]);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
      toast({ status: 'success', title: 'Role updated' });
    } catch {
      toast({ status: 'error', title: 'Failed to update role' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast({ status: 'success', title: 'User removed' });
    } catch {
      toast({ status: 'error', title: 'Failed to remove user' });
    }
  };

  return (
    <Box className="admin-user-content-page">
      <Heading mb={4}>User Management</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.username}</Td>
              <Td>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  size="sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Select>
              </Td>
              <Td>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
