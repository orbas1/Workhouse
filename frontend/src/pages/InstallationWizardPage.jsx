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
  AlertIcon,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepNumber,
  StepIcon,
  StepTitle,
  StepSeparator,
  Flex,
  Text,
} from '@chakra-ui/react';
import { getInstallStatus, runInstallation, checkDatabaseConnection } from '../api/install.js';
import { useInstall } from '../context/InstallContext.jsx';
import '../styles/InstallationWizardPage.css';

export default function InstallationWizardPage() {
  const [status, setStatus] = useState(null);
  const [step, setStep] = useState(0);
  const [dbConfig, setDbConfig] = useState({ host: '', user: '', password: '', name: '' });
  const [admin, setAdmin] = useState({ username: '', email: '', password: '' });
  const defaultUrl = typeof window !== 'undefined' && window.env?.APP_URL
    ? window.env.APP_URL
    : window.location.origin;
  const [app, setApp] = useState({ appId: '', appUrl: defaultUrl });
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const [dbCheck, setDbCheck] = useState(null);
  const { refresh } = useInstall();

  const errorSuggestions = {
    'Admin user already exists': 'Try a different username.',
    'Admin username and password are required': 'Fill in all admin fields.',
  };

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

  const validateStep = () => {
    switch (step) {
      case 0:
        return dbConfig.host && dbConfig.user && dbConfig.name;
      case 1:
        return admin.username && admin.email && admin.password;
      case 2:
        return app.appId && app.appUrl;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    setError('');
    if (!validateStep()) {
      setError('Please fill out all required fields.');
      return;
    }
    if (step < 2) {
      setStep(step + 1);
    } else {
      try {
        await runInstallation({ dbConfig, admin, app });
        await refresh();
        setComplete(true);
      } catch (e) {
        const msg = e.response?.data?.error || e.message;
        setError(msg);
      }
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 0) setStep(step - 1);
  };

  const handleCheckDb = async () => {
    setDbCheck(null);
    setError('');
    try {
      await checkDatabaseConnection(dbConfig);
      setDbCheck('Connection successful!');
    } catch (e) {
      const msg = e.response?.data?.error || e.message;
      setDbCheck(null);
      setError(msg);
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

  const steps = [{ title: 'Database' }, { title: 'Admin' }, { title: 'Application' }];

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <FormControl isRequired>
              <FormLabel>Database Host</FormLabel>
              <Input value={dbConfig.host} onChange={e => setDbConfig({ ...dbConfig, host: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Database User</FormLabel>
              <Input value={dbConfig.user} onChange={e => setDbConfig({ ...dbConfig, user: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Database Password</FormLabel>
              <Input type="password" value={dbConfig.password} onChange={e => setDbConfig({ ...dbConfig, password: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Database Name</FormLabel>
              <Input value={dbConfig.name} onChange={e => setDbConfig({ ...dbConfig, name: e.target.value })} />
            </FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleCheckDb}>
              Check Connection
            </Button>
            {dbCheck && (
              <Alert status="success" mt={4}>
                <AlertIcon />
                {dbCheck}
              </Alert>
            )}
          </>
        );
      case 1:
        return (
          <>
            <FormControl isRequired>
              <FormLabel>Admin Username</FormLabel>
              <Input value={admin.username} onChange={e => setAdmin({ ...admin, username: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Admin Email</FormLabel>
              <Input value={admin.email} onChange={e => setAdmin({ ...admin, email: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Admin Password</FormLabel>
              <Input type="password" value={admin.password} onChange={e => setAdmin({ ...admin, password: e.target.value })} />
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <FormControl isRequired>
              <FormLabel>App ID</FormLabel>
              <Input value={app.appId} onChange={e => setApp({ ...app, appId: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>App URL</FormLabel>
              <Input value={app.appUrl} onChange={e => setApp({ ...app, appUrl: e.target.value })} />
            </FormControl>
          </>
        );
      default:
        return null;
    }
  };

  const suggestion = errorSuggestions[error] || '';

  return (
    <Box className="installation-wizard" p={6} bgGradient="linear(to-r, blue.50, blue.100)" borderWidth="1px" borderColor="blue.200" borderRadius="md" shadow="md">
      <Heading mb={6} color="blue.700">
        Workhouse Setup Wizard
      </Heading>
      <Stepper index={step} colorScheme="blue" mb={6}>
        {steps.map((s, idx) => (
          <Step key={idx}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{s.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <Box>
            <Text>{error}</Text>
            {suggestion && <Text mt={1} fontSize="sm">{suggestion}</Text>}
          </Box>
        </Alert>
      )}
      <VStack spacing={4} align="stretch">
        {renderStep()}
      </VStack>
      <Flex mt={6} justify="space-between">
        <Button onClick={handleBack} isDisabled={step === 0} colorScheme="blue" variant="outline">
          Back
        </Button>
        <Button colorScheme="blue" onClick={handleNext}>
          {step < 2 ? 'Next' : 'Install'}
        </Button>
      </Flex>
    </Box>
  );
}
