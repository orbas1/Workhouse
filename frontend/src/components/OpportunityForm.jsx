import React, { useState, useEffect } from 'react';
import { VStack, FormControl, FormLabel, Input, Textarea, Switch, Select, Button } from '@chakra-ui/react';
import '../styles/OpportunityForm.css';

const defaultData = {
  title: '',
  description: '',
  location: '',
  remote: false,
  commitmentTime: '',
  urgency: 'medium',
  requirements: '',
  multimedia: [],
  isFeatured: false,
  status: 'open'
};

export default function OpportunityForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultData, ...initialData });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className="opportunity-form" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={formData.title} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={formData.description} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input name="location" value={formData.location} onChange={handleChange} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Remote</FormLabel>
          <Switch name="remote" isChecked={formData.remote} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Commitment Time</FormLabel>
          <Input name="commitmentTime" value={formData.commitmentTime} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Urgency</FormLabel>
          <Select name="urgency" value={formData.urgency} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Requirements</FormLabel>
          <Textarea name="requirements" value={formData.requirements} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </Select>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Featured</FormLabel>
          <Switch name="isFeatured" isChecked={formData.isFeatured} onChange={handleChange} />
        </FormControl>
        <VStack direction="row" spacing={4} width="100%">
          <Button colorScheme="teal" type="submit" width="100%">Save</Button>
          {onCancel && <Button variant="outline" onClick={onCancel} width="100%">Cancel</Button>}
        </VStack>
      </VStack>
    </form>
  );
}
