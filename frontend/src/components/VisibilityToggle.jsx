import React from 'react';
import { HStack, Switch, Text } from '@chakra-ui/react';
import '../styles/VisibilityToggle.css';

function VisibilityToggle({ label, isChecked, onChange }) {
  return (
    <HStack className="visibility-toggle" justify="space-between">
      <Text>{label}</Text>
      <Switch isChecked={isChecked} onChange={onChange} colorScheme="teal" />
    </HStack>
  );
}

export default VisibilityToggle;
