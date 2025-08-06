import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { getInstallStatus, runInstallation } from '../api/install.js';
import '../styles/InstallationWizardPage.css';

export default function InstallationWizardPage() {
  const [status, setStatus] = useState(null);
  const [step, setStep] = useState(0);
  const [dbConfig, setDbConfig] = useState({ host: '', user: '', password: '', name: '' });
  const [admin, setAdmin] = useState({ username: '', email: '', password: '' });
  const [app, setApp] = useState({ appId: '', appUrl: '' });
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    getInstallStatus()
      .then(setStatus)
      .catch(() => setStatus({ installed: false }));
  }, []);

  if (status?.installed) {
    return (
      <Box p={6}>
        <Alert status="success">
          <AlertIcon />Application already installed.
        </Alert>
      </Box>
    );
  }

  const handleNext = async () => {
    setError('');
    if (step < 2) {
      setStep(step + 1);
    } else {
      try {
        await runInstallation({ dbConfig, admin, app });
        setComplete(true);
      } catch (e) {
        setError(e.response?.data?.error || e.message);
      }
    }
  };

  if (complete) {
    return (
      <Box p={6}>
        <Alert status="success">
          <AlertIcon />Installation completed successfully.
        </Alert>
      </Box>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <FormControl>
              <FormLabel>Database Host</FormLabel>
              <Input value={dbConfig.host} onChange={e => setDbConfig({ ...dbConfig, host: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Database User</FormLabel>
              <Input value={dbConfig.user} onChange={e => setDbConfig({ ...dbConfig, user: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Database Password</FormLabel>
              <Input type="password" value={dbConfig.password} onChange={e => setDbConfig({ ...dbConfig, password: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Database Name</FormLabel>
              <Input value={dbConfig.name} onChange={e => setDbConfig({ ...dbConfig, name: e.target.value })} />
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <FormControl>
              <FormLabel>Admin Username</FormLabel>
              <Input value={admin.username} onChange={e => setAdmin({ ...admin, username: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Admin Email</FormLabel>
              <Input value={admin.email} onChange={e => setAdmin({ ...admin, email: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Admin Password</FormLabel>
              <Input type="password" value={admin.password} onChange={e => setAdmin({ ...admin, password: e.target.value })} />
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <FormControl>
              <FormLabel>App ID</FormLabel>
              <Input value={app.appId} onChange={e => setApp({ ...app, appId: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>App URL</FormLabel>
              <Input value={app.appUrl} onChange={e => setApp({ ...app, appUrl: e.target.value })} />
            </FormControl>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="installation-wizard" p={6}>
      <Heading mb={4}>Installation Wizard</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <VStack spacing={4} align="stretch">
        {renderStep()}
      </VStack>
      <Button mt={6} colorScheme="teal" onClick={handleNext}>
        {step < 2 ? 'Next' : 'Install'}
      </Button>
    </Box>
  );
}
