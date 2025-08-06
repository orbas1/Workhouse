import React, { useEffect, useState } from 'react';
import { Box, CheckboxGroup, Checkbox, Stack, Button, Heading, useToast } from '@chakra-ui/react';
import '../styles/AdPreferencesForm.css';
import { updateAdPreferences } from '../api/ads.js';
import { defaultCategories } from '../utils/ads.js';

export default function AdPreferencesForm({ initial = [], onSave }) {
  const [values, setValues] = useState(initial);
  const toast = useToast();

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const handleSave = async () => {
    try {
      const res = await updateAdPreferences(values);
      if (onSave) onSave(res.preferences);
      toast({ title: 'Preferences saved', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to save preferences', status: 'error' });
    }
  };

  return (
    <Box className="ad-preferences-form" p={4} borderWidth="1px" borderRadius="md">
      <Heading size="sm" mb={2}>Ad Preferences</Heading>
      <CheckboxGroup value={values} onChange={setValues}>
        <Stack spacing={1}>
          {defaultCategories.map((cat) => (
            <Checkbox key={cat} value={cat}>{cat}</Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Button mt={3} size="sm" colorScheme="green" onClick={handleSave}>
        Save Preferences
      </Button>
    </Box>
  );
}
