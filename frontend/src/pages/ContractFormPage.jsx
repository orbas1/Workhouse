import React, { useEffect, useState } from 'react';
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
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { createContract, getContract, updateContract } from '../api/contracts.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/ContractFormPage.css';

function ContractFormPage() {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: '',
    description: '',
    paymentType: 'fixed',
    budget: '',
    hourlyRate: '',
    expectedHours: '',
    milestones: [],
    deliverables: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contractId) {
      async function load() {
        try {
          const data = await getContract(contractId);
          setForm({
            title: data.title || '',
            description: data.description || '',
            paymentType: data.paymentType || 'fixed',
            budget: data.budget || '',
            hourlyRate: data.hourlyRate || '',
            expectedHours: data.expectedHours || '',
            milestones: data.milestones || [],
            deliverables: data.deliverables || [],
          });
        } catch (err) {
          console.error(err);
        }
      }
      load();
    }
  }, [contractId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const addDeliverable = () => {
    setForm((f) => ({ ...f, deliverables: [...f.deliverables, { description: '' }] }));
  };

  const updateDeliverable = (index, value) => {
    const deliverables = [...form.deliverables];
    deliverables[index].description = value;
    setForm({ ...form, deliverables });
  };

  const removeDeliverable = (index) => {
    const deliverables = form.deliverables.filter((_, i) => i !== index);
    setForm({ ...form, deliverables });
  };

  const addMilestone = () => {
    setForm((f) => ({
      ...f,
      milestones: [...f.milestones, { title: '', dueDate: '', amount: '' }],
    }));
  };

  const updateMilestone = (index, field, value) => {
    const milestones = [...form.milestones];
    milestones[index][field] = value;
    setForm({ ...form, milestones });
  };

  const removeMilestone = (index) => {
    const milestones = form.milestones.filter((_, i) => i !== index);
    setForm({ ...form, milestones });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        clientId: user?.id || 'client',
        title: form.title,
        description: form.description,
        paymentType: form.paymentType,
        budget: form.paymentType === 'fixed' ? Number(form.budget) || undefined : undefined,
        hourlyRate: form.paymentType === 'hourly' ? Number(form.hourlyRate) || undefined : undefined,
        expectedHours: form.paymentType === 'hourly' ? Number(form.expectedHours) || undefined : undefined,
        milestones: form.milestones,
        deliverables: form.deliverables,
      };
      if (contractId) {
        await updateContract(contractId, payload);
      } else {
        const created = await createContract(payload);
        navigate(`/contracts/${created.id}/edit`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box className="contract-form" maxW="800px" mx="auto">
      <Heading mb={6}>{contractId ? 'Edit Contract' : 'Create Contract'}</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Payment Type</FormLabel>
            <Select name="paymentType" value={form.paymentType} onChange={handleChange}>
              <option value="fixed">Fixed</option>
              <option value="hourly">Hourly</option>
            </Select>
          </FormControl>
          {form.paymentType === 'fixed' && (
            <FormControl>
              <FormLabel>Total Budget</FormLabel>
              <Input type="number" name="budget" value={form.budget} onChange={handleChange} />
            </FormControl>
          )}
          {form.paymentType === 'hourly' && (
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Hourly Rate</FormLabel>
                <Input type="number" name="hourlyRate" value={form.hourlyRate} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Expected Hours</FormLabel>
                <Input type="number" name="expectedHours" value={form.expectedHours} onChange={handleChange} />
              </FormControl>
            </HStack>
          )}
          <Box>
            <FormLabel>Deliverables</FormLabel>
            <VStack spacing={2} align="stretch">
              {form.deliverables.map((d, idx) => (
                <HStack key={idx}>
                  <Input
                    value={d.description}
                    onChange={(e) => updateDeliverable(idx, e.target.value)}
                    placeholder={`Deliverable ${idx + 1}`}
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<DeleteIcon />}
                    onClick={() => removeDeliverable(idx)}
                  />
                </HStack>
              ))}
              <Button leftIcon={<AddIcon />} onClick={addDeliverable} variant="outline">
                Add Deliverable
              </Button>
            </VStack>
          </Box>
          <Box>
            <FormLabel>Milestones</FormLabel>
            <VStack spacing={2} align="stretch">
              {form.milestones.map((m, idx) => (
                <HStack key={idx} align="start">
                  <Input
                    placeholder="Title"
                    value={m.title}
                    onChange={(e) => updateMilestone(idx, 'title', e.target.value)}
                  />
                  <Input
                    type="date"
                    value={m.dueDate}
                    onChange={(e) => updateMilestone(idx, 'dueDate', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={m.amount}
                    onChange={(e) => updateMilestone(idx, 'amount', e.target.value)}
                  />
                  <IconButton aria-label="Remove" icon={<DeleteIcon />} onClick={() => removeMilestone(idx)} />
                </HStack>
              ))}
              <Button leftIcon={<AddIcon />} onClick={addMilestone} variant="outline">
                Add Milestone
              </Button>
            </VStack>
          </Box>
          <Button colorScheme="teal" type="submit" isLoading={loading} alignSelf="flex-start">
            {contractId ? 'Update Contract' : 'Create Contract'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default ContractFormPage;
