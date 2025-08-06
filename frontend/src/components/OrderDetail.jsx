import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Select,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import '../styles/OrderDetail.css';

function OrderDetail({ order, isOpen, onClose, onUpdate }) {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    setStatus(order?.status || 'pending');
  }, [order]);

  if (!order) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent className="order-detail">
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text><strong>ID:</strong> {order.id}</Text>
          <Text><strong>Service:</strong> {order.serviceId}</Text>
          <Text>
            <strong>Scheduled:</strong>{' '}
            {new Date(order.scheduledDate || order.createdAt).toLocaleDateString()}
          </Text>
          <Select
            mt={2}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
          {order.description && (
            <Text mt={2}>
              <strong>Description:</strong> {order.description}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          {onUpdate && (
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => onUpdate(order.id, { status })}
            >
              Save
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OrderDetail;
