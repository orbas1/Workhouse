import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import '../styles/CampaignForm.css';

export default function CampaignForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    goalType: 'impressions',
    goalTarget: '',
    startDate: '',
    endDate: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      goalTarget: Number(form.goalTarget)
    });
    setForm({ title: '', description: '', goalType: 'impressions', goalTarget: '', startDate: '', endDate: '' });
  }

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <FormControl mb={2}>
        <FormLabel>Title</FormLabel>
        <Input name="title" value={form.title} onChange={handleChange} required />
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Description</FormLabel>
        <Input name="description" value={form.description} onChange={handleChange} />
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Goal Type</FormLabel>
        <Select name="goalType" value={form.goalType} onChange={handleChange}>
          <option value="impressions">Impressions</option>
          <option value="clicks">Clicks</option>
        </Select>
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Goal Target</FormLabel>
        <Input type="number" name="goalTarget" value={form.goalTarget} onChange={handleChange} required />
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Start Date</FormLabel>
        <Input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>End Date</FormLabel>
        <Input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
      </FormControl>
      <Button type="submit" colorScheme="teal">Create Campaign</Button>
    </form>
  );
}
