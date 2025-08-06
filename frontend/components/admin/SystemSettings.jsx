import { Box, FormControl, FormLabel, Switch, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './SystemSettings.css';

export default function SystemSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    adminAPI.getConfig().then(setSettings).catch(() => {});
  }, []);

  const handleToggle = async (key) => {
    const updated = {
      ...settings,
      features: { ...settings.features, [key]: !settings.features[key] }
    };
    setSettings(updated);
    await adminAPI.updateConfig({ features: updated.features });
  };

  if (!settings) return null;

  return (
    <Box className="system-settings">
      <VStack align="stretch" spacing={4}>
        {Object.keys(settings.features).map((feat) => (
          <FormControl key={feat} display="flex" alignItems="center">
            <FormLabel flex="1" mb="0" textTransform="capitalize">
              {feat.replace(/([A-Z])/g, ' $1')}
            </FormLabel>
            <Switch isChecked={settings.features[feat]} onChange={() => handleToggle(feat)} />
          </FormControl>
        ))}
      </VStack>
    </Box>
  );
}
