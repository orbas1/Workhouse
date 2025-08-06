import React, { useEffect, useState } from 'react';
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';
import '../styles/ServiceOrderManagementPage.css';
import { getServices } from '../api/services.js';
import { getOrders } from '../api/orders.js';
import ServiceList from '../components/ServiceList.jsx';
import OrderList from '../components/OrderList.jsx';

function ServiceOrderManagementPage() {
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    async function fetchData() {
      try {
        const [serviceData, orderData] = await Promise.all([
          getServices(userId),
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
            {loadingServices ? <Spinner /> : <ServiceList services={services} />}
          </TabPanel>
          <TabPanel>
            {loadingOrders ? <Spinner /> : <OrderList orders={orders} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default ServiceOrderManagementPage;
