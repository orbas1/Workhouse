import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/ServiceOrderManagementPage.css';
import { getServices } from '../api/services.js';
import {
  getOrders,
  updateOrder,
} from '../api/orders.js';
import ServiceList from '../components/ServiceList.jsx';
import OrderList from '../components/OrderList.jsx';
import OrderDetail from '../components/OrderDetail.jsx';

function ServiceOrderManagementPage() {
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    async function fetchData() {
      try {
        const [serviceData, orderData] = await Promise.all([
          getServices({ sellerId: userId }),
          getOrders(userId),
        ]);
        setServices(serviceData);
        setOrders(orderData);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoadingServices(false);
        setLoadingOrders(false);
      }
    }
    if (userId) fetchData();
  }, [userId]);

  const handleUpdateOrder = async (id, updates) => {
    try {
      const updated = await updateOrder(id, updates);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      onClose();
    } catch (err) {
      console.error('Failed to update order', err);
    }
  };

  return (
    <Box className="service-order-page" p={4}>
      <Heading size="md" mb={4}>
        Services & Orders
      </Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Seller</Tab>
          <Tab>Buyer</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {loadingServices ? (
              <Spinner />
            ) : (
              <ServiceList
                services={services}
                onSelect={(service) => navigate(`/services/${service.id}`)}
              />
            )}
          </TabPanel>
          <TabPanel>
            {loadingOrders ? (
              <Spinner />
            ) : (
              <OrderList
                orders={orders}
                onSelect={(order) => {
                  setSelectedOrder(order);
                  onOpen();
                }}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box mt={8} className="calendar-wrapper">
        <Calendar
          tileClassName={({ date }) =>
            orders.some(
              (order) =>
                new Date(order.scheduledDate || order.createdAt).toDateString() ===
                date.toDateString()
            )
              ? 'order-date'
              : undefined
          }
        />
      </Box>
      <OrderDetail
        order={selectedOrder}
        isOpen={isOpen}
        onClose={() => {
          setSelectedOrder(null);
          onClose();
        }}
        onUpdate={handleUpdateOrder}
      />
    </Box>
  );
}

export default ServiceOrderManagementPage;
