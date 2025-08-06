import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { createDispute, respondToDispute } from '../api/disputes.js';
import '../styles/DisputeFormPage.css';

function DisputeFormPage() {
  const { disputeId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    type: '',
    description: '',
    resolutionRequest: '',
    disputeeId: '',
    attachments: [],
  });

  const [response, setResponse] = useState({
    counterArgument: '',
    resolution: 'reject',
    attachments: [],
  });

  const handleFileChange = (e, target) => {
    const files = Array.from(e.target.files).map((f) => f.name);
    if (target === 'create') {
      setForm({ ...form, attachments: files });
    } else {
      setResponse({ ...response, attachments: files });
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      await createDispute(form);
      toast({ title: 'Dispute submitted', status: 'success' });
      navigate('/profile');
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to submit dispute', status: 'error' });
    }
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    try {
      await respondToDispute(disputeId, response);
      toast({ title: 'Response submitted', status: 'success' });
      navigate('/profile');
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to submit response', status: 'error' });
    }
  };

  return (
    <Box className="dispute-form" p={4}>
      <Heading mb={6}>{disputeId ? 'Respond to Dispute' : 'File a Dispute'}</Heading>
      {!disputeId && (
        <form onSubmit={handleSubmitCreate}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Dispute Type</FormLabel>
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="">Select type</option>
                <option value="service">Service Issue</option>
                <option value="payment">Payment Failure</option>
                <option value="deliverable">Deliverable Dispute</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Desired Resolution</FormLabel>
              <Textarea value={form.resolutionRequest} onChange={(e) => setForm({ ...form, resolutionRequest: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Disputee ID</FormLabel>
              <Input value={form.disputeeId} onChange={(e) => setForm({ ...form, disputeeId: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Attachments</FormLabel>
              <Input type="file" multiple onChange={(e) => handleFileChange(e, 'create')} />
            </FormControl>
            <Button colorScheme="teal" type="submit" alignSelf="flex-start">
              Submit Dispute
            </Button>
          </VStack>
        </form>
      )}
      {disputeId && (
        <form onSubmit={handleSubmitResponse}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Counterargument</FormLabel>
              <Textarea value={response.counterArgument} onChange={(e) => setResponse({ ...response, counterArgument: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Resolution</FormLabel>
              <Select value={response.resolution} onChange={(e) => setResponse({ ...response, resolution: e.target.value })}>
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
                <option value="modify">Modify</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Attachments</FormLabel>
              <Input type="file" multiple onChange={(e) => handleFileChange(e, 'response')} />
            </FormControl>
            <Button colorScheme="teal" type="submit" alignSelf="flex-start">
              Submit Response
            </Button>
          </VStack>
        </form>
      )}
    </Box>
  );
}

export default DisputeFormPage;
