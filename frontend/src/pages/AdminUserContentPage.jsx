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
import { listContent, updateContentStatus, deleteContent } from '../api/content.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/AdminUserContentPage.css';

export default function AdminUserContentPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState([]);
  const toast = useToast();

  const canManageUsers = user?.role === 'admin';
  const canManageContent = ['admin', 'content-manager'].includes(user?.role);

  useEffect(() => {
    async function load() {
      try {
        if (canManageUsers) {
          const userData = await listUsers();
          setUsers(userData);
        }
        if (canManageContent) {
          const contentData = await listContent();
          setContent(contentData);
        }
      } catch (err) {
        toast({ status: 'error', title: 'Failed to load data' });
      }
    }
    load();
  }, [canManageUsers, canManageContent, toast]);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
      toast({ status: 'success', title: 'Role updated' });
    } catch {
      toast({ status: 'error', title: 'Failed to update role' });
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast({ status: 'success', title: 'User removed' });
    } catch {
      toast({ status: 'error', title: 'Failed to remove user' });
    }
  };

  const handleContentStatus = async (id, status) => {
    try {
      const updated = await updateContentStatus(id, status);
      setContent((prev) => prev.map((c) => (c.id === id ? updated : c)));
      toast({ status: 'success', title: 'Status updated' });
    } catch {
      toast({ status: 'error', title: 'Failed to update status' });
    }
  };

  const handleDeleteContent = async (id) => {
    try {
      await deleteContent(id);
      setContent((prev) => prev.filter((c) => c.id !== id));
      toast({ status: 'success', title: 'Content removed' });
    } catch {
      toast({ status: 'error', title: 'Failed to remove content' });
    }
  };

  if (!canManageUsers && !canManageContent) {
    return <Box p={4}>Access denied</Box>;
  }

  return (
    <Box className="admin-user-content-page">
      {canManageUsers && (
        <Box mb={10}>
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
              {users.map((u) => (
                <Tr key={u.id}>
                  <Td>{u.username}</Td>
                  <Td>
                    <Select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      size="sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Select>
                  </Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleDeleteUser(u.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {canManageContent && (
        <Box>
          <Heading mb={4}>Content Management</Heading>
          <Table variant="simple" className="content-table">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {content.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.title}</Td>
                  <Td textTransform="capitalize">{item.type}</Td>
                  <Td>
                    <Select
                      value={item.status}
                      onChange={(e) => handleContentStatus(item.id, e.target.value)}
                      size="sm"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </Select>
                  </Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleDeleteContent(item.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
