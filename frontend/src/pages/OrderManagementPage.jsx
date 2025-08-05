import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Select, useDisclosure } from '@chakra-ui/react';
import '../styles/OrderManagementPage.css';
import { getOrders } from '../api/orders.js';
import OrderList from '../components/OrderList.jsx';
import OrderDetail from '../components/OrderDetail.jsx';

function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders(userId);
        setOrders(data);
        setFiltered(data);
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchOrders();
  }, [userId]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setFiltered(value ? orders.filter((o) => o.status === value) : orders);
  };

  const handleSelect = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  if (loading) return <Spinner />;

  return (
    <Box className="order-management-page" p={4}>
      <Heading size="md" mb={4}>Orders</Heading>
      <Select placeholder="Filter by status" value={statusFilter} onChange={handleFilterChange} mb={4}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </Select>
      <OrderList orders={filtered} onSelect={handleSelect} />
      <OrderDetail order={selectedOrder} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default OrderManagementPage;
