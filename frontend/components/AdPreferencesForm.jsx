import { useState, useEffect } from 'react';
import { Box, CheckboxGroup, Checkbox, Stack, Button, Heading } from '@chakra-ui/react';
import '../styles/AdPreferencesForm.css';
import { updateAdPreferences } from '../api/ads';
import { defaultCategories } from '../utils/ads';

export default function AdPreferencesForm({ initial = [], onSave }) {
  const [values, setValues] = useState(initial);

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const handleSave = async () => {
    const res = await updateAdPreferences(values);
    if (onSave) onSave(res.preferences);
  };

  return (
    <Box className="ad-preferences-form" p={4} borderWidth="1px" borderRadius="md">
      <Heading size="sm" mb={2}>
        Ad Preferences
      </Heading>
      <CheckboxGroup value={values} onChange={setValues}>
        <Stack spacing={1}>
          {defaultCategories.map((cat) => (
            <Checkbox key={cat} value={cat}>
              {cat}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Button mt={3} size="sm" colorScheme="green" onClick={handleSave}>
        Save Preferences
      </Button>
    </Box>
  );
}
