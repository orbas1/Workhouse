import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';
import '../styles/OrderDetail.css';

function OrderDetail({ order, isOpen, onClose }) {
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
          <Text><strong>Status:</strong> {order.status}</Text>
          {order.description && <Text><strong>Description:</strong> {order.description}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OrderDetail;
