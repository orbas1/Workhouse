import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

export default function ClassroomSections() {
  return (
    <Box className="classroom-sections">
      <Heading size="md" mb={2}>Group Classes</Heading>
      <Box mb={4}>Manage and join group class sessions.</Box>
      <Heading size="md" mb={2}>Tutor Classes</Heading>
      <Box mb={4}>One-on-one or small group tutor sessions.</Box>
      <Heading size="md" mb={2}>Recorded Classes</Heading>
      <Box mb={4}>Access your library of recorded lessons.</Box>
      <Heading size="md" mb={2}>Calendar & Alerts</Heading>
      <Box mb={4}>Configure schedules and receive alerts.</Box>
      <Heading size="md" mb={2}>Teacher Releases</Heading>
      <Box>View upcoming teacher drops and release schedules.</Box>
    </Box>
  );
}
